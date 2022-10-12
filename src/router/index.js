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
        path: "/archiveArticle",
        component: resolve => require(["../views/archiveArticle/ArchiveArticle.vue"], resolve),
        meta: {
            title: "文章归档"
        }
    },
    {
        path: "/categoriesArticle",
        component: resolve => require(["../views/categoryArticle/CategoryArticle.vue"], resolve),
        meta: {
            title: "文章分类"
        }
    },
    {
        path: "/tagsArticle",
        component: resolve => require(["../views/tagArticle/TagArticle.vue"], resolve),
        meta: {
            title: "文章标签"
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
    //匹配其他所有
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
        //smooth(平滑滚动),instant(瞬间滚动),默认值auto,实测效果等同于instant
        behavior: "smooth"
    });
    //关闭进度条
    NProgress.done();
});
//暴露router
export default router