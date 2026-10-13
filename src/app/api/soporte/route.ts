import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

/**
 * Chat de soporte (lado visitante).
 * - POST: envía un mensaje. Si no hay conversacionId, crea una conversación
 *   nueva y la devuelve.
 * - GET ?id=...: devuelve los mensajes de una conversación (para que el
 *   visitante vea las respuestas del admin).
 */

const postSchema = z.object({
  conversacionId: z.string().optional(),
  texto: z.string().min(1).max(2000),
  nombre: z.string().max(120).optional(),
  email: z.string().email().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Mensaje inválido" }, { status: 400 });
  }
  const { conversacionId, texto, nombre, email } = parsed.data;

  let convId = conversacionId;
  if (!convId) {
    const conv = await prisma.conversacionSoporte.create({
      data: { nombre: nombre || null, email: email || null },
    });
    convId = conv.id;
  }

  await prisma.mensajeSoporte.create({
    data: { conversacionId: convId, de: "cliente", texto },
  });
  // El cliente escribió: la conversación necesita atención.
  await prisma.conversacionSoporte.update({
    where: { id: convId },
    data: { atendida: false },
  });

  return NextResponse.json({ conversacionId: convId });
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ mensajes: [] });

  const mensajes = await prisma.mensajeSoporte.findMany({
    where: { conversacionId: id },
    orderBy: { creadoEn: "asc" },
  });
  return NextResponse.json({
    mensajes: mensajes.map((m: { id: string; de: string; texto: string }) => ({
      id: m.id,
      de: m.de,
      texto: m.texto,
    })),
  });
}
