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
        md: '12px',
        lg: '18px',
      },
      colors: {
        gray: '#eaeaea',
        'cloud-gray': '#f4f4f4',
        blue: '#303e87',
        'light-blue': '#ccdcff',
        shadow: '#dfe0e5',
        smoke: '#cbccc8',
      },
      keyframes: {
        show: {
          '0%': {
            transform: 'translateY(-20px)',
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: 1,
            visibility: 'visible',
          },
        },
        hide: {
          '0%': { transform: 'translateY(0px)' },
          '100%': {
            transform: 'translateY(-20px)',
            opacity: 0,
            visibility: 'hidden',
          },
        },
      },
      animation: {
        show: 'show 0.3s ease-out forwards',
        hide: 'hide 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
