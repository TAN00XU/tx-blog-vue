<template>
  <v-dialog v-model="registerFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="registerFlag = false">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
            v-model="username"
            label="邮箱号"
            placeholder="请输入您的邮箱号"
            clearable
            @keyup.enter="register"
            :rules="[rules.required, rules.email]"
        />
        <!-- 验证码 -->
        <div class="mt-7 send-wrapper">
          <v-text-field
              maxlength="6"
              v-model="code"
              label="验证码"
              placeholder="请输入6位验证码"
              @keyup.enter="register"
          />
          <v-btn text small :disabled="flag" @click="sendCode">
            {{ codeMsg }}
          </v-btn>
        </div>
        <!-- 密码 -->
        <v-text-field
            v-model="password"
            class="mt-7"
            label="密码"
            placeholder="请输入您的密码"
            :rules="[rules.required, rules.counter]"
            @keyup.enter="register"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
        />
        <!-- 注册按钮 -->
        <v-btn
            class="mt-7"
            block
            color="red"
            style="color:#fff"
            @click="register"
        >
          注册
        </v-btn>
        <!-- 登录 -->
        <div class="mt-10 login-tip">
          已有账号？&nbsp;<span @click="openLogin">登录</span>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import {login,register} from "@/api/login";
export default {
  data() {
    return {
      username: "",
      code: "",
      password: "",
      flag: true,
      codeMsg: "发送",
      time: 60,
      show: false,
      //验证结果
      rules: {
        required: value => !!value || '必填项',
        counter: value => value.length <= 16 && value.length >= 6 || '长度在6-16之间',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '不正确的邮箱地址'
        }
      }
    };
  },
  methods: {
    openLogin() {
      this.$store.state.registerFlag = false;
      this.$store.state.loginFlag = true;
    },
    sendCode() {
      const that = this;
      // eslint-disable-next-line no-undef
      const captcha = new TencentCaptcha(
          this.config.TENCENT_CAPTCHA,
          function (res) {
            if (res.ret === 0) {
              //发送邮件
              that.countDown();
              that.axios
                  .get("/api/users/code", {
                    params: {username: that.username}
                  })
                  .then(({data}) => {
                    if (data.flag) {
                      that.$toast({type: "success", message: "发送成功"});
                    } else {
                      that.$toast({type: "error", message: data.message});
                    }
                  });
            }
          }
      );
      // 显示验证码
      captcha.show();
    },
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
    register() {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.username)) {
        this.$toast({type: "error", message: "邮箱格式不正确"});
        return false;
      }
      if (this.code.trim().length !== 6) {
        this.$toast({type: "error", message: "请输入6位验证码"});
        return false;
      }
      if (this.password.trim().length < 6) {
        this.$toast({type: "error", messageBoard: "密码不能少于6位"});
        return false;
      }
      const user = {
        username: this.username,
        password: this.password,
        code: this.code
      };
      register(user).then(({data}) => {
        if (data.flag) {
          let param = new URLSearchParams();
          param.append("username", user.username);
          param.append("password", user.password);
          //注册成功进行登录处理
          login(param).then(({data}) => {
            this.username = "";
            this.password = "";
            this.$store.commit("login", data.data);
            this.$store.commit("closeModel");
          });
          this.$toast({type: "success", message: "登录成功"});
        } else {
          this.$toast({type: "error", message: data.message});
        }
      });
    }
  },
  computed: {
    registerFlag: {
      set(value) {
        this.$store.state.registerFlag = value;
      },
      get() {
        return this.$store.state.registerFlag;
      }
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      return clientWidth <= 960;

    }
  },
  watch: {
    username(value) {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      this.flag = !reg.test(value);
    }
  }
};
</script>
