module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-import"),
    require("tailwindcss"),
    require('postcss-pxtorem')({
      rootValue: 37.5, // 设计稿宽度的1/10
      propList: ['*'], // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
      // exclude: /node_modules/i // 忽略的文件
    })
  ],
};