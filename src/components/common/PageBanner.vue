<template>
  <!-- 横幅 -->
  <div class="banner" :style="cover">
    <h1 v-if="pageName" class="banner-title">{{ pageName }}</h1>
    <slot></slot>
  </div>
</template>

<script>

/**
 * 页面横幅
 * 本地图片和网络图片同时存在默认本地图片
 * @param pathName 路径名
 * @param title 页面标题 <p>写pageName根据请求路径在pageList的pageCover中找</>
 * @param localImage 本地图片 在@/assets/images/中找
 * @param webImage 网络图片
 */
export default {
  name: "PageBanner",
  props: {
    pathName: {
      type: String,
      default: null
      // required: true
    },
    title: {
      type: String,
      default: null
    },
    /**
     * 本地图片
     */
    localImage: {
      type: String,
      default: null
    },
    /**
     * 网络图片
     */
    webImage: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      pageName: this.title
    }
  },
  computed: {
    cover() {
      let cover = "";
      if (this.pathName !== null) {
        this.$store.state.blogInfo.pageList.forEach(item => {
          if (item.pageLabel === this.pathName) {
            cover = item.pageCover;
            this.pageName = this.title == null ? null
                : this.title === 'pageName' ? item.pageName
                    : this.title
          }
        });
      }
      if (this.localImage !== null) {
        return "background: url(" + require("@/assets/images/" + this.localImage) + ") center center / cover no-repeat";
      }
      if (this.webImage !== null) {
        cover = this.webImage;
      }
      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  }
}
</script>

<style scoped>
@media (min-width: 760px) {
  .banner {
    position: absolute;
    top: -60px;
    left: 0;
    right: 0;
    height: 400px;
    background-color: #49b1f5 !important;
    animation: header-effect 1s;
  }

  .banner-title {
    animation: title-scale 1s;
    position: absolute;
    top: 12.5rem;
    padding: 0 0.5rem;
    width: 100%;
    font-size: 2.5rem;
    text-align: center;
    color: #eee;
  }
}

@media (max-width: 759px) {
  .banner {
    position: absolute;
    top: -60px;
    left: 0;
    right: 0;
    height: 280px;
    background-color: #49b1f5 !important;
    animation: header-effect 1s;
  }

  .banner-title {
    position: absolute;
    top: 8.5rem;
    width: 100%;
    font-size: 1.625rem;
    text-align: center;
    color: #eee;
    animation: title-scale 1s;
  }
}
</style>