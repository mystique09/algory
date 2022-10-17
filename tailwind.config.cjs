const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "primary": "#034078",
        "secondary": "#FEFCFB",
        "accent": "#1282A2"
      }
    }
  },

  plugins: [require('daisyui')]
};

module.exports = config;