<template>
  <v-dialog v-model="emailFlag" :fullscreen="isMobile" max-width="400">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="emailFlag = false">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
            v-model="email"
            label="邮箱号"
            placeholder="请输入您的邮箱号"
            :rules="[rules.email,rules.required]"
            clearable
            @keyup.enter="register"
        />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field
              maxlength="6"
              v-model="code"
              label="验证码"
              placeholder="请输入6位验证码"
              :rules="[rules.counter,rules.required]"
              @keyup.enter="register"
          />
          <v-btn text small :disabled="flag" @click="sendCode">
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 按钮 -->
        <v-btn
            class="mt-7"
            block
            color="blue"
            style="color:#fff"
            @click="saveUserEmail"
        >
          绑定
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import {emailCode,changeEmail} from "@/api/email";

/**
 * 邮箱绑定
 */
export default {
  data: function () {
    return {
      email: this.$store.state.userInfo.email,
      code: "",
      flag: true,
      codeMsg: "发送",
      time: 60,
      show: false,
      //验证输入结果
      rules: {
        required: value => !!value || '必填项',
        counter: value => value.length === 6 || '验证码的长度是6',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '不正确的邮箱地址'
        }
      }
    };
  },
  methods: {
    sendCode() {
      const _this = this;
      // eslint-disable-next-line no-undef
      const captcha = new TencentCaptcha(
          this.config.TENCENT_CAPTCHA,
          function (res) {
            if (res.ret === 0) {
              //发送邮件
              _this.countDown();
              emailCode(_this.email)
                  .then(({data}) => {
                    if (data.status) {
                      _this.$toast({type: "success", message: data.message});
                    } else {
                      _this.$toast({type: "error", message: data.message});
                    }
                  });
            }
          });
      // 显示验证码
      captcha.show();
    },
    //倒计时
    countDown() {
      this.flag = true;
      this.timer = setInterval(() => {
        this.time--;
        this.codeMsg = this.time + "s";
        if (this.time <= 0) {
          clearInterval(this.timer);
          this.codeMsg = "发送";
          this.time = 60;
          this.flag = false;
        }
      }, 1000);
    },
    //保存用户邮箱
    saveUserEmail() {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.email)) {
        this.$toast({type: "error", message: "邮箱格式不正确"});
        return false;
      }
      if (this.code.trim().length !== 6) {
        this.$toast({type: "error", message: "请输入6位验证码"});
        return false;
      }
      const user = {
        email: this.email,
        code: this.code
      };
      changeEmail(user).then(({data}) => {
        if (data.status) {
          this.$store.commit("CHANGE_EMAIL", this.email);
          this.email = "";
          this.code = "";
          this.$store.commit("CLOSE_MODEL");
          this.$toast({type: "success", message: data.message});
        } else {
          this.$toast({type: "error", message: data.message});
        }
      });
    }
  },
  computed: {
    emailFlag: {
      set(value) {
        this.$store.state.emailFlag = value;
      },
      get() {
        return this.$store.state.emailFlag;
      }
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      return clientWidth <= 960;

    }
  },
  watch: {
    //监视邮箱确实是否可以发送邮件
    email(value) {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      this.flag = !reg.test(value);
    }
  }
};
</script>

<style scoped>
@media (min-width: 760px) {
  .login-container {
    padding: 1rem;
    border-radius: 4px;
    height: 400px;
  }
}
</style>
