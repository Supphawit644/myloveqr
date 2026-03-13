/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./templates/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0b0f",
        primary: "#ff2e88",
        glow: "#ff6aa9",
        soft: "#ffc1dd",
        card: "#14141c"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "SF Pro Text", "ui-sans-serif", "sans-serif"],
        display: ["var(--font-inter)", "ui-serif", "Georgia", "serif"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 46, 136, 0.45)"
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at top, rgba(255, 46, 136, 0.22), transparent 60%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;

