import type { Categoria, CategoriaInfo, Producto } from "./types";
import { prisma } from "./prisma";
import type { Producto as ProductoDB } from "@prisma/client";

/** Metadatos de las categorías navideñas. */
export const CATEGORIAS: CategoriaInfo[] = [
  {
    id: "arboles",
    nombre: "Árboles",
    descripcion: "Árboles de Navidad naturales y artificiales",
    emoji: "🎄",
  },
  {
    id: "esferas",
    nombre: "Esferas y Adornos",
    descripcion: "Esferas, estrellas y adornos para el árbol",
    emoji: "🔴",
  },
  {
    id: "luces",
    nombre: "Luces y Series",
    descripcion: "Series de luces LED y decoración luminosa",
    emoji: "✨",
  },
  {
    id: "decoracion",
    nombre: "Decoración",
    descripcion: "Coronas, nacimientos, figuras y más",
    emoji: "🏠",
  },
  {
    id: "regalos",
    nombre: "Regalos",
    descripcion: "Regalos, envolturas y detalles",
    emoji: "🎁",
  },
  {
    id: "ropa",
    nombre: "Ropa Navideña",
    descripcion: "Suéteres, pijamas y disfraces",
    emoji: "🧦",
  },
  {
    id: "dulces",
    nombre: "Dulces y Repostería",
    descripcion: "Dulces, chocolates y postres navideños",
    emoji: "🍬",
  },
];

export function getCategoria(id: string): CategoriaInfo | undefined {
  return CATEGORIAS.find((c) => c.id === id);
}

export function mapProducto(p: ProductoDB): Producto {
  return {
    id: p.id,
    slug: p.slug,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: p.precioCentavos / 100,
    precioAnterior: p.precioAnteriorCentavos
      ? p.precioAnteriorCentavos / 100
      : undefined,
    categoria: p.categoria as Categoria,
    imagen: p.imagen,
    stock: p.stock,
    gancho: p.gancho,
    destacado: p.destacado,
  };
}

export async function getProductos(): Promise<Producto[]> {
  const productos = await prisma.producto.findMany({
    where: { activo: true },
    orderBy: { creadoEn: "desc" },
  });
  return productos.map(mapProducto);
}

export async function getProductoPorSlug(
  slug: string,
): Promise<Producto | undefined> {
  const p = await prisma.producto.findUnique({ where: { slug } });
  return p && p.activo ? mapProducto(p) : undefined;
}

export async function getProductosPorCategoria(
  categoria: string,
): Promise<Producto[]> {
  const productos = await prisma.producto.findMany({
    where: { categoria, activo: true },
    orderBy: { creadoEn: "desc" },
  });
  return productos.map(mapProducto);
}

export async function getProductosDestacados(): Promise<Producto[]> {
  const productos = await prisma.producto.findMany({
    where: { destacado: true, activo: true },
    take: 10,
  });
  return productos.map(mapProducto);
}

/** Productos gancho (ofertas de bajo precio) para la portada. */
export async function getProductosGancho(): Promise<Producto[]> {
  const productos = await prisma.producto.findMany({
    where: { gancho: true, activo: true },
    orderBy: { precioCentavos: "asc" },
  });
  return productos.map(mapProducto);
}

export async function buscarProductos(query: string): Promise<Producto[]> {
  const q = query.trim();
  if (!q) return [];
  const productos = await prisma.producto.findMany({
    where: {
      activo: true,
      OR: [
        { nombre: { contains: q, mode: "insensitive" } },
        { descripcion: { contains: q, mode: "insensitive" } },
      ],
    },
    orderBy: { nombre: "asc" },
  });
  return productos.map(mapProducto);
}

export interface ResumenResenas {
  promedio: number;
  total: number;
  resenas: {
    id: string;
    autor: string;
    calificacion: number;
    comentario: string;
    verificada: boolean;
    creadoEn: Date;
  }[];
}

export async function getResenas(productoId: string): Promise<ResumenResenas> {
  const resenas = await prisma.resena.findMany({
    where: { productoId },
    orderBy: { creadoEn: "desc" },
  });
  const total = resenas.length;
  const promedio =
    total > 0
      ? resenas.reduce(
          (acc: number, r: { calificacion: number }) => acc + r.calificacion,
          0,
        ) / total
      : 0;
  return {
    promedio: Math.round(promedio * 10) / 10,
    total,
    resenas: resenas.map(
      (r: {
        id: string;
        autor: string;
        calificacion: number;
        comentario: string;
        verificada: boolean;
        creadoEn: Date;
      }) => ({
        id: r.id,
        autor: r.autor,
        calificacion: r.calificacion,
        comentario: r.comentario,
        verificada: r.verificada,
        creadoEn: r.creadoEn,
      }),
    ),
  };
}
