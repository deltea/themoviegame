/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,svelte,js,ts}"],
  theme: {
    fontFamily: {
      "sans": ["Inter Variable"]
    },
    extend: {
      colors: {
        "imdb": "#e2b616",
      },
      fontFamily: {
        "impactt": ["ImpactT"],
      },
    },
  },
  plugins: [],
}

