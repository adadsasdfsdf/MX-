/**
 * Utilidades de localización para el mercado mexicano 🇲🇽
 * Moneda: Peso mexicano (MXN) · IVA 16%
 */

export const IVA_RATE = 0.16;
export const FREE_SHIPPING_THRESHOLD = 799;
export const STANDARD_SHIPPING_COST = 99;

/** Formatea un número como precio en pesos mexicanos. */
export function formatMXN(amount: number): string {
  // Formatea el número y antepone "MX$" + sufijo " MXN" para dejar claro que
  // son pesos mexicanos (y no dólares), ya que el símbolo "$" es compartido.
  const numero = new Intl.NumberFormat("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `MX$${numero} MXN`;
}

/** IVA incluido en un precio que ya lo contiene. */
export function ivaIncluido(precioConIva: number): number {
  const base = precioConIva / (1 + IVA_RATE);
  return precioConIva - base;
}

/** Costo de envío según el subtotal. */
export function costoEnvio(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST;
}

/** Formatea una fecha al estilo mexicano. */
export function formatFecha(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-MX", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Valida un código postal mexicano (5 dígitos). */
export function esCodigoPostalValido(cp: string): boolean {
  return /^\d{5}$/.test(cp.trim());
}

/** Métodos de pago (sin OXXO). */
export const METODOS_PAGO = [
  {
    id: "tarjeta",
    nombre: "Tarjeta de crédito/débito",
    descripcion: "Visa, Mastercard, American Express",
  },
  {
    id: "spei",
    nombre: "Transferencia SPEI",
    descripcion: "Transferencia bancaria interbancaria",
  },
  {
    id: "mercadopago",
    nombre: "Mercado Pago",
    descripcion: "Paga con tu saldo o meses sin intereses",
  },
] as const;

/** Los 32 estados de la República Mexicana. */
export const ESTADOS_MEXICO = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
] as const;
