/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        main: '2fr 5fr',
      },
      borderRadius: {
        DEFAULT: '34px',
      },
      colors: {
        gray: '#eaeaea',
        blue: '#303e87',
        'light-blue': '#ccdcff',
      },
    },
  },
  plugins: [],
};
