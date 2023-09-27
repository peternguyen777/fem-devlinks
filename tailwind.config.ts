import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        instrument: ["var(--font-instrument)"],
        "instrument-italic": ["var(--font-instrument-italic)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
