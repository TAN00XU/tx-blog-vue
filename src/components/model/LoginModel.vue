<template>
  <v-dialog v-model="loginFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="cancelLogin">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
            v-model="username"
            label="邮箱号"
            placeholder="请输入您的邮箱号"
            :rules="[rules.required, rules.email]"
            clearable
            @keyup.enter="login"
        />
        <!-- 密码 -->
        <v-text-field
            v-model="password"
            class="mt-7"
            label="密码"
            placeholder="请输入您的密码"
            :rules="[rules.required, rules.counter]"
            @keyup.enter="login"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
        />
        <!-- 按钮 -->
        <v-btn
            class="mt-7"
            block
            color="blue"
            style="color:#fff"
            @click="login"
        >
          登录
        </v-btn>
        <!-- 注册和找回密码 -->
        <div class="mt-10 login-tip">
          <span @click="openRegister">立即注册</span>
          <span @click="openForget" class="float-right">忘记密码?</span>
        </div>

        <div v-if="socialLoginList.length > 0">
          <div class="social-login-title">社交账号登录</div>
          <div class="social-login-wrapper">
            <!-- 微博登录 -->
            <a
                v-if="showLogin('weibo')"
                class="mr-3 iconfont iconweibo"
                style="color:#e05244"
                @click="weiboLogin"
            />
            <!-- qq登录 -->
            <a
                v-if="showLogin('qq')"
                class="iconfont iconqq"
                style="color:#00AAEE"
                @click="qqLogin"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import {login} from "@/api/login";

export default {
  data: function () {
    return {
      username: "",
      password: "",
      //显示密码
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
  computed: {
    //登录标记
    loginFlag: {
      set(value) {
        this.$store.state.loginFlag = value;
      },
      get() {
        return this.$store.state.loginFlag;
      }
    },
    // 是否移动设备
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      return clientWidth <= 960;
    },
    socialLoginList() {
      return this.$store.state.blogInfo.websiteConfig.socialLoginList;
    },
    showLogin() {
      return function (type) {
        return this.socialLoginList.indexOf(type) !== -1;
      };
    }
  },
  methods: {
    //打开注册
    openRegister() {
      this.$store.state.loginFlag = false;
      this.$store.state.registerFlag = true;
    },
    //打开忘记密码
    openForget() {
      this.$store.state.loginFlag = false;
      this.$store.state.forgetFlag = true;
    },
    //登录
    login() {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (!reg.test(this.username)) {
        this.$toast({type: "error", message: "邮箱格式不正确"});
        return false;
      }
      if (this.password.trim().length === 0) {
        this.$toast({type: "error", message: "密码不能为空"});
        return false;
      }
      const _this = this;

      //腾讯图形验证码
      // eslint-disable-next-line no-undef
      const captcha = new TencentCaptcha(
          this.config.TENCENT_CAPTCHA,
          function (res) {
            // ret  Int  验证结果，0：验证成功。2：用户主动关闭验证码。
            if (res.ret === 0) {
              //发送登录请求
              let param = new URLSearchParams();
              param.append("username", _this.username);
              param.append("password", _this.password);
              login(param).then(
                  ({data}) => {
                    if (data.status) {
                      _this.username = "";
                      _this.password = "";
                      _this.$store.commit("LOGIN", data.data);
                      _this.$store.commit("CLOSE_MODEL");
                      _this.$toast({type: "success", message: "登录成功"});
                    } else {
                      _this.$toast({type: "error", message: data.message});
                    }
                  }
              );
            }
          });
      // 显示验证码
      captcha.show();
    },
    //取消登录
    cancelLogin() {
      this.username = "";
      this.password = "";
      this.loginFlag = false;
    },
    qqLogin() {
      //保留当前路径
      this.$store.commit("saveLoginUrl", this.$route.path);
      if (
          navigator.userAgent.match(
              /(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i
          )
      ) {
        // eslint-disable-next-line no-undef
        QC.Login.showPopup({
          appId: this.config.QQ_APP_ID,
          redirectURI: this.config.QQ_REDIRECT_URI
        });
      } else {
        window.open(
            "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=" +
            +this.config.QQ_APP_ID +
            "&response_type=token&scope=all&redirect_uri=" +
            this.config.QQ_REDIRECT_URI,
            "_self"
        );
      }
    },
    weiboLogin() {
      //保留当前路径
      this.$store.commit("saveLoginUrl", this.$route.path);
      window.open(
          "https://api.weibo.com/oauth2/authorize?client_id=" +
          this.config.WEIBO_APP_ID +
          "&response_type=code&redirect_uri=" +
          this.config.WEIBO_REDIRECT_URI,
          "_self"
      );
    }
  }
};
</script>

<style scoped>
.social-login-title {
  margin-top: 1.5rem;
  color: #b5b5b5;
  font-size: 0.75rem;
  text-align: center;
}

.social-login-title::before {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}

.social-login-title::after {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}

.social-login-wrapper {
  margin-top: 1rem;
  font-size: 2rem;
  text-align: center;
}

.social-login-wrapper a {
  text-decoration: none;
}
</style>
