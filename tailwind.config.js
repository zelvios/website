/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,svelte,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#030014',
        text: '#cdd6f4',
        surface: '#626880',
        surface1: '#45475a',
        accent: '#cba6f7',
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
