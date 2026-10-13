"use client";

import { useState } from "react";
import { formatMXN } from "@/lib/mexico";
import {
  detectarMarca,
  LogoTarjeta,
  MarcasAceptadas,
  NOMBRE_MARCA,
} from "@/components/LogosTarjeta";

/**
 * Flujo de pago con tarjeta (SOLO PRUEBA). Dos pasos:
 *  1) Captura de datos de la tarjeta (número, titular, expiración, CVV).
 *  2) Verificación por código (OTP) que "el banco envió por SMS".
 * NO procesa ningún cobro real. Al verificar el código llama a onConfirmar().
 */
export default function FormularioTarjeta({
  total,
  procesando,
  onConfirmar,
  onCancelar,
}: {
  total: number;
  procesando: boolean;
  onConfirmar: (datos: { marca: string; ultimos4: string }) => void;
  onCancelar: () => void;
}) {
  const [paso, setPaso] = useState<"tarjeta" | "otp">("tarjeta");
  const [numero, setNumero] = useState("");
  const [nombre, setNombre] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // Últimos 4 dígitos para mostrar en el paso de verificación.
  const ultimos4 = numero.replace(/\s/g, "").slice(-4);
  const marca = detectarMarca(numero);
  const maxCvv = marca === "amex" ? 4 : 3;

  const onNumero = (v: string) => {
    const soloDigitos = v.replace(/\D/g, "").slice(0, 16);
    const grupos = soloDigitos.match(/.{1,4}/g);
    setNumero(grupos ? grupos.join(" ") : "");
  };

  const onExp = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    if (d.length >= 3) setExp(`${d.slice(0, 2)}/${d.slice(2)}`);
    else setExp(d);
  };

  // Paso 1 → validar tarjeta y pasar a verificación por código.
  const submitTarjeta = (e: React.FormEvent) => {
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
    setPaso("otp");
  };

  // Paso 2 → validar código y confirmar el pedido.
  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (otp.replace(/\D/g, "").length !== 6) {
      setError("El código debe tener 6 dígitos.");
      return;
    }
    // Solo se envían datos NO sensibles: marca y últimos 4 dígitos.
    onConfirmar({ marca: NOMBRE_MARCA[marca], ultimos4 });
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-navidad-verde focus:outline-none";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Cabecera */}
        <div className="bg-gradient-to-r from-navidad-verde to-navidad-verdeClaro p-5 text-white">
          <div className="flex items-center justify-between">
            <span className="font-semibold">💳 Pago con tarjeta</span>
            <span className="text-2xl">🎄</span>
          </div>
          <p className="mt-3 text-sm text-rose-50">Total a pagar</p>
          <p className="text-2xl font-bold">{formatMXN(total)}</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-rose-50">Aceptamos:</span>
            <MarcasAceptadas />
          </div>
        </div>

        {paso === "tarjeta" ? (
          <form onSubmit={submitTarjeta} className="space-y-3 p-6">
            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-navidad-rojo">
                {error}
              </p>
            )}
            <div>
              <label className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                <span>Número de tarjeta</span>
                {marca !== "desconocida" && numero.length > 0 && (
                  <span className="text-xs font-normal text-gray-500">
                    {NOMBRE_MARCA[marca]}
                  </span>
                )}
              </label>
              <div className="relative">
                <input
                  required
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={numero}
                  onChange={(e) => onNumero(e.target.value)}
                  className={`${inputClass} pr-16`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  <LogoTarjeta marca={marca} className="h-7 w-11" />
                </span>
              </div>
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
                  placeholder={marca === "amex" ? "1234" : "123"}
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, maxCvv))
                  }
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={procesando}
                className="flex-1 rounded-lg bg-navidad-verde py-3 font-semibold text-white hover:bg-navidad-verdeClaro disabled:bg-gray-300"
              >
                Pagar ahora
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
        ) : (
          <form onSubmit={submitOtp} className="space-y-4 p-6">
            <div className="text-center">
              <div className="text-4xl">🔐</div>
              <h3 className="mt-2 text-lg font-bold text-gray-900">
                Verificación del banco
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Tu banco envió un código de verificación por SMS al teléfono
                asociado a la tarjeta que termina en{" "}
                <span className="font-semibold">•••• {ultimos4 || "0000"}</span>
                . Ingrésalo para autorizar el pago.
              </p>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-navidad-rojo">
                {error}
              </p>
            )}

            <div>
              <label className="mb-1 block text-center text-sm font-medium text-gray-700">
                Código de verificación (6 dígitos)
              </label>
              <input
                required
                inputMode="numeric"
                autoFocus
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center text-2xl tracking-[0.5em] focus:border-navidad-verde focus:outline-none"
              />
            </div>

            <p className="text-center text-xs text-gray-400">
              ¿No recibiste el código?{" "}
              <button
                type="button"
                className="text-navidad-verde hover:underline"
              >
                Reenviar
              </button>
            </p>

            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={procesando}
                className="flex-1 rounded-lg bg-navidad-verde py-3 font-semibold text-white hover:bg-navidad-verdeClaro disabled:bg-gray-300"
              >
                {procesando ? "Verificando..." : "Confirmar pago"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaso("tarjeta");
                  setError("");
                }}
                disabled={procesando}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Atrás
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
