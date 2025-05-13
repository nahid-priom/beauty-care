/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      animation: {
        'soft-pulse': 'softPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        softPulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.98)' },
        },
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