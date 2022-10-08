<template>
  <v-card class="animate__animated animate__zoomIn blog-card mt-5">
    <div class="author-wrapper">
      <!-- 博主头像 -->
      <v-avatar size="110">
        <img
            class="author-avatar"
            :src="blogInfo.websiteConfig.websiteAvatar"
        />
      </v-avatar>
      <!--博主名称-->
      <div style="font-size: 1.375rem;margin-top:0.625rem">
        {{ blogInfo.websiteConfig.websiteAuthor }}
      </div>
      <!--网站简介-->
      <div style="font-size: 0.875rem;">
        {{ blogInfo.websiteConfig.websiteIntro }}
      </div>
    </div>
    <!-- 博客信息 -->
    <div class="blog-info-wrapper">
      <div class="blog-info-data">
        <router-link to="/archives">
          <div style="font-size: 0.875rem">文章</div>
          <div style="font-size: 1.25rem">
            {{ blogInfo.articleCount }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/categories">
          <div style="font-size: 0.875rem">分类</div>
          <div style="font-size: 1.25rem">
            {{ blogInfo.categoryCount }}
          </div>
        </router-link>
      </div>
      <div class="blog-info-data">
        <router-link to="/tags">
          <div style="font-size: 0.875rem">标签</div>
          <div style="font-size: 1.25rem">{{ blogInfo.tagCount }}</div>
        </router-link>
      </div>
    </div>
    <!-- 收藏按钮 -->
    <a class="collection-btn" @click="tip = true">
      <v-icon color="#fff" size="18" class="mr-1">mdi-bookmark</v-icon>
      加入书签
    </a>
    <!-- 社交信息 -->
    <div class="card-info-social">
      <a
          v-if="isShowSocial('qq')"
          class="mr-5 iconfont iconqq"
          target="_blank"
          :href="
                  'http://wpa.qq.com/msgrd?v=3&uin=' +
                    blogInfo.websiteConfig.qq +
                    '&site=qq&menu=yes'
                "
      />
      <a
          v-if="isShowSocial('github')"
          target="_blank"
          :href="blogInfo.websiteConfig.github"
          class="mr-5 iconfont icongithub"
      />
      <a
          v-if="isShowSocial('gitee')"
          target="_blank"
          :href="blogInfo.websiteConfig.gitee"
          class="iconfont icongitee-fill-round"
      />
    </div>
    <!-- 提示消息 -->
    <v-snackbar v-model="tip" centered color="#49b1f5" :timeout="2000">
      按 <span style="color: red">CTRL+D</span> 键将本页加入书签
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "MyCard",
  data() {
    return {
      tip: false,
    }
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    },
    isShowSocial() {
      return function (social) {
        return this.blogInfo.websiteConfig.socialUrlList.indexOf(social) !== -1;
      };
    },
  }
}
</script>

<style scoped>
.blog-card {
  line-height: 2;
  padding: 1.25rem 1.5rem;
}

.author-wrapper {
  text-align: center;
}

/*博主头像*/
.author-avatar {
  transition: all 0.5s;
}

.author-avatar:hover {
  transform: rotate(360deg);
}

/*博客信息*/
.blog-info-wrapper {
  display: flex;
  justify-self: center;
  padding: 0.875rem 0;
}

/*博客信息数据*/
.blog-info-data {
  flex: 1;
  text-align: center;
}

.blog-info-data a {
  text-decoration: none;
}

/*收藏按钮*/
.collection-btn {
  text-align: center;
  z-index: 1;
  font-size: 14px;
  position: relative;
  display: block;
  background-color: #49b1f5;
  color: #fff !important;
  height: 32px;
  line-height: 32px;
  transition-duration: 1s;
  transition-property: color;
}

.collection-btn:before {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #ff7242;
  content: "";
  transition-timing-function: ease-out;
  transition-duration: 0.5s;
  transition-property: transform;
  transform: scaleX(0);
  transform-origin: 0 50%;
}

.collection-btn:hover:before {
  transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
  transform: scaleX(1);
}

/*社交信息*/
.card-info-social {
  line-height: 40px;
  text-align: center;
  margin: 6px 0 -6px;
}

.card-info-social a {
  font-size: 1.5rem;
}

.card-info-social a:hover {
  color: #00AAEE;
}
</style>