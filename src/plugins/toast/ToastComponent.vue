<template>
  <v-snackbar
      v-model="show"
      top
      centered
      :timeout="2000"
      :color="color"
      elevation="24"
  >
    <i :class="icon" style="margin-right: 10px;" />
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="show = false"
      >
        Close
      </v-btn>
    </template>

  </v-snackbar>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:"ToastComponent",
  data() {
    return {
      show: false,
      message: "",
      type: "normal",
      // type: "success",
      color: "#49b1f5",
      icon: ""
    };
  },
  watch: {
    type(value) {
      switch (value) {
        case "error":
          this.color = "#F56C6C";
          this.icon = "iconfont iconcuowu";
          break;
        case "success":
          this.color = "#52C41A";
          this.icon = "iconfont iconchenggong";
          break;
        case "warning":
          this.color = "#F57C00";
          this.icon = "iconfont iconchenggong";
      }
    }
  }
};
</script>
