import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── Neural Light Editorial — Design Tokens ───────────────────────
        primary: "#006571",
        "primary-dim": "#005863",
        "primary-fixed": "#00e3fd",
        "primary-fixed-dim": "#00d4ec",
        "primary-container": "#00e3fd",
        "on-primary": "#d8f8ff",
        "on-primary-fixed": "#003840",
        "on-primary-fixed-variant": "#005762",
        "on-primary-container": "#004d57",

        secondary: "#7a23dc",
        "secondary-dim": "#6e04cf",
        "secondary-fixed": "#e1c7ff",
        "secondary-fixed-dim": "#d6b6ff",
        "secondary-container": "#e1c7ff",
        "on-secondary": "#faefff",
        "on-secondary-fixed": "#4a0090",
        "on-secondary-fixed-variant": "#6f08d0",
        "on-secondary-container": "#6300bd",

        tertiary: "#00666a",
        "tertiary-dim": "#00595d",
        "tertiary-fixed": "#00f4fe",
        "tertiary-fixed-dim": "#00e5ee",
        "tertiary-container": "#00f4fe",
        "on-tertiary": "#c9fcff",
        "on-tertiary-fixed": "#004346",
        "on-tertiary-fixed-variant": "#006266",
        "on-tertiary-container": "#00575b",

        // ─── Surface Scale ─────────────────────────────────────────────────
        surface: "#f5f7f9",
        "surface-bright": "#f5f7f9",
        "surface-dim": "#d0d5d8",
        "surface-variant": "#d9dde0",
        "surface-tint": "#006571",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eef1f3",
        "surface-container": "#e5e9eb",
        "surface-container-high": "#dfe3e6",
        "surface-container-highest": "#d9dde0",

        // ─── On-Surface ────────────────────────────────────────────────────
        "on-surface": "#2c2f31",
        "on-surface-variant": "#595c5e",
        "inverse-surface": "#0b0f10",
        "inverse-on-surface": "#9a9d9f",
        "inverse-primary": "#00e3fd",

        // ─── Utility ───────────────────────────────────────────────────────
        background: "#f5f7f9",
        "on-background": "#2c2f31",
        outline: "#747779",
        "outline-variant": "#abadaf",

        // ─── Semantic ──────────────────────────────────────────────────────
        error: "#b31b25",
        "error-dim": "#9f0519",
        "error-container": "#fb5151",
        "on-error": "#ffefee",
        "on-error-container": "#570008",
      },

      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },

      fontFamily: {
        headline: ["Space Grotesk", "sans-serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Space Grotesk", "sans-serif"],
      },

      letterSpacing: {
        "label-sm": "0.05em",
        "label-lg": "0.1em",
      },

      boxShadow: {
        "neural-cyan": "0px 20px 40px rgba(0, 227, 253, 0.08)",
        "neural-purple": "0px 20px 40px rgba(122, 35, 220, 0.06)",
        "neural-lift":
          "0px 8px 60px rgba(44, 47, 49, 0.04), 0px 2px 8px rgba(44, 47, 49, 0.03)",
      },

      backdropBlur: {
        "2xl": "40px",
        "3xl": "60px",
      },

      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 6s linear infinite",
        ping: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
