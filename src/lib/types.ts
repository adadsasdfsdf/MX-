/** Tipos de dominio del catálogo y el carrito. */

export interface Producto {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  /** Precio de venta en pesos mexicanos (IVA incluido). */
  precio: number;
  /** Precio de mercado (tachado), si aplica. */
  precioAnterior?: number;
  categoria: Categoria;
  imagen: string;
  stock: number;
  /** Producto gancho de bajo precio. */
  gancho?: boolean;
  destacado?: boolean;
}

export type Categoria =
  | "arboles"
  | "esferas"
  | "luces"
  | "decoracion"
  | "regalos"
  | "ropa"
  | "dulces";

export interface CategoriaInfo {
  id: Categoria;
  nombre: string;
  descripcion: string;
  emoji: string;
}

export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
