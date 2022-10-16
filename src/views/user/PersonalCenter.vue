<template>
  <div>
    <!--横幅-->
    <PageBanner path-name="personalCenter"/>

    <v-card class="blog-container">
      <div>
        <span class="info-title">基本信息</span>
      </div>
      <v-row class="info-wrapper">
        <v-col md="3" cols="12">
          <button id="pick-avatar">
            <v-avatar size="140">
              <img :src="this.$store.state.userInfo.avatar"/>
            </v-avatar>
          </button>
          <avatar-cropper
              @uploaded="uploadAvatar"
              trigger="#pick-avatar"
              upload-url="/web/users/avatar"
          />
        </v-col>
        <v-col md="7" cols="12">
          <v-text-field
              v-model="userInfo.nickname"
              label="昵称"
              placeholder="请输入您的昵称"
          />
          <v-text-field
              v-model="userInfo.webSite"
              class="mt-7"
              label="个人网站"
              placeholder="http://你的网址"
          />
          <v-text-field
              v-model="userInfo.intro"
              class="mt-7"
              label="简介"
              placeholder="介绍下自己吧"
          />
          <div v-if="userInfo.loginType !== 0" class="mt-7 binding">
            <v-text-field
                disabled
                v-model="userInfo.email"
                label="邮箱号"
                placeholder="请绑定邮箱"
            />
            <v-btn v-if="userInfo.email" text small @click="openEmailModel">
              修改绑定
            </v-btn>
            <v-btn v-else text small @click="openEmailModel">
              绑定邮箱
            </v-btn>
          </div>
          <v-btn @click="updateUserInfo" outlined class="mt-5">修改</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import AvatarCropper from "vue-avatar-cropper";
import PageBanner from "@/components/common/PageBanner";
import {updateUserInfo} from "@/api/user";

/**
 * 个人中心
 */
export default {
  name: "PersonalCenter",
  components: {
    AvatarCropper,
    PageBanner
  },
  data() {
    return {
      userInfo: {
        nickname: this.$store.state.userInfo.nickname,
        intro: this.$store.state.userInfo.intro,
        webSite: this.$store.state.userInfo.webSite,
        loginType: this.$store.state.userInfo.loginType,
        email: this.$store.state.userInfo.email
      }
    };
  },
  methods: {
    updateUserInfo() {
      updateUserInfo(this.userInfo).then(
          ({data}) => {
            if (data.status) {
              this.$store.commit("UPDATE_USER_INFO", this.userInfo);
              this.$toast({type: "success", message: "修改成功"});
            } else {
              this.$toast({type: "error", message: data.message});
            }
          });
    },
    uploadAvatar(data) {
      if (data.status) {
        this.$store.commit("UPDATE_AVATAR", data.data);
        this.$toast({type: "success", message: "上传成功"});
      } else {
        this.$toast({type: "error", message: data.message});
      }
    },
    openEmailModel() {
      this.$store.state.emailFlag = true;
    }
  },
  computed: {}
};
</script>

<style scoped>
.info-title {
  font-size: 1.25rem;
  font-weight: bold;
}

.info-wrapper {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

#pick-avatar {
  outline: none;
}

.binding {
  display: flex;
  align-items: center;
}
</style>
