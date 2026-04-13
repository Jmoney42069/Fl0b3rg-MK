import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1B2B4B",
          light: "#2D4470",
        },
        accent: {
          DEFAULT: "#C9A96E",
          light: "#E8D5A3",
        },
        neutral: {
          dark: "#1A1A1A",
          mid: "#6B7280",
          light: "#F8F7F4",
        },
        success: "#16A34A",
        error: "#DC2626",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(27, 43, 75, 0.08)",
        "card-hover": "0 8px 32px rgba(27, 43, 75, 0.16)",
        gold: "0 0 0 2px rgba(201, 169, 110, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
