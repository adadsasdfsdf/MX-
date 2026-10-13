/**
 * Iconos SVG por categoría navideña, más detallados y reconocibles.
 * Usan trazo redondeado y pequeños detalles para verse más pulidos.
 */
type IconProps = { className?: string };
const S = (className?: string) => `${className ?? ""}`;

function Arboles({ className }: IconProps) {
  // Pino con tronco, estrella y adornos
  return (
    <svg
      viewBox="0 0 24 24"
      className={S(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 2.5 8.5 8h2L7 13h2.5L6 18h12l-3.5-5H17l-3.5-5h2L12 2.5Z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M9.5 20h5" />
      <path d="M12 18v2" />
      <circle cx="10.5" cy="11.5" r=".6" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="14.5" r=".6" fill="currentColor" stroke="none" />
      <circle cx="11" cy="15.5" r=".6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Esferas({ className }: IconProps) {
  // Esfera con tapa y brillo
  return (
    <svg
      viewBox="0 0 24 24"
      className={S(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="14" r="6.5" fill="currentColor" fillOpacity="0.12" />
      <path d="M10 4.5h4v2.2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4.5Z" />
      <path d="M12 7.7v-1" />
      <path d="M9 12.5c1.6-1.2 4.4-1.2 6 0" />
      <path d="M9.6 10.2c.6-.3 1.2-.4 1.8-.4" strokeWidth="1" />
    </svg>
  );
}

function Luces({ className }: IconProps) {
  // Cable con foquitos
  return (
    <svg
      viewBox="0 0 24 24"
      className={S(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6c3 3.2 6 3.2 9 0s6-3.2 9 0" />
      <path d="M6.3 8.2v1.6M12 7v1.6M17.7 8.2v1.6" />
      <path
        d="M5 13.5a1.6 1.6 0 1 0 2.6-1.9A1.6 1.6 0 0 0 5 13.5Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M10.7 12.6a1.6 1.6 0 1 0 2.6-1.9 1.6 1.6 0 0 0-2.6 1.9Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
      <path
        d="M16.4 13.5a1.6 1.6 0 1 0 2.6-1.9 1.6 1.6 0 0 0-2.6 1.9Z"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

function Decoracion({ className }: IconProps) {
  // Corona navideña
  return (
    <svg
      viewBox="0 0 24 24"
      className={S(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="7.5" strokeDasharray="2 2.5" />
      <circle cx="12" cy="12" r="3.5" fill="currentColor" fillOpacity="0.1" />
      <path d="M12 19.5v1.5" />
      <path d="M10.5 20.5h3" />
      <circle cx="12" cy="4.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Regalos({ className }: IconProps) {
  // Caja de regalo con moño
  return (
    <svg
      viewBox="0 0 24 24"
      className={S(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="4"
        y="9.5"
        width="16"
        height="10.5"
        rx="1.2"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path d="M4 13h16" />
      <path d="M12 9.5V20" />
      <path d="M12 9.5C10.8 6.5 7 5.8 7 8.3c0 1.6 2.8 1.2 5 1.2Z" />
      <path d="M12 9.5C13.2 6.5 17 5.8 17 8.3c0 1.6-2.8 1.2-5 1.2Z" />
    </svg>
  );
}

function Ropa({ className }: IconProps) {
  // Suéter navideño
  return (
    <svg
      viewBox="0 0 24 24"
      className={S(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M8 4 4 7l1.7 2.6 1.3-.8V20h10V8.8l1.3.8L20 7l-4-3-1.6 1.6a2.4 2.4 0 0 1-2.8 0L8 4Z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path d="M10 13l1 1 2.5-2.5" />
    </svg>
  );
}

function Dulces({ className }: IconProps) {
  // Bastón de caramelo
  return (
    <svg
      viewBox="0 0 24 24"
      className={S(className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M8 20V11a4 4 0 0 1 8 0v1"
        strokeWidth="2.4"
        strokeOpacity="0.25"
      />
      <path d="M8 20V11a4 4 0 0 1 8 0v1" />
      <path
        d="M8 15.5v1M8 18v1M10.5 8.2l1 1M12.5 7l1 1M15 8.5l.6.6"
        strokeWidth="1"
      />
    </svg>
  );
}

const ICONOS: Record<string, (p: IconProps) => JSX.Element> = {
  arboles: Arboles,
  esferas: Esferas,
  luces: Luces,
  decoracion: Decoracion,
  regalos: Regalos,
  ropa: Ropa,
  dulces: Dulces,
};

export default function CategoriaIcono({
  categoria,
  className = "h-7 w-7",
}: {
  categoria: string;
  className?: string;
}) {
  const Icono = ICONOS[categoria];
  if (!Icono) return null;
  return <Icono className={className} />;
}
