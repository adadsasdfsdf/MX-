import Link from "next/link";
import ProductoCard from "@/components/ProductoCard";
import CategoriaIcono from "@/components/CategoriaIcono";
import HeroCarrusel from "@/components/HeroCarrusel";
import {
  CATEGORIAS,
  getProductosDestacados,
  getProductosGancho,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [destacados, gancho] = await Promise.all([
    getProductosDestacados(),
    getProductosGancho(),
  ]);

  return (
    <>
      <HeroCarrusel />

      {/* Categorías */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900">
            Explora por categoría
          </h2>
          <p className="mt-2 text-gray-500">Todo para una Navidad mágica 🎄</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.id}
              href={`/categoria/${c.id}`}
              className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:border-navidad-verde hover:shadow-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navidad-verde/10 text-navidad-verde transition-colors group-hover:bg-navidad-verde group-hover:text-white">
                <CategoriaIcono categoria={c.id} className="h-7 w-7" />
              </span>
              <span className="mt-2 text-sm font-semibold text-gray-900">
                {c.nombre}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ofertas gancho */}
      {gancho.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-6">
          <div className="rounded-2xl bg-navidad-rojo p-6 md:p-8">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="font-display text-2xl font-black text-white md:text-3xl">
                  🔥 Ofertas de temporada
                </h2>
                <p className="mt-1 text-rose-100">
                  ¡Hasta 50% de descuento! Precios de locura por tiempo limitado
                </p>
              </div>
              <Link
                href="/ofertas"
                className="hidden whitespace-nowrap rounded-lg bg-white px-5 py-2 text-sm font-semibold text-navidad-rojo sm:block"
              >
                Ver todas
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
              {gancho.slice(0, 5).map((p) => (
                <ProductoCard key={p.id} producto={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Destacados */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900">
            Favoritos de la temporada ⭐
          </h2>
          <p className="mt-2 text-gray-500">
            Lo más querido para decorar y regalar
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          {destacados.map((p) => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      </section>

      {/* Confianza */}
      <section className="bg-navidad-crema">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 text-center md:grid-cols-4">
          <div>
            <div className="text-4xl">🚚</div>
            <h3 className="mt-3 font-semibold text-gray-900">
              Envío a todo México
            </h3>
            <p className="mt-1 text-sm text-gray-600">Gratis desde $799 MXN</p>
          </div>
          <div>
            <div className="text-4xl">💳</div>
            <h3 className="mt-3 font-semibold text-gray-900">Pago seguro</h3>
            <p className="mt-1 text-sm text-gray-600">
              Pago con tarjeta de crédito o débito
            </p>
          </div>
          <div>
            <div className="text-4xl">🧾</div>
            <h3 className="mt-3 font-semibold text-gray-900">Factura CFDI</h3>
            <p className="mt-1 text-sm text-gray-600">En todos tus pedidos</p>
          </div>
          <div>
            <div className="text-4xl">🎁</div>
            <h3 className="mt-3 font-semibold text-gray-900">
              Listo para regalar
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Envoltura y detalles navideños
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
