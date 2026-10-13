"use client";

import Link from "next/link";
import { useCarrito } from "@/context/CarritoContext";
import { formatMXN, FREE_SHIPPING_THRESHOLD } from "@/lib/mexico";

const IMG_FALLBACK = "https://picsum.photos/seed/navidalia-fallback/200/200";

export default function CarritoPage() {
  const {
    items,
    subtotal,
    iva,
    envio,
    total,
    actualizarCantidad,
    quitar,
    vaciar,
  } = useCarrito();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="text-6xl">🛒</div>
        <h1 className="mt-4 font-display text-2xl font-bold text-gray-900">
          Tu carrito está vacío
        </h1>
        <p className="mt-2 text-gray-600">
          ¡Llena tu carrito de magia navideña! 🎄
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-navidad-verde px-6 py-3 font-semibold text-white hover:bg-navidad-verdeClaro"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  const falta = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 font-display text-3xl font-bold text-gray-900">
        Tu carrito
      </h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map(({ producto, cantidad }) => (
              <div
                key={producto.id}
                className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    onError={(e) =>
                      ((e.target as HTMLImageElement).src = IMG_FALLBACK)
                    }
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between">
                    <Link
                      href={`/producto/${producto.slug}`}
                      className="font-semibold text-gray-900 hover:text-navidad-verde"
                    >
                      {producto.nombre}
                    </Link>
                    <button
                      onClick={() => quitar(producto.id)}
                      className="text-sm text-gray-400 hover:text-navidad-rojo"
                      aria-label="Quitar"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-gray-300">
                      <button
                        onClick={() =>
                          actualizarCantidad(producto.id, cantidad - 1)
                        }
                        className="px-3 py-1 text-gray-600 hover:text-navidad-verde"
                        aria-label="Disminuir"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-semibold">
                        {cantidad}
                      </span>
                      <button
                        onClick={() =>
                          actualizarCantidad(
                            producto.id,
                            Math.min(producto.stock, cantidad + 1),
                          )
                        }
                        className="px-3 py-1 text-gray-600 hover:text-navidad-verde"
                        aria-label="Aumentar"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-gray-900">
                      {formatMXN(producto.precio * cantidad)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={vaciar}
            className="mt-4 text-sm text-gray-500 hover:text-navidad-rojo"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            Resumen del pedido
          </h2>
          {falta > 0 && (
            <p className="mb-4 rounded-lg bg-navidad-crema p-3 text-sm text-gray-700">
              Te faltan{" "}
              <span className="font-semibold text-navidad-verde">
                {formatMXN(falta)}
              </span>{" "}
              para envío gratis 🚚
            </p>
          )}
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium">{formatMXN(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-gray-500">
              <dt>IVA (16%) incluido</dt>
              <dd>{formatMXN(iva)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Envío</dt>
              <dd className="font-medium">
                {envio === 0 ? (
                  <span className="text-navidad-verde">Gratis</span>
                ) : (
                  formatMXN(envio)
                )}
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-base font-bold text-gray-900">
                <dt>Total</dt>
                <dd>{formatMXN(total)}</dd>
              </div>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-6 block rounded-lg bg-navidad-verde py-3 text-center font-semibold text-white hover:bg-navidad-verdeClaro"
          >
            Proceder al pago
          </Link>
          <Link
            href="/"
            className="mt-2 block text-center text-sm text-gray-500 hover:text-navidad-verde"
          >
            Seguir comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
