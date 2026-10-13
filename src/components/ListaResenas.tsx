"use client";

import { useState } from "react";
import Estrellas from "@/components/Estrellas";
import { formatFecha } from "@/lib/mexico";

interface ResenaItem {
  id: string;
  autor: string;
  calificacion: number;
  comentario: string;
  verificada: boolean;
  creadoEn: Date;
}

const POR_PAGINA = 30;

export default function ListaResenas({ resenas }: { resenas: ResenaItem[] }) {
  const [pagina, setPagina] = useState(1);
  const totalPaginas = Math.ceil(resenas.length / POR_PAGINA);
  const inicio = (pagina - 1) * POR_PAGINA;
  const visibles = resenas.slice(inicio, inicio + POR_PAGINA);

  const irA = (p: number) => {
    setPagina(p);
    // Subir al inicio de la sección de opiniones.
    document
      .getElementById("opiniones")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Construye la lista de botones de página (con "…" si hay muchas).
  const paginas: (number | "...")[] = [];
  for (let i = 1; i <= totalPaginas; i++) {
    if (i === 1 || i === totalPaginas || (i >= pagina - 1 && i <= pagina + 1)) {
      paginas.push(i);
    } else if (paginas[paginas.length - 1] !== "...") {
      paginas.push("...");
    }
  }

  return (
    <>
      <p className="mb-4 mt-6 text-sm text-gray-500">
        Mostrando {inicio + 1}–{Math.min(inicio + POR_PAGINA, resenas.length)}{" "}
        de {resenas.length} opiniones
      </p>

      <div className="space-y-4">
        {visibles.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{r.autor}</span>
                  {r.verificada && (
                    <span className="rounded-full bg-navidad-verde/10 px-2 py-0.5 text-xs font-medium text-navidad-verde">
                      ✓ Compra verificada
                    </span>
                  )}
                </div>
                <Estrellas valor={r.calificacion} size="text-sm" />
              </div>
              <span className="whitespace-nowrap text-xs text-gray-400">
                {formatFecha(r.creadoEn)}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-700">{r.comentario}</p>
          </div>
        ))}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => irA(Math.max(1, pagina - 1))}
            disabled={pagina === 1}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ‹ Anterior
          </button>

          {paginas.map((p, i) =>
            p === "..." ? (
              <span key={`e${i}`} className="px-2 text-gray-400">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => irA(p)}
                className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${
                  p === pagina
                    ? "bg-navidad-verde text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ),
          )}

          <button
            onClick={() => irA(Math.min(totalPaginas, pagina + 1))}
            disabled={pagina === totalPaginas}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente ›
          </button>
        </div>
      )}
    </>
  );
}
