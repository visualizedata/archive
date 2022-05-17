/* eslint-env node */

module.exports = {
  content: ['./app/**/*.{vue,js}'],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif'],
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
      width: {
        container: '90rem',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
