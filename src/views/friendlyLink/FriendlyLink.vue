<template>
  <div>
    <!-- 横幅 -->
    <PageBanner path-name="friendlyLink" title="pageName"/>
    <!-- 链接列表 -->
    <v-card class="blog-container">
      <div class="link-title mb-1">
        <v-icon color="blue">mdi-link-variant</v-icon>
        大佬们的链接
      </div>
      <!--友链列表-->
      <v-row class="link-container">
        <v-col
            class="link-wrapper"
            md="4"
            cols="12"
            v-for="link of friendLinkList"
            :key="link.id"
        >
          <a :href="link.linkAddress" target="_blank">
            <v-avatar size="65" class="link-avatar">
              <img :src="link.linkAvatar"/>
            </v-avatar>
            <div style="width:100%;z-index:10;">
              <div class="link-name">{{ link.linkName }}</div>
              <div class="link-intro">{{ link.linkIntro }}</div>
            </div>
          </a>
        </v-col>
      </v-row>
      <!-- 说明 -->
      <div class="link-title mt-4 mb-4">
        <v-icon color="blue">mdi-dots-horizontal-circle</v-icon>
        添加友链
      </div>
      <blockquote>
        <div>名称：{{ blogInfo.websiteConfig.websiteName }}</div>
        <div>简介：{{ blogInfo.websiteConfig.websiteIntro }}</div>
        <div>头像：{{ blogInfo.websiteConfig.websiteAvatar }}</div>
      </blockquote>
      <div class="mt-5 mb-5">
        需要交换友链的可在下方留言💖
      </div>
      <blockquote class="mb-10 mt-3">
        友链信息展示需要，你的信息格式要包含：名称、介绍、链接、头像
      </blockquote>
      <!-- 评论区 -->
      <CommentArea :type="this.commentType"/>
    </v-card>
  </div>
</template>

<script>
import {ListFriendlyLink} from "@/api/friendlyLink";
import PageBanner from "@/components/common/PageBanner";
import CommentArea from "@/components/common/CommentArea";

/**
 * 友情链接
 */
export default {
  name: "FriendlyLink",
  components: {
    PageBanner,
    CommentArea
  },
  created() {
    this.listFriendLink();
  },
  data: function () {
    return {
      friendLinkList: [
        {
          "id": 8,
          "linkName": "Rabbiter",
          "linkAvatar": "https://rabbiter.top/oss/blogs/imgs/img_a747e35f49e_1610944315976.jpg",
          "linkAddress": "https://rabbiter.top/",
          "linkIntro": "Rabbiter的个人博客"
        },
        {
          "id": 10,
          "linkName": "Yw",
          "linkAvatar": "https://img.yww52.com/avatar.jpg",
          "linkAddress": "https://yww52.com/",
          "linkIntro": "永远相信美好的事情即将发生"
        },
        {
          "id": 13,
          "linkName": "Cyril",
          "linkAvatar": "http://statics.twinkle-leaf.cn/avatar/1617637395886.png",
          "linkAddress": "https://www.twinkle-leaf.cn/",
          "linkIntro": "Cyril的个人博客"
        },
        {
          "id": 16,
          "linkName": "包子博客",
          "linkAvatar": "https://tse3-mm.cn.bing.net/th/id/OIP.N9gKzFp25pPG7h7sIVznSwHaHa?pid=ImgDet&rs=1",
          "linkAddress": "http://hc-czw.xyz",
          "linkIntro": "我在快节奏里慢慢来，不加入马戏团"
        },
      ],
      commentType: 2
    };
  },
  methods: {
    listFriendLink() {
      ListFriendlyLink().then(({data}) => {
        this.friendLinkList = data.data;
      });
    }
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    }
  }
};
</script>

<style scoped>

blockquote {
  line-height: 2;
  margin: 0;
  font-size: 15px;
  border-left: 0.4rem solid #49b1f5;
  padding: 10px 1rem !important;
  background-color: #ecf7fe;
  border-radius: 15px;
}

.link-title {
  color: #344c67;
  font-size: 21px;
  font-weight: bold;
  line-height: 2;
}

.link-container {
  margin: 10px 10px 0;
}

.link-wrapper {
  position: relative;
  transition: all 0.3s;
  border-radius: 8px;
}

.link-avatar {
  margin-top: 5px;
  margin-left: 10px;
  transition: all 0.5s;
}

@media (max-width: 759px) {
  .link-avatar {
    margin-left: 30px;
  }
}

.link-name {
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  z-index: 1000;
}

.link-intro {
  text-align: center;
  padding: 16px 10px;
  height: 50px;
  font-size: 13px;
  color: #1f2d3d;
  width: 100%;
}

.link-wrapper:hover a {
  color: #fff;
}

.link-wrapper:hover .link-intro {
  color: #fff;
}

.link-wrapper:hover .link-avatar {
  transform: rotate(360deg);
}

.link-wrapper a {
  color: #333;
  text-decoration: none;
  display: flex;
  height: 100%;
  width: 100%;
}

.link-wrapper:hover {
  box-shadow: 0 2px 20px #49b1f5;
}

.link-wrapper:hover:before {
  transform: scale(1);
}

.link-wrapper:before {
  position: absolute;
  border-radius: 8px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #49b1f5 !important;
  content: "";
  transition-timing-function: ease-out;
  transition-duration: 0.3s;
  transition-property: transform;
  transform: scale(0);
}
</style>
