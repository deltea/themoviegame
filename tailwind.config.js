/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  theme: {
    fontFamily: {
      "sans": ["Roboto Condensed Variable"]
    },
    height: {
      "screen": "100dvh",
    },
    extend: {
      colors: {
        "imdb": "#e2b616",
        "muted": "#555",
      },
      fontFamily: {
        "impactt": ["ImpactT"],
      },
    },
  },
  plugins: [],
}

