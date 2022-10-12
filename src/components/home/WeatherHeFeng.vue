<template>
  <v-card class="animate__animated animate__zoomIn blog-card mt-5">
  <div id="he-plugin-standard"></div>
  </v-card>
</template>

<script>
/**
 * 和风天气组件
 */
export default {
  name: "WeatherHeFeng",
  mounted() {
    window.WIDGET = {
      CONFIG: {
        "layout": "2",
        "width": 230,
        "height": 300,
        "background": "1",
        "dataColor": "FFFFFF",
        "borderRadius": "20",

        "key": "8b3fb0d00fad407a90b40388f8be6adb"
      }
    };
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
    document.getElementsByTagName('head')[0].appendChild(script);
  }
}
</script>

<style scoped>
.blog-card {
  line-height: 2;
  text-align: center;
  padding: 0.8rem 1.6rem;
}
</style>