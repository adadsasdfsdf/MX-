"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Mensaje {
  id?: string;
  de: "bot" | "cliente" | "admin";
  texto: string;
}

const PREGUNTAS = [
  "¿Cuándo llega mi pedido?",
  "¿Qué métodos de pago aceptan?",
  "¿Puedo pedir factura?",
  "¿Hay ofertas?",
];

const STORAGE_KEY = "navidalia-soporte-conv";

export default function ChatSoporte() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      de: "bot",
      texto:
        "¡Hola y felices fiestas! 🎄 Soy el asistente de Navidalia. Escríbenos tu pregunta y nuestro equipo te responderá por aquí.",
    },
  ]);
  const [entrada, setEntrada] = useState("");
  const [convId, setConvId] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  // Recuperar la conversación guardada (si existe).
  useEffect(() => {
    const guardado = localStorage.getItem(STORAGE_KEY);
    if (guardado) setConvId(guardado);
  }, []);

  // Trae los mensajes del servidor (incluye respuestas del admin).
  const sincronizar = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/soporte?id=${id}`);
      const data = await res.json();
      if (Array.isArray(data.mensajes) && data.mensajes.length > 0) {
        setMensajes((prev) => {
          // Conserva el saludo inicial del bot + los mensajes del servidor.
          const bot = prev.filter((m) => m.de === "bot");
          return [...bot, ...data.mensajes];
        });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Polling cada 5s mientras el chat está abierto y hay conversación.
  useEffect(() => {
    if (!abierto || !convId) return;
    sincronizar(convId);
    const t = setInterval(() => sincronizar(convId), 5000);
    return () => clearInterval(t);
  }, [abierto, convId, sincronizar]);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto]);

  const enviar = async (texto: string) => {
    const limpio = texto.trim();
    if (!limpio || enviando) return;
    setEntrada("");
    setEnviando(true);
    // Mostrar el mensaje del cliente de inmediato (optimista).
    setMensajes((prev) => [...prev, { de: "cliente", texto: limpio }]);
    try {
      const res = await fetch("/api/soporte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversacionId: convId, texto: limpio }),
      });
      const data = await res.json();
      if (data.conversacionId) {
        setConvId(data.conversacionId);
        localStorage.setItem(STORAGE_KEY, data.conversacionId);
      }
    } catch {
      setMensajes((prev) => [
        ...prev,
        { de: "bot", texto: "No se pudo enviar el mensaje. Intenta de nuevo." },
      ]);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setAbierto((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-navidad-rojo text-2xl text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Abrir chat de soporte"
      >
        {abierto ? "✕" : "🎅"}
      </button>

      {abierto && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[30rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
          <div className="flex items-center gap-3 bg-navidad-verde px-4 py-3 text-white">
            <span className="text-2xl">🦌</span>
            <div>
              <p className="font-semibold leading-tight">Soporte Navidalia</p>
              <p className="text-xs text-emerald-100">
                Te responderemos por aquí
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-navidad-crema p-4">
            {mensajes.map((m, i) => (
              <div
                key={m.id ?? i}
                className={`flex ${m.de === "cliente" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.de === "cliente"
                      ? "rounded-br-sm bg-navidad-verde text-white"
                      : m.de === "admin"
                        ? "rounded-bl-sm bg-navidad-rojo text-white"
                        : "rounded-bl-sm bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  {m.de === "admin" && (
                    <span className="mb-0.5 block text-[10px] font-semibold opacity-80">
                      Equipo Navidalia
                    </span>
                  )}
                  {m.texto}
                </div>
              </div>
            ))}
            {mensajes.length <= 1 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {PREGUNTAS.map((p) => (
                  <button
                    key={p}
                    onClick={() => enviar(p)}
                    className="rounded-full border border-navidad-verde bg-white px-3 py-1 text-xs text-navidad-verde transition-colors hover:bg-navidad-verde hover:text-white"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
            <div ref={finRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              enviar(entrada);
            }}
            className="flex items-center gap-2 border-t border-gray-200 p-3"
          >
            <input
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:border-navidad-verde focus:outline-none"
            />
            <button
              type="submit"
              disabled={enviando}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navidad-verde text-white hover:bg-navidad-verdeClaro disabled:bg-gray-300"
              aria-label="Enviar"
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}
