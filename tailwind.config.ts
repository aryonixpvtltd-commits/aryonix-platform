import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#04071A",
        surface: "#080D24",
        primary: "#1A6FFF",
        secondary: "#4DA3FF",
        text: "#E8EEFF",
        accent: "#C8D4E8",
        line: "rgba(200, 212, 232, 0.16)"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(26, 111, 255, 0.34)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "radial-blue": "radial-gradient(circle at top, rgba(26,111,255,.28), transparent 38%)",
        "grid-lines":
          "linear-gradient(rgba(232,238,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(232,238,255,.055) 1px, transparent 1px)"
      },
      borderRadius: {
        xl: "8px",
        "2xl": "12px"
      }
    }
  },
  plugins: []
};

export default config;
