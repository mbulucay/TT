/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      height: {
        128: "32rem",
        160: "40rem",
        176: "44rem",

        192: "48rem",
        256: "64rem",
      },
      width: {
        128: "32rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
        256: "64rem",
      },
      scale: {
        175: "1.75",
        180: "1.80",
        200: "2",
      },
      backgroundImage: {
        'login-bg': "url('./assets/img/loginbg.png')",
        'login2-bg': "url('./assets/img/loginbg2.png')",
        'havelsan-bg': "url('./assets/img/havelsan-bg.png')",

      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
