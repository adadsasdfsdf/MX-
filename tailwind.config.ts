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
        // Paleta navideña
        navidad: {
          rojo: "#c1121f", // rojo navideño
          rojoOscuro: "#8d0801",
          verde: "#1b5e3b", // verde pino
          verdeClaro: "#2d8659",
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
