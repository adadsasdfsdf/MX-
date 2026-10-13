import Estrellas from "@/components/Estrellas";
import ListaResenas from "@/components/ListaResenas";
import type { ResumenResenas } from "@/lib/data";

export default function Resenas({ data }: { data: ResumenResenas }) {
  const { promedio, total, resenas } = data;

  if (total === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900">Opiniones</h2>
        <p className="mt-2 text-gray-500">
          Este producto aún no tiene reseñas.
        </p>
      </section>
    );
  }

  const distribucion = [5, 4, 3, 2, 1].map((estrellas) => {
    const count = resenas.filter((r) => r.calificacion === estrellas).length;
    return { estrellas, count, pct: Math.round((count / total) * 100) };
  });

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900">
        Opiniones de clientes
      </h2>

      <div className="mt-4 grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:grid-cols-[auto_1fr]">
        <div className="flex flex-col items-center justify-center border-gray-100 sm:border-r sm:pr-8">
          <span className="text-5xl font-extrabold text-gray-900">
            {promedio.toFixed(1)}
          </span>
          <Estrellas valor={promedio} size="text-xl" />
          <span className="mt-1 text-sm text-gray-500">{total} opiniones</span>
        </div>
        <div className="space-y-1.5">
          {distribucion.map((d) => (
            <div key={d.estrellas} className="flex items-center gap-2 text-sm">
              <span className="w-10 text-gray-600">{d.estrellas} ★</span>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-navidad-oro"
                  style={{ width: `${d.pct}%` }}
                />
              </div>
              <span className="w-10 text-right text-gray-400">{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      <ListaResenas resenas={resenas} />
    </section>
  );
}
