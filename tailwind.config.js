module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'enviroment': '#0C090A',
        'midenv': '#FFFFC2',
        'btn__do': '#0C090A',
        'btn__do-border': '#16F529',
        'btn__navigate': '',
        'btn__navigate-border': '',
        'btn__back': '',
        'btn__back-border': '',
        'btn__primary': '#f97316',
        'btn__secondary': '#fdba74',
      },
    backgroundImage: {
      'notpad': "url('assets/texture.png')"
      },
    },
  },
  plugins: [],
}
