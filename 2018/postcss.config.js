module.exports = {
  // 需要使用的插件列表
  plugins: [
    require('postcss-preset-env') // 可以让你使用下一代 CSS 语法编写代码，通过 PostCSS 转换成目前的浏览器可识别的 CSS，并且该插件还包含给 CSS 自动加前缀的功能
  ]
}