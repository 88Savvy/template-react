/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        papyrus: "#DCBF85",
      },
      textColor: {
        papyrus: "#DCBF85",
      },
      colors: {
        papyrus: "#DCBF85",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
