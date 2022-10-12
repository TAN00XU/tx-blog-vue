import ToastComponent from "./ToastComponent.vue"; // 引入先前写好的vue

const toastPlugin = {};

// 注册Toast插件
toastPlugin.install = function(Vue) {
  // 生成一个Vue的子类
  const ToastConstructor = Vue.extend(ToastComponent);
  // 生成一个该子类的实例
  const instance = new ToastConstructor();

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法
  // 其中的duration是持续时间
  Vue.prototype.$toast = (options, duration = 2500) => {
    instance.message = options.message;
    instance.type = options.type;
    instance.show = true;

    //定时器控制消失
    setTimeout(() => {
      instance.show = false;
    }, duration);
  };
};

export default toastPlugin;
