module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function({ addBase }) {
      addBase({
        // Additional iOS button fixes at the Tailwind level
        'button': {
          '-webkit-tap-highlight-color': 'transparent !important',
          '-webkit-touch-callout': 'none',
          '-webkit-user-select': 'none',
          'user-select': 'none',
          'outline': 'none !important',
          '-webkit-appearance': 'none',
          '-moz-appearance': 'none',
          'appearance': 'none',
        },
        'button:focus, button:active, button:hover:focus': {
          'outline': 'none !important',
          'box-shadow': 'none !important',
          'background-color': 'inherit',
          'transform': 'none !important',
        },
        'button:focus-visible': {
          'outline': 'none !important',
        },
        'button::-moz-focus-inner': {
          'border': '0',
          'padding': '0',
        }
      })
    }
  ]
};