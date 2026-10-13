/**
 * Logos de las marcas de tarjeta como SVG en línea (no dependen de imágenes
 * externas, siempre cargan). Y utilidad para detectar la marca por el número.
 */

export type MarcaTarjeta =
  "visa" | "mastercard" | "amex" | "discover" | "desconocida";

/** Detecta la marca de la tarjeta por sus primeros dígitos. */
export function detectarMarca(numero: string): MarcaTarjeta {
  const n = numero.replace(/\D/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^3[47]/.test(n)) return "amex";
  if (/^6(011|5|4[4-9])/.test(n)) return "discover";
  return "desconocida";
}

export const NOMBRE_MARCA: Record<MarcaTarjeta, string> = {
  visa: "Visa",
  mastercard: "Mastercard",
  amex: "American Express",
  discover: "Discover",
  desconocida: "Tarjeta",
};

function Visa({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} role="img" aria-label="Visa">
      <rect width="48" height="32" rx="4" fill="#1434CB" />
      <text
        x="24"
        y="21"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="13"
        fontStyle="italic"
        fill="#fff"
      >
        VISA
      </text>
    </svg>
  );
}

function Mastercard({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={className}
      role="img"
      aria-label="Mastercard"
    >
      <rect width="48" height="32" rx="4" fill="#16181d" />
      <circle cx="20" cy="16" r="8" fill="#EB001B" />
      <circle cx="28" cy="16" r="8" fill="#F79E1B" />
      <path d="M24 10.2a8 8 0 0 0 0 11.6 8 8 0 0 0 0-11.6Z" fill="#FF5F00" />
    </svg>
  );
}

function Amex({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={className}
      role="img"
      aria-label="American Express"
    >
      <rect width="48" height="32" rx="4" fill="#2E77BC" />
      <text
        x="24"
        y="19"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="8"
        fill="#fff"
      >
        AMEX
      </text>
    </svg>
  );
}

function Discover({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={className}
      role="img"
      aria-label="Discover"
    >
      <rect width="48" height="32" rx="4" fill="#16181d" />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="7"
        fill="#fff"
      >
        DISCOVER
      </text>
      <circle cx="40" cy="16" r="5" fill="#F76E11" />
    </svg>
  );
}

function Generica({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={className}
      role="img"
      aria-label="Tarjeta"
    >
      <rect width="48" height="32" rx="4" fill="#9ca3af" />
      <rect
        x="6"
        y="12"
        width="36"
        height="4"
        rx="1"
        fill="#fff"
        opacity="0.9"
      />
      <rect
        x="6"
        y="20"
        width="16"
        height="3"
        rx="1"
        fill="#fff"
        opacity="0.7"
      />
    </svg>
  );
}

/** Logo de una marca concreta. */
export function LogoTarjeta({
  marca,
  className = "h-7 w-11",
}: {
  marca: MarcaTarjeta;
  className?: string;
}) {
  switch (marca) {
    case "visa":
      return <Visa className={className} />;
    case "mastercard":
      return <Mastercard className={className} />;
    case "amex":
      return <Amex className={className} />;
    case "discover":
      return <Discover className={className} />;
    default:
      return <Generica className={className} />;
  }
}

/** Fila con los logos de las marcas aceptadas. */
export function MarcasAceptadas({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <Visa className="h-6 w-9" />
      <Mastercard className="h-6 w-9" />
      <Amex className="h-6 w-9" />
      <Discover className="h-6 w-9" />
    </span>
  );
}
