/**
 * Logo de Navidalia: un reno de Navidad en caricatura (con nariz roja),
 * los colores navideños. Reutilizable en header, footer y favicon.
 */
export function LogoIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Navidalia reno"
    >
      {/* Fondo circular */}
      <circle cx="32" cy="32" r="30" fill="#1b5e3b" />
      <circle cx="32" cy="32" r="24" fill="#fdf6ec" />

      {/* Astas */}
      <g stroke="#8d5524" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M22 20c-2-3-5-3-6-6" />
        <path d="M16 16c-2 0-3-1-4-2" />
        <path d="M18 14c-1-1-1-2-1-4" />
        <path d="M42 20c2-3 5-3 6-6" />
        <path d="M48 16c2 0 3-1 4-2" />
        <path d="M46 14c1-1 1-2 1-4" />
      </g>

      {/* Orejas */}
      <ellipse
        cx="20"
        cy="30"
        rx="4.5"
        ry="7"
        fill="#a56a3a"
        transform="rotate(-20 20 30)"
      />
      <ellipse
        cx="44"
        cy="30"
        rx="4.5"
        ry="7"
        fill="#a56a3a"
        transform="rotate(20 44 30)"
      />

      {/* Cara */}
      <ellipse cx="32" cy="38" rx="15" ry="13" fill="#c68642" />
      {/* Hocico */}
      <ellipse cx="32" cy="44" rx="9" ry="7" fill="#e8c9a0" />

      {/* Ojos */}
      <circle cx="26" cy="36" r="2.2" fill="#2b2b2b" />
      <circle cx="38" cy="36" r="2.2" fill="#2b2b2b" />
      <circle cx="26.7" cy="35.3" r="0.7" fill="#fff" />
      <circle cx="38.7" cy="35.3" r="0.7" fill="#fff" />

      {/* Nariz roja brillante */}
      <circle cx="32" cy="44" r="4" fill="#c1121f" />
      <circle cx="30.6" cy="42.6" r="1.2" fill="#ff6b6b" />

      {/* Sonrisa */}
      <path
        d="M28 48c2 2 6 2 8 0"
        stroke="#8d5524"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Logo con texto para header y footer. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoIcon className="h-11 w-11" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-2xl font-black tracking-tight text-navidad-verde">
          Navi<span className="text-navidad-rojo">dalia</span>
        </span>
        <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-navidad-oro">
          Magia Navideña 🎄
        </span>
      </span>
    </span>
  );
}
