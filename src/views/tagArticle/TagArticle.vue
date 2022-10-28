<template>
  <div>
    <!-- 横幅 -->
    <PageBanner path-name="tags" title="pageName"/>
    <!-- 标签列表 -->
    <v-card class="blog-container">
      <div class="tag-cloud-title">标签 - {{ count }}</div>
      <div class="tag-cloud">
        <router-link
          :style="{ 'font-size': Math.floor(Math.random() * 10) + 18 + 'px' }"
          v-for="item of tagList"
          :key="item.id"
          :to="'/tags/' + item.id"
        >
          {{ item.tagName }}
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script>

import PageBanner from "@/components/common/PageBanner";
import {tagsArticle} from "@/api/articles";

/**
 * 文章标签
 */
export default {
  name:"TagArticle",
  components:{
    PageBanner
  },
  created() {
    this.listTags();
  },
  data: function() {
    return {
      count: 7,
      tagList: [
        {
          "id": 1,
          "tagName": "JAVA"
        },
        {
          "id": 2,
          "tagName": "Linux"
        },
        {
          "id": 3,
          "tagName": "MySQL"
        },
        {
          "id": 4,
          "tagName": "Vue"
        },
        {
          "id": 5,
          "tagName": "RabbitMQ"
        },
        {
          "id": 6,
          "tagName": "学习"
        },
        {
          "id": 7,
          "tagName": "生活"
        }
      ],
    };
  },
  methods: {
    listTags() {
      tagsArticle().then(({ data }) => {
        if(data.status){
          this.tagList = data.data.recordList;
          this.count = data.data.count;
        }else {
          this.$toast({type: "error", message: data.message});
        }

      });
    }
  }
};
</script>

<style scoped>
.tag-cloud-title {
  line-height: 2;
  font-size: 36px;
  text-align: center;
}
@media (max-width: 759px) {
  .tag-cloud-title {
    font-size: 25px;
  }
}
.tag-cloud {
  text-align: center;
}
.tag-cloud a {
  color: #616161;
  display: inline-block;
  text-decoration: none;
  padding: 0 8px;
  line-height: 2;
  transition: all 0.3s;
}
.tag-cloud a:hover {
  color: #03a9f4 !important;
  transform: scale(1.1);
}
</style>
