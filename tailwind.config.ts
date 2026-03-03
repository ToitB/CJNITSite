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
          blue: '#03318C',
          cyan: '#3B8DBF',
          dark: '#020617',
          orange: '#F29216',
          orangeHighlight: '#BF5B04',
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
