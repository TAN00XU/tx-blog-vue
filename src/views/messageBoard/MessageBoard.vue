<template>
  <div>
    <!-- 横幅 -->
    <PageBanner class="message-banner" title="" path-name="messageBoard">
      <!-- 弹幕输入框 -->
      <div class="message-container">
        <h1 class="message-title">留言板</h1>
        <div class="animate__animated animate__bounceIn message-input-wrapper">
          <input
              v-model="messageContent"
              @click="show = true"
              @keyup.enter="addToList"
              placeholder="说点什么吧"
          />
          <button
              class="ml-3 animate__animated animate__bounceInLeft"
              @click="addToList"
              v-show="show"
          >发射
          </button>
        </div>
      </div>
      <!-- 弹幕列表 -->
      <div class="barrage-container">
        <vue-baberrage :barrageList="barrageList">
          <template v-slot:default="slotProps">
            <span class="barrage-items">
              <img
                  :src="slotProps.item.avatar"
                  width="30"
                  height="30"
                  style="border-radius:50%"
              />
              <span class="ml-2">{{ slotProps.item.nickname }} :</span>
              <span class="ml-2">{{ slotProps.item.messageContent }}</span>
            </span>
          </template>
        </vue-baberrage>
      </div>
    </PageBanner>
  </div>
</template>

<script>
import {messagesList, addMessage} from "@/api/messages";
import PageBanner from "@/components/common/PageBanner";

/**
 * 留言板
 */
export default {
  name: "MessageBoard",
  components: {
    PageBanner
  },
  mounted() {
    //留言列表
    this.listMessage();
  },
  data() {
    return {
      show: false,
      messageContent: "",
      //弹幕列表
      barrageList: []
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    addToList() {
      if (this.messageContent.trim() === "") {
        this.$toast({type: "error", message: "留言不能为空"});
        return false;
      }
      //头像
      const userAvatar = this.userInfo.avatar
          ? this.userInfo.avatar
          : this.$store.state.blogInfo.websiteConfig.touristAvatar;
      //昵称
      const userNickname = this.userInfo.nickname
          ? this.userInfo.nickname
          : "游客";
      //包装留言
      const message = {
        avatar: userAvatar,
        nickname: userNickname,
        messageContent: this.messageContent,
        time: Math.floor(Math.random() * (10 - 7)) + 7
      };
      //清空输入框
      this.messageContent = "";
      //发送请求
      addMessage(message)
          .then(({data}) => {
            if (data.status) {
              this.barrageList.push(message);
              this.$toast({type: "success", message: "留言成功"});
            } else {
              this.$toast({type: "error", message: data.message});
            }
          })
          .catch(error => {
            this.$toast({type: "error", message: error});
          });
    },
    //留言列表
    listMessage() {
      messagesList().then(({data}) => {
        if (data.status) {
          this.barrageList = data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.message-banner {
  height: 100vh;
}

.message-title {
  color: #eee;
  animation: title-scale 1s;
}

.message-container {
  position: absolute;
  width: 360px;
  top: 35%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 5;
  margin: 0 auto;
  color: #fff;
}

.message-input-wrapper {
  display: flex;
  justify-content: center;
  height: 2.5rem;
  margin-top: 2rem;
}

.message-input-wrapper input {
  outline: none;
  width: 70%;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  color: #eee;
  border: #fff 1px solid;
}

.message-input-wrapper input::-webkit-input-placeholder {
  color: #eeee;
}

.message-input-wrapper button {
  outline: none;
  border-radius: 20px;
  height: 100%;
  padding: 0 1.25rem;
  border: aqua 1px solid;
}

/*弹幕容器*/
.barrage-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  height: calc(100% - 50px);
  width: 100%;
}

.barrage-items {
  background: rgb(0, 0, 0, 0.7);
  border-radius: 100px;
  color: #fff;
  padding: 5px 10px 5px 5px;
  align-items: center;
  display: flex;
}
</style>
