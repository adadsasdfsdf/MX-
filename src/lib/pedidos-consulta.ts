import { prisma } from "./prisma";

export async function getPedidoPorNumero(numero: string) {
  return prisma.pedido.findUnique({
    where: { numero },
    include: { items: true },
  });
}

export async function getPedidosDeUsuario(usuarioId: string) {
  return prisma.pedido.findMany({
    where: { usuarioId },
    include: { items: true },
    orderBy: { creadoEn: "desc" },
  });
}

export async function getTodosLosPedidos() {
  return prisma.pedido.findMany({
    include: { items: true },
    orderBy: { creadoEn: "desc" },
  });
}
