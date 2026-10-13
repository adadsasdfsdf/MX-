import Link from "next/link";
import ProductoCard from "@/components/ProductoCard";
import { getProductos } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ofertas de temporada · Hasta 50% de descuento",
  description:
    "Las mejores ofertas navideñas: hasta 50% en productos seleccionados y 20% en todo el catálogo.",
};

const FRASES = [
  "🔥 HASTA 50% DE DESCUENTO EN PRODUCTOS SELECCIONADOS",
  "🎁 TODO EL CATÁLOGO CON 20% DE DESCUENTO",
  "🚚 ENVÍO GRATIS DESDE $799 MXN",
  "🎄 ¡DECORA TU NAVIDAD SIN GASTAR DE MÁS!",
  "💳 MESES SIN INTERESES CON MERCADO PAGO",
];

export default async function OfertasPage() {
  const productos = await getProductos();
  const gancho = productos.filter((p) => p.gancho);
  const resto = productos.filter((p) => !p.gancho && p.precioAnterior);
  const frases = [...FRASES, ...FRASES];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://picsum.photos/seed/navidalia-ofertas-fondo/1600/700')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navidad-rojoOscuro/95 via-navidad-verde/85 to-navidad-acento/60" />
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-white md:py-28">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-sm font-semibold backdrop-blur">
            🎄 Ofertas de temporada
          </span>
          <h1 className="mt-4 font-display text-4xl font-black leading-tight drop-shadow md:text-6xl">
            ¡Hasta <span className="text-navidad-oro">50% de descuento</span>!
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-rose-50">
            Ofertas gancho con los mejores precios de la temporada y 20% en todo
            el catálogo. ¡Decora tu Navidad por menos!
          </p>
          <a
            href="#productos"
            className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-bold text-navidad-rojo shadow-lg transition-transform hover:scale-105"
          >
            Ver ofertas 🔥
          </a>
        </div>
      </section>

      <section className="marquee-pausa overflow-hidden bg-navidad-acento py-3 text-white">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {frases.map((f, i) => (
            <span key={i} className="mx-8 text-sm font-bold tracking-wide">
              {f}
            </span>
          ))}
        </div>
      </section>

      {gancho.length > 0 && (
        <section id="productos" className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="mb-6 font-display text-3xl font-bold text-navidad-rojo">
            🔥 Ofertas gancho (50% off)
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {gancho.map((p) => (
              <ProductoCard key={p.id} producto={p} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-gray-900">
          Más ofertas (20% off)
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {resto.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-navidad-crema"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </>
  );
}
