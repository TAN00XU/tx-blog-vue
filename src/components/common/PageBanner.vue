<template>
  <!-- 横幅 -->
  <div class="banner" :style="cover">
    <h1 v-show="pageName" class="banner-title">{{ pageName }}</h1>
    <slot></slot>
  </div>
</template>

<script>
/**
 * 页面横幅
 */
export default {
  name: "PageBanner",
  props: {
    pathName: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: "pageName"
    }

  },
  data() {
    return {
      pageName: "pageName",
    }
  },
  computed: {
    cover() {
      let cover = "";
      this.$store.state.blogInfo.pageList.forEach(item => {
        if (item.pageLabel === this.pathName) {
          cover = item.pageCover;
          this.pageName = (this.title == null ? null : (this.title !== this.pageName ? this.title : item.pageName));
        }
      });

      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  }
}
</script>

<style scoped>

</style>