<template>
  <div>
    <!-- 横幅 -->
    <PageBanner path-name="archive" title="pageName"/>
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
  data() {
    return {
      current: 1,
      //共几页
      count: 1,
      archiveList: [
        {
          "id": 1,
          "articleTitle": "归档列表测试",
          "createTime": "2022-10-1T12:00:00"
        },
        {
          "id": 2,
          "articleTitle": "归档列表测试",
          "createTime": "2022-10-2T12:00:00"
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
  transition: all 0.3s linear;

}
</style>
