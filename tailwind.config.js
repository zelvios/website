/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,svelte,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#1e1e2e',
        text: '#cdd6f4',
        surface: '#626880',
        accent: '#f38ba8',
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
