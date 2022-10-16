# tx-blog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




# 导入框架、插件

##  Vuetify
```shell
vue add vuetify
```

## 日期时间工具
```shell
 npm install dayjs --save
```

## 打字机效果
```shell
npm install easy-typer-js --save
```
> https://github.com/pengqiangsheng/easy-typer-js
## css预处理器：stylus-loader
```shell
npm install  stylus@0.54.7 stylus-loader@3.0.2  -save
```

## axios
```shell
npm install axios -save
```
## vue-axios
```shell
npm install vue-axios -save
```

## markdown-it插件
中文文档
>https://markdown-it.docschina.org/
 
```shell
npm install markdown-it --save
```
## 语法高亮
```shell
npm install highlight.js
```
## 剪切板功能
```shell
npm install clipboard --save
```
## 目录生成
https://github.com/tscanlin/tocbot
```shell
npm i tocbot
```
## 基于photoswipe实现的vue图片预览组件vue-image-swipe
```shell
npm install vue-image-swipe
```
## vue-social-share 分享网页
> https://github.com/overtrue/share.js
```shell
npm install vue-social-share
```

## vue-infinite-loading无限加载
```shell
npm install vue-infinite-loading --save
```

## nprogress 进度条
```shell
npm install nprogress --save
```

## vue-baberrage 弹幕插件
```shell
npm install vue-baberrage --save
```
### webpack5中缺少polyfills
#### 安装 node-polyfill-webpack-plugin
```shell
npm install node-polyfill-webpack-plugin
```
#### vue.config.js中修改配置

改前
```js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

```
改后
```js
const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
  },
  transpileDependencies: [
    'vuetify'
  ]
})

```

## Vue Cute Timeline是一个好看的时间轴组件
```shell
npm i vue-cute-timeline
或
yarn add vue-cute-timeline
```

## Vue头像裁剪器 - vue-avatar-cropper
不指定版本可能会报错
```shell
npm install vue-avatar-cropper@1.0.9
```

