<template>
      <v-card class="blog-card animate__animated animate__zoomIn mt-5 pt-2"
              loading
      >
        <div class="web-info-title pt-3">
          <v-icon size="18">mdi-chart-line</v-icon>
          网站资讯
        </div>
        <div class="web-info">
          <div style="padding:4px 0 0">
            运行时间:<span class="float-right">{{ time }}</span>
          </div>
          <div style="padding:4px 0 0">
            总访问量:
            <span class="float-right">
          {{ blogInfo.viewsCount }}
        </span>
          </div>
        </div>
      </v-card>
</template>

<script>
export default {
  //网站信息
  name: "WebsiteInfo",
  created() {
    this.timer = setInterval(this.runTime, 1000);
  },
  data() {
    return {
      time: ""
    }
  },
  methods: {
    runTime() {
      const day = new Date();
      const timeOld =
          day.getTime() -
          new Date(this.blogInfo.websiteConfig.websiteCreateTime).getTime();
      const msPerDay = 24 * 60 * 60 * 1000;
      const runDay = Math.floor(timeOld / msPerDay);
      let str = "";
      str += runDay + "天";
      str += day.getHours() + "时";
      str += day.getMinutes() + "分";
      str += day.getSeconds() + "秒";
      this.time = str;
    },
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    }
  }
}
</script>

<style scoped>
.web-info-title {
  text-align: center;
  font-size: 1.2rem;
}

.web-info {
  padding: 0.3rem 0.8rem 1rem;
  font-size: 0.875rem;
}
</style>