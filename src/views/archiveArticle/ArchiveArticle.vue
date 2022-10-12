<template>
  <div>
    <!-- 横幅 -->
    <PageBanner path-name="archiveArticle"/>
    <!-- 归档列表 -->
    <v-card class="blog-container">
      <timeline timeline-theme="#00BBFF">
        <timeline-title> 目前共计{{ count }}篇文章，继续加油 </timeline-title>
        <timeline-item  v-for="item of archiveList" :key="item.id">

          <template #others>
            <v-icon color="blue">mdi-arrow-down-drop-circle</v-icon>
          </template>

          <!-- 日期 -->
          <span class="time">{{ item.createTime | date }}</span>
          <!-- 文章标题 -->
          <router-link
            :to="'/articles/' + item.id"
            class="articleItem"
          >
            {{ item.articleTitle }}
          </router-link>
        </timeline-item >
      </timeline>
      <!-- 分页按钮 -->
      <v-pagination
        color="#00C4B6"
        v-model="current"
        :length="Math.ceil(count / 10)"
        total-visible="7"
      />
    </v-card>
  </div>
</template>

<script>

import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
import 'vue-cute-timeline/dist/index.css'
import PageBanner from "@/components/common/PageBanner";
import {archivesArticle} from "@/api/articles";

/**
 * 文章归档
 */
export default {
  name:"ArchiveArticle",
  created() {
    this.listArchives();
  },
  components: {
    PageBanner,
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data: function() {
    return {
      current: 1,
      //共几页
      count: 1,
      archiveList: [
        {
          "id": 53,
          "articleTitle": "我的2021",
          "createTime": "2021-12-31T12:03:51"
        },
        {
          "id": 49,
          "articleTitle": "全站https配置",
          "createTime": "2021-09-10T20:30:44"
        },
        {
          "id": 30,
          "articleTitle": "策略模式初见",
          "createTime": "2021-03-25T11:54:57"
        },
        {
          "id": 25,
          "articleTitle": "杭漂生活记录",
          "createTime": "2020-11-20T00:40:08"
        },
        {
          "id": 24,
          "articleTitle": "下一站启程",
          "createTime": "2020-08-27T11:28:41"
        },
        {
          "id": 13,
          "articleTitle": "项目部署教程",
          "createTime": "2020-07-06T09:28:21"
        },
        {
          "id": 3,
          "articleTitle": "项目配置介绍",
          "createTime": "2020-06-30T22:20:05"
        },
        {
          "id": 2,
          "articleTitle": "Docker安装运行环境",
          "createTime": "2020-06-29T17:42:39"
        },
        {
          "id": 1,
          "articleTitle": "博客技术总结",
          "createTime": "2020-06-29T12:12:09"
        }
      ]
    };
  },
  methods: {
    listArchives() {
      archivesArticle(this.current)
        .then(({ data }) => {
          this.archiveList = data.data.recordList;
          this.count = data.data.count;
        });
    }
  },

  watch: {
    current(value) {
      archivesArticle(value)
          .then(({ data }) => {
          this.archiveList = data.data.recordList;
          this.count = data.data.count;
        });
    }
  }
};
</script>

<style scoped>
.time {
  font-size: 0.75rem;
  color: #555;
  margin-right: 1rem;
}
.articleItem{
  color:#666;
  /*text-decoration: none;*/
}
.articleItem:hover {
  font-size: 1.2rem;
  color: #00AAEE;
}
</style>
