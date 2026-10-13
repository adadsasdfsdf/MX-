/**
 * Generador de reseñas simuladas (10-30 por producto, deterministas por slug).
 * Comentarios en español mexicano con contexto navideño.
 */

const NOMBRES = [
  "María G.",
  "José L.",
  "Guadalupe R.",
  "Juan C.",
  "Alejandra M.",
  "Luis F.",
  "Fernanda S.",
  "Carlos H.",
  "Ana P.",
  "Miguel Á.",
  "Sofía V.",
  "Ricardo T.",
  "Daniela O.",
  "Jorge E.",
  "Paola N.",
  "Roberto D.",
  "Gabriela C.",
  "Francisco J.",
  "Mariana L.",
  "Eduardo R.",
  "Patricia M.",
  "Andrés G.",
  "Verónica S.",
  "Héctor P.",
  "Lucía F.",
  "Raúl M.",
  "Claudia B.",
  "Óscar V.",
  "Diana R.",
  "Sergio A.",
  "Rosa E.",
  "Manuel T.",
  "Karla D.",
  "Alberto N.",
  "Brenda C.",
];

const POS = [
  "¡Quedó precioso en mi casa! Llegó a tiempo para decorar. Muy recomendado.",
  "Excelente calidad y mejor precio que en otras tiendas. Volveré a comprar.",
  "Perfecto para la temporada. Mis hijos quedaron encantados. 🎄",
  "Llegó bien empacado y antes de lo esperado. Súper contenta.",
  "Se ve igual que en la foto, muy bonito. Ideal para la cena navideña.",
  "Buenísima compra, le dio un toque mágico a mi árbol.",
  "Gran relación calidad-precio. Lo compré con descuento y valió la pena.",
  "Material resistente y colores vivos. Quedé muy satisfecho.",
  "Lo compré de regalo y le fascinó. Entrega rápida a toda la República.",
  "Hermoso detalle navideño. Ya quiero que llegue diciembre para usarlo más.",
  "Calidad premium, superó mis expectativas. ¡Felices fiestas!",
  "Decoré toda la sala con esto y quedó espectacular. Recomendadísimo.",
];

const NEU = [
  "Bonito, aunque esperaba que fuera un poco más grande. Cumple su función.",
  "Buen producto, el envío tardó un poco pero llegó en buen estado.",
  "Está bien por el precio. Nada extraordinario pero sirve para decorar.",
  "El color es ligeramente distinto a la foto, pero igual se ve bien.",
];

const BAJO = [
  "El empaque llegó algo maltratado, aunque el producto estaba bien.",
  "Tardó más de lo esperado en llegar. El producto es aceptable.",
];

export interface ResenaSeed {
  autor: string;
  calificacion: number;
  comentario: string;
  verificada: boolean;
  diasAtras: number;
}

function prng(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function generarResenas(slug: string): ResenaSeed[] {
  const rnd = prng(hash(slug));
  const total = 10 + Math.floor(rnd() * 21);
  const resenas: ResenaSeed[] = [];
  const usados = new Set<string>();

  for (let i = 0; i < total; i++) {
    const r = rnd();
    let calificacion: number;
    let comentario: string;
    if (r < 0.75) {
      calificacion = 5;
      comentario = POS[Math.floor(rnd() * POS.length)];
    } else if (r < 0.9) {
      calificacion = 4;
      comentario = POS[Math.floor(rnd() * POS.length)];
    } else if (r < 0.97) {
      calificacion = 3;
      comentario = NEU[Math.floor(rnd() * NEU.length)];
    } else {
      calificacion = 2;
      comentario = BAJO[Math.floor(rnd() * BAJO.length)];
    }

    let autor = NOMBRES[Math.floor(rnd() * NOMBRES.length)];
    let intentos = 0;
    while (usados.has(autor) && intentos < NOMBRES.length) {
      autor = NOMBRES[Math.floor(rnd() * NOMBRES.length)];
      intentos++;
    }
    usados.add(autor);

    resenas.push({
      autor,
      calificacion,
      comentario,
      verificada: rnd() > 0.1,
      diasAtras: Math.floor(rnd() * 120),
    });
  }
  return resenas;
}
