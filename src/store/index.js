import Vue from "vue";
import Vuex from "vuex";
// 持久化state
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

//准备actions对象——响应组件中用户的动作
const actions = {
    /**
     * 登录
     * @param context
     * @param value
     */
    login(context,value){
        context.commit('LOGIN',value)
    },
}
//准备mutations对象——修改state中的数据
const mutations = {

    /**
     * 博客信息赋值
     * @param state
     * @param blogInfo 博客信息
     * @constructor
     */
    BLOG_INFO(state, blogInfo) {
        // state.blogInfo = {...state.blogInfo, ...blogInfo}
        state.blogInfo=blogInfo
    },

    /**
     * 登录 写入用户信息
     * @param state
     * @param user 用户信息
     */
    LOGIN(state, user) {
        state.userInfo.userId = user.id;
        state.userInfo.avatar = user.avatar;
        state.userInfo.nickname = user.nickname;
        state.userInfo.intro = user.intro;
        state.userInfo.webSite = user.webSite;
        state.userInfo.articleLikeSet = user.articleLikeSet ? user.articleLikeSet : [];
        state.userInfo.commentLikeSet = user.commentLikeSet ? user.commentLikeSet : [];
        state.userInfo.talkLikeSet = user.talkLikeSet ? user.talkLikeSet : [];
        state.userInfo.email = user.email;
        state.userInfo.loginType = user.loginType;
    },

    /**
     * 退出登录
     * @param state
     * @constructor
     */
    LOGOUT(state) {
        state.userInfo = {}
    },

    /**
     * 改变用户邮箱号
     * @param state
     * @param email 邮箱号
     * @constructor
     */
    CHANGE_EMAIL(state, email) {
        state.userInfo.email = email
    },

    /**
     * 更新用户信息
     * @param state
     * @param user
     * @constructor
     */
    UPDATE_USER_INFO(state, user) {
        state.userInfo.nickname = user.nickname;
        state.userInfo.intro = user.intro;
        state.userInfo.webSite = user.webSite
    },

    /**
     * 更新用户头像
     * @param state
     * @param avatar
     * @constructor
     */
    UPDATE_AVATAR(state, avatar) {
        state.userInfo.avatar = avatar;
    },

    /**
     * 文章点赞
     * @param state
     * @param articleId 文章id
     * @constructor
     */
    ARTICLE_LIKE(state, articleId) {
        let articleLikeSet = state.userInfo.articleLikeSet;
        //是否点过赞，点过就取消点赞
        if (articleLikeSet.indexOf(articleId) !== -1) {
            articleLikeSet.splice(articleLikeSet.indexOf(articleId), 1)
        } else {
            articleLikeSet.push(articleId);
        }
    },

    /**
     * 关闭模块
     * @param state
     */
    CLOSE_MODEL(state) {
        state.registerFlag = false;
        state.loginFlag = false;
        state.searchFlag = false;
        state.emailFlag = false;
    },
}
//准备state对象——保存具体的数据
const state = {
    //搜索框标记
    searchFlag: false,
    //登录框标记
    loginFlag: false,
    //注册框标记
    registerFlag: false,
    //忘记密码框标记
    forgetFlag: false,
    //修改邮箱框标记
    emailFlag: false,
    //侧边栏是否打开
    drawer: false,
    //用户信息
    userInfo: {
        userId: null,
        //昵称
        nickname: "",
        //头像
        avatar: "",
        //用户简介
        intro: "",
        //用户网站
        webSite: "",
        //点过赞的文章
        articleLikeSet: [],
        //点过赞的评论
        commentLikeSet: [],
        //说说点赞
        talkLikeSet: [],
        //用户邮箱
        email: "",
        //登录类型
        loginType: null,
        token: "<empty>",
    },
    //博客信息
    blogInfo: {
        //文章数量
        articleCount: 99,
        //分类数量
        categoryCount: 99,
        //标签数量
        tagCount: 99,
        //访问量
        viewsCount: 99999,
        // 网站配置
        websiteConfig: {
            //网站作者
            websiteAuthor: "网站作者",
            //网站头像
            websiteAvatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F37%2Fe8%2F2c%2F37e82c9568c76ef3a2ba54cb857164e8.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669544766&t=1ed345051f45bd6189902b16890c7c40",
            //网站名字
            websiteName: "网站名字",
            //网站简介
            websiteIntro: "网站简介",
            //网站公告
            websiteNotice: "网站公告",
            //网站创建时间
            websiteCreateTime: "2022-10-1",
            //备案号
            websiteRecordNo: '备案号',
            //社交登录列表
            socialLoginList: [],
            //社交链接列表
            socialUrlList: ["qq", "github", "gitee"],
            qq: "tan00xu",
            github: "https://github.com/TAN00XU",
            gitee: "https://gitee.com/TAN00XU",
            //游客头像
            touristAvatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F03%2F20200503120801_wNjsi.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669544727&t=88013364e44a239bf3e9cb11e337e161",
            //是否开启打赏
            isReward: 0,
            //微信二维码
            weiXinQRCode: "",
            //支付宝二维码
            alipayQRCode: ""

        },
        //页面列表
        pageList: [
            {
                id: 1,
                pageName: "首页",
                pageLabel: "home",
                pageCover: "https://images.wallpaperscraft.com/image/single/cat_cute_ball_127642_3382x2616.jpg",
                createTime: "2021-08-07 10:32:36",
                updateTime: "2021-12-27 12:19:01"
            },
            {
                id: 2,
                pageName: "文章归档",
                pageLabel: "archive",
                pageCover: "https://static.talkxj.com/config/643f28683e1c59a80ccfc9cb19735a9c.jpg",
                createTime: "2021-08-07 10:32:36",
                updateTime: "2021-10-04 15:43:14"
            },
            {
                pageCover: "https://static.talkxj.com/config/83be0017d7f1a29441e33083e7706936.jpg",
                id: 3,
                pageName: "文章分类",
                pageLabel: "categories"
            },
            {
                pageCover: "https://static.talkxj.com/config/a6f141372509365891081d755da963a1.png",
                id: 4,
                pageName: "文章标签",
                pageLabel: "tags"
            },
            {
                "pageCover": "https://static.talkxj.com/config/e587c4651154e4da49b5a54f865baaed.jpg",
                "id": 5,
                "pageName": "相册",
                "pageLabel": "album"
            },
            {
                "pageCover": "https://static.talkxj.com/config/9034edddec5b8e8542c2e61b0da1c1da.jpg",
                "id": 6,
                "pageName": "友情链接",
                "pageLabel": "friendlyLink"
            },
            {
                "pageCover": "https://static.talkxj.com/config/2a56d15dd742ff8ac238a512d9a472a1.jpg",
                "id": 7,
                "pageName": "关于我",
                "pageLabel": "aboutMe"
            },
            {
                "pageCover": "https://static.talkxj.com/config/acfeab8379508233fa7e4febf90c2f2e.png",
                "id": 8,
                "pageName": "留言板",
                "pageLabel": "messageBoard"
            },
            {
                "pageCover": "https://static.talkxj.com/config/ebae4c93de1b286a8d50aa62612caa59.jpeg",
                "id": 9,
                "pageName": "个人中心",
                "pageLabel": "personalCenter"
            },
            {
                "pageCover": "https://static.talkxj.com/config/924d65cc8312e6cdad2160eb8fce6831.jpg",
                "id": 10,
                "pageName": "文章列表",
                "pageLabel": "articleList"
            },
            {
                "pageCover": "https://static.talkxj.com/config/a741b0656a9a3db2e2ba5c2f4140eb6c.jpg",
                "id": 904,
                "pageName": "说说",
                "pageLabel": "talk"
            }
        ]
    }
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
})