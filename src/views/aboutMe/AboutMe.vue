<template>
  <div>
    <!--横幅-->
    <PageBanner path-name="aboutMe" title="pageName"/>
    <!-- 关于我内容 -->
    <v-card class="blog-container">
      <!-- 博主头像 -->
      <div class="my-wrapper">
        <v-avatar size="110">
          <img class="author-avatar" :src="avatar" />
        </v-avatar>
        <!--博主名称-->
        <div style="font-size: 2rem;margin-top:0.625rem">
          {{ websiteAuthor }}
        </div>
      </div>
      <!-- 介绍 -->
      <div
        ref="about"
        class="about-content markdown-body"
        v-html="aboutContent"
      />
    </v-card>
  </div>
</template>

<script>
import PageBanner from "@/components/common/PageBanner";
export default {
  //关于我
  name:"AboutMe",
  components:{
    PageBanner
  },
  data: function() {
    return {
      aboutContent: "",
      clipboard: null,
      imgList: []
    };
  },
  computed: {
    //头像
    avatar() {
      return this.$store.state.blogInfo.websiteConfig.websiteAvatar;
    },
    websiteAuthor(){
      return this.$store.state.blogInfo.websiteConfig.websiteAuthor;
    }
  }
};
</script>

<style scoped>
.about-content {
  word-break: break-word;
  line-height: 1.8;
}
.my-wrapper {
  text-align: center;
}
.author-avatar {
  transition: all 0.5s;
}
.author-avatar:hover {
  transform: rotate(360deg);
}
</style>

