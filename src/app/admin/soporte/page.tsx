import { prisma } from "@/lib/prisma";
import AdminSoporte from "./AdminSoporte";

export const dynamic = "force-dynamic";

export default async function AdminSoportePage() {
  const convsDB = await prisma.conversacionSoporte.findMany({
    orderBy: { actualizadoEn: "desc" },
    include: { mensajes: { orderBy: { creadoEn: "asc" } } },
  });

  const conversaciones = convsDB.map((c) => ({
    id: c.id,
    nombre: c.nombre,
    email: c.email,
    atendida: c.atendida,
    actualizadoEn: c.actualizadoEn.toISOString(),
    mensajes: c.mensajes.map((m) => ({
      id: m.id,
      de: m.de,
      texto: m.texto,
      creadoEn: m.creadoEn.toISOString(),
    })),
  }));

  return <AdminSoporte conversacionesIniciales={conversaciones} />;
}
