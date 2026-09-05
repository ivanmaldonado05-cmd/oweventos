/* ==========================================================================
   OW EVENTOS — App (rediseño premium, multi-página)
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  const LANGS = ["es", "en", "pt"];
  let lang = localStorage.getItem("ow_lang");
  if (!LANGS.includes(lang)) {
    const nav = (navigator.language || "es").slice(0, 2);
    lang = LANGS.includes(nav) ? nav : "es";
  }
  const t = (k) => (I18N[lang] && I18N[lang][k]) || I18N.es[k] || k;

  const PAGE = document.body.dataset.page || "home";
  let activeFilter = "all";
  let searchTerm = "";
  let quoteCoords = null, pickMap = null, pickMarker = null;

  /* ---------------- Selección (persistida) ---------------- */
  function loadCart() {
    try {
      const a = JSON.parse(localStorage.getItem("ow_cart") || "[]");
      return new Map(a.filter(x => PRODUCTS.some(p => p.id === x.id)).map(x => [x.id, Math.max(1, x.qty | 0)]));
    } catch (e) { return new Map(); }
  }
  function saveCart() {
    try { localStorage.setItem("ow_cart", JSON.stringify(Array.from(selected, ([id, qty]) => ({ id, qty })))); } catch (e) {}
  }
  const selected = loadCart();

  /* ---------------- i18n ---------------- */
  function applyI18n() {
    document.documentElement.lang = lang;
    if (I18N[lang]["meta.title"] && PAGE === "home") document.title = t("meta.title");
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-ph]").forEach(el => { el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph"))); });
    $$(".lang-switch button").forEach(b => b.classList.toggle("active", b.dataset.lang === lang));
  }
  function setLang(l) {
    if (!LANGS.includes(l)) return;
    lang = l; localStorage.setItem("ow_lang", l);
    applyI18n();
    if (PAGE === "catalog") { renderChips(); renderCatalog(); }
    if (PAGE === "home") fillSpotlight();
    updateCart();
    setWaLinks();
    if (!$("#quoteModal").hidden) renderQuoteItems();
    updateCatalogAddButtons();
  }

  /* ---------------- WhatsApp ---------------- */
  function waUrl(text) { return "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(text); }
  function setWaLinks() {
    const general = waUrl(t("wa.greeting"));
    const energy = waUrl(t("wa.energy_consult"));
    ["#heroWa", "#closingWa", "#waFloat", "#waLink", "#footWa", "#menuWa", "#footWaText", "#headerWa"].forEach(sel => {
      const el = $(sel); if (el) el.href = general;
    });
    ["#energyTile", "#energyBtn"].forEach(sel => { const el = $(sel); if (el) el.href = energy; });
    const waNum = $("#waNumber"); if (waNum) waNum.textContent = CONTACT.whatsappDisplay;
    const menuWa = $("#menuWa"); if (menuWa) menuWa.textContent = "WhatsApp · " + CONTACT.whatsappDisplay;
    const footWaText = $("#footWaText"); if (footWaText) footWaText.textContent = "WhatsApp · " + CONTACT.whatsappDisplay;
    const ig = $("#igLink"); if (ig) ig.href = CONTACT.instagramUrl;
  }

  /* ---------------- Cart bar ---------------- */
  function updateCart() {
    const n = selected.size;
    const c = $("#selectCount"); if (c) c.textContent = n;
    const w = $("#selectWord"); if (w) w.textContent = t(n === 1 ? "bar.product" : "bar.products");
    const bar = $("#cartBar"); if (bar) bar.classList.toggle("show", n > 0);
    document.body.classList.toggle("has-cart", n > 0);
  }

  function toggleSelect(id) {
    if (selected.has(id)) selected.delete(id); else selected.set(id, 1);
    saveCart();
    const card = $(`.pcard[data-id="${id}"]`);
    if (card) {
      const isSel = selected.has(id);
      card.classList.toggle("selected", isSel);
      const b = $(".pcard-add", card);
      if (b) b.querySelector("span").textContent = isSel ? t("catalog.inquote") : t("catalog.addquote");
    }
    if (prodModalId === id) syncProdSelect();
    updateCart();
  }
  function updateCatalogAddButtons() {
    $$(".pcard").forEach(card => {
      const id = card.dataset.id, isSel = selected.has(id);
      card.classList.toggle("selected", isSel);
      const b = $(".pcard-add", card);
      if (b) b.querySelector("span").textContent = isSel ? t("catalog.inquote") : t("catalog.addquote");
    });
  }

  /* ---------------- Catálogo ---------------- */
  function renderChips() {
    const chips = $("#filterChips"); if (!chips) return;
    const filters = [
      { key: "all", label: t("catalog.all") },
      { key: "aranas", label: t("filter.aranas") },
      { key: "climatizacion", label: t("filter.climatizacion") }
    ];
    chips.innerHTML = filters.map(f => `<button class="chip ${activeFilter === f.key ? "active" : ""}" data-filter="${f.key}">${f.label}</button>`).join("");
    $$(".chip", chips).forEach(c => c.addEventListener("click", () => { activeFilter = c.dataset.filter; renderChips(); renderCatalog(); }));
  }
  function matches(p) {
    if (activeFilter === "aranas" && p.cat !== "iluminacion") return false;
    if (activeFilter === "climatizacion" && p.cat !== "climatizacion") return false;
    if (searchTerm) {
      const hay = (p.name[lang] + " " + p.desc[lang] + " " + (p.dims || "")).toLowerCase();
      if (!hay.includes(searchTerm)) return false;
    }
    return true;
  }
  const catRank = (c) => (c === "iluminacion" ? 0 : 1);
  function subLabel(p) { return (CATEGORIES[p.cat].subs[p.sub] || {})[lang] || ""; }

  function pcardHtml(p) {
    const isSel = selected.has(p.id);
    const imgs = p.imgs || [p.img];
    const multi = imgs.length > 1;
    const slides = imgs.map((src, i) => `<img src="${src}" alt="${p.name[lang]}" loading="lazy" class="slide${i === 0 ? " active" : ""}" />`).join("");
    const nav = multi ? `
        <button class="slide-btn prev" data-dir="-1" aria-label="anterior">‹</button>
        <button class="slide-btn next" data-dir="1" aria-label="siguiente">›</button>
        <div class="slide-dots">${imgs.map((_, i) => `<span class="dot${i === 0 ? " active" : ""}"></span>`).join("")}</div>` : "";
    return `
      <article class="pcard ${isSel ? "selected" : ""}" data-id="${p.id}">
        <div class="pcard-media">
          <span class="pcard-tag">${subLabel(p)}</span>
          <span class="pcard-check"><svg viewBox="0 0 24 24"><path d="M5 12l4 4L19 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
          <div class="slides">${slides}</div>${nav}
        </div>
        <div class="pcard-body">
          <h3 class="pcard-name">${p.name[lang]}</h3>
          <span class="pcard-dims">${p.dims || ""}</span>
          <div class="pcard-actions">
            <button class="btn btn-outline--dark btn-sm pcard-more" data-more="${p.id}">${t("catalog.details")}</button>
            <button class="btn btn-primary btn-sm pcard-add" data-add="${p.id}"><span>${isSel ? t("catalog.inquote") : t("catalog.addquote")}</span></button>
          </div>
        </div>
      </article>`;
  }
  function renderCatalog() {
    const grid = $("#productGrid"); if (!grid) return;
    const list = PRODUCTS.filter(matches).sort((a, b) => catRank(a.cat) - catRank(b.cat));
    const empty = $("#catalogEmpty"); if (empty) empty.hidden = list.length > 0;
    grid.innerHTML = list.map(pcardHtml).join("");
    wireCards(grid);
    observeReveal(grid);
  }
  function wireCards(scope) {
    $$(".pcard-add", scope).forEach(b => b.addEventListener("click", (e) => { e.stopPropagation(); toggleSelect(b.dataset.add); }));
    $$(".pcard-more", scope).forEach(b => b.addEventListener("click", (e) => { e.stopPropagation(); openProductModal(b.dataset.more); }));
    $$(".pcard-media", scope).forEach(media => {
      const slides = $$(".slide", media), dots = $$(".dot", media);
      let idx = 0;
      const go = (n) => { idx = (n + slides.length) % slides.length; slides.forEach((s, i) => s.classList.toggle("active", i === idx)); dots.forEach((d, i) => d.classList.toggle("active", i === idx)); };
      $$(".slide-btn", media).forEach(b => b.addEventListener("click", (e) => { e.stopPropagation(); go(idx + parseInt(b.dataset.dir, 10)); }));
      dots.forEach((d, i) => d.addEventListener("click", (e) => { e.stopPropagation(); go(i); }));
      media.addEventListener("click", () => openLightbox(slides[idx].getAttribute("src")));
    });
  }

  /* ---------------- Producto destacado (home) ---------------- */
  function fillSpotlight() {
    if (!$("#spotName")) return;
    const p = PRODUCTS.find(x => x.id === "isabel") || PRODUCTS.find(x => x.cat === "iluminacion");
    if (!p) return;
    $("#spotImg").src = (p.imgs && p.imgs[0]) || p.img;
    $("#spotImg").alt = p.name[lang];
    $("#spotName").textContent = p.name[lang];
    $("#spotTag").textContent = subLabel(p);
    $("#spotDesc").textContent = p.desc[lang];
    $("#spotDims").textContent = p.dims || "";
  }

  /* ---------------- Espacios (galería home) ---------------- */
  function renderSpaces() {
    const grid = $("#spacesGrid"); if (!grid) return;
    const imgs = ["evento-1", "evento-2", "evento-3", "evento-4", "evento-5", "evento-6"];
    grid.innerHTML = imgs.map(n => {
      const src = `assets/img/gallery/${n}.webp`;
      return `<figure data-zoom="${src}"><img src="${src}" alt="Evento OW" loading="lazy" /></figure>`;
    }).join("");
    $$("figure", grid).forEach(f => f.addEventListener("click", () => openLightbox(f.dataset.zoom)));
    observeReveal(grid);
  }

  /* ---------------- Quote modal ---------------- */
  function openModal() { renderQuoteItems(); $("#quoteModal").hidden = false; document.body.style.overflow = "hidden"; }
  function closeModal() { $("#quoteModal").hidden = true; document.body.style.overflow = ""; }
  function renderQuoteItems() {
    const wrap = $("#quoteItems"), empty = $("#quoteEmpty"), box = $("#estimateBox");
    if (selected.size === 0) { wrap.innerHTML = ""; empty.hidden = false; if (box) box.style.display = "none"; return; }
    empty.hidden = true; if (box) box.style.display = "";
    wrap.innerHTML = Array.from(selected.keys()).map(id => {
      const p = PRODUCTS.find(x => x.id === id); if (!p) return "";
      const qty = selected.get(id);
      return `
        <div class="quote-item" data-id="${id}">
          <img src="${(p.imgs && p.imgs[0]) || p.img}" alt="" />
          <div class="quote-item-info"><b>${p.name[lang]}</b><span>${p.dims || ""}</span></div>
          <div class="stepper">
            <button data-step="-1" aria-label="-">&minus;</button>
            <input type="number" min="1" value="${qty}" data-qty="${id}" />
            <button data-step="1" aria-label="+">+</button>
          </div>
          <button class="quote-item-remove" data-remove="${id}">${t("modal.remove")}</button>
        </div>`;
    }).join("");
    $$(".quote-item", wrap).forEach(row => {
      const id = row.dataset.id, input = $("input", row);
      $$("[data-step]", row).forEach(btn => btn.addEventListener("click", () => {
        let v = Math.max(1, (parseInt(input.value, 10) || 1) + parseInt(btn.dataset.step, 10));
        input.value = v; selected.set(id, v); saveCart();
      }));
      input.addEventListener("input", () => { let v = Math.max(1, parseInt(input.value, 10) || 1); selected.set(id, v); saveCart(); });
      $("[data-remove]", row).addEventListener("click", () => {
        selected.delete(id); saveCart(); renderQuoteItems(); updateCart();
        const card = $(`.pcard[data-id="${id}"]`);
        if (card) { card.classList.remove("selected"); const b = $(".pcard-add", card); if (b) b.querySelector("span").textContent = t("catalog.addquote"); }
      });
    });
  }
  function buildQuoteMessage() {
    const name = $("#qName").value.trim(), loc = $("#qLocation").value.trim();
    const days = Math.max(1, parseInt($("#qDays").value, 10) || 1), date = $("#qDate").value;
    const dayWord = days === 1 ? t("wa.day") : t("wa.days_plural");
    let msg = t("wa.greeting") + "\n\n*" + t("wa.event") + "*\n";
    if (name) msg += "• " + t("modal.name") + ": " + name + "\n";
    if (loc) msg += "• " + t("wa.location") + ": " + loc + "\n";
    if (quoteCoords) msg += "• " + t("wa.map") + ": https://www.google.com/maps?q=" + quoteCoords.lat.toFixed(6) + "," + quoteCoords.lng.toFixed(6) + "\n";
    msg += "• " + t("wa.days") + ": " + days + " " + dayWord + "\n";
    if (date) msg += "• " + t("wa.date") + ": " + date + "\n";
    msg += "\n*" + t("wa.items") + "*\n";
    selected.forEach((qty, id) => { const p = PRODUCTS.find(x => x.id === id); if (p) msg += "• " + qty + "× " + p.name[lang] + "\n"; });
    msg += "\n" + t("wa.quote_request") + "\n\n" + t("wa.thanks");
    return msg;
  }
  function sendQuote() { if (selected.size === 0) return; window.open(waUrl(buildQuoteMessage()), "_blank"); }

  /* ---------------- Product modal ---------------- */
  let prodModalId = null;
  function openProductModal(id) {
    const p = PRODUCTS.find(x => x.id === id); if (!p) return;
    prodModalId = id;
    const imgs = p.imgs || [p.img];
    $("#prodImg").src = imgs[0]; $("#prodImg").alt = p.name[lang];
    $("#prodBadge").textContent = subLabel(p);
    $("#prodName").textContent = p.name[lang];
    $("#prodDims").textContent = p.dims || "";
    $("#prodDesc").textContent = p.desc[lang];
    syncProdSelect();
    $("#prodModal").hidden = false; document.body.style.overflow = "hidden";
  }
  function syncProdSelect() {
    const btn = $("#prodSelect"); if (!btn || !prodModalId) return;
    const isSel = selected.has(prodModalId);
    btn.dataset.add = prodModalId;
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="${isSel ? "M5 12l4 4L19 6" : "M12 5v14M5 12h14"}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${isSel ? t("catalog.inquote") : t("catalog.addquote")}</span>`;
  }
  function closeProductModal() { $("#prodModal").hidden = true; prodModalId = null; if ($("#quoteModal").hidden && $("#lightbox").hidden) document.body.style.overflow = ""; }

  /* ---------------- Lightbox ---------------- */
  function openLightbox(src) { $("#lightboxImg").src = src; $("#lightbox").hidden = false; document.body.style.overflow = "hidden"; }
  function closeLightbox() { $("#lightbox").hidden = true; if ($("#quoteModal").hidden && $("#prodModal").hidden) document.body.style.overflow = ""; }

  /* ---------------- Map picker ---------------- */
  function setPicked(lat, lng) {
    quoteCoords = { lat, lng };
    const el = $("#mapPicked"); if (el) { el.hidden = false; el.textContent = t("modal.map_picked"); }
    if (pickMap && window.L) { if (!pickMarker) pickMarker = L.marker([lat, lng]).addTo(pickMap); else pickMarker.setLatLng([lat, lng]); }
  }
  function initPickMap() {
    if (pickMap || !window.L) return;
    pickMap = L.map("pickMap", { scrollWheelZoom: false }).setView([-25.2967, -57.6359], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(pickMap);
    pickMap.on("click", (e) => setPicked(e.latlng.lat, e.latlng.lng));
  }

  /* ---------------- Reveal ---------------- */
  let io;
  function observeReveal(scope) {
    if (!("IntersectionObserver" in window)) { $$(".reveal, .media-reveal", scope).forEach(e => e.classList.add("in")); return; }
    if (!io) io = new IntersectionObserver((ents) => ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    $$(".reveal", scope).forEach((el, i) => { el.style.transitionDelay = (i % 6) * 60 + "ms"; io.observe(el); });
    $$(".media-reveal", scope).forEach(el => io.observe(el));
  }

  /* ---------------- Contact form ---------------- */
  function contactSubmit(e) {
    e.preventDefault();
    const f = e.target;
    let msg = t("wa.greeting") + "\n\n";
    if (f.name.value.trim()) msg += "• " + t("contact.name") + ": " + f.name.value.trim() + "\n";
    if (f.phone.value.trim()) msg += "• " + t("contact.phone") + ": " + f.phone.value.trim() + "\n";
    if (f.message.value.trim()) msg += "\n" + f.message.value.trim();
    window.open(waUrl(msg), "_blank");
  }

  /* ---------------- Init ---------------- */
  function init() {
    applyI18n();
    setWaLinks();
    updateCart();

    // language buttons (header + menu)
    $$(".lang-switch button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));

    // header scroll
    const hdr = $("#hdr");
    if (hdr && !hdr.classList.contains("hdr--solid")) {
      const onScroll = () => hdr.classList.toggle("scrolled", window.scrollY > 24);
      onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    }

    // menu overlay
    const overlay = $("#menuOverlay"), menuBtn = $("#menuBtn");
    if (overlay && menuBtn) {
      const open = () => { overlay.classList.add("open"); menuBtn.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; };
      const close = () => { overlay.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; };
      menuBtn.addEventListener("click", open);
      $("#menuClose").addEventListener("click", close);
      $$(".menu-nav a", overlay).forEach(a => a.addEventListener("click", close));
      window.__closeMenu = close;
    }

    // bottom nav active
    const navKey = PAGE === "catalog" ? "catalog" : "home";
    $$(".bottom-nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === navKey));

    // cart bar / quote modal
    $("#openQuote").addEventListener("click", openModal);
    $("#clearSelection").addEventListener("click", () => { selected.clear(); saveCart(); updateCart(); updateCatalogAddButtons(); if (!$("#quoteModal").hidden) renderQuoteItems(); });
    $("#modalClose").addEventListener("click", closeModal);
    $("#modalCancel").addEventListener("click", closeModal);
    $("#sendQuote").addEventListener("click", sendQuote);
    $("#quoteModal").addEventListener("click", (e) => { if (e.target.id === "quoteModal") closeModal(); });

    // product modal
    $("#prodClose").addEventListener("click", closeProductModal);
    $("#prodModal").addEventListener("click", (e) => { if (e.target.id === "prodModal") closeProductModal(); });
    $("#prodSelect").addEventListener("click", () => { if (prodModalId) { toggleSelect(prodModalId); closeProductModal(); } });

    // lightbox
    $(".lightbox-close").addEventListener("click", closeLightbox);
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });

    // esc
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!$("#lightbox").hidden) closeLightbox();
      else if (!$("#prodModal").hidden) closeProductModal();
      else if (!$("#quoteModal").hidden) closeModal();
      else if (overlay && overlay.classList.contains("open") && window.__closeMenu) window.__closeMenu();
    });

    // map picker
    const mapToggle = $("#mapToggle");
    if (mapToggle) {
      mapToggle.addEventListener("click", () => { const w = $("#mapWrap"); w.hidden = !w.hidden; if (!w.hidden) { initPickMap(); setTimeout(() => { if (pickMap) pickMap.invalidateSize(); }, 220); } });
      $("#mapGeo").addEventListener("click", () => {
        if (!navigator.geolocation) return;
        $("#mapWrap").hidden = false; initPickMap();
        navigator.geolocation.getCurrentPosition((pos) => { const { latitude, longitude } = pos.coords; setTimeout(() => { if (pickMap) { pickMap.setView([latitude, longitude], 15); pickMap.invalidateSize(); } setPicked(latitude, longitude); }, 220); });
      });
    }

    // contact form
    const cf = $("#contactForm"); if (cf) cf.addEventListener("submit", contactSubmit);

    // year
    const yr = $("#year"); if (yr) yr.textContent = new Date().getFullYear();

    // page-specific
    if (PAGE === "catalog") {
      const params = new URLSearchParams(location.search);
      const cat = params.get("cat");
      if (cat === "aranas" || cat === "climatizacion") activeFilter = cat;
      renderChips(); renderCatalog();
      let deb;
      $("#searchInput").addEventListener("input", (e) => { clearTimeout(deb); deb = setTimeout(() => { searchTerm = e.target.value.trim().toLowerCase(); renderCatalog(); }, 160); });
    } else {
      fillSpotlight();
      renderSpaces();
    }

    observeReveal(document);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
