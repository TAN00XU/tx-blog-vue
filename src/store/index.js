import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

//准备actions对象——响应组件中用户的动作
const actions = {}
//准备mutations对象——修改state中的数据
const mutations = {

    /**
     * 博客信息赋值
     * @param state
     * @param blogInfo
     * @constructor
     */
    BLOG_INFO(state, blogInfo) {
        state.blogInfo.websiteConfig = {...state.blogInfo.websiteConfig, ...blogInfo}
    },

    /**
     * 登录 用户信息
     * @param state
     * @param user
     */
    LOGIN(state,user){
        state.userInfo.userId = user.userInfoId;
        state.userInfo.avatar = user.avatar;
        state.userInfo.nickname = user.nickname;
        state.userInfo.intro = user.intro;
        state.webSite = user.webSite;
        state.articleLikeSet = user.articleLikeSet ? user.articleLikeSet : [];
        state.commentLikeSet = user.commentLikeSet ? user.commentLikeSet : [];
        state.talkLikeSet = user.talkLikeSet ? user.talkLikeSet : [];
        state.email = user.email;
        state.loginType = user.loginType;
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
    //侧边栏是否打开
    drawer: false,

    //用户信息
    userInfo:{
        userId:String,
        //昵称
        nickname:"昵称",
        //头像
        // avatar:"https://static.talkxj.com/avatar/user.png",
        avatar: "",
        //用户简介
        intro:"",
        //用户网站
        webSite:"",
        //文章点赞
        articleLikeSet:[],
        //评论点赞
        commentLikeSet:[],
        //说说点赞
        talkLikeSet:[],
        //邮箱
        email:"",
        //登录类型
        loginType:"",
        token: "<empty>",
    },

    //博客信息
    blogInfo: {
        websiteConfig: {
            //网站作者
            websiteAuthor: "饮梦",
            //网站头像
            websiteAvatar: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fm.imeitou.com%2Fuploads%2Fallimg%2F2019121010%2F4kgu4udbv43.jpeg&refer=http%3A%2F%2Fm.imeitou.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1667704947&t=2bf77f5870460a55c31fe58b2fcfcdc2",
            //网站名字
            websiteName: "饮梦的个人博客",
            //网站简介
            websiteIntro: "饮梦的个人博客",
            //网站公告
            websiteNotice:"暂无公告",
            //网站创建时间
            websiteCreateTime: "2022-10-1",
            //备案号
            websiteRecordNo: 2000,
            //社交登录列表
            socialLoginList: [],
            //社交链接列表
            socialUrlList: ["qq","github","gitee"],
            qq:"tan00xu",
            github:"https://github.com/TAN00XU",
            gitee:"https://gitee.com/TAN00XU",
            //游客头像
            touristAvatar:"https://static.talkxj.com/photos/b553f564f81a80dc338695acb1b475d2.jpg"
        },
        //文章数量
        articleCount: 99,
        //分类数量
        categoryCount: 99,
        //标签数量
        tagCount: 99,
        //访问量
        viewsCount:99999,
        //页面列表
        pageList: [
            {
                id: 1,
                pageName: "首页",
                pageLabel: "home",
                // pageCover: "https://static.talkxj.com/config/0bee7ba5ac70155766648e14ae2a821f.jpg",
                pageCover: "1.jpg",
                // pageCover: "https://cdn.pixabay.com/photo/2022/06/08/05/47/stars-7249785_960_720.jpg",
                // pageCover: "https://images.wallpaperscraft.com/image/single/cat_cute_ball_127642_3382x2616.jpg",
                createTime: "2021-08-07 10:32:36",
                updateTime: "2021-12-27 12:19:01"
            },
            {
                id: 2,
                pageName: "文章归档",
                pageLabel: "archiveArticle",
                pageCover: "https://static.talkxj.com/config/643f28683e1c59a80ccfc9cb19735a9c.jpg",
                createTime: "2021-08-07 10:32:36",
                updateTime: "2021-10-04 15:43:14"
            },
            {
                "pageCover": "https://static.talkxj.com/config/83be0017d7f1a29441e33083e7706936.jpg",
                "id": 3,
                "pageName": "文章分类",
                "pageLabel": "category"
            },
            {
                "pageCover": "https://static.talkxj.com/config/a6f141372509365891081d755da963a1.png",
                "id": 4,
                "pageName": "文章标签",
                "pageLabel": "tagArticle"
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
                "pageLabel": "user"
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
    state
})