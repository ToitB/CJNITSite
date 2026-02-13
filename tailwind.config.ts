import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './App.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-montserrat)', 'sans-serif'],
        subheading: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#005596',
          cyan: '#00AEEF',
          dark: '#020617',
          orange: '#ffaa40',
          orangeHighlight: '#FF8C00',
        },
      },
      cursor: {
        none: 'none',
      },
    },
  },
  plugins: [],
};

export default config;
