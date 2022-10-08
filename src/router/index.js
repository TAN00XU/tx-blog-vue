import Vue from "vue";
import VueRouter from "vue-router";
/*加载进度条*/
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// NProgress.configure({ showSpinner: false }); // 显示右上角螺旋加载提示
Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        component: resolve => require(["../views/home/HomePage.vue"], resolve),
        meta: {
            title: "主页"
        }
    },
    {
        path: "/friendlyLink",
        component: resolve => require(["../views/friendlyLink/FriendlyLink.vue"], resolve),
        meta: {
            title: "友链列表"
        }
    },
    {
        path: "/aboutMe",
        component: resolve => require(["../views/aboutMe/AboutMe.vue"], resolve),
        meta: {
            title: "关于我"
        }
    },
    {
        path: "/messageBoard",
        component: resolve => require(["../views/messageBoard/MessageBoard.vue"], resolve),
        meta: {
            title: "留言板"
        }
    },
    //匹配所有
    {
        path: '*',
        component: resolve => require(["../views/home/HomePage.vue"], resolve)
    }
];

const router = new VueRouter({
    mode: "history",
    // base: process.env.BASE_URL,
    routes
});

//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    //开启进度条
    NProgress.start();
    next();
});
//全局后置路由守卫————初始化的时候被调用、每次路由切换之后被调用
// eslint-disable-next-line no-unused-vars
router.afterEach((to,from) => {
    /*切换标签名*/
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    window.scrollTo({
        top: 0,
        behavior: "instant"
    });
    //关闭进度条
    NProgress.done();
});
//暴露router
export default router