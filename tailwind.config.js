module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "board-size": "var(--board-size)",
        "board-gap": "var(--board-gap)",
        "cell-size": "var(--cell-size)",
      },
      colors: {
        board: "#AD9D8F",
        cell: "#C1B4A4",
      },
      keyframes: {
        expand: {
          from: {
            transform: "scale(0.4)",
            visibility: "visible",
          },
          to: {
            transform: "scale(1)",
            visibility: "visible",
          },
        },
      },
      animation: {
        "expand-forward": "expand 0.2s forwards",
        "expand-forward-delayed": "expand 0.2s 0.2s forwards",
      },
    },
  },
  plugins: [],
};
