/* ==========================================================================
   OW EVENTOS — App
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------- State ---------------- */
  const LANGS = ["es", "en", "pt"];
  let lang = (localStorage.getItem("ow_lang") ||
    (LANGS.includes((navigator.language || "es").slice(0, 2)) ? navigator.language.slice(0, 2) : "es"));
  if (!LANGS.includes(lang)) lang = "es";

  const selected = new Map();        // id -> qty
  let activeFilter = "all";
  let searchTerm = "";
  let quoteCoords = null;            // {lat, lng} from map picker
  let pickMap = null, pickMarker = null;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const t = (key) => (I18N[lang] && I18N[lang][key]) || (I18N.es[key]) || key;
  const fmtGs = (n) => "₲ " + Math.round(n).toLocaleString("es-PY").replace(/,/g, ".");

  /* ---------------- i18n ---------------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    document.title = t("meta.title");
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-ph]").forEach(el => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    $$(".lang-switch button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  }

  function setLang(l) {
    if (!LANGS.includes(l)) return;
    lang = l; localStorage.setItem("ow_lang", l);
    applyI18n();
    renderChips();
    renderCatalog();
    updateSelectBar();
    const ct = $("#catalogToggle");
    if (ct) ct.querySelector("span").textContent = catalogOpen() ? t("catalog.hide") : t("catalog.show");
    updateRevealHint();
    if (!$("#quoteModal").hidden) renderQuoteItems();
  }

  /* ---------------- Filter chips ---------------- */
  function renderChips() {
    const chips = $("#filterChips");
    const filters = [
      { key: "all", label: t("catalog.all") },
      { key: "aranas", label: t("filter.aranas") },
      { key: "climatizacion", label: t("filter.climatizacion") }
    ];
    chips.innerHTML = filters.map(f =>
      `<button class="chip ${activeFilter === f.key ? "active" : ""}" data-filter="${f.key}">${f.label}</button>`
    ).join("");
    $$(".chip", chips).forEach(c => c.addEventListener("click", () => {
      activeFilter = c.dataset.filter;
      renderChips(); renderCatalog();
    }));
  }

  /* ---------------- Catalog ---------------- */
  function matches(p) {
    if (activeFilter === "aranas" && p.cat !== "iluminacion") return false;
    if (activeFilter === "climatizacion" && p.cat !== "climatizacion") return false;
    if (searchTerm) {
      const hay = (p.name[lang] + " " + p.desc[lang] + " " + (p.dims || "")).toLowerCase();
      if (!hay.includes(searchTerm)) return false;
    }
    return true;
  }

  function cardHtml(p) {
    const isSel = selected.has(p.id);
    const subLabel = (CATEGORIES[p.cat].subs[p.sub] || {})[lang] || "";
    const montaje = p.montaje > 0
      ? `<span class="montaje">+ ${fmtGs(p.montaje)} ${t("catalog.montaje")}</span>`
      : `<span class="montaje">${t("catalog.assembly_free")}</span>`;
    const imgs = p.imgs || [p.img];
    const multi = imgs.length > 1;
    const slides = imgs.map((src, i) =>
      `<img src="${src}" alt="${p.name[lang]}" loading="lazy" class="slide${i === 0 ? " active" : ""}" />`
    ).join("");
    const nav = multi ? `
          <button class="slide-btn prev" data-dir="-1" aria-label="anterior">‹</button>
          <button class="slide-btn next" data-dir="1" aria-label="siguiente">›</button>
          <div class="slide-dots">${imgs.map((_, i) => `<span class="dot${i === 0 ? " active" : ""}"></span>`).join("")}</div>` : "";
    return `
      <article class="card ${isSel ? "selected" : ""}" data-id="${p.id}">
        <div class="card-media ${p.light ? "is-light" : ""}">
          <span class="card-badge">${subLabel}</span>
          <span class="card-check"><svg viewBox="0 0 24 24"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <div class="slides">${slides}</div>${nav}
        </div>
        <div class="card-body">
          <h3 class="card-name">${p.name[lang]}</h3>
          <button class="card-more" data-more="${p.id}">
            <span>${t("catalog.more")}</span>
            <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <span class="card-dims">${p.dims || ""}</span>
          <p class="card-desc">${p.desc[lang]}</p>
          <div class="card-foot">
            <div class="card-price">
              <span class="from">${t("catalog.from")}</span>
              <span class="amount">${fmtGs(p.price)}</span>
              ${montaje}
            </div>
            <button class="card-add" data-add="${p.id}">
              <svg viewBox="0 0 24 24"><path d="${isSel ? "M5 12l4 4L19 6" : "M12 5v14M5 12h14"}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              <span>${isSel ? t("catalog.added") : t("catalog.add")}</span>
            </button>
          </div>
        </div>
      </article>`;
  }

  // wire add-buttons + sliders + lightbox for any card grid
  function wireCards(grid) {
    $$(".card-add", grid).forEach(b => b.addEventListener("click", (e) => {
      e.stopPropagation(); toggleSelect(b.dataset.add);
    }));
    $$(".card-more", grid).forEach(b => b.addEventListener("click", (e) => {
      e.stopPropagation(); openProductModal(b.dataset.more);
    }));
    $$(".card-media", grid).forEach(media => {
      const slides = $$(".slide", media);
      const dots = $$(".dot", media);
      let idx = 0;
      const go = (n) => {
        idx = (n + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle("active", i === idx));
        dots.forEach((d, i) => d.classList.toggle("active", i === idx));
      };
      $$(".slide-btn", media).forEach(b => b.addEventListener("click", (e) => {
        e.stopPropagation(); go(idx + parseInt(b.dataset.dir, 10));
      }));
      dots.forEach((d, i) => d.addEventListener("click", (e) => { e.stopPropagation(); go(i); }));
      media.addEventListener("click", () => openLightbox(slides[idx].getAttribute("src")));
    });
  }

  // "Todos": arañas (iluminación) primero, climatización debajo
  const catRank = (c) => (c === "iluminacion" ? 0 : 1);
  function featuredVisible() { return activeFilter === "all" && !searchTerm; }

  function renderCatalog() {
    const grid = $("#productGrid");
    let list = PRODUCTS.filter(matches).sort((a, b) => catRank(a.cat) - catRank(b.cat));
    // los productos que ya se ven arriba (destacados) no se repiten en la grilla
    if (featuredVisible()) list = list.filter(p => !FEATURED.includes(p.id));
    $("#catalogEmpty").hidden = list.length > 0;
    grid.innerHTML = list.map(cardHtml).join("");
    wireCards(grid);
    observeReveal(grid);
    renderFeatured();
  }

  function toggleSelect(id) {
    if (selected.has(id)) selected.delete(id);
    else selected.set(id, 1);
    // update just that card
    const card = $(`.card[data-id="${id}"]`);
    if (card) {
      const p = PRODUCTS.find(x => x.id === id);
      const isSel = selected.has(id);
      card.classList.toggle("selected", isSel);
      const btn = $(".card-add", card);
      btn.querySelector("span").textContent = isSel ? t("catalog.added") : t("catalog.add");
      btn.querySelector("path").setAttribute("d", isSel ? "M5 12l4 4L19 6" : "M12 5v14M5 12h14");
    }
    updateSelectBar();
  }

  /* ---------------- Selection bar ---------------- */
  function updateSelectBar() {
    const bar = $("#selectBar");
    const count = selected.size;
    $("#selectCount").textContent = count;
    bar.hidden = count === 0;
    document.body.classList.toggle("bar-visible", count > 0);
  }

  /* ---------------- Quote modal ---------------- */
  function openModal() {
    renderQuoteItems();
    $("#quoteModal").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    $("#quoteModal").hidden = true;
    document.body.style.overflow = "";
  }

  function renderQuoteItems() {
    const wrap = $("#quoteItems");
    const empty = $("#quoteEmpty");
    if (selected.size === 0) {
      wrap.innerHTML = ""; empty.hidden = false;
      $("#estimateBox").style.display = "none";
      return;
    }
    empty.hidden = true;
    $("#estimateBox").style.display = "";
    wrap.innerHTML = Array.from(selected.keys()).map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      const qty = selected.get(id);
      return `
        <div class="quote-item" data-id="${id}">
          <img src="${(p.imgs && p.imgs[0]) || p.img}" alt="" />
          <div class="quote-item-info">
            <b>${p.name[lang]}</b>
            <span>${fmtGs(p.price)} ${t("wa.unit")}${p.montaje > 0 ? " · " + fmtGs(p.montaje) + " " + t("catalog.montaje") : ""}</span>
          </div>
          <div class="stepper">
            <button data-step="-1" aria-label="-">&minus;</button>
            <input type="number" min="1" value="${qty}" data-qty="${id}" />
            <button data-step="1" aria-label="+">+</button>
          </div>
          <button class="quote-item-remove" data-remove="${id}">${t("modal.remove")}</button>
        </div>`;
    }).join("");

    // wire steppers
    $$(".quote-item", wrap).forEach(row => {
      const id = row.dataset.id;
      const input = $("input", row);
      $$("[data-step]", row).forEach(btn => btn.addEventListener("click", () => {
        let v = Math.max(1, (parseInt(input.value, 10) || 1) + parseInt(btn.dataset.step, 10));
        input.value = v; selected.set(id, v); computeEstimate();
      }));
      input.addEventListener("input", () => {
        let v = Math.max(1, parseInt(input.value, 10) || 1);
        selected.set(id, v); computeEstimate();
      });
      $("[data-remove]", row).addEventListener("click", () => {
        selected.delete(id); renderQuoteItems(); updateSelectBar();
        const card = $(`.card[data-id="${id}"]`);
        if (card) { card.classList.remove("selected");
          const b = $(".card-add", card); b.querySelector("span").textContent = t("catalog.add");
          b.querySelector("path").setAttribute("d", "M12 5v14M5 12h14"); }
      });
    });
    computeEstimate();
  }

  function computeEstimate() {
    let total = 0;
    selected.forEach((qty, id) => {
      const p = PRODUCTS.find(x => x.id === id);
      total += (p.price + (p.montaje || 0)) * qty;
    });
    $("#estimateTotal").textContent = fmtGs(total);
  }

  /* ---------------- WhatsApp ---------------- */
  function waUrl(text) {
    return "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(text);
  }

  function buildQuoteMessage() {
    const name = $("#qName").value.trim();
    const loc = $("#qLocation").value.trim();
    const days = Math.max(1, parseInt($("#qDays").value, 10) || 1);
    const date = $("#qDate").value;
    const dayWord = days === 1 ? t("wa.day") : t("wa.days_plural");

    let msg = t("wa.greeting") + "\n\n";
    msg += "*" + t("wa.event") + "*\n";
    if (name) msg += "• " + t("modal.name") + ": " + name + "\n";
    if (loc) msg += "• " + t("wa.location") + ": " + loc + "\n";
    if (quoteCoords) msg += "• " + t("wa.map") + ": https://www.google.com/maps?q=" + quoteCoords.lat.toFixed(6) + "," + quoteCoords.lng.toFixed(6) + "\n";
    msg += "• " + t("wa.days") + ": " + days + " " + dayWord + "\n";
    if (date) msg += "• " + t("wa.date") + ": " + date + "\n";

    msg += "\n*" + t("wa.items") + "*\n";
    let total = 0;
    selected.forEach((qty, id) => {
      const p = PRODUCTS.find(x => x.id === id);
      const line = (p.price + (p.montaje || 0)) * qty;
      total += line;
      msg += "• " + qty + "× " + p.name[lang] + " — " + fmtGs(p.price) + " " + t("wa.unit");
      if (p.montaje > 0) msg += " (+ " + fmtGs(p.montaje) + " " + t("wa.assembly") + ")";
      msg += "\n";
    });
    msg += "\n*" + t("wa.estimate") + ":* " + fmtGs(total) + "\n\n";
    msg += t("wa.thanks");
    return msg;
  }

  function sendQuote() {
    if (selected.size === 0) return;
    window.open(waUrl(buildQuoteMessage()), "_blank");
  }

  /* ---------------- Gallery marquee (movimiento continuo) ---------------- */
  function renderGallery() {
    const track = $("#gmTrack");
    if (!track) return;
    const imgs = ["evento-1", "evento-2", "evento-3", "evento-4", "evento-5", "evento-6"];
    // se duplica la lista para que el desplazamiento vertical sea un loop sin saltos
    const seq = imgs.concat(imgs);
    track.innerHTML = seq.map((n, i) => {
      const src = `assets/img/gallery/${n}.webp`;
      return `<img src="${src}" alt="OW Eventos" loading="lazy" data-zoom="${src}"${i >= imgs.length ? ' aria-hidden="true"' : ""} />`;
    }).join("");
    $$("img", track).forEach(im => im.addEventListener("click", () => openLightbox(im.dataset.zoom)));
  }

  /* ---------------- Lightbox ---------------- */
  function openLightbox(src) {
    const lb = $("#lightbox"); $("#lightboxImg").src = src; lb.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() { $("#lightbox").hidden = true; if ($("#quoteModal").hidden && $("#prodModal").hidden) document.body.style.overflow = ""; }

  /* ---------------- Product modal (más info · mobile) ---------------- */
  let prodModalId = null;
  function openProductModal(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    prodModalId = id;
    const imgs = p.imgs || [p.img];
    $("#prodImg").src = imgs[0];
    $("#prodImg").alt = p.name[lang];
    $("#prodBadge").textContent = (CATEGORIES[p.cat].subs[p.sub] || {})[lang] || "";
    $("#prodName").textContent = p.name[lang];
    $("#prodDims").textContent = p.dims || "";
    $("#prodDesc").textContent = p.desc[lang];
    $("#prodFrom").textContent = t("catalog.from");
    $("#prodPrice").textContent = fmtGs(p.price);
    $("#prodMontaje").textContent = p.montaje > 0
      ? "+ " + fmtGs(p.montaje) + " " + t("catalog.montaje") : t("catalog.assembly_free");
    syncProdSelect();
    $("#prodModal").hidden = false;
    document.body.style.overflow = "hidden";
  }
  function syncProdSelect() {
    const btn = $("#prodSelect");
    if (!btn || !prodModalId) return;
    const isSel = selected.has(prodModalId);
    btn.dataset.add = prodModalId;
    btn.classList.toggle("is-sel", isSel);
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="${isSel ? "M5 12l4 4L19 6" : "M12 5v14M5 12h14"}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${isSel ? t("catalog.added") : t("catalog.add")}</span>`;
  }
  function closeProductModal() {
    $("#prodModal").hidden = true;
    prodModalId = null;
    if ($("#quoteModal").hidden && $("#lightbox").hidden) document.body.style.overflow = "";
  }

  /* ---------------- Reveal on scroll ---------------- */
  let ioOnce, ioRepeat;
  function observeReveal(scope) {
    if (!("IntersectionObserver" in window)) { $$(".reveal, .card, .gallery-item", scope).forEach(e => e.classList.add("in")); return; }
    // cards & gallery: animate once
    if (!ioOnce) ioOnce = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ioOnce.unobserve(e.target); } });
    }, { threshold: 0.12 });
    $$(".card, .gallery-item", scope).forEach((el, i) => { el.style.transitionDelay = (i % 8) * 45 + "ms"; ioOnce.observe(el); });
    // section blocks: re-animate every time they enter the viewport
    if (!ioRepeat) ioRepeat = new IntersectionObserver((entries) => {
      entries.forEach(e => e.target.classList.toggle("in", e.isIntersecting));
    }, { threshold: 0.16 });
    $$(".reveal", scope).forEach(el => ioRepeat.observe(el));
  }

  /* ---------------- Contact form ---------------- */
  function contactSubmit(e) {
    e.preventDefault();
    const f = e.target;
    const name = f.name.value.trim();
    const phone = f.phone.value.trim();
    const message = f.message.value.trim();
    let msg = t("wa.greeting") + "\n\n";
    if (name) msg += "• " + t("contact.name") + ": " + name + "\n";
    if (phone) msg += "• " + t("contact.phone") + ": " + phone + "\n";
    if (message) msg += "\n" + message;
    window.open(waUrl(msg), "_blank");
  }

  /* ---------------- Map picker ---------------- */
  function setPicked(lat, lng) {
    quoteCoords = { lat, lng };
    const el = $("#mapPicked");
    if (el) { el.hidden = false; el.textContent = t("modal.map_picked"); }
    if (pickMap && window.L) {
      if (!pickMarker) pickMarker = L.marker([lat, lng]).addTo(pickMap);
      else pickMarker.setLatLng([lat, lng]);
    }
  }
  function initPickMap() {
    if (pickMap || !window.L) return;
    pickMap = L.map("pickMap", { scrollWheelZoom: false }).setView([-25.2967, -57.6359], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(pickMap);
    pickMap.on("click", (e) => setPicked(e.latlng.lat, e.latlng.lng));
  }

  /* ---------------- Catalog collapse ---------------- */
  const ACC_MS = 640;
  function catalogOpen() { return !$("#productGrid").hidden; }
  function openCatalog() {
    const grid = $("#productGrid"), ctrls = $("#catalogControls"), tog = $("#catalogToggle");
    if (!grid.hidden) return;
    // controles (buscador + filtros) aparecen arriba de las destacadas
    ctrls.hidden = false;
    void ctrls.offsetHeight;
    ctrls.classList.add("cc-in");
    // resto de productos: acordeón suave (0 -> alto real) sin depender de rAF
    grid.hidden = false;
    grid.style.maxHeight = "0px"; grid.style.opacity = "0";
    void grid.offsetHeight;
    grid.classList.add("animating");
    grid.style.maxHeight = grid.scrollHeight + "px";
    grid.style.opacity = "1";
    clearTimeout(grid._accT);
    grid._accT = setTimeout(() => {
      grid.classList.remove("animating");
      grid.style.maxHeight = "none"; grid.style.opacity = "";
    }, ACC_MS);
    tog.setAttribute("aria-expanded", "true");
    tog.querySelector("span").textContent = t("catalog.hide");
    $("#catalogReveal").classList.add("open");
  }
  function toggleCatalog() {
    const grid = $("#productGrid"), ctrls = $("#catalogControls"), tog = $("#catalogToggle");
    if (grid.hidden) { openCatalog(); return; }
    // colapso suave
    ctrls.classList.remove("cc-in");
    grid.style.maxHeight = grid.scrollHeight + "px";
    void grid.offsetHeight;
    grid.classList.add("animating");
    grid.style.maxHeight = "0px"; grid.style.opacity = "0";
    clearTimeout(grid._accT);
    grid._accT = setTimeout(() => {
      grid.hidden = true; grid.classList.remove("animating");
      grid.style.maxHeight = ""; grid.style.opacity = "";
      ctrls.hidden = true;
    }, ACC_MS);
    tog.setAttribute("aria-expanded", "false");
    tog.querySelector("span").textContent = t("catalog.show");
    $("#catalogReveal").classList.remove("open");
  }

  function updateRevealHint() {
    const el = $("#revealHint");
    if (el) el.textContent = PRODUCTS.length + " · " + t("filter.aranas") + " · " + t("filter.climatizacion") + " · " + t("filter.ventiladores");
  }

  /* ---------------- Featured (4 arañas destacadas) ---------------- */
  const FEATURED = ["cristal-con-velas", "isabel", "crystal-black", "clementina"];
  function renderFeatured() {
    const grid = $("#featuredGrid");
    if (!grid) return;
    const show = featuredVisible();
    grid.hidden = !show;
    if (!show) { grid.innerHTML = ""; return; }
    grid.innerHTML = FEATURED.map(id => {
      const p = PRODUCTS.find(x => x.id === id);
      return p ? cardHtml(p) : "";
    }).join("");
    wireCards(grid);
    observeReveal(grid);
  }

  /* ---------------- Init ---------------- */
  function init() {
    applyI18n();
    renderChips();
    renderCatalog();
    renderGallery();
    updateSelectBar();

    // language buttons
    $$(".lang-switch button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

    // search
    let deb;
    $("#searchInput").addEventListener("input", (e) => {
      clearTimeout(deb);
      deb = setTimeout(() => { searchTerm = e.target.value.trim().toLowerCase(); renderCatalog(); }, 160);
    });

    // selection bar
    $("#openQuote").addEventListener("click", openModal);
    $("#clearSelection").addEventListener("click", () => {
      selected.clear(); renderCatalog(); updateSelectBar();
    });

    // modal
    $("#modalClose").addEventListener("click", closeModal);
    $("#modalCancel").addEventListener("click", closeModal);
    $("#sendQuote").addEventListener("click", sendQuote);
    $("#quoteModal").addEventListener("click", (e) => { if (e.target.id === "quoteModal") closeModal(); });

    // lightbox
    $(".lightbox-close").addEventListener("click", closeLightbox);
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });

    // product modal (más info · mobile)
    $("#prodClose").addEventListener("click", closeProductModal);
    $("#prodModal").addEventListener("click", (e) => { if (e.target.id === "prodModal") closeProductModal(); });
    $("#prodSelect").addEventListener("click", () => {
      if (prodModalId) { toggleSelect(prodModalId); closeProductModal(); }
    });

    // esc key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (!$("#lightbox").hidden) closeLightbox();
        else if (!$("#prodModal").hidden) closeProductModal();
        else if (!$("#quoteModal").hidden) closeModal();
        else if (!$("#menuOverlay").hidden && window.__closeMenu) window.__closeMenu();
      }
    });

    // contact form
    $("#contactForm").addEventListener("submit", contactSubmit);

    // catalog collapse
    updateRevealHint();
    $("#catalogToggle").addEventListener("click", toggleCatalog);
    $$('a[href="#catalog"]').forEach(a => a.addEventListener("click", openCatalog));

    // map picker
    $("#mapToggle").addEventListener("click", () => {
      const wrap = $("#mapWrap");
      wrap.hidden = !wrap.hidden;
      if (!wrap.hidden) { initPickMap(); setTimeout(() => { if (pickMap) pickMap.invalidateSize(); }, 220); }
    });
    $("#mapGeo").addEventListener("click", () => {
      if (!navigator.geolocation) return;
      $("#mapWrap").hidden = false; initPickMap();
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setTimeout(() => { if (pickMap) { pickMap.setView([latitude, longitude], 15); pickMap.invalidateSize(); } setPicked(latitude, longitude); }, 220);
      });
    });

    // header scroll
    const header = $("#header");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    // menu overlay
    const menuOverlay = $("#menuOverlay"), menuBtn = $("#menuBtn");
    let menuTimer;
    function openMenu() {
      clearTimeout(menuTimer);
      menuOverlay.hidden = false;
      requestAnimationFrame(() => menuOverlay.classList.add("open"));
      menuBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      menuOverlay.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      menuTimer = setTimeout(() => { menuOverlay.hidden = true; }, 500);
    }
    menuBtn.addEventListener("click", openMenu);
    $("#menuClose").addEventListener("click", closeMenu);
    $$(".menu-nav a").forEach(a => a.addEventListener("click", closeMenu));
    window.__closeMenu = closeMenu;

    // reveal for static sections
    observeReveal(document);

    // contact links + year
    const waHref = waUrl(t("wa.greeting"));
    $("#waLink").href = waHref; $("#waFloat").href = waHref;
    $("#waNumber").textContent = CONTACT.whatsappDisplay;
    $("#igLink").href = CONTACT.instagramUrl;
    const footWa = $("#footWa"), footWaText = $("#footWaText");
    if (footWa) footWa.href = waHref;
    if (footWaText) { footWaText.href = waHref; footWaText.textContent = "WhatsApp · " + CONTACT.whatsappDisplay; }
    const menuWa = $("#menuWa"), menuWaIcon = $("#menuWaIcon");
    if (menuWa) { menuWa.href = waHref; menuWa.textContent = "WhatsApp · " + CONTACT.whatsappDisplay; }
    if (menuWaIcon) menuWaIcon.href = waHref;
    $("#year").textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
