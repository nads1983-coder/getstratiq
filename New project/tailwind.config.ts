import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17111F",
        plum: "#4B1F6F",
        gold: "#D4AF37",
        mist: "#F6F5F8",
        line: "#E5E0EA",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 22px 70px rgba(38, 20, 58, 0.12)",
        edge: "0 1px 0 rgba(75, 31, 111, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
