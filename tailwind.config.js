/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        // Define additional font configurations
        mont: ['var(--font-mont)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
