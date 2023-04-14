module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-import"),
    require("tailwindcss"),
    require("postcss-pxtorem")({
      remUnit: 75, // 在 750px 屏幕下，1px = 75rem
    }),
  ],
};
