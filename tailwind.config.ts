import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17111f",
        plum: "#4B1F6F",
        gold: "#D4AF37",
        line: "#e5e0ea",
      },
      boxShadow: {
        soft: "0 22px 70px rgba(31, 20, 45, 0.10)",
        edge: "0 1px 0 rgba(23,17,31,0.05)",
      },
    },
  },
  plugins: [],
};
export default config;
