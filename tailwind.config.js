/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"]
      },
      screens: {
        xxxs: "360px",
        size: "370px",
        xxs: "390px",
        xs: "440px",
        ss: "620px",
        sm: "768px",
        md: "1040px",
      },
      colors: {
        headingColor: "#303030",
        brandColor: "#2D65F2",
        borderColor: "#F6F6F6",
        paraColor: "#6F6464"
      }
    },
  },
  plugins: [],
};