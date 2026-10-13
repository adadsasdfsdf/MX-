import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

/**
 * Sube un archivo de imagen a Vercel Blob y devuelve su URL pública.
 * Protegido por el middleware (/api/admin/* solo para admins).
 *
 * Requiere la variable de entorno BLOB_READ_WRITE_TOKEN (la crea Vercel
 * automáticamente al conectar un store de Blob al proyecto).
 */
export async function POST(request: Request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Almacenamiento de imágenes no configurado. Conecta un store de Vercel Blob al proyecto.",
      },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const archivo = formData.get("archivo");

  if (!archivo || !(archivo instanceof File)) {
    return NextResponse.json(
      { error: "No se recibió ningún archivo" },
      { status: 400 },
    );
  }

  // Validaciones básicas
  const tiposPermitidos = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (!tiposPermitidos.includes(archivo.type)) {
    return NextResponse.json(
      { error: "Formato no válido. Usa JPG, PNG, WEBP o GIF." },
      { status: 400 },
    );
  }
  const MAX = 5 * 1024 * 1024; // 5 MB
  if (archivo.size > MAX) {
    return NextResponse.json(
      { error: "La imagen es muy grande (máximo 5 MB)." },
      { status: 400 },
    );
  }

  // Nombre único con timestamp para evitar colisiones.
  const extension = archivo.name.split(".").pop() || "jpg";
  const nombre = `productos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;

  const blob = await put(nombre, archivo, {
    access: "public",
    contentType: archivo.type,
  });

  return NextResponse.json({ url: blob.url });
}
