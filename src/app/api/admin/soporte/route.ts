import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Chat de soporte (lado admin). Protegido por el middleware.
 * - GET: lista todas las conversaciones con sus mensajes.
 * - POST: el admin responde a una conversación.
 */

export async function GET() {
  const conversaciones = await prisma.conversacionSoporte.findMany({
    orderBy: { actualizadoEn: "desc" },
    include: { mensajes: { orderBy: { creadoEn: "asc" } } },
  });
  return NextResponse.json({ conversaciones });
}

const postSchema = z.object({
  conversacionId: z.string(),
  texto: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Respuesta inválida" }, { status: 400 });
  }
  const { conversacionId, texto } = parsed.data;

  await prisma.mensajeSoporte.create({
    data: { conversacionId, de: "admin", texto },
  });
  await prisma.conversacionSoporte.update({
    where: { id: conversacionId },
    data: { atendida: true },
  });

  return NextResponse.json({ ok: true });
}
