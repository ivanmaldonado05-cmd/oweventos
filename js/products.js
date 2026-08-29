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
  }
};

const PRODUCTS = [
  /* ------------------------ CLIMATIZACIÓN · Ventiladores ------------------ */
  {
    id: "ventilador-de-pie", cat: "climatizacion", sub: "ventiladores",
    imgs: ["assets/img/products/placeholder-fan.webp"], price: 220000, montaje: 0, stock: 40,
    dims: "30\" · 3 vel.",
    name: { es: "Ventilador de Pie", en: "Standing Fan", pt: "Ventilador de Pé" },
    desc: {
      es: "Cuatro aspas de 30 pulgadas, tres velocidades, función oscilante y altura regulable.",
      en: "Four 30-inch blades, three speeds, oscillating function and adjustable height.",
      pt: "Quatro pás de 30 polegadas, três velocidades, função oscilante e altura regulável."
    }
  },
  {
    id: "ventilador-apilable", cat: "climatizacion", sub: "ventiladores",
    imgs: ["assets/img/products/placeholder-fan.webp"], price: 310000, montaje: 0, stock: 50,
    dims: "Ø 50 cm",
    name: { es: "Ventilador Apilable", en: "Stackable Fan", pt: "Ventilador Empilhável" },
    desc: {
      es: "Ventilador de pista de dos velocidades, apilable y direccional. 50 cm de diámetro.",
      en: "Two-speed track fan, stackable and directional. 50 cm diameter.",
      pt: "Ventilador de pista de duas velocidades, empilhável e direcional. 50 cm de diâmetro."
    }
  },
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
  {
    id: "ventilador-humidificador", cat: "climatizacion", sub: "ventiladores",
    imgs: ["assets/img/products/placeholder-fan.webp"], price: 330000, montaje: 0, stock: 2,
    dims: "Tanque 36 L · 25 m²",
    name: { es: "Ventilador con Humidificador", en: "Misting Fan", pt: "Ventilador com Umidificador" },
    desc: {
      es: "Pedestal con humidificador de tres velocidades. Tanque de 36 L y alcance de 25 m².",
      en: "Pedestal with three-speed humidifier. 36 L tank and 25 m² reach.",
      pt: "Pedestal com umidificador de três velocidades. Tanque de 36 L e alcance de 25 m²."
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
    imgs: ["assets/img/products/piramide-cromada-1.webp"], price: 500000, montaje: 150000, stock: 4,
    dims: "0,80 × 0,60 m · 12 focos",
    name: { es: "Pirámide Cromada", en: "Chrome Pyramid", pt: "Pirâmide Cromada" },
    desc: {
      es: "Pirámide de cristal con estructura cromada y cristales transparentes. 12 focos.",
      en: "Crystal pyramid with chrome structure and clear crystals. 12 lights.",
      pt: "Pirâmide de cristal com estrutura cromada e cristais transparentes. 12 focos."
    }
  },
  {
    id: "piramide-dorada", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/piramide-dorada-1.webp"], price: 500000, montaje: 150000, stock: 4,
    dims: "0,80 × 0,60 m · 12 focos",
    name: { es: "Pirámide Dorada", en: "Gold Pyramid", pt: "Pirâmide Dourada" },
    desc: {
      es: "Pirámide de cristal con estructura dorada clara y cristales transparentes. 12 focos.",
      en: "Crystal pyramid with light-gold structure and clear crystals. 12 lights.",
      pt: "Pirâmide de cristal com estrutura dourada clara e cristais transparentes. 12 focos."
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
  {
    id: "cristal-y-plata", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/cristal-y-plata-1.webp", "assets/img/products/cristal-y-plata-2.webp"], price: 1500000, montaje: 250000, stock: 2,
    dims: "1,60 × 1,50 m · 40 kg",
    name: { es: "Cristal y Plata", en: "Crystal & Silver", pt: "Cristal e Prata" },
    desc: {
      es: "Imponente araña de cristal y plata para eventos de gran escala.",
      en: "Striking crystal-and-silver chandelier for large-scale events.",
      pt: "Imponente lustre de cristal e prata para eventos de grande porte."
    }
  },
  {
    id: "cristal-cromada", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/cristal-cromada-1.webp"], price: 1500000, montaje: 250000, stock: 2,
    dims: "2 × 1,20 m · 40 kg",
    name: { es: "Cristal Cromada", en: "Chrome Crystal", pt: "Cristal Cromada" },
    desc: {
      es: "Araña de cristal grande con estructura cromada. Presencia monumental.",
      en: "Large crystal chandelier with chrome structure. Monumental presence.",
      pt: "Lustre de cristal grande com estrutura cromada. Presença monumental."
    }
  },
  {
    id: "candelabro-de-cristal", cat: "iluminacion", sub: "cristal",
    imgs: ["assets/img/products/candelabro-de-cristal-1.webp"], price: 250000, montaje: 0, stock: 6,
    dims: "1,30 × 0,60 m · 5 brazos",
    name: { es: "Candelabro de Cristal", en: "Crystal Candelabra", pt: "Candelabro de Cristal" },
    desc: {
      es: "Candelabro de mesa con velas y 5 brazos con tulipas de cristal. Sin costo de montaje.",
      en: "Table candelabra with candles and 5 arms with crystal cups. No assembly fee.",
      pt: "Candelabro de mesa com velas e 5 braços com cúpulas de cristal. Sem custo de montagem."
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
    id: "redondas-medianas", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/redondas-medianas-1.webp"], price: 385000, montaje: 50000, stock: 20,
    dims: "Ø 40 cm",
    name: { es: "Redonda Mediana", en: "Medium Round", pt: "Redonda Média" },
    desc: {
      es: "Araña mediana redonda color bronce con caireles transparentes.",
      en: "Medium round bronze chandelier with clear crystal drops.",
      pt: "Lustre médio redondo cor bronze com pingentes transparentes."
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
    id: "imperial", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/imperial-1.webp", "assets/img/products/imperial-2.webp"], price: 1100000, montaje: 200000, stock: 6,
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
    id: "bronce-pajaros", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/bronce-pajaros-1.webp"], price: 550000, montaje: 100000, stock: 1,
    dims: "0,75 × 1 m · 18 brazos",
    name: { es: "Bronce con Pájaros", en: "Bronze with Birds", pt: "Bronze com Pássaros" },
    desc: {
      es: "Araña de bronce con pajaritos y 18 brazos. Pieza única.",
      en: "Bronze chandelier with little birds and 18 arms. One-of-a-kind piece.",
      pt: "Lustre de bronze com passarinhos e 18 braços. Peça única."
    }
  },
  {
    id: "clementina", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/clementina-1.webp", "assets/img/products/clementina-2.webp"], price: 1100000, montaje: 150000, stock: 4,
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
    id: "bronce-24-brazos", cat: "iluminacion", sub: "bronce",
    imgs: ["assets/img/products/bronce-24-brazos-1.webp"], price: 1000000, montaje: 200000, stock: 8,
    dims: "1,60 × 0,80 m · 30 kg",
    name: { es: "Bronce 24 Brazos", en: "Bronze 24 Arms", pt: "Bronze 24 Braços" },
    desc: {
      es: "Araña de bronce con caireles de cristal y 24 brazos.",
      en: "Bronze chandelier with crystal drops and 24 arms.",
      pt: "Lustre de bronze com pingentes de cristal e 24 braços."
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
    id: "jaula-mediana", cat: "iluminacion", sub: "rusticas",
    imgs: ["assets/img/products/jaula-mediana-1.webp"], price: 220000, montaje: 50000, stock: 10,
    dims: "0,80 × 0,32 m",
    name: { es: "Jaula Mediana", en: "Medium Cage", pt: "Gaiola Média" },
    desc: {
      es: "Araña tipo jaula mediana de metal color champagne.",
      en: "Medium cage-style chandelier in champagne-tone metal.",
      pt: "Lustre tipo gaiola médio de metal cor champagne."
    }
  },
  {
    id: "jaula-grande", cat: "iluminacion", sub: "rusticas",
    imgs: ["assets/img/products/jaula-grande-1.webp"], price: 330000, montaje: 50000, stock: 10,
    dims: "1,20 × 0,47 m · 10 kg",
    name: { es: "Jaula Grande", en: "Large Cage", pt: "Gaiola Grande" },
    desc: {
      es: "Araña tipo jaula grande de metal color champagne.",
      en: "Large cage-style chandelier in champagne-tone metal.",
      pt: "Lustre tipo gaiola grande de metal cor champagne."
    }
  },
  {
    id: "nautica-beige", cat: "iluminacion", sub: "rusticas",
    imgs: ["assets/img/products/nautica-beige-1.webp", "assets/img/products/nautica-beige-2.webp"], price: 250000, montaje: 50000, stock: 10,
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
  }
];
