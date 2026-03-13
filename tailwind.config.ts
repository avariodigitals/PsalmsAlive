import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:         '#0B1F3A',
        'navy-dark':  '#060f1d',
        'navy-mid':   '#0d1e35',
        cream:        '#F7F3E9',
        gold:         '#C9A54C',
        'gold-light': '#E2C47A',
        brown:        '#5E4A3E',
        olive:        '#7B8A6B',
        sand:         '#E6D9C3',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        cinzel:   ['Cinzel', 'serif'],
        lato:     ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
