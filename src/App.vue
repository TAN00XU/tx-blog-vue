<template>
  <v-app id="app">
    <!-- 导航栏 -->
    <TopNavBar></TopNavBar>

    <!-- 内容 -->
    <v-main>
<!--      <v-container>-->
      <router-view :key="$route.fullPath" />
<!--      </v-container>-->
    </v-main>
    <!-- 页脚 -->
    <PageFooter></PageFooter>
    <!-- 搜索框 -->
    <SearchModel></SearchModel>
    <!-- 登录框 -->
    <LoginModel></LoginModel>
    <!-- 注册框 -->
    <RegisterModel></RegisterModel>
    <!-- 忘记密码框 -->
    <ForgetModel></ForgetModel>
    <!--修改邮箱框-->
    <EmailModel></EmailModel>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
  </v-app>
</template>

<script>
import TopNavBar from './components/layout/TopNavBar.vue';
import PageFooter from './components/layout/PageFooter.vue';
import SearchModel from './components/model/SearchModel.vue';
import LoginModel from "./components/model/LoginModel";
import RegisterModel from "./components/model/RegisterModel";
import ForgetModel from "./components/model/ForgetModel";
import EmailModel from "@/components/model/EmailModel";
import BackTop from "@/components/common/BackTop";

//API
//获取博客信息
import {blogInfo, report} from "@/api/blogInfo";

export default {
  name: 'App',
  components: {
    TopNavBar,
    PageFooter,
    SearchModel,
    LoginModel,
    RegisterModel,
    ForgetModel,
    EmailModel,
    BackTop
  },
  created() {
    // 获取博客信息
    this.getBlogInfo();
    // 上传访客信息
    report();
  },
  methods:{
    getBlogInfo() {
      //获取到博客信息
      blogInfo()
      .then(({data}) => {
        if(data.status){
          this.$store.commit("BLOG_INFO", data.data);
        }else {
          this.$toast({type: "error", message: data.message});
        }
      });
    }
  }
};
</script>
