import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'
// 动画效果的CSS集合 npm install animate.css
import animated from "animate.css";
import "./assets/css/index.css";
import "./assets/css/iconfont.css";
import "./assets/css/markdown.css";
import "./assets/css/vue-social-share/client.css";
// 日期时间工具 npm install dayjs --save
// import dayjs from "dayjs";
//qq、微博配置文件
import config from "./assets/js/config";
//自定义弹窗提示插件
import toastPlugin from "./plugins/toast/toastPlugin.js"
//自定义日期时间插件
import datePlugin from "@/plugins/date/datePlugin";
//axios
import axios from "axios";
import vueAxios from "vue-axios";
//无限加载
import InfiniteLoading from "vue-infinite-loading";
//弹幕插件
import { vueBaberrage } from "vue-baberrage";




// //日期全局过滤器
// Vue.filter("date", function(value) {
//   return dayjs(value).format("YYYY年MM月DD日");
// });
//
// Vue.filter("year", function(value) {
//   return dayjs(value).format("YYYY");
// });
//
// Vue.filter("hour", function(value) {
//   return dayjs(value).format("HH:mm:ss");
// });
//
// Vue.filter("time", function(value) {
//   return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
// });
//
// Vue.filter("num", function(value) {
//   if (value >= 1000) {
//     return (value / 1000).toFixed(1) + "k";
//   }
//   return value;
// });
//向Vue原型上添加config
Vue.prototype.config = config;
//关闭生产提示
Vue.config.productionTip = false
//使用插件
Vue.use(animated);
Vue.use(toastPlugin);
Vue.use(datePlugin);
Vue.use(vueAxios, axios);
Vue.use(InfiniteLoading);
Vue.use(vueBaberrage);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
