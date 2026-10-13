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

const productoSchema = z.object({
  nombre: z.string().min(2),
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Slug inválido"),
  descripcion: z.string().min(5),
  precio: z.number().positive(),
  precioAnterior: z.number().positive().optional().nullable(),
  categoria: z.enum(CATS),
  imagen: z.string().url(),
  stock: z.number().int().nonnegative(),
  gancho: z.boolean().optional().default(false),
  destacado: z.boolean().optional().default(false),
});

export async function GET() {
  const productos = await prisma.producto.findMany({
    orderBy: { creadoEn: "desc" },
  });
  return NextResponse.json({ productos });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = productoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 },
    );
  }
  const d = parsed.data;
  const existente = await prisma.producto.findUnique({
    where: { slug: d.slug },
  });
  if (existente) {
    return NextResponse.json(
      { error: "Ya existe un producto con ese slug" },
      { status: 409 },
    );
  }
  const producto = await prisma.producto.create({
    data: {
      nombre: d.nombre,
      slug: d.slug,
      descripcion: d.descripcion,
      precioCentavos: Math.round(d.precio * 100),
      precioAnteriorCentavos: d.precioAnterior
        ? Math.round(d.precioAnterior * 100)
        : null,
      categoria: d.categoria,
      imagen: d.imagen,
      stock: d.stock,
      gancho: d.gancho ?? false,
      destacado: d.destacado ?? false,
    },
  });
  return NextResponse.json({ producto });
}
