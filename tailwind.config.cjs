/* eslint-env node */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{vue,js}'],
  theme: {
    fontFamily: {
      'sans': ['neue-regular', 'sans-serif'],
      'mono': ['Fira Mono', 'monospace'],
      'neue-regular': ['neue-regular', 'sans-serif'],
      'neue-display-black': ['neue-display-black', 'sans-serif'],
      'neue-display-random': ['neue-display-random', 'sans-serif'],
      'neue-display-ultra': ['neue-display-ultra', 'sans-serif'],
      'neue-display-wide': ['neue-display-wide', 'sans-serif'],
    },
    extend: {
      colors: {
        'tns-red': '#E82E21',
        'background': 'var(--background, #FFF)',
        'text': 'var(--text, #000)',
      },
      background: {
        'tns-red': '#E82E21',
        'background': 'var(--background, #FFF)',
        'text': 'var(--text, #000)',
      },
      width: {
        container: '90rem',
      },
    },
  },
  plugins: [
    // enables "line-clamp-[number]" css class
    require('@tailwindcss/line-clamp'),
  ],
}
