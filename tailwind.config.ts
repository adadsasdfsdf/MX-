import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta navideña con el ROJO como color principal.
        // Nota: "verde" ocupa la posición del color principal del tema y por
        // eso se le asignó el rojo navideño (así todo el sitio queda en rojo
        // sin tocar cada componente). El verde real queda como acento.
        navidad: {
          // Color principal del tema (usado en botones, logo, enlaces).
          verde: "#c1121f", // rojo navideño (principal)
          verdeClaro: "#e02234", // rojo más claro para hover
          // "rojo" se usa en barras promocionales / etiquetas: un rojo más
          // profundo para contrastar con el principal.
          rojo: "#8d0801", // rojo profundo
          rojoOscuro: "#6a0400",
          // Verde real, como acento navideño.
          acento: "#1b5e3b",
          oro: "#d4af37", // dorado
          crema: "#fdf6ec", // crema cálida
          nieve: "#f4f8fb", // blanco nieve
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      keyframes: {
        caer: {
          "0%": { transform: "translateY(-10%)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0.3" },
        },
      },
      animation: {
        nevar: "caer linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
