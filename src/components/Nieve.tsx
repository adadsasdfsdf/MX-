"use client";

import { useMemo } from "react";

/**
 * Efecto de nieve cayendo: copos "❄" posicionados aleatoriamente que caen
 * en bucle. Puramente decorativo y sin interferir con los clics.
 */
export default function Nieve({ cantidad = 24 }: { cantidad?: number }) {
  const copos = useMemo(
    () =>
      Array.from({ length: cantidad }).map((_, i) => ({
        left: Math.random() * 100,
        duracion: 6 + Math.random() * 8,
        retraso: Math.random() * 8,
        tamano: 8 + Math.random() * 14,
        opacidad: 0.4 + Math.random() * 0.5,
        key: i,
      })),
    [cantidad],
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {copos.map((c) => (
        <span
          key={c.key}
          className="animate-nevar absolute -top-6 text-white"
          style={{
            left: `${c.left}%`,
            fontSize: `${c.tamano}px`,
            opacity: c.opacidad,
            animationDuration: `${c.duracion}s`,
            animationDelay: `${c.retraso}s`,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  );
}
