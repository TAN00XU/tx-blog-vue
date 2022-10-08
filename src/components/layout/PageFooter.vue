<template>
  <v-footer app padless absolute v-if="!this.isMessageBoard">
    <div class="footer-wrap">
      <div>
        ©{{ blogInfo.websiteConfig.websiteCreateTime | date }} -
        {{ new Date().getTime() | date }} By
        {{ blogInfo.websiteConfig.websiteAuthor }}
      </div>
      <a href="https://beian.miit.gov.cn/" target="_blank">
        {{ blogInfo.websiteConfig.websiteRecordNo }}
        备案号
      </a>
    </div>
  </v-footer>
</template>

<script>
export default {
  //页脚
  name:"PageFooter",
  computed: {
    //是否在留言板
    isMessageBoard() {
      return this.$route.path === "/messageBoard";
    },
    blogInfo() {
      return this.$store.state.blogInfo;
    }

  }
};
</script>

<style scoped>
.footer-wrap {
  width: 100%;
  line-height: 2;
  position: relative;
  padding: 10px 20px;
  color: #eee;
  font-size: 15px;
  text-align: center;
  background: linear-gradient(-45deg, #ee7752, #ce3e75, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: Gradient 6s ease infinite;
}
.footer-wrap a {
  color: #eee !important;
}
@keyframes Gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
