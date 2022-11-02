const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  daisyui: {
    themes: [
      {
        algoryTheme: {
          "primary": "#ccf7ff",
          "secondary": "#d8438d",
          "accent": "#1109b7",
          "neutral": "#2E2730",
          "base-100": "#EDEDED",
          "info": "#98C5E7",
          "success": "#0F5738",
          "warning": "#E9B816",
          "error": "#EB5659",
        }
      }
    ]
  },
  plugins: [/*require("@tailwindcss/typography"), */require('daisyui')]
};

module.exports = config;