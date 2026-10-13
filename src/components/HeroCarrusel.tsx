"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface Diapositiva {
  etiqueta: string;
  titulo: string;
  destacado: string;
  descripcion: string;
  ctaTexto: string;
  ctaHref: string;
  cta2Texto: string;
  cta2Href: string;
  imagen: string;
}

const DIAPOSITIVAS: Diapositiva[] = [
  {
    etiqueta: "🎄 Temporada Navideña 2025",
    titulo: "La magia de la Navidad,",
    destacado: "a tu puerta",
    descripcion:
      "Árboles, esferas, luces, regalos y todo para decorar y celebrar las fiestas. Envíos a toda la República Mexicana.",
    ctaTexto: "Explorar productos",
    ctaHref: "/categoria/arboles",
    cta2Texto: "Ver ofertas 🔥",
    cta2Href: "/ofertas",
    imagen: "https://picsum.photos/seed/navidalia-hero-arbol/1600/700",
  },
  {
    etiqueta: "🔥 Ofertas de temporada",
    titulo: "Hasta 50% de descuento",
    destacado: "en productos seleccionados",
    descripcion:
      "¡Precios de locura! Las mejores ofertas gancho para que decores tu casa sin gastar de más. Y todo el catálogo con 20% de descuento.",
    ctaTexto: "Ver ofertas",
    ctaHref: "/ofertas",
    cta2Texto: "Ver categorías",
    cta2Href: "/categoria/esferas",
    imagen: "https://picsum.photos/seed/navidalia-hero-ofertas/1600/700",
  },
  {
    etiqueta: "🚚 Entrega a tiempo",
    titulo: "Envío gratis",
    destacado: "desde $799 MXN",
    descripcion:
      "Recibe todo para tus fiestas antes de Navidad. Pide a tiempo y paga con tarjeta, SPEI o Mercado Pago a meses sin intereses.",
    ctaTexto: "Empezar a comprar",
    ctaHref: "/",
    cta2Texto: "Ver ofertas 🔥",
    cta2Href: "/ofertas",
    imagen: "https://picsum.photos/seed/navidalia-hero-regalos/1600/700",
  },
  {
    etiqueta: "✨ Luces y decoración",
    titulo: "Ilumina tu hogar",
    destacado: "esta Navidad",
    descripcion:
      "Series LED, coronas, nacimientos y figuras luminosas. Crea el ambiente navideño perfecto para toda la familia.",
    ctaTexto: "Ver luces",
    ctaHref: "/categoria/luces",
    cta2Texto: "Decoración",
    cta2Href: "/categoria/decoracion",
    imagen: "https://picsum.photos/seed/navidalia-hero-luces/1600/700",
  },
];

export default function HeroCarrusel() {
  const [actual, setActual] = useState(0);
  const total = DIAPOSITIVAS.length;
  const siguiente = useCallback(
    () => setActual((i) => (i + 1) % total),
    [total],
  );
  const anterior = () => setActual((i) => (i - 1 + total) % total);

  useEffect(() => {
    const t = setInterval(siguiente, 5000);
    return () => clearInterval(t);
  }, [siguiente]);

  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative h-[460px] md:h-[520px]">
        {DIAPOSITIVAS.map((d, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === actual ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center"
              style={{ backgroundImage: `url('${d.imagen}')` }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navidad-verde/95 via-navidad-verde/80 to-navidad-rojo/50" />

            <div className="mx-auto flex h-full max-w-7xl items-center px-4">
              <div className="max-w-2xl text-white">
                <span className="inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-medium backdrop-blur">
                  {d.etiqueta}
                </span>
                <h1 className="mt-4 font-display text-4xl font-black leading-tight drop-shadow md:text-6xl">
                  {d.titulo}{" "}
                  <span className="text-navidad-oro">{d.destacado}</span>
                </h1>
                <p className="mt-4 max-w-xl text-lg text-emerald-50">
                  {d.descripcion}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href={d.ctaHref}
                    className="rounded-lg bg-white px-6 py-3 font-semibold text-navidad-verde shadow-lg transition-transform hover:scale-105"
                  >
                    {d.ctaTexto}
                  </Link>
                  <Link
                    href={d.cta2Href}
                    className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    {d.cta2Texto}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={anterior}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-xl text-white backdrop-blur transition-colors hover:bg-white/50"
      >
        ‹
      </button>
      <button
        onClick={siguiente}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-xl text-white backdrop-blur transition-colors hover:bg-white/50"
      >
        ›
      </button>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {DIAPOSITIVAS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActual(i)}
            aria-label={`Ir a la diapositiva ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === actual
                ? "w-7 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
