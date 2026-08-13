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
        background: "#FFFDF9",
        foreground: "#2D3748",
        primary: {
          DEFAULT: "#FF85A1",
          hover: "#FF6B8B",
          light: "#FFEBF0",
        },
        secondary: {
          DEFAULT: "#A8E6CF",
          hover: "#88D8B0",
          light: "#E8F8F2",
        },
        accent: {
          DEFAULT: "#FFD3B6",
          hover: "#FFC09F",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
