<template>
  <v-card  class="animate__animated animate__zoomIn" v-if="talkList.length > 0">

    <router-link to="/talks" class="swiper-container">
      <v-icon size="20" color="#4c4948">mdi-chat-outline</v-icon>
      <div
          :style="{ height: height * lineNum + 'px' }"
          class="rollScreen_container"
          id="rollScreen_container"
      >
        <ul
            class="rollScreen_list"
            :style="{ transform: transform }"
            :class="{ rollScreen_list_unanim: num === 0 }"
        >
          <li
              class="rollScreen_once"
              v-for="(item, index) in talkList"
              :key="index"
              :style="{ height: height + 'px' }"
          >
            <span class="item" v-html="item"/>
          </li>

          <li
              class="rollScreen_once"
              v-for="(item, index) in talkList"
              :key="index + talkList.length"
              :style="{ height: height + 'px' }"
          >
            <span class="item" v-html="item"/>
          </li>
        </ul>
      </div>
      <v-icon size="20" color="#4c4948" class="arrow">
        mdi-chevron-double-right
      </v-icon>
    </router-link>
  </v-card>

</template>

<script>
import {homeTalks} from "@/api/Talks.js";
export default {
  //说说轮播
  name: "TalkCarousel",
  // props: {
  //   height: {
  //     default: 25,
  //     type: Number
  //   },
  //   lineNum: {
  //     default: 1,
  //     type: Number
  //   }
  // },
  data: function () {
    return {
      num: 0,
      //说说列表
      talkList:
    [ "由于老群被封<img src=\"https://static.talkxj.com/emoji/dq.jpg?\" width=\"24\" height=\"24\" alt=\"[大哭]\" style=\"margin: 0 1px;vertical-align: text-bottom\">，现换了个新群208641419，兄弟们记得回家。",
      "只想着走捷径只会适得其反，是该好好沉淀下来学习了。",
      "祝大家新年快乐<img src=\"https://static.talkxj.com/emoji/cy.jpg\" width=\"24\" height=\"24\" alt=\"[呲牙]\" style=\"margin: 0 1px;vertical-align: text-bottom\">",
      "看似简单的文本编辑器，坑竟然这么多<img src=\"https://static.talkxj.com/emoji/dq.jpg?\" width=\"24\" height=\"24\" alt=\"[大哭]\" style=\"margin: 0 1px;vertical-align: text-bottom\">，好在最后的实现效果还不错，后续再进行迭代优化了。",
      "熬夜爆肝，终于两天把说说功能写完了<img src=\"https://static.talkxj.com/emoji/linghunchuqiao.jpg\" width=\"22\" height=\"20\" style=\"padding: 0 1px;vertical-align: -4px\">"
    ],
      height:25,
      lineNum:1
    };
  },
  methods:{
    //获取首页说说
    listHomeTalks() {
      homeTalks().then(
          ({ data }) => {
        this.talkList = data.data;
      }
      );
    },
  },
  computed: {
    transform: function () {
      return "translateY(-" + this.num * this.height + "px)";
    }
  },
  created() {
    //初始化说说
    this.listHomeTalks();

    let _this = this;
    setInterval(function () {
      if (_this.num !== _this.talkList.length) {
        _this.num++;
      } else {
        _this.num = 0;
      }
    }, 3000);
  }
};
</script>

<style scoped>

.swiper-container {
  margin-top: 20px;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
}

.rollScreen_container {
  width: 100%;
  line-height: 25px;
  text-align: center;
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.item {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.3s;
}

.rollScreen_list:hover .item {
  color: #8e8cd8;
}

.rollScreen_list {
  transition: 1s linear;
}

.rollScreen_list_unanim {
  transition: none;
}

.arrow {
  animation: 1s passing infinite;
}

@keyframes passing {
  0% {
    transform: translateX(-50%);
    opacity: 0;
  }
  50% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(50%);
    opacity: 0;
  }
}

</style>