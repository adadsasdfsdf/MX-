import Link from "next/link";
import { CATEGORIAS } from "@/lib/data";
import { Logo } from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-navidad-verde text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="rounded-lg bg-white/95 p-2 inline-block">
            <Logo />
          </div>
          <p className="mt-3 text-sm text-emerald-100">
            La magia de la Navidad, a tu puerta. Todo para decorar y celebrar
            las fiestas en México. 🎄
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Categorías</h3>
          <ul className="space-y-2 text-sm text-emerald-100">
            {CATEGORIAS.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/categoria/${c.id}`}
                  className="hover:text-navidad-oro"
                >
                  {c.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Ayuda</h3>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li>Envíos y entregas</li>
            <li>Devoluciones</li>
            <li>Facturación (CFDI)</li>
            <li>Contáctanos</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold">Métodos de pago</h3>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li>💳 Tarjeta de crédito/débito</li>
            <li>🏦 Transferencia SPEI</li>
            <li>💙 Mercado Pago</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-xs text-emerald-100">
        <p>
          © {new Date().getFullYear()} Navidalia · Hecho con 💚 en México ·
          Precios en pesos mexicanos (MXN), IVA incluido
        </p>
      </div>
    </footer>
  );
}
