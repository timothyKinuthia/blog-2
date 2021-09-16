module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        ds: "'Dancing Script', cursive"
      },
      colors: {
        orange: "#DD6E0F",
        ro: "#ff4500",
        neon: "#ff1818",
        red: "#ff0000",
        green: "#41ff07",
        dg: "#3ac900"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
