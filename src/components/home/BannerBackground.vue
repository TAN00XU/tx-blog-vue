<template>
  <div>
    <!-- 横幅 -->
    <PageBanner class="home-banner" path-name="home">
      <div class="banner-container">
        <!-- 网站名称 -->
        <h1 class="blog-title animate__animated animate__zoomIn animate__slow">
          {{ websiteName }}
        </h1>
        <!-- 一言 -->
        <div class="blog-intro animate__animated animate__bounce animate__slow">
          {{ obj.output }} <span class="typed-cursor">|</span>
        </div>
      </div>
      <!-- 向下滚动 -->
      <div class="scroll-down" @click="scrollDown">
        <v-icon color="#fff" class="scroll-down-effects">
          mdi-chevron-down
        </v-icon>
      </div>
    </PageBanner>

  </div>
</template>

<script>
//打字机效果npm install easy-typer-js --save
import EasyTyper from "easy-typer-js";
import PageBanner from "@/components/common/PageBanner";
/**
 * 首页横幅背景
 */
export default {
  name:"BannerBackground",
  components:{PageBanner},
  created() {
    this.init();
    //更改网页标签
    const _this=this;
    // setTimeout(() => {
      document.title = _this.websiteName;
    // },500)

  },
  data() {
    return {
      tip: false,
      time: "",
      //EasyTyper配置
      obj: {
        output: "",
        type: "rollback",
        isEnd: false,
        speed: 200,
        sleep: 200,
        backSpeed: 200,
        singleBack: true,
        //是否不回退
        sentencePause: true
      },
      articleList: [],
      talkList: [],
      current: 1
    };
  },
  methods: {
    // 初始化
    init() {
      // 一言Api进行打字机循环输出效果
      fetch(this.config.hitokoto)
          .then(res => {
            return res.json();
          })
          .then(({ hitokoto }) => {
            this.initTyped(hitokoto);
          });
    },
    initTyped(input, fn, hooks) {
      const obj = this.obj;
      // eslint-disable-next-line no-unused-vars
     new EasyTyper(obj, input, fn, hooks);
    },
    scrollDown() {
      window.scrollTo({
        behavior: "smooth",
        top: document.documentElement.clientHeight
      });
    },
  },
  computed: {
    websiteName() {
      return this.$store.state.blogInfo.websiteConfig.websiteName;
    },

  }
};
</script>

<!--打字机光标闪烁-->
<style lang="stylus" scoped>
.typed-cursor
  opacity: 1
  animation: blink 0.7s infinite
@keyframes blink
  0%
    opacity: 1
  50%
    opacity: 0
  100%
    opacity: 1
</style>

<style scoped>
.home-banner {
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 100vh;
  background-attachment: fixed;
  text-align: center;
  color: #fff !important;
  animation: header-effect 1s;
}
.banner-container {
  margin-top: 43vh;
  line-height: 1.5;
  color: #eee;
}
.blog-contact a {
  color: #fff !important;
}
@media (min-width: 760px) {
  .blog-title {
    font-size: 2.5rem;
  }
  .blog-intro {
    font-size: 1.5rem;
  }
  .article-wrapper a {
    font-size: 1.5rem;
    transition: all 0.3s;
  }
}
@media (max-width: 759px) {
  .blog-title {
    font-size: 26px;
  }

  .article-wrapper a {
    font-size: 1.25rem;
    transition: all 0.3s;
  }
}
.scroll-down {
  cursor: pointer;
  position: absolute;
  bottom: 0;
  width: 100%;
}
.scroll-down i {
  font-size: 2rem;
}
.article-wrapper a:hover {
  color: #8e8cd8;
}
.article-info a {
  font-size: 95%;
  color: #858585 !important;
}
.scroll-down-effects {
  color: #eee !important;
  text-align: center;
  text-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.15);
  line-height: 1.5;
  display: inline-block;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  animation: scroll-down-effect 1.5s infinite;
}
@keyframes scroll-down-effect {
  0% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
  50% {
    top: -16px;
    opacity: 1;
    filter: none;
  }
  100% {
    top: 0;
    opacity: 0.4;
    filter: alpha(opacity=40);
  }
}
</style>
