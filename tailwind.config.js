/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        secondary: "#9333ea",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimPurple: "rgba(147, 51, 234, 0.1)",
        purple: {
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
        },
        gray: {
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        underline: "underline 0.3s ease-in-out",
        marquee: "marquee 30s linear infinite",
        fade: "fade 6s infinite",
        'fade-delay-3': "fade 6s infinite 2s",
        'fade-delay-6': "fade 6s infinite 4s",
      },
      keyframes: {
        underline: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fade: {
          "0%, 100%": { opacity: "0" },
          "20%, 80%": { opacity: "1" },
        },
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};