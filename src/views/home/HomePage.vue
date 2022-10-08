<template>
  <div>
    <!--横幅背景-->
    <BannerBackground></BannerBackground>
    <!-- 主页文章 -->
    <v-row class="home-container">
      <!-- 博主信息 -->
      <v-col md="3" cols="12" class="d-md-block d-none">
        <div class="blog-wrapper">
          <!--博主信息卡片-->
          <MyCard/>
          <!--网站公告-->
          <WebsiteNotice/>
          <!--网站信息-->
          <WebsiteInfo/>
        </div>
      </v-col>
      <v-col md="9" cols="12">
        <!-- 说说轮播 -->
        <TalkCarousel/>
        <!--首页文章-->
        <HomeArticle/>
      </v-col>

    </v-row>
  </div>
</template>

<script>

import BannerBackground from "@/components/home/BannerBackground";
import HomeArticle from "@/components/home/HomeArticle";
import TalkCarousel from "@/components/home/TalkCarousel";
import MyCard from "@/components/home/MyCard";
import WebsiteNotice from "@/components/home/WebsiteNotice";
import WebsiteInfo from "@/components/home/WebsiteInfo";

/**
 * 主页
 */
export default {
  name: "HomePage",
  components: {
    BannerBackground,
    TalkCarousel,
    HomeArticle,
    MyCard,
    WebsiteNotice,
    WebsiteInfo
  }
}
</script>

<style scoped>
@media (min-width: 760px) {
  .home-container {
    max-width: 1200px;
    margin: calc(100vh - 48px) auto 28px auto;
    padding: 0 5px;
  }
}
@media (max-width: 759px) {
  /*首页容器*/
  .home-container {
    width: 100%;
    margin: calc(100vh - 66px) auto 0 auto;
  }
}
.blog-wrapper {
  position: sticky;
  top: 10px;
}
</style>
