/**
 * Capa de pago (Mercado Pago). Modo simulado por defecto (MP_MOCK=true).
 */

export interface DatosPago {
  numeroPedido: string;
  totalCentavos: number;
  metodoPago: string;
  email: string;
  descripcion: string;
}

export interface ResultadoPago {
  urlPago: string | null;
  referencia: string;
  estado: "pendiente" | "pagado";
}

const esMock = process.env.MP_MOCK !== "false";

function referenciaSimulada(metodo: string): string {
  const rand = Math.random().toString(36).slice(2, 10).toUpperCase();
  return metodo === "spei" ? `CLABE-${rand}` : `MP-${rand}`;
}

export async function procesarPago(datos: DatosPago): Promise<ResultadoPago> {
  if (esMock) {
    const pendiente = datos.metodoPago === "spei";
    return {
      urlPago: null,
      referencia: referenciaSimulada(datos.metodoPago),
      estado: pendiente ? "pendiente" : "pagado",
    };
  }

  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error(
      "MP_ACCESS_TOKEN no configurado. Pon MP_MOCK=true o agrega tu token.",
    );
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      items: [
        {
          title: datos.descripcion,
          quantity: 1,
          unit_price: datos.totalCentavos / 100,
          currency_id: "MXN",
        },
      ],
      payer: { email: datos.email },
      external_reference: datos.numeroPedido,
      back_urls: {
        success: `${siteUrl}/pedido/${datos.numeroPedido}`,
        failure: `${siteUrl}/checkout`,
        pending: `${siteUrl}/pedido/${datos.numeroPedido}`,
      },
      auto_return: "approved",
    }),
  });

  if (!res.ok) throw new Error(`Error de Mercado Pago: ${await res.text()}`);
  const pref = (await res.json()) as { id: string; init_point: string };
  return { urlPago: pref.init_point, referencia: pref.id, estado: "pendiente" };
}
