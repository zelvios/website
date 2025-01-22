/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,svelte,js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#303446',
        text: '#c6d0f5',
        surface: '#626880',
        accent: 'var(--accent-color)',
      },
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
