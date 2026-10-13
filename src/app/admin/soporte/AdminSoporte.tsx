"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatFecha } from "@/lib/mexico";

interface MensajeC {
  id: string;
  de: string;
  texto: string;
  creadoEn: string;
}
interface Conversacion {
  id: string;
  nombre: string | null;
  email: string | null;
  atendida: boolean;
  actualizadoEn: string;
  mensajes: MensajeC[];
}

export default function AdminSoporte({
  conversacionesIniciales,
}: {
  conversacionesIniciales: Conversacion[];
}) {
  const router = useRouter();
  const [activa, setActiva] = useState<string | null>(
    conversacionesIniciales[0]?.id ?? null,
  );
  const [respuesta, setRespuesta] = useState("");
  const [enviando, setEnviando] = useState(false);

  const conv = conversacionesIniciales.find((c) => c.id === activa);

  const responder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activa || !respuesta.trim()) return;
    setEnviando(true);
    try {
      await fetch("/api/admin/soporte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversacionId: activa,
          texto: respuesta.trim(),
        }),
      });
      setRespuesta("");
      router.refresh();
    } finally {
      setEnviando(false);
    }
  };

  if (conversacionesIniciales.length === 0) {
    return (
      <div className="rounded-xl bg-navidad-crema p-8 text-center text-gray-600">
        Todavía no hay conversaciones de soporte.
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Mensajes de soporte ({conversacionesIniciales.length})
      </h2>
      <div className="grid gap-4 md:grid-cols-[280px_1fr]">
        {/* Lista de conversaciones */}
        <div className="space-y-2">
          {conversacionesIniciales.map((c) => {
            const ultimo = c.mensajes[c.mensajes.length - 1];
            return (
              <button
                key={c.id}
                onClick={() => setActiva(c.id)}
                className={`w-full rounded-xl border p-3 text-left transition-colors ${
                  activa === c.id
                    ? "border-navidad-verde bg-navidad-verde/5"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate text-sm font-semibold text-gray-900">
                    {c.nombre || c.email || "Visitante"}
                  </span>
                  {!c.atendida && (
                    <span
                      className="ml-2 h-2 w-2 flex-shrink-0 rounded-full bg-navidad-rojo"
                      title="Sin atender"
                    />
                  )}
                </div>
                <p className="truncate text-xs text-gray-500">
                  {ultimo ? ultimo.texto : "—"}
                </p>
                <p className="mt-0.5 text-[10px] text-gray-400">
                  {formatFecha(c.actualizadoEn)}
                </p>
              </button>
            );
          })}
        </div>

        {/* Conversación activa */}
        <div className="flex h-[32rem] flex-col rounded-xl border border-gray-200 bg-white">
          {conv ? (
            <>
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="font-semibold text-gray-900">
                  {conv.nombre || "Visitante"}
                </p>
                {conv.email && (
                  <p className="text-xs text-gray-500">{conv.email}</p>
                )}
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto bg-navidad-crema p-4">
                {conv.mensajes.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.de === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                        m.de === "admin"
                          ? "rounded-br-sm bg-navidad-verde text-white"
                          : "rounded-bl-sm bg-white text-gray-700 shadow-sm"
                      }`}
                    >
                      {m.texto}
                    </div>
                  </div>
                ))}
              </div>
              <form
                onSubmit={responder}
                className="flex items-center gap-2 border-t border-gray-200 p-3"
              >
                <input
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  placeholder="Escribe tu respuesta..."
                  className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-navidad-verde focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={enviando}
                  className="rounded-full bg-navidad-verde px-4 py-2 text-sm font-semibold text-white hover:bg-navidad-verdeClaro disabled:bg-gray-300"
                >
                  Responder
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-gray-400">
              Selecciona una conversación
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
