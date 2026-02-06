/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        xl: '24px',
        '2xl': '40px',
      },
      // Ensure backdrop-filter is supported
      supports: {
        'backdrop-blur': 'backdrop-filter: blur(0px)',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
