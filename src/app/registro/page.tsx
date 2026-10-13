"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RegistroPage() {
  const { registro } = useAuth();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!/^\d{10}$/.test(telefono)) {
      setError("El teléfono debe tener 10 dígitos.");
      return;
    }
    setCargando(true);
    try {
      await registro(nombre, email, telefono);
      router.push("/mi-cuenta");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setCargando(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-navidad-verde focus:outline-none";

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="font-display text-2xl font-bold text-gray-900">
        Crear cuenta
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-navidad-verde hover:underline"
        >
          Inicia sesión
        </Link>
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-navidad-rojo">
            {error}
          </p>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            required
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Teléfono (10 dígitos)
          </label>
          <input
            required
            type="tel"
            inputMode="numeric"
            placeholder="55 1234 5678"
            value={telefono}
            onChange={(e) =>
              setTelefono(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-lg bg-navidad-verde py-3 font-semibold text-white hover:bg-navidad-verdeClaro disabled:bg-gray-300"
        >
          {cargando ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="rounded-lg bg-navidad-crema p-3 text-xs text-gray-600">
          💡 Para iniciar sesión después, usa tu <strong>correo</strong> y tu{" "}
          <strong>número de teléfono</strong> como contraseña.
        </p>
      </form>
    </div>
  );
}
