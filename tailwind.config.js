module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#C99037',
        secondary: '#f9de59',
        third: '#91a192',
        'light-primary': '#f9f3eb',
        'gray-1': '#eaf0ed',
      },
      backgroundPosition: {
        'left-input': '1rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
