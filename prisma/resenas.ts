/**
 * Generador de reseñas simuladas (deterministas por slug).
 * - Productos gancho (50%): entre 80 y 150 reseñas (son los más vendidos).
 * - Resto: entre 30 y 90 reseñas.
 * Comentarios en español mexicano, variados y con contexto navideño real.
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
  "Diego R.",
  "Laura T.",
  "Pablo M.",
  "Adriana V.",
  "Fernando C.",
  "Elena S.",
  "Javier O.",
  "Mónica P.",
  "Arturo L.",
  "Isabel G.",
  "Rodrigo H.",
  "Carmen D.",
  "Emilio R.",
  "Valeria N.",
  "Tomás B.",
  "Ximena C.",
  "Gerardo V.",
  "Natalia F.",
  "Iván M.",
  "Regina S.",
  "Ernesto P.",
  "Alma R.",
  "Beto G.",
  "Cecilia H.",
  "Marcos T.",
];

// Comentarios positivos (5 y 4 estrellas) — la gran mayoría.
const POS = [
  "¡Quedó precioso en mi sala! Le dio un ambiente súper navideño a la casa.",
  "Mejor de lo que esperaba por el precio. La calidad me sorprendió.",
  "Llegó rápido y bien empacado, antes de lo que decía. Muy recomendable.",
  "Mis hijos quedaron encantados cuando lo vieron. ¡Pura magia navideña! 🎄",
  "Se ve idéntico a las fotos. Lo compré para la cena de Nochebuena y fue un éxito.",
  "Excelente para la temporada. Lo volvería a comprar sin dudarlo.",
  "Material resistente y colores muy vivos. Se nota la buena calidad.",
  "Lo compré de regalo para mi mamá y le fascinó. Entrega puntual.",
  "A ese precio es un regalazo. Ya pedí otro para mi oficina.",
  "Perfecto para decorar. Combina muy bien con el resto de mis adornos.",
  "Compra confiable, llegó en perfecto estado y con factura sin problema.",
  "Nos encantó para la posada. Todos preguntaron dónde lo compré.",
  "Súper bonito y de buen tamaño. Vale cada peso que pagué.",
  "La verdad superó mis expectativas. Empaque navideño muy lindo.",
  "Ideal para el intercambio navideño. Quedé como reina con el regalo. 🎁",
  "Calidad premium, parece de tienda mucho más cara. Encantada.",
  "Decoré todo el árbol con esto y quedó espectacular, muy brillante.",
  "Buen producto, mi esposa quedó feliz. Volveremos a comprar aquí.",
  "Rapidísimo el envío a provincia. El producto tal cual lo pedí.",
  "Me ayudó muchísimo a dejar la casa lista para las fiestas. 10/10.",
  "El detalle y los acabados están muy bien hechos. Se ve elegante.",
  "Compré varios para regalar y todos quedaron contentos. Buen precio.",
  "Justo lo que buscaba para esta Navidad. Llegó a tiempo, sin broncas.",
  "Muy buena atención y seguimiento del pedido. El producto, excelente.",
  "Lo prendí/armé y funcionó perfecto a la primera. Recomendado.",
];

// Comentarios neutros (3 estrellas).
const NEU = [
  "Bonito, aunque lo esperaba un poco más grande. Igual cumple para decorar.",
  "Buen producto, pero el envío tardó un par de días más de lo indicado.",
  "Está bien por el precio. Nada del otro mundo, pero sirve.",
  "El color es un poco distinto al de la foto, aun así se ve decente.",
  "Cumple su función. El empaque pudo venir mejor protegido.",
  "Normalito. Para el precio está aceptable, no esperaba más.",
];

// Comentarios de baja calificación (2 estrellas) — pocos.
const BAJO = [
  "Llegó con el empaque algo maltratado, aunque el producto estaba bien.",
  "Tardó más de lo esperado en llegar. El producto es apenas aceptable.",
  "Esperaba mejor calidad por las fotos. Cumple lo justo.",
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

/**
 * Genera reseñas deterministas para un producto.
 * @param slug identificador del producto (semilla)
 * @param esGancho si es producto gancho (al 50%): genera muchas más reseñas
 */
export function generarResenas(slug: string, esGancho = false): ResenaSeed[] {
  const rnd = prng(hash(slug));
  // Gancho: 80-150 reseñas. Normal: 30-90.
  const total = esGancho
    ? 80 + Math.floor(rnd() * 71)
    : 30 + Math.floor(rnd() * 61);

  const resenas: ResenaSeed[] = [];
  for (let i = 0; i < total; i++) {
    const r = rnd();
    let calificacion: number;
    let comentario: string;
    if (r < 0.78) {
      calificacion = 5;
      comentario = POS[Math.floor(rnd() * POS.length)];
    } else if (r < 0.92) {
      calificacion = 4;
      comentario = POS[Math.floor(rnd() * POS.length)];
    } else if (r < 0.98) {
      calificacion = 3;
      comentario = NEU[Math.floor(rnd() * NEU.length)];
    } else {
      calificacion = 2;
      comentario = BAJO[Math.floor(rnd() * BAJO.length)];
    }

    // Autor: nombre base, repitiendo con inicial distinta si hace falta
    // (hay muchas más reseñas que nombres, así que se permiten repeticiones
    // con una letra para que parezcan personas distintas).
    const base = NOMBRES[Math.floor(rnd() * NOMBRES.length)];
    const letra = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(rnd() * 26)];
    const autor = i < NOMBRES.length ? base : base.replace(/\.$/, letra + ".");

    resenas.push({
      autor,
      calificacion,
      comentario,
      verificada: rnd() > 0.08,
      diasAtras: Math.floor(rnd() * 150),
    });
  }
  return resenas;
}
