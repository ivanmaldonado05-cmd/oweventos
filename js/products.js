/* ==========================================================================
   OW EVENTOS — Datos de productos (trilingüe ES / EN / PT)
   Precios en guaraníes (₲). "montaje" es costo unitario de instalación.
   ========================================================================== */

const CATEGORIES = {
  climatizacion: {
    label: { es: "Climatización", en: "Climate", pt: "Climatização" },
    subs: {
      ventiladores: { es: "Ventiladores", en: "Fans", pt: "Ventiladores" },
      climatizadores: { es: "Climatizadores", en: "Air Coolers", pt: "Climatizadores" },
      estufas: { es: "Estufas", en: "Heaters", pt: "Aquecedores" }
    }
  },
  iluminacion: {
    label: { es: "Iluminación", en: "Lighting", pt: "Iluminação" },
    subs: {
      cristal: { es: "Cristal", en: "Crystal", pt: "Cristal" },
      bronce: { es: "Bronce & Doradas", en: "Bronze & Gold", pt: "Bronze & Douradas" },
      rusticas: { es: "Rústicas & Industriales", en: "Rustic & Industrial", pt: "Rústicas & Industriais" },
      cadenas: { es: "Cadenas", en: "Chains", pt: "Correntes" }
    }
  },
  energia: {
    label: { es: "Energía", en: "Power", pt: "Energia" },
    subs: {
      generadores: { es: "Generadores CAT®", en: "CAT® Generators", pt: "Geradores CAT®" }
    }
  }
};

