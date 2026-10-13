/**
 * Catálogo de ~50 productos navideños para Navidalia.
 *
 * Precios en centavos. Cada producto define su "precio de mercado" (mercado).
 *  - Productos gancho (gancho: true): se venden al 50% del mercado.
 *  - El resto: se venden al 80% del mercado (20% de descuento).
 * El precio de mercado se muestra tachado como precio anterior.
 *
 * Imágenes: Lorem Picsum con seed único (carga estable, foto distinta por
 * producto).
 */

export interface SeedProducto {
  slug: string;
  nombre: string;
  descripcion: string;
  precioCentavos: number;
  precioAnteriorCentavos: number;
  categoria: string;
  imagen: string;
  stock: number;
  gancho: boolean;
  destacado: boolean;
}

interface Entrada {
  slug: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  /** Precio de mercado en pesos (no centavos). */
  mercado: number;
  stock: number;
  gancho?: boolean;
  destacado?: boolean;
}

function img(slug: string): string {
  return `https://picsum.photos/seed/navidalia-${slug}/800/800`;
}

/** Construye el SeedProducto aplicando la regla de precios. */
function p(e: Entrada): SeedProducto {
  const factor = e.gancho ? 0.5 : 0.8;
  const precio = Math.round(e.mercado * factor);
  return {
    slug: e.slug,
    nombre: e.nombre,
    descripcion: e.descripcion,
    precioCentavos: precio * 100,
    precioAnteriorCentavos: e.mercado * 100,
    categoria: e.categoria,
    imagen: img(e.slug),
    stock: e.stock,
    gancho: e.gancho ?? false,
    destacado: e.destacado ?? false,
  };
}

