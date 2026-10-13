import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const CATS = [
  "arboles",
  "esferas",
  "luces",
  "decoracion",
  "regalos",
  "ropa",
  "dulces",
] as const;

const updateSchema = z.object({
  nombre: z.string().min(2).optional(),
  descripcion: z.string().min(5).optional(),
  precio: z.number().positive().optional(),
  precioAnterior: z.number().positive().nullable().optional(),
  categoria: z.enum(CATS).optional(),
  imagen: z.string().url().optional(),
  stock: z.number().int().nonnegative().optional(),
  gancho: z.boolean().optional(),
  destacado: z.boolean().optional(),
  activo: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 },
    );
  }
  const d = parsed.data;
  const data: Record<string, unknown> = {};
  if (d.nombre !== undefined) data.nombre = d.nombre;
  if (d.descripcion !== undefined) data.descripcion = d.descripcion;
  if (d.precio !== undefined) data.precioCentavos = Math.round(d.precio * 100);
  if (d.precioAnterior !== undefined)
    data.precioAnteriorCentavos = d.precioAnterior
      ? Math.round(d.precioAnterior * 100)
      : null;
  if (d.categoria !== undefined) data.categoria = d.categoria;
  if (d.imagen !== undefined) data.imagen = d.imagen;
  if (d.stock !== undefined) data.stock = d.stock;
  if (d.gancho !== undefined) data.gancho = d.gancho;
  if (d.destacado !== undefined) data.destacado = d.destacado;
  if (d.activo !== undefined) data.activo = d.activo;

  try {
    const producto = await prisma.producto.update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json({ producto });
  } catch {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.producto.update({
      where: { id: params.id },
      data: { activo: false },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }
}
