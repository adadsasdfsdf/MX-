import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { crearToken, guardarCookieSesion } from "@/lib/auth";

/**
 * Registro: nombre, correo, teléfono y contraseña.
 * La contraseña se guarda con hash (bcrypt). El teléfono es opcional como
 * dato de contacto.
 */
const schema = z.object({
  nombre: z.string().min(2, "El nombre es muy corto"),
  email: z.string().email("Correo inválido"),
  telefono: z
    .string()
    .regex(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
    .optional()
    .or(z.literal("")),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
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
  const { nombre, email, password } = parsed.data;

  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con este correo" },
      { status: 409 },
    );
  }

  const hash = await bcrypt.hash(password, 10);
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
