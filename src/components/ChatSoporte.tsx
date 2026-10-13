"use client";

import { useState, useRef, useEffect } from "react";

interface Mensaje {
  de: "bot" | "usuario";
  texto: string;
}

const RESPUESTAS: { claves: string[]; respuesta: string }[] = [
  {
    claves: [
      "envio",
      "envío",
      "entrega",
      "llega",
      "cuanto tarda",
      "cuánto tarda",
    ],
    respuesta:
      "📦 Enviamos a toda la República. El envío es GRATIS en compras mayores a $799 MXN. Entrega de 3 a 7 días hábiles. ¡Pide antes del 20 de diciembre para recibir en Navidad! 🎄",
  },
  {
    claves: ["pago", "pagar", "tarjeta", "spei", "mercado", "meses"],
    respuesta:
      "💳 Aceptamos tarjeta, transferencia SPEI y Mercado Pago con meses sin intereses.",
  },
  {
    claves: ["factura", "cfdi", "rfc"],
    respuesta:
      "🧾 ¡Claro! Puedes solicitar tu factura CFDI al finalizar la compra ingresando tu RFC.",
  },
  {
    claves: ["descuento", "oferta", "promocion", "promoción", "barato"],
    respuesta:
      "🎁 ¡Tenemos ofertas de hasta 50% en productos seleccionados y 20% en todo el catálogo! Visita la sección Ofertas. 🔥",
  },
  {
    claves: ["devolucion", "devolución", "cambio", "reembolso"],
    respuesta:
      "🔄 Tienes 30 días para cambios o devoluciones. Escríbenos a hola@navidalia.mx con tu número de pedido.",
  },
  {
    claves: ["hola", "buenas", "feliz navidad", "que tal", "qué tal"],
    respuesta:
      "¡Hola y felices fiestas! 🎄 Soy el elfo asistente de Navidalia. ¿En qué puedo ayudarte? Pregúntame sobre envíos, pagos, facturación o devoluciones.",
  },
];

const PREGUNTAS = [
  "¿Cuándo llega mi pedido?",
  "¿Qué métodos de pago aceptan?",
  "¿Puedo pedir factura?",
  "¿Hay ofertas?",
];

function responder(texto: string): string {
  const t = texto.toLowerCase();
  for (const r of RESPUESTAS) {
    if (r.claves.some((c) => t.includes(c))) return r.respuesta;
  }
  return "Gracias por tu mensaje. 🎁 Para ayuda personalizada escríbenos a hola@navidalia.mx o pregúntame sobre envíos, pagos, facturación o devoluciones.";
}

export default function ChatSoporte() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      de: "bot",
      texto:
        "¡Hola y felices fiestas! 🎄 Soy el elfo asistente de Navidalia. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [entrada, setEntrada] = useState("");
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto]);

  const enviar = (texto: string) => {
    const limpio = texto.trim();
    if (!limpio) return;
    setMensajes((m) => [...m, { de: "usuario", texto: limpio }]);
    setEntrada("");
    setTimeout(() => {
      setMensajes((m) => [...m, { de: "bot", texto: responder(limpio) }]);
    }, 500);
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
                Normalmente respondemos al instante
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-navidad-crema p-4">
            {mensajes.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.de === "usuario" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.de === "usuario"
                      ? "rounded-br-sm bg-navidad-verde text-white"
                      : "rounded-bl-sm bg-white text-gray-700 shadow-sm"
                  }`}
                >
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
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navidad-verde text-white hover:bg-navidad-verdeClaro"
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
