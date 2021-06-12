module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "grand-hotel": ["Grand Hotel", "cursive"],
      },
      colors: {
        instablue: {
          default: "#0095f6",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
