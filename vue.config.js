const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  //node-polyfill-webpack-plugin
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  transpileDependencies: [
    'vuetify'
  ],
  //配置代理
  devServer: {
    // 外部浏览器可访问
    // disableHostCheck: true,
    // historyApiFallback: true,
    allowedHosts: "all",
    proxy: {
      "/api": {
        target: "http://localhost:8888",
        changeOrigin: true,
        pathRewrite: {"^/api": ""}
      }
    }
  },
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin  开启extract后，组件样式以内部样式表的形式加载的, 打包的结果会多出一个 css 文件夹以及css 文件。
    sourceMap: true, // 开启 CSS source maps?
  }
})
