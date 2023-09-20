/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        oswald: ['Oswald', ...defaultTheme.fontFamily.sans],
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        primary: '#FFDEBE',
        secondary: '#9980FF',
        third: '#FF7145',
        fourth: 'var(--White, #F6F6F6)'
      }
    }
  },
  plugins: [nextui()]
};
