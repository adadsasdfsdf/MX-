import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { CATALOGO_COMPLETO } from "../../../../prisma/productos";
import { generarResenas } from "../../../../prisma/resenas";

/**
 * Siembra/actualiza el catálogo tras el despliegue (upsert por slug).
 * Visita /api/seed?token=TU_SEED_TOKEN
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");
  if (!process.env.SEED_TOKEN || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  // ?resenas=regenerar fuerza recrear todas las reseñas con la nueva cantidad.
  const regenerarResenas = url.searchParams.get("resenas") === "regenerar";

  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.usuario.upsert({
    where: { email: "admin@navidalia.mx" },
    update: {},
    create: {
      nombre: "Administrador",
      email: "admin@navidalia.mx",
      password: adminPassword,
      rol: "admin",
    },
  });
  const clientePassword = await bcrypt.hash("cliente123", 10);
  await prisma.usuario.upsert({
    where: { email: "cliente@ejemplo.mx" },
    update: {},
    create: {
      nombre: "Noel Reyes",
      email: "cliente@ejemplo.mx",
      password: clientePassword,
      rol: "cliente",
    },
  });

  let creados = 0;
  let actualizados = 0;
  let totalResenas = 0;
  for (const prod of CATALOGO_COMPLETO) {
    const existente = await prisma.producto.findUnique({
      where: { slug: prod.slug },
    });
    const guardado = await prisma.producto.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
    if (existente) actualizados++;
    else creados++;

    const tiene = await prisma.resena.count({
      where: { productoId: guardado.id },
    });
    // Si se pide regenerar, borra las reseñas viejas para recrearlas.
    if (regenerarResenas && tiene > 0) {
      await prisma.resena.deleteMany({ where: { productoId: guardado.id } });
    }
    if (tiene === 0 || regenerarResenas) {
      const resenas = generarResenas(prod.slug, prod.gancho);
      await prisma.resena.createMany({
        data: resenas.map((r) => ({
          productoId: guardado.id,
          autor: r.autor,
          calificacion: r.calificacion,
          comentario: r.comentario,
          verificada: r.verificada,
          creadoEn: new Date(Date.now() - r.diasAtras * 86400000),
        })),
      });
      totalResenas += resenas.length;
    }
  }

  return NextResponse.json({
    ok: true,
    mensaje: `Catálogo sincronizado: ${creados} creados, ${actualizados} actualizados (total ${CATALOGO_COMPLETO.length}). Reseñas: ${totalResenas}.`,
    admin: "admin@navidalia.mx / admin123",
  });
}
