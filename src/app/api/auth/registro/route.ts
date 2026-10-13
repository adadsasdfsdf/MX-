import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { crearToken, guardarCookieSesion } from "@/lib/auth";

/**
 * Registro simplificado: solo nombre, correo y teléfono.
 * Para no pedir contraseña, se usa el TELÉFONO como contraseña inicial
 * (guardado con hash). Así el cliente puede iniciar sesión luego con su
 * correo y su número de teléfono.
 */
const schema = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  telefono: z.string().regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos"),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 },
    );
  }
  const { nombre, email, telefono } = parsed.data;

  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con este correo" },
      { status: 409 },
    );
  }

  // El teléfono funciona como contraseña inicial.
  const hash = await bcrypt.hash(telefono, 10);
  const usuario = await prisma.usuario.create({
    data: { nombre, email, password: hash },
  });

  const token = await crearToken({
    userId: usuario.id,
    email: usuario.email,
    nombre: usuario.nombre,
    rol: usuario.rol,
  });
  guardarCookieSesion(token);

  return NextResponse.json({
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  });
}
