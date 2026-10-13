/** Iconos SVG por categoría navideña, estilo línea, claros y reconocibles. */
type IconProps = { className?: string };
const base = "stroke-current";

function Arboles({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 7 9h3l-3 4h3l-3 4h12l-3-4h3l-3-4h3L12 3Z" />
      <path d="M12 17v4" />
    </svg>
  );
}
function Esferas({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="14" r="7" />
      <path d="M12 7V4" />
      <path d="M10 4h4" />
      <path d="M7 12c3 2 7 2 10 0" />
    </svg>
  );
}
function Luces({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6c3 3 6 3 9 0s6-3 9 0" />
      <path d="M6 8v2.5" />
      <path d="M12 7v2.5" />
      <path d="M18 8v2.5" />
      <circle cx="6" cy="12" r="1.6" />
      <circle cx="12" cy="11.5" r="1.6" />
      <circle cx="18" cy="12" r="1.6" />
    </svg>
  );
}
function Decoracion({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </svg>
  );
}
function Regalos({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M4 13h16" />
      <path d="M12 9v11" />
      <path d="M12 9c-1-3-5-4-5-1 0 2 3 1 5 1Z" />
      <path d="M12 9c1-3 5-4 5-1 0 2-3 1-5 1Z" />
    </svg>
  );
}
function Ropa({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 4 4 7l2 3 2-1v10h8V9l2 1 2-3-4-3-2 2a2.5 2.5 0 0 1-4 0L8 4Z" />
    </svg>
  );
}
function Dulces({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.6"
      className={`${base} ${className}`}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 15 9a4 4 0 0 1 0 6l-8 8" transform="translate(-1 -4)" />
      <path d="M6 18c-2 0-3-1-3-3s2-3 4-3" />
      <path d="M18 6c2 0 3 1 3 3s-2 3-4 3" />
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
