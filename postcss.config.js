module.exports = {
    plugins: [
      require('postcss-px2rem')({
        remUnit: 75 // 在 750px 屏幕下，1px = 75rem
      })
    ]
  };