const ENTRADAS: Entrada[] = [
  // ===================== GANCHO (10 productos al 50%) =====================
  {
    slug: "esfera-roja-set6",
    nombre: "Set de 6 Esferas Rojas",
    descripcion:
      "Set de 6 esferas navideñas rojas brillantes, irrompibles. ¡Precio de lanzamiento!",
    categoria: "esferas",
    mercado: 120,
    stock: 200,
    gancho: true,
    destacado: true,
  },
  {
    slug: "serie-luces-100-led",
    nombre: "Serie de 100 Luces LED Cálidas",
    descripcion:
      "Serie de 100 luces LED color cálido, 10 metros. Ideal para el árbol. ¡Oferta!",
    categoria: "luces",
    mercado: 180,
    stock: 150,
    gancho: true,
    destacado: true,
  },
  {
    slug: "gorro-santa",
    nombre: "Gorro de Santa Claus",
    descripcion:
      "Clásico gorro rojo de Santa con pompón blanco, felpa suave. ¡Súper precio!",
    categoria: "ropa",
    mercado: 90,
    stock: 300,
    gancho: true,
    destacado: true,
  },
  {
    slug: "calcetin-navideno",
    nombre: "Calcetín Navideño Decorativo",
    descripcion:
      "Calcetín para la chimenea, bordado con motivos navideños. ¡Precio gancho!",
    categoria: "decoracion",
    mercado: 100,
    stock: 250,
    gancho: true,
  },
  {
    slug: "mono-listones-oro",
    nombre: "Moños de Listón Dorado (12 pzas)",
    descripcion:
      "12 moños dorados autoadheribles para regalos y decoración. ¡Oferta!",
    categoria: "regalos",
    mercado: 80,
    stock: 220,
    gancho: true,
  },
  {
    slug: "estrella-arbol",
    nombre: "Estrella para la Punta del Árbol",
    descripcion:
      "Estrella dorada con luz LED para coronar tu árbol. ¡Precio especial!",
    categoria: "esferas",
    mercado: 150,
    stock: 180,
    gancho: true,
    destacado: true,
  },
  {
    slug: "paquete-esferas-24",
    nombre: "Paquete de 24 Mini Esferas",
    descripcion: "24 mini esferas surtidas en rojo, oro y verde. ¡Lanzamiento!",
    categoria: "esferas",
    mercado: 160,
    stock: 160,
    gancho: true,
  },
  {
    slug: "bastones-dulce-12",
    nombre: "Bastones de Dulce (12 pzas)",
    descripcion:
      "12 bastones de caramelo de menta, clásicos de Navidad. ¡Oferta!",
    categoria: "dulces",
    mercado: 70,
    stock: 400,
    gancho: true,
  },
  {
    slug: "guirnalda-pino-2m",
    nombre: "Guirnalda de Pino Artificial 2m",
    descripcion:
      "Guirnalda verde de 2 metros para escaleras y puertas. ¡Precio gancho!",
    categoria: "decoracion",
    mercado: 200,
    stock: 140,
    gancho: true,
    destacado: true,
  },
  {
    slug: "tarjetas-navidad-20",
    nombre: "Tarjetas de Navidad (20 pzas)",
    descripcion:
      "20 tarjetas navideñas con sobres, diseños variados. ¡Súper oferta!",
    categoria: "regalos",
    mercado: 60,
    stock: 350,
    gancho: true,
  },

  // ===================== ÁRBOLES =====================
  {
    slug: "arbol-150cm",
    nombre: "Árbol de Navidad 150 cm",
    descripcion: "Árbol artificial de 150 cm, frondoso, fácil de armar.",
    categoria: "arboles",
    mercado: 1200,
    stock: 40,
    destacado: true,
  },
  {
    slug: "arbol-180cm-nevado",
    nombre: "Árbol Nevado 180 cm",
    descripcion: "Árbol artificial de 180 cm con efecto nieve en las puntas.",
    categoria: "arboles",
    mercado: 1800,
    stock: 30,
    destacado: true,
  },
  {
    slug: "arbol-210cm-premium",
    nombre: "Árbol Premium 210 cm",
    descripcion:
      "Árbol artificial premium de 210 cm, ultra frondoso, base metálica.",
    categoria: "arboles",
    mercado: 2800,
    stock: 18,
  },
  {
    slug: "arbol-mesa-60cm",
    nombre: "Árbol de Mesa 60 cm",
    descripcion:
      "Mini árbol de 60 cm decorado, perfecto para escritorio o mesa.",
    categoria: "arboles",
    mercado: 450,
    stock: 80,
  },
  {
    slug: "arbol-blanco-150cm",
    nombre: "Árbol Blanco 150 cm",
    descripcion: "Árbol artificial blanco de 150 cm, elegante y moderno.",
    categoria: "arboles",
    mercado: 1500,
    stock: 25,
  },
  {
    slug: "arbol-conluces-180",
    nombre: "Árbol con Luces Integradas 180 cm",
    descripcion: "Árbol de 180 cm con 300 luces LED ya integradas.",
    categoria: "arboles",
    mercado: 2400,
    stock: 20,
    destacado: true,
  },

  // ===================== ESFERAS Y ADORNOS =====================
  {
    slug: "esferas-oro-set6",
    nombre: "Set de 6 Esferas Doradas",
    descripcion: "6 esferas doradas con acabado brillante y mate combinados.",
    categoria: "esferas",
    mercado: 140,
    stock: 120,
  },
  {
    slug: "esferas-cristal-set4",
    nombre: "Set de 4 Esferas de Cristal",
    descripcion: "4 esferas de cristal soplado a mano, decoración fina.",
    categoria: "esferas",
    mercado: 320,
    stock: 60,
  },
  {
    slug: "adornos-madera-set10",
    nombre: "Adornos de Madera (10 pzas)",
    descripcion: "10 figuras de madera natural: renos, estrellas y casitas.",
    categoria: "esferas",
    mercado: 180,
    stock: 90,
  },
  {
    slug: "esferas-personalizadas",
    nombre: "Esferas Personalizables (set 4)",
    descripcion: "4 esferas transparentes para rellenar y personalizar.",
    categoria: "esferas",
    mercado: 160,
    stock: 100,
  },
  {
    slug: "copos-nieve-set12",
    nombre: "Copos de Nieve Decorativos (12)",
    descripcion: "12 copos de nieve plateados para colgar en el árbol.",
    categoria: "esferas",
    mercado: 130,
    stock: 110,
  },
  {
    slug: "picos-decorativos-set6",
    nombre: "Picos Decorativos Dorados (6)",
    descripcion: "6 picos dorados y rojos para dar volumen al árbol.",
    categoria: "esferas",
    mercado: 150,
    stock: 85,
  },

  // ===================== LUCES Y SERIES =====================
  {
    slug: "serie-300-led",
    nombre: "Serie de 300 Luces LED",
    descripcion: "300 luces LED multicolor, 30 metros, 8 modos de parpadeo.",
    categoria: "luces",
    mercado: 450,
    stock: 100,
    destacado: true,
  },
  {
    slug: "cortina-luces-led",
    nombre: "Cortina de Luces LED 3x3m",
    descripcion: "Cortina de luces de 3x3 metros, ideal para ventanas.",
    categoria: "luces",
    mercado: 550,
    stock: 70,
  },
  {
    slug: "luces-exterior-impermeable",
    nombre: "Luces de Exterior Impermeables",
    descripcion: "Serie de 200 luces LED resistentes al agua para exteriores.",
    categoria: "luces",
    mercado: 480,
    stock: 65,
  },
  {
    slug: "proyector-laser-navidad",
    nombre: "Proyector Láser Navideño",
    descripcion: "Proyector de figuras navideñas para fachada, control remoto.",
    categoria: "luces",
    mercado: 890,
    stock: 35,
    destacado: true,
  },
  {
    slug: "velas-led-set6",
    nombre: "Velas LED sin Flama (6 pzas)",
    descripcion: "6 velas LED con parpadeo realista, a pilas, seguras.",
    categoria: "luces",
    mercado: 220,
    stock: 95,
  },
  {
    slug: "guirnalda-luces-pilas",
    nombre: "Guirnalda de Luces a Pilas 5m",
    descripcion: "Guirnalda de 50 luces micro LED a pilas, alambre moldeable.",
    categoria: "luces",
    mercado: 160,
    stock: 130,
  },

  // ===================== DECORACIÓN =====================
  {
    slug: "corona-puerta-50cm",
    nombre: "Corona de Puerta 50 cm",
    descripcion: "Corona navideña de 50 cm con piñas, moños y bayas rojas.",
    categoria: "decoracion",
    mercado: 420,
    stock: 75,
    destacado: true,
  },
  {
    slug: "nacimiento-11-piezas",
    nombre: "Nacimiento de 11 Piezas",
    descripcion: "Set de nacimiento con 11 figuras de resina pintadas a mano.",
    categoria: "decoracion",
    mercado: 650,
    stock: 40,
    destacado: true,
  },
  {
    slug: "santa-decorativo-40cm",
    nombre: "Santa Claus Decorativo 40 cm",
    descripcion: "Figura de Santa Claus de 40 cm, felpa y detalles finos.",
    categoria: "decoracion",
    mercado: 380,
    stock: 55,
  },
  {
    slug: "reno-luminoso",
    nombre: "Reno Luminoso de Jardín",
    descripcion: "Reno de alambre con luces LED para jardín o entrada.",
    categoria: "decoracion",
    mercado: 720,
    stock: 30,
  },
  {
    slug: "camino-mesa-navideno",
    nombre: "Camino de Mesa Navideño",
    descripcion: "Camino de mesa bordado con motivos navideños, 180 cm.",
    categoria: "decoracion",
    mercado: 240,
    stock: 85,
  },
  {
    slug: "funda-cojin-set2",
    nombre: "Fundas de Cojín Navideñas (2)",
    descripcion: "Par de fundas de cojín con diseños festivos, 45x45 cm.",
    categoria: "decoracion",
    mercado: 200,
    stock: 100,
  },
  {
    slug: "muerdago-decorativo",
    nombre: "Muérdago Decorativo",
    descripcion: "Ramo de muérdago artificial con moño rojo para colgar.",
    categoria: "decoracion",
    mercado: 90,
    stock: 150,
  },
  {
    slug: "tapete-puerta-navidad",
    nombre: "Tapete de Puerta Navideño",
    descripcion: "Tapete de entrada antiderrapante con diseño navideño.",
    categoria: "decoracion",
    mercado: 180,
    stock: 90,
  },

  // ===================== REGALOS =====================
  {
    slug: "papel-regalo-5rollos",
    nombre: "Papel de Regalo (5 rollos)",
    descripcion: "5 rollos de papel de regalo con diseños navideños surtidos.",
    categoria: "regalos",
    mercado: 150,
    stock: 200,
    destacado: true,
  },
  {
    slug: "cajas-regalo-set3",
    nombre: "Cajas de Regalo (set 3)",
    descripcion: "3 cajas de regalo decorativas de distintos tamaños.",
    categoria: "regalos",
    mercado: 180,
    stock: 120,
  },
  {
    slug: "bolsas-regalo-10",
    nombre: "Bolsas de Regalo (10 pzas)",
    descripcion: "10 bolsas de regalo con asas, diseños festivos.",
    categoria: "regalos",
    mercado: 130,
    stock: 180,
  },
  {
    slug: "calendario-adviento",
    nombre: "Calendario de Adviento",
    descripcion: "Calendario de adviento con 24 cajitas para sorpresas.",
    categoria: "regalos",
    mercado: 350,
    stock: 60,
    destacado: true,
  },
  {
    slug: "set-envoltura-completo",
    nombre: "Set de Envoltura Completo",
    descripcion: "Papel, listones, moños y etiquetas en un solo set.",
    categoria: "regalos",
    mercado: 280,
    stock: 90,
  },
  {
    slug: "etiquetas-regalo-30",
    nombre: "Etiquetas para Regalo (30)",
    descripcion: "30 etiquetas adhesivas para personalizar tus regalos.",
    categoria: "regalos",
    mercado: 50,
    stock: 300,
  },

  // ===================== ROPA NAVIDEÑA =====================
  {
    slug: "sueter-feo-navideno",
    nombre: "Suéter Navideño 'Feo'",
    descripcion:
      "El clásico 'ugly sweater' con reno y luces. ¡Diversión asegurada!",
    categoria: "ropa",
    mercado: 420,
    stock: 70,
    destacado: true,
  },
  {
    slug: "pijama-familiar-navidad",
    nombre: "Pijama Navideña Familiar",
    descripcion: "Pijama de franela con estampado navideño, varias tallas.",
    categoria: "ropa",
    mercado: 380,
    stock: 80,
  },
  {
    slug: "disfraz-santa-adulto",
    nombre: "Disfraz de Santa Claus (adulto)",
    descripcion: "Disfraz completo de Santa: traje, gorro, cinturón y barba.",
    categoria: "ropa",
    mercado: 650,
    stock: 40,
  },
  {
    slug: "orejeras-reno",
    nombre: "Orejeras de Reno",
    descripcion: "Diadema con orejas y cuernos de reno, felpa suave.",
    categoria: "ropa",
    mercado: 110,
    stock: 160,
  },
  {
    slug: "bufanda-navidena",
    nombre: "Bufanda Navideña Tejida",
    descripcion: "Bufanda tejida con motivos navideños, cálida y suave.",
    categoria: "ropa",
    mercado: 200,
    stock: 100,
  },
  {
    slug: "mandil-navideno",
    nombre: "Mandil Navideño",
    descripcion: "Mandil de cocina con diseño festivo, ideal para la cena.",
    categoria: "ropa",
    mercado: 160,
    stock: 120,
  },

  // ===================== DULCES Y REPOSTERÍA =====================
  {
    slug: "caja-chocolates-surtidos",
    nombre: "Caja de Chocolates Surtidos",
    descripcion: "Caja de 24 chocolates finos surtidos, edición navideña.",
    categoria: "dulces",
    mercado: 320,
    stock: 110,
    destacado: true,
  },
  {
    slug: "ponche-navideno-kit",
    nombre: "Kit para Ponche Navideño",
    descripcion: "Kit con frutas deshidratadas, canela y tejocote para ponche.",
    categoria: "dulces",
    mercado: 180,
    stock: 90,
  },
  {
    slug: "galletas-jengibre",
    nombre: "Galletas de Jengibre (12 pzas)",
    descripcion: "12 galletas de jengibre decoradas, caja de regalo.",
    categoria: "dulces",
    mercado: 150,
    stock: 130,
  },
  {
    slug: "molde-casa-jengibre",
    nombre: "Kit Casa de Jengibre",
    descripcion: "Kit para armar y decorar tu propia casita de jengibre.",
    categoria: "dulces",
    mercado: 250,
    stock: 70,
  },
  {
    slug: "chocolate-caliente-kit",
    nombre: "Kit de Chocolate Caliente",
    descripcion: "Chocolate, malvaviscos y canela para noches navideñas.",
    categoria: "dulces",
    mercado: 190,
    stock: 100,
  },
];

/** Catálogo completo listo para sembrar. */
export const CATALOGO_COMPLETO: SeedProducto[] = ENTRADAS.map(p);
