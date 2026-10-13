import { prisma } from "./prisma";
import { costoEnvio } from "./mexico";
import { procesarPago } from "./pago";
import { z } from "zod";

export const checkoutSchema = z.object({
  nombreCliente: z.string().min(2),
  email: z.string().email(),
  telefono: z.string().min(10),
  calle: z.string().min(3),
  colonia: z.string().optional().default(""),
  codigoPostal: z.string().regex(/^\d{5}$/, "Código postal inválido"),
  ciudad: z.string().min(2),
  estado: z.string().min(2),
  metodoPago: z.enum(["tarjeta"]),
  // Datos NO sensibles de la tarjeta (opcionales).
  marcaTarjeta: z.string().max(20).optional(),
  ultimos4: z
    .string()
    .regex(/^\d{4}$/)
    .optional(),
  requiereFactura: z.boolean().optional().default(false),
  rfc: z.string().optional(),
  razonSocial: z.string().optional(),
  usoCfdi: z.string().optional(),
  items: z
    .array(
      z.object({
        productoId: z.string(),
        cantidad: z.number().int().positive(),
      }),
    )
    .min(1, "El carrito está vacío"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

/** Genera un código aleatorio de letras y números (sin caracteres confusos). */
function codigoAleatorio(longitud = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin 0/O ni 1/I
  let out = "";
  for (let i = 0; i < longitud; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

/** Número de pedido aleatorio (ej. NAV-7K3F9X2A), único en la base de datos. */
async function siguienteNumero(): Promise<string> {
  for (let intento = 0; intento < 10; intento++) {
    const numero = `NAV-${codigoAleatorio(8)}`;
    const existe = await prisma.pedido.findUnique({ where: { numero } });
    if (!existe) return numero;
  }
  // Fallback extremadamente improbable: añade timestamp.
  return `NAV-${codigoAleatorio(6)}${Date.now().toString(36).toUpperCase()}`;
}

export async function crearPedido(
  input: CheckoutInput,
  usuarioId: string | null,
) {
  const ids = input.items.map((i) => i.productoId);
  const productos = await prisma.producto.findMany({
    where: { id: { in: ids }, activo: true },
  });
  if (productos.length !== input.items.length) {
    throw new Error("Algún producto ya no está disponible");
  }

  let subtotalCentavos = 0;
  const itemsPedido = input.items.map((item) => {
    const producto = productos.find((pr) => pr.id === item.productoId)!;
    if (producto.stock < item.cantidad) {
      throw new Error(`Stock insuficiente de "${producto.nombre}"`);
    }
    subtotalCentavos += producto.precioCentavos * item.cantidad;
    return {
      productoId: producto.id,
      nombre: producto.nombre,
      precioCentavos: producto.precioCentavos,
      cantidad: item.cantidad,
    };
  });

  const envioCentavos = costoEnvio(subtotalCentavos / 100) * 100;
  const totalCentavos = subtotalCentavos + envioCentavos;
  const numero = await siguienteNumero();

  const pago = await procesarPago({
    numeroPedido: numero,
    totalCentavos,
    metodoPago: input.metodoPago,
    email: input.email,
    descripcion: `Pedido ${numero} · Navidalia`,
  });

  const pedido = await prisma.$transaction(async (tx) => {
    const nuevo = await tx.pedido.create({
      data: {
        numero,
        usuarioId,
        nombreCliente: input.nombreCliente,
        email: input.email,
        telefono: input.telefono,
        calle: input.calle,
        colonia: input.colonia || null,
        codigoPostal: input.codigoPostal,
        ciudad: input.ciudad,
        estado: input.estado,
        subtotalCentavos,
        envioCentavos,
        totalCentavos,
        metodoPago: input.metodoPago,
        estadoPago: pago.estado,
        referenciaPago: pago.referencia,
        marcaTarjeta: input.marcaTarjeta || null,
        ultimos4: input.ultimos4 || null,
        requiereFactura: input.requiereFactura ?? false,
        rfc: input.rfc || null,
        razonSocial: input.razonSocial || null,
        usoCfdi: input.usoCfdi || null,
        items: { create: itemsPedido },
      },
      include: { items: true },
    });
    for (const item of input.items) {
      await tx.producto.update({
        where: { id: item.productoId },
        data: { stock: { decrement: item.cantidad } },
      });
    }
    return nuevo;
  });

  return { pedido, urlPago: pago.urlPago };
}
