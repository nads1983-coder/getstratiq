import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#19151F",
        muted: "#625A6B",
        plum: "#4B1F6F",
        gold: "#D4AF37",
        line: "#E9E5EE",
        panel: "#FAF8FC"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(33, 20, 47, 0.10)",
        edge: "0 1px 0 rgba(25, 21, 31, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
