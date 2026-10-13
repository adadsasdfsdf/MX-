"use client";

import { useState } from "react";
import { formatMXN } from "@/lib/mexico";

/**
 * Formulario de pago con tarjeta (SOLO PRUEBA). Valida el formato del número,
 * la fecha y el CVV, pero NO procesa ningún cobro real. Al confirmar, llama
 * a onConfirmar() para que el checkout cree el pedido.
 */
export default function FormularioTarjeta({
  total,
  procesando,
  onConfirmar,
  onCancelar,
}: {
  total: number;
  procesando: boolean;
  onConfirmar: () => void;
  onCancelar: () => void;
}) {
  const [numero, setNumero] = useState("");
  const [nombre, setNombre] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  // Formatea el número en grupos de 4: 1234 5678 9012 3456
  const onNumero = (v: string) => {
    const soloDigitos = v.replace(/\D/g, "").slice(0, 16);
    const grupos = soloDigitos.match(/.{1,4}/g);
    setNumero(grupos ? grupos.join(" ") : "");
  };

  // Formatea la fecha MM/AA
  const onExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length >= 3) setExp(`${d.slice(0, 2)}/${d.slice(2)}`);
    else setExp(d);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const digitos = numero.replace(/\s/g, "");
    if (digitos.length < 15) {
      setError("Número de tarjeta inválido (debe tener 15 o 16 dígitos).");
      return;
    }
    if (!nombre.trim()) {
      setError("Ingresa el nombre del titular.");
      return;
    }
    const m = exp.match(/^(\d{2})\/(\d{2})$/);
    if (!m) {
      setError("Fecha de expiración inválida (formato MM/AA).");
      return;
    }
    const mes = parseInt(m[1], 10);
    if (mes < 1 || mes > 12) {
      setError("El mes de expiración debe estar entre 01 y 12.");
      return;
    }
    if (cvv.length < 3) {
      setError("CVV inválido (3 o 4 dígitos).");
      return;
    }
    // Todo correcto: no se cobra nada, solo confirmamos el pedido.
    onConfirmar();
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-navidad-verde focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Cabecera estilo tarjeta */}
        <div className="bg-gradient-to-r from-navidad-verde to-navidad-verdeClaro p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="font-semibold">💳 Pago con tarjeta</span>
            <span className="text-2xl">🎄</span>
          </div>
          <p className="mt-3 text-sm text-rose-50">Total a pagar</p>
          <p className="text-2xl font-bold">{formatMXN(total)}</p>
        </div>

        <form onSubmit={submit} className="space-y-3 p-6">
          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-navidad-rojo">
              {error}
            </p>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Número de tarjeta
            </label>
            <input
              required
              inputMode="numeric"
              placeholder="1234 5678 9012 3456"
              value={numero}
              onChange={(e) => onNumero(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Nombre del titular
            </label>
            <input
              required
              type="text"
              placeholder="Como aparece en la tarjeta"
              value={nombre}
              onChange={(e) => setNombre(e.target.value.toUpperCase())}
              className={`${inputClass} uppercase`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Expiración
              </label>
              <input
                required
                inputMode="numeric"
                placeholder="MM/AA"
                value={exp}
                onChange={(e) => onExp(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input
                required
                inputMode="numeric"
                placeholder="123"
                value={cvv}
                onChange={(e) =>
                  setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                className={inputClass}
              />
            </div>
          </div>

          <p className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
            🔒 Modo de prueba: este formulario NO realiza ningún cobro real.
            Puedes usar cualquier número, por ejemplo 4242 4242 4242 4242.
          </p>

          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={procesando}
              className="flex-1 rounded-lg bg-navidad-verde py-3 font-semibold text-white hover:bg-navidad-verdeClaro disabled:bg-gray-300"
            >
              {procesando ? "Procesando..." : "Pagar ahora"}
            </button>
            <button
              type="button"
              onClick={onCancelar}
              disabled={procesando}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
