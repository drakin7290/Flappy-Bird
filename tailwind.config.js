const { join } = require('path');

module.exports = {
  content: [
    join(__dirname, './pages/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './components/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './layout/**/*.{js,ts,jsx,tsx}'),
    join(__dirname, './containers/**/*.{js,ts,jsx,tsx}'),
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    fontFamily: {
      sans: 'var(--font-sans)',
    },
    extend: {
      backgroundColor: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
      },
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        grayText: 'var(--text-gray)',
        darkGray: 'var(--dark-gray)',
      },
      boxShadow: {
        base: '0px 2px 10px var(--box-shadow)',
        second: '0px 2px 10px var(--box-shadow-2)',
      },
      flex: {
        '1/2': '0 0 calc(50% - 10px)',
        '1/3': '0 0 calc(33.333% - 10px)',
      },
      maxWidth: {
        'screen-xl': '1360px',
      },
      aspectRatio: {
        '3/2': '420 / 336',
        '2/3': '270 / 336',
        '10/9': '10 / 9',
      },
    },
  },
  plugins: [],
};
