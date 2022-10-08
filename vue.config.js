const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin  开启extract后，组件样式以内部样式表的形式加载的, 打包的结果会多出一个 css 文件夹以及css 文件。
    sourceMap: true, // 开启 CSS source maps?
  }
})
