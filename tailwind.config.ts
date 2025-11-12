import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f9ff",
          100: "#e3f2ff",
          200: "#baddff",
          300: "#8fc9ff",
          400: "#55abff",
          500: "#2d8cff",
          600: "#1b6bdb",
          700: "#1352ac",
          800: "#0c3b7c",
          900: "#06224d"
        }
      }
    }
  },
  plugins: []
};

export default config;
