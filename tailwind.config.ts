import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B1D3A',
        redAccent: '#C62828',
        cream: '#F7F1E3'
      }
    }
  },
  plugins: []
};
export default config;
