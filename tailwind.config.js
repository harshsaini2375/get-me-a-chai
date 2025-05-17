/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        rise: "rise 15s infinite ease-in",
      },
      keyframes: {
        rise: {
          "0%": { bottom: "-100px", transform: "translateX(0)" },
          "50%": { transform: "translateX(100px)" },
          "100%": { bottom: "1000px", transform: "translateX(-200px)" },
        },
      },
    },
  },
  plugins: [],
};
