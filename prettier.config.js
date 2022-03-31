module.exports = {
  printWidth: 100, // 最大长度100个字符
  tabWidth: 2, // 缩进
  useTabs: false, // 使用tab还是空格
  semi: false, // 行末分号
  singleQuote: true, // 单引号
  quoteProps: 'as-needed', // 引用对象中的属性时更改 - 仅在需要时在对象属性周围添加引号
  jsxSingleQuote: false, // JSX双引号
  trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  bracketSpacing: true, // 在对象文字中打印括号之间的空格。
  bracketSameLine: false, // 是否单独放一行
  arrowParens: 'always', // 箭头函数参数周围加上括号（默认）在所有情况下都需要参数。
  vueIndentScriptAndStyle: true, // 缩进Vue文件中的脚本和样式标签
  htmlWhitespaceSensitivity: 'ignore',
  endOfLine: 'lf', // 行尾换行格式
}
