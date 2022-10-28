<template>
  <div>
    <!-- 横幅 -->
    <PageBanner path-name="categories" title="pageName"/>
    <!-- 分类列表 -->
    <v-card class="blog-container">
      <div class="category-title">分类 - {{ count }}</div>
      <ul class="category-list">
        <li
            class="category-list-item"
            v-for="item of categoryList"
            :key="item.id"
        >
          <router-link :to="'/categories/' + item.id">
            {{ item.categoryName }}
            <span class="category-count">({{ item.articleCount }})</span>
          </router-link>
        </li>
      </ul>
    </v-card>
  </div>
</template>

<script>

import PageBanner from "@/components/common/PageBanner";
import {categoriesArticle} from "@/api/articles";

/**
 * 文章分类
 */
export default {
  name: "CategoryArticle",
  components: {
    PageBanner
  },
  created() {
    this.listCategories();
  },
  data: function () {
    return {
      //分类列表
      categoryList: [
        {
          "id": 1,
          "categoryName": "分类列表测试",
          "articleCount": 66
        },
        {
          "id": 2,
          "categoryName": "测试分类列表",
          "articleCount": 99
        }
      ],
      count: 0
    };
  },
  methods: {
    // 获取分类列表
    listCategories() {
      categoriesArticle()
          .then(({data}) => {
            this.categoryList = data.data.recordList;
            this.count = data.data.count;
          })
          .catch((error) => {
            this.$toast({type: "error", message: "获取文章分类失败!\n" + error})
          })
    }
  }
};
</script>

<style scoped>
.category-title {
  text-align: center;
  font-size: 36px;
  line-height: 2;
}

@media (max-width: 759px) {
  .category-title {
    font-size: 28px;
  }
}

.category-list {
  margin: 0 1.8rem;
  list-style: none;
}

.category-list-item {
  padding: 8px 1.8rem 8px 0;
}

.category-list-item:before {
  display: inline-block;
  position: relative;
  left: -0.75rem;
  width: 12px;
  height: 12px;
  border: 0.2rem solid #49b1f5;
  border-radius: 50%;
  background: #fff;
  content: "";
  transition-duration: 0.3s;
}

.category-list-item:hover:before {
  border: 0.3rem solid #ff7242;
  width: 15px;
  height: 15px;
}

.category-list-item a:hover {
  transition: all 0.3s;
  font-size: 1.2rem;
  /*color: #8e8cd8;*/
  color: #00AAEE;
}

.category-list-item a:not(:hover) {
  transition: all 0.5s;
}

.category-count {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  color: #858585;
}
</style>
