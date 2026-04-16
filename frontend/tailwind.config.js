export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold:    { DEFAULT: "#FFD700", light: "#FFF3B0", dark: "#B8860B" },
        bgDark:  "#0a0a0a",
        bgCard:  "#111111",
      },
      animation: {
        shimmer:  "shimmer 2s infinite",
        coinfall: "coinfall 3s ease-in infinite",
      },
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center"  },
        },
        coinfall: {
          "0%":   { transform: "translateY(-100px) rotate(0deg)", opacity: 1 },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: 0 },
        }
      }
    }
  },
  plugins: []
};