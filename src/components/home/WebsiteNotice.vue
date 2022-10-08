<template>
  <v-card class="blog-card animate__animated animate__zoomIn mt-5 big">
    <div class="web-info-title">
      <v-icon size="18">mdi-bell</v-icon>
      公告
    </div>
    <div style="font-size:0.9rem">
      {{ blogInfo.websiteConfig.websiteNotice }}
    </div>
  </v-card>
</template>

<script>
export default {
  //网站公告
  name: "WebsiteNotice",
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    }
  }
}
</script>

<style scoped>
.blog-card {
  line-height: 2;
  padding: 1.25rem 1.5rem;
}
.web-info-title{
  text-align: center;
  font-size: 1.2rem;
}
.big i {
  color: #f00;
  animation: big 0.8s linear infinite;
}
@keyframes big {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>