const PRODUCTS = [
  /* ------------------------ CLIMATIZACIÓN · Ventiladores ------------------ */
  {
    id: "ventilador-industrial", cat: "climatizacion", sub: "ventiladores",
    imgs: ["assets/img/products/ventilador-industrial.webp"], price: 440000, montaje: 0, stock: 18,
    dims: "Ø 1 m",
    name: { es: "Ventilador Industrial", en: "Industrial Fan", pt: "Ventilador Industrial" },
    desc: {
      es: "Ventilador de piso de dos velocidades que ventila y remueve el aire. 1 m de diámetro.",
      en: "Two-speed floor fan that ventilates and moves the air. 1 m diameter.",
      pt: "Ventilador de piso de duas velocidades que ventila e remove o ar. 1 m de diâmetro."
    }
  },
  /* ------------------------ CLIMATIZACIÓN · Climatizadores ---------------- */
  {
    id: "climatizador-de-piso", cat: "climatizacion", sub: "climatizadores",
    imgs: ["assets/img/products/climatizador-de-piso.webp"], price: 660000, montaje: 0, stock: 10,
    dims: "50 m · evaporativo",
    name: { es: "Climatizador de Piso", en: "Floor Air Cooler", pt: "Climatizador de Piso" },
    desc: {
      es: "Climatizador de piso con sistema evaporativo. Hasta 50 m de alcance.",
      en: "Floor air cooler with evaporative system. Up to 50 m reach.",
      pt: "Climatizador de piso com sistema evaporativo. Até 50 m de alcance."
    }
  },
  {
    id: "climatizador-cabezal-mediano", cat: "climatizacion", sub: "climatizadores",
    imgs: ["assets/img/products/climatizador-cabezal-mediano.webp"], price: 770000, montaje: 0, stock: 10,
    dims: "2 m de alto",
    name: { es: "Climatizador Cabezal Mediano", en: "Medium Column Cooler", pt: "Climatizador Cabeçal Médio" },
    desc: {
      es: "Con pedestal y reservorio de agua. Sistema evaporativo que reduce el calor y no moja. 2 m de alto.",
      en: "With pedestal and water tank. Evaporative system that cools without wetting. 2 m tall.",
      pt: "Com pedestal e reservatório de água. Sistema evaporativo que reduz o calor e não molha. 2 m de altura."
    }
  },
  {
    id: "climatizador-cabezal-grande", cat: "climatizacion", sub: "climatizadores",
    imgs: ["assets/img/products/climatizador-cabezal-grande.webp"], price: 880000, montaje: 0, stock: 10,
    dims: "2 m de alto",
    name: { es: "Climatizador Cabezal Grande", en: "Large Column Cooler", pt: "Climatizador Cabeçal Grande" },
    desc: {
      es: "Con pedestal y reservorio de agua. Sistema evaporativo de mayor potencia que no moja. 2 m de alto.",
      en: "With pedestal and water tank. Higher-power evaporative system that cools without wetting. 2 m tall.",
      pt: "Com pedestal e reservatório de água. Sistema evaporativo de maior potência que não molha. 2 m de altura."
    }
  },
  /* ------------------------ CLIMATIZACIÓN · Estufas ---------------------- */
  {
    id: "estufa-hongo", cat: "climatizacion", sub: "estufas",
    imgs: ["assets/img/products/estufa-hongo.webp"], price: 550000, montaje: 0, stock: 22,
    dims: "Gas · regulable",
    name: { es: "Estufa Hongo", en: "Mushroom Heater", pt: "Aquecedor Cogumelo" },
    desc: {
      es: "Distribuye el calor de manera uniforme, con posibilidad de regular la temperatura.",
      en: "Distributes heat evenly, with adjustable temperature.",
      pt: "Distribui o calor de forma uniforme, com possibilidade de regular a temperatura."
    }
  },
  {
    id: "estufa-piramide", cat: "climatizacion", sub: "estufas",
    imgs: ["assets/img/products/estufa-piramide.webp"], price: 660000, montaje: 0, stock: 50,
    dims: "Gas · llama visible",
    name: { es: "Estufa Pirámide", en: "Pyramid Heater", pt: "Aquecedor Pirâmide" },
    desc: {
      es: "Diseño elegante con llama visible y posibilidad de regular la temperatura.",
      en: "Elegant design with visible flame and adjustable temperature.",
      pt: "Design elegante com chama visível e possibilidade de regular a temperatura."
    }
  },

  /* ------------------------ ILUMINACIÓN · Cristal ----------------------- */
  {
    id: "cristal-con-velas", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/cristal-con-velas-1.webp"], price: 880000, montaje: 150000, stock: 4,
    dims: "1,10 × 1 m · 30 kg",
    name: { es: "Cristal con Velas", en: "Crystal with Candles", pt: "Cristal com Velas" },
    desc: {
      es: "Araña de cristal con 16 brazos y luces tipo vela.",
      en: "Crystal chandelier with 16 arms and candle-style lights.",
      pt: "Lustre de cristal com 16 braços e luzes estilo vela."
    }
  },
  {
    id: "cristal-mediana", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/cristal-mediana-1.webp"], price: 880000, montaje: 150000, stock: 2,
    dims: "1,05 × 1,20 m · 35 kg",
    name: { es: "Cristal Mediana", en: "Crystal Medium", pt: "Cristal Média" },
    desc: {
      es: "Araña de cristal mediana, elegante y luminosa.",
      en: "Medium crystal chandelier, elegant and luminous.",
      pt: "Lustre de cristal médio, elegante e luminoso."
    }
  },
  {
    id: "cristal-grande", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/cristal-grande-1.webp"], price: 880000, montaje: 150000, stock: 2,
    dims: "1,25 × 1,15 m · 40 kg",
    name: { es: "Cristal Grande", en: "Crystal Large", pt: "Cristal Grande" },
    desc: {
      es: "Araña de cristal grande, ideal para espacios amplios.",
      en: "Large crystal chandelier, ideal for wide spaces.",
      pt: "Lustre de cristal grande, ideal para espaços amplos."
    }
  },
  {
    id: "piramide-cromada", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/piramide-cromada-1.webp", "assets/img/products/piramide-cromada-2.webp"], price: 500000, montaje: 150000, stock: 4,
    dims: "0,80 × 0,60 m · 12 focos",
    name: { es: "Pirámide Cromada", en: "Chrome Pyramid", pt: "Pirâmide Cromada" },
    desc: {
      es: "Pirámide de cristal con estructura cromada y cristales transparentes. 12 focos.",
      en: "Crystal pyramid with chrome structure and clear crystals. 12 lights.",
      pt: "Pirâmide de cristal com estrutura cromada e cristais transparentes. 12 focos."
    }
  },
  {
    id: "crystal-black", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/crystal-black-1.webp"], price: 880000, montaje: 150000, stock: 6,
    dims: "1,10 × 0,90 m",
    name: { es: "Crystal Black", en: "Crystal Black", pt: "Crystal Black" },
    desc: {
      es: "Araña grande en negro. Puede utilizarse con o sin tulipas de tela según el ambiente.",
      en: "Large black chandelier. Can be used with or without fabric shades to match the setting.",
      pt: "Lustre grande em preto. Pode ser usado com ou sem cúpulas de tecido conforme o ambiente."
    }
  },

  /* ------------------------ ILUMINACIÓN · Bronce & Doradas -------------- */
  {
    id: "gotas-medianas", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/gotas-medianas-1.webp"], price: 385000, montaje: 50000, stock: 20,
    dims: "0,80 × 0,40 m",
    name: { es: "Gotas Medianas", en: "Medium Teardrop", pt: "Gotas Médias" },
    desc: {
      es: "Araña gota mediana con estructura color bronce y caireles transparentes.",
      en: "Medium teardrop chandelier with bronze structure and clear crystal drops.",
      pt: "Lustre gota médio com estrutura cor bronze e pingentes transparentes."
    }
  },
  {
    id: "gotas-grandes", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/gotas-grandes-1.webp"], price: 440000, montaje: 50000, stock: 20,
    dims: "1,10 × 0,60 m",
    name: { es: "Gotas Grandes", en: "Large Teardrop", pt: "Gotas Grandes" },
    desc: {
      es: "Araña gota grande con estructura color bronce y caireles transparentes.",
      en: "Large teardrop chandelier with bronze structure and clear crystal drops.",
      pt: "Lustre gota grande com estrutura cor bronze e pingentes transparentes."
    }
  },
  {
    id: "redondas-grandes", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/redondas-grandes-1.webp"], price: 440000, montaje: 50000, stock: 20,
    dims: "Ø 50 cm",
    name: { es: "Redonda Grande", en: "Large Round", pt: "Redonda Grande" },
    desc: {
      es: "Araña redonda grande color bronce con caireles transparentes.",
      en: "Large round bronze chandelier with clear crystal drops.",
      pt: "Lustre redondo grande cor bronze com pingentes transparentes."
    }
  },
  {
    id: "redondas-medianas", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/redondas-medianas-1.webp"], price: 380000, montaje: 50000, stock: 20,
    dims: "Ø 40 cm",
    name: { es: "Redonda Mediana", en: "Medium Round", pt: "Redonda Média" },
    desc: {
      es: "Araña redonda mediana color bronce con caireles transparentes.",
      en: "Medium round bronze chandelier with clear crystal drops.",
      pt: "Lustre redondo médio cor bronze com pingentes transparentes."
    }
  },
  {
    id: "imperial", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/imperial-1.webp"], price: 1100000, montaje: 200000, stock: 6,
    dims: "2,10 m alto · 70 kg",
    name: { es: "Imperial", en: "Imperial", pt: "Imperial" },
    desc: {
      es: "Araña imperial de gran altura y presencia majestuosa.",
      en: "Tall imperial chandelier with a majestic presence.",
      pt: "Lustre imperial de grande altura e presença majestosa."
    }
  },
  {
    id: "isabel", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/isabel-1.webp"], price: 1400000, montaje: 250000, stock: 2,
    dims: "2,15 × 1,50 m · 40 kg",
    name: { es: "Isabel", en: "Isabel", pt: "Isabel" },
    desc: {
      es: "Araña dorada con caireles transparentes. Elegancia clásica de gran formato.",
      en: "Gold chandelier with clear crystal drops. Classic large-format elegance.",
      pt: "Lustre dourado com pingentes transparentes. Elegância clássica de grande formato."
    }
  },
  {
    id: "hexagonal", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/hexagonal-1.webp"], price: 660000, montaje: 50000, stock: 20,
    dims: "1,10 × 0,60 m",
    name: { es: "Araña Hexagonal", en: "Hexagonal", pt: "Hexagonal" },
    desc: {
      es: "Araña hexagonal de líneas modernas y luz cálida.",
      en: "Hexagonal chandelier with modern lines and warm light.",
      pt: "Lustre hexagonal de linhas modernas e luz quente."
    }
  },
  {
    id: "angeles-cupula-transparente", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/angeles-cupula-transparente-1.webp"], price: 440000, montaje: 50000, stock: 2,
    dims: "1 × 0,75 m",
    name: { es: "Ángeles · Cúpula Transparente", en: "Angels · Clear Dome", pt: "Anjos · Cúpula Transparente" },
    desc: {
      es: "Araña de bronce con cúpula translúcida y 4 ángeles con 2 brazos cada uno.",
      en: "Bronze chandelier with translucent dome and 4 angels holding 2 arms each.",
      pt: "Lustre de bronze com cúpula translúcida e 4 anjos com 2 braços cada."
    }
  },
  {
    id: "angeles-cupula-marron", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/angeles-cupula-marron-1.webp"], price: 440000, montaje: 100000, stock: 4,
    dims: "1 × 0,70 m · 8 brazos",
    name: { es: "Ángeles · Cúpula Marrón", en: "Angels · Brown Dome", pt: "Anjos · Cúpula Marrom" },
    desc: {
      es: "Araña de bronce con cúpula color madera y 8 brazos.",
      en: "Bronze chandelier with wood-tone dome and 8 arms.",
      pt: "Lustre de bronze com cúpula cor madeira e 8 braços."
    }
  },
  {
    id: "clementina", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/clementina-1.webp"], price: 1100000, montaje: 150000, stock: 4,
    dims: "1,30 × 1,30 m · 5 pisos",
    name: { es: "Clementina", en: "Clementina", pt: "Clementina" },
    desc: {
      es: "Araña color bronce con caireles transparentes, en forma de torta invertida de 5 pisos.",
      en: "Bronze chandelier with clear drops, shaped as a 5-tier inverted cake.",
      pt: "Lustre cor bronze com pingentes transparentes, em forma de bolo invertido de 5 andares."
    }
  },
  {
    id: "bronce-16-brazos", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/bronce-16-brazos-1.webp"], price: 900000, montaje: 100000, stock: 4,
    dims: "1,10 × 0,80 m · 20 kg",
    name: { es: "Bronce 16 Brazos", en: "Bronze 16 Arms", pt: "Bronze 16 Braços" },
    desc: {
      es: "Araña de bronce con caireles de cristal y 16 brazos.",
      en: "Bronze chandelier with crystal drops and 16 arms.",
      pt: "Lustre de bronze com pingentes de cristal e 16 braços."
    }
  },
  {
    id: "candelabro-de-pie", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/candelabro-de-pie-1.webp"], price: 700000, montaje: 100000, stock: 2,
    dims: "1,70 × 0,80 m · 15 brazos",
    name: { es: "Candelabro de Pie", en: "Floor Candelabra", pt: "Candelabro de Pé" },
    desc: {
      es: "Araña de pie con estructura de bronce y caireles de cristal. 15 brazos.",
      en: "Floor-standing chandelier with bronze structure and crystal drops. 15 arms.",
      pt: "Lustre de piso com estrutura de bronze e pingentes de cristal. 15 braços."
    }
  },

  /* ------------------------ ILUMINACIÓN · Rústicas & Industriales ------- */
  {
    id: "nautica-beige", cat: "iluminacion", sub: "rusticas",
    imgs: ["assets/img/products/nautica-beige-1.webp"], price: 250000, montaje: 50000, stock: 10,
    dims: "Cuerda náutica",
    name: { es: "Náutica Beige", en: "Nautical Beige", pt: "Náutica Bege" },
    desc: {
      es: "Araña de cuerda náutica en tono beige. Estilo cálido y natural.",
      en: "Nautical-rope chandelier in beige. Warm, natural style.",
      pt: "Lustre de corda náutica em tom bege. Estilo quente e natural."
    }
  },
  {
    id: "nautica-verde", cat: "iluminacion", sub: "rusticas",
    imgs: ["assets/img/products/nautica-verde-1.webp"], price: 250000, montaje: 50000, stock: 10,
    dims: "Cuerda náutica",
    name: { es: "Náutica Verde", en: "Nautical Green", pt: "Náutica Verde" },
    desc: {
      es: "Araña de cuerda náutica en tono verde. Ideal para ambientes botánicos.",
      en: "Nautical-rope chandelier in green. Ideal for botanical settings.",
      pt: "Lustre de corda náutica em tom verde. Ideal para ambientes botânicos."
    }
  },

  /* ------------------------ ILUMINACIÓN · Cadenas ---------------------- */
  {
    id: "cadenas-cruzadas", cat: "iluminacion", sub: "cadenas",
    imgs: ["assets/img/products/cadenas-cruzadas-1.webp"], price: 660000, montaje: 50000, stock: 80,
    dims: "1,10 × 0,80 m · 12 focos",
    name: { es: "Cadenas Cruzadas", en: "Crossed Chains", pt: "Correntes Cruzadas" },
    desc: {
      es: "Araña de cadenas de aluminio con 12 focos. Diseño contemporáneo.",
      en: "Aluminium chain chandelier with 12 lights. Contemporary design.",
      pt: "Lustre de correntes de alumínio com 12 focos. Design contemporâneo."
    }
  },
  {
    id: "cadenas-con-molde", cat: "iluminacion", sub: "cadenas",
    imgs: ["assets/img/products/cadenas-con-molde-1.webp"], price: 440000, montaje: 50000, stock: 14,
    dims: "12 focos · 10 kg",
    name: { es: "Cadenas con Molde", en: "Molded Chains", pt: "Correntes com Molde" },
    desc: {
      es: "Araña de cadenas de aluminio con molde y 12 focos.",
      en: "Aluminium chain chandelier with a molded form and 12 lights.",
      pt: "Lustre de correntes de alumínio com molde e 12 focos."
    }
  },
  {
    id: "cadenas-con-fleco", cat: "iluminacion", sub: "cadenas",
    imgs: ["assets/img/products/cadenas-con-fleco-1.webp"], price: 550000, montaje: 50000, stock: 11,
    dims: "1,30 × 0,45 m · 7 kg",
    name: { es: "Cadenas con Fleco", en: "Fringe Chains", pt: "Correntes com Franja" },
    desc: {
      es: "Araña de cadenas de aluminio con 8 luces dirigidas hacia arriba.",
      en: "Aluminium chain chandelier with 8 upward-facing lights.",
      pt: "Lustre de correntes de alumínio com 8 luzes voltadas para cima."
    }
  },

  /* ------------------------ ILUMINACIÓN · Últimos ingresos -------------- */
  {
    id: "arana-4-pisos", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/arana-4-pisos.webp"], price: 0, montaje: 0, stock: 2,
    dims: "4 pisos",
    name: { es: "Araña 4 Pisos", en: "4-Tier Chandelier", pt: "Lustre 4 Andares" },
    desc: {
      es: "Araña de cristal en cascada de 4 pisos, imponente y muy luminosa.",
      en: "Four-tier cascading crystal chandelier, striking and luminous.",
      pt: "Lustre de cristal em cascata de 4 andares, imponente e luminoso."
    }
  },
  {
    id: "imperio-mostacillas", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/imperio-mostacillas.webp"], price: 0, montaje: 0, stock: 2,
    dims: "Estilo imperio",
    name: { es: "Imperio de Mostacillas", en: "Beaded Empire", pt: "Império de Miçangas" },
    desc: {
      es: "Araña estilo imperio con mostacillas de cristal y brazos con velas.",
      en: "Empire-style chandelier with crystal beading and candle arms.",
      pt: "Lustre estilo império com miçangas de cristal e braços com velas."
    }
  },
  {
    id: "veneciana-fundas", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/veneciana-fundas.webp"], price: 0, montaje: 0, stock: 2,
    dims: "Con fundas",
    name: { es: "Veneciana con Fundas", en: "Venetian with Shades", pt: "Veneziana com Cúpulas" },
    desc: {
      es: "Araña veneciana con caireles de cristal y fundas blancas.",
      en: "Venetian chandelier with crystal drops and white shades.",
      pt: "Lustre veneziano com pingentes de cristal e cúpulas brancas."
    }
  },
  {
    id: "veneciana-cromo", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/veneciana-cromo-1.webp", "assets/img/products/veneciana-cromo-2.webp"], price: 0, montaje: 0, stock: 2,
    dims: "Tubos cromados",
    name: { es: "Veneciana Cromada", en: "Chrome Venetian", pt: "Veneziana Cromada" },
    desc: {
      es: "Araña veneciana con tubos cromados y caireles de cristal.",
      en: "Venetian chandelier with chrome tubes and crystal drops.",
      pt: "Lustre veneziano com tubos cromados e pingentes de cristal."
    }
  },
  {
    id: "veneciana-vidrio", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/veneciana-vidrio.webp"], price: 0, montaje: 0, stock: 2,
    dims: "Vidrio clásico",
    name: { es: "Veneciana de Vidrio", en: "Glass Venetian", pt: "Veneziana de Vidro" },
    desc: {
      es: "Araña veneciana clásica en vidrio con caireles de cristal.",
      en: "Classic glass Venetian chandelier with crystal drops.",
      pt: "Lustre veneziano clássico em vidro com pingentes de cristal."
    }
  },
  {
    id: "candelabro-cristal", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/candelabro-cristal.webp"], price: 0, montaje: 0, stock: 2,
    dims: "De pie · cristal",
    name: { es: "Candelabro de Cristal", en: "Crystal Candelabra", pt: "Candelabro de Cristal" },
    desc: {
      es: "Candelabro de pie en cristal veneciano con tulipas.",
      en: "Floor candelabra in Venetian glass with tulip cups.",
      pt: "Candelabro de piso em vidro veneziano com tulipas."
    }
  },
  {
    id: "cadenas-cascada", cat: "iluminacion", sub: "cadenas",
    imgs: ["assets/img/products/cadenas-cascada.webp"], price: 0, montaje: 0, stock: 4,
    dims: "En cascada",
    name: { es: "Cadenas en Cascada", en: "Cascade Chains", pt: "Correntes em Cascata" },
    desc: {
      es: "Araña de cadenas de aluminio en cascada, diseño contemporáneo.",
      en: "Cascading aluminium chain chandelier, contemporary design.",
      pt: "Lustre de correntes de alumínio em cascata, design contemporâneo."
    }
  },
  {
    id: "jaula-chica", cat: "iluminacion", sub: "rusticas",
    imgs: ["assets/img/products/jaula-chica.webp"], price: 0, montaje: 0, stock: 6,
    dims: "Jaula · chica",
    name: { es: "Jaula Chica", en: "Small Cage", pt: "Gaiola Pequena" },
    desc: {
      es: "Araña jaula de estructura metálica, líneas modernas.",
      en: "Cage chandelier with a modern metal structure.",
      pt: "Lustre gaiola com estrutura metálica de linhas modernas."
    }
  },
  {
    id: "jaula-grande", cat: "iluminacion", sub: "rusticas",
    imgs: ["assets/img/products/jaula-grande.webp"], price: 0, montaje: 0, stock: 6,
    dims: "Jaula · grande",
    name: { es: "Jaula Grande", en: "Large Cage", pt: "Gaiola Grande" },
    desc: {
      es: "Araña jaula grande de estructura metálica, líneas modernas.",
      en: "Large cage chandelier with a modern metal structure.",
      pt: "Lustre gaiola grande com estrutura metálica de linhas modernas."
    }
  },

  /* ------------------------ ENERGÍA · Generadores CAT® ------------------- */
  {
    id: "generador-de165", cat: "energia", sub: "generadores",
    imgs: ["assets/img/products/generador-de165-1.webp", "assets/img/products/generador-de165-2.webp"],
    price: 0, montaje: 0, stock: 1,
    dims: "165 kVA · diésel · insonorizado",
    name: { es: "Generador CAT® DE165 GC", en: "CAT® DE165 GC Generator", pt: "Gerador CAT® DE165 GC" },
    desc: {
      es: "Potencia y confiabilidad para eventos de gran escala y alta demanda. 165 kVA / 132 kW, diésel, cabina insonorizada, montado sobre remolque y conexiones industriales.",
      en: "Power and reliability for large-scale, high-demand events. 165 kVA / 132 kW, diesel, soundproof canopy, trailer-mounted with industrial connections.",
      pt: "Potência e confiabilidade para eventos de grande porte e alta demanda. 165 kVA / 132 kW, diesel, cabine à prova de som, montado sobre reboque e conexões industriais."
    }
  },
  {
    id: "generador-de65", cat: "energia", sub: "generadores",
    imgs: ["assets/img/products/generador-de65-1.webp"],
    price: 0, montaje: 0, stock: 1,
    dims: "65 kVA · diésel · insonorizado",
    name: { es: "Generador CAT® DE65 GC", en: "CAT® DE65 GC Generator", pt: "Gerador CAT® DE65 GC" },
    desc: {
      es: "Solución compacta y eficiente para eventos medianos. 65 kVA, diésel, cabina insonorizada, montado sobre remolque y conexiones industriales.",
      en: "Compact, efficient solution for mid-size events. 65 kVA, diesel, soundproof canopy, trailer-mounted with industrial connections.",
      pt: "Solução compacta e eficiente para eventos médios. 65 kVA, diesel, cabine à prova de som, montado sobre reboque e conexões industriais."
    }
  }
];
