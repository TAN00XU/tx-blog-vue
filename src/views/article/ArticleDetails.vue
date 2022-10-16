<template>
  <div>
    <!-- 封面图 -->
    <PageBanner class="banner" :web-image="this.article.articleCover">
      <div class="article-info-container">
        <!-- 文章标题 -->
        <div class="article-title">{{ article.articleTitle }}</div>
        <div class="article-info">
          <div class="first-line">
            <!-- 发表时间 -->
            <span>
              <i class="iconfont iconrili"/>
              发表于 {{ article.createTime | date }}
            </span>
            <span class="separator">|</span>
            <!-- 发表时间 -->
            <span>
              <i class="iconfont icongengxinshijian"/>
              更新于
              <template v-if="article.updateTime">
                {{ article.updateTime | date }}
              </template>
              <template v-else>
                {{ article.createTime | date }}
              </template>
            </span>
            <span class="separator">|</span>
            <!-- 文章分类 -->
            <span class="article-category">
              <i class="iconfont iconfenlei1"/>
              <router-link :to="'/categories/' + article.categoryId">
                {{ article.categoryName }}
              </router-link>
            </span>
          </div>
          <div class="second-line">
            <!-- 字数统计 -->
            <span>
              <i class="iconfont iconzishu"/>
              字数统计: {{ wordNum | num }}
            </span>
            <span class="separator">|</span>
            <!-- 阅读时长 -->
            <span>
              <i class="iconfont iconshijian"/>
              阅读时长: {{ readTime }}
            </span>
          </div>
          <div class="third-line">
            <span class="separator">|</span>
            <!-- 阅读量 -->
            <span>
              <i class="iconfont iconliulan"/>
              阅读量: {{ article.viewsCount }}
            </span>
            <span class="separator">|</span>
            <!-- 评论量 -->
            <span>
              <i class="iconfont iconpinglunzu1"/>
              评论数: {{ commentCount }}
            </span>
          </div>
        </div>
      </div>

    </PageBanner>

    <!--内容区-->
    <v-row class="article-container">
      <!--侧边-->
      <v-col md="3" cols="12" class="d-md-block d-none">
        <div style="position: sticky;top: 20px;">
          <!-- 文章目录 -->
          <v-card class="right-container">
            <div class="right-title">
              <i class="iconfont iconhanbao" style="font-size:16.8px"/>
              <span style="margin-left:10px">目录</span>
            </div>
            <div id="toc"/>
          </v-card>
          <!-- 最新文章 -->
          <v-card class="right-container" style="margin-top:20px">
            <div class="right-title">
              <i class="iconfont icongengxinshijian" style="font-size:16.8px"/>
              <span style="margin-left:10px">最新文章</span>
            </div>
            <div class="article-list">
              <div
                  class="article-item"
                  v-for="item of article.newestArticleList"
                  :key="item.id"
              >
                <router-link :to="'/articles/' + item.id" class="content-cover">
                  <img :src="item.articleCover"/>
                </router-link>
                <div class="content">
                  <div class="content-title">
                    <router-link :to="'/articles/' + item.id">
                      {{ item.articleTitle }}
                    </router-link>
                  </div>
                  <div class="content-time">{{ item.createTime | date }}</div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
      <!--主区域-->
      <v-col md="9" cols="12">
        <v-card class="article-wrapper">
          <!--文章-->
          <article
              id="write"
              class="article-content markdown-body"
              v-html="article.articleContent"
              ref="article"
          />
          <!-- 版权声明 -->
          <div class="aritcle-copyright">
            <div>
              <span>文章作者：</span>
              <router-link to="/">
                {{ blogInfo.websiteConfig.websiteAuthor }}
              </router-link>
            </div>
            <div>
              <span>文章链接：</span>
              <a :href="articleHref" target="_blank">{{ articleHref }} </a>
            </div>
            <div>
              <span>版权声明：</span>本博客所有文章除特别声明外，均采用
              <a
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
              >
                CC BY-NC-SA 4.0
              </a>
              许可协议。转载请注明文章出处。
            </div>
          </div>
          <!-- 文章标签和转发 -->
          <div class="article-operation">
            <div class="tag-container">
              <router-link
                  v-for="item of article.tagDTOList"
                  :key="item.id"
                  :to="'/tags/' + item.id"
              >
                {{ item.tagName }}
              </router-link>
            </div>
            <share style="margin-left:auto" :config="config"/>
          </div>
          <!-- 点赞和打赏-->
          <div class="article-reward">
            <!-- 点赞按钮 -->
            <a :class="isLike" @click="like">
              <v-icon size="14" color="#fff">mdi-thumb-up</v-icon>
              点赞
              <span v-show="article.likeCount > 0">
                {{ article.likeCount }}
              </span>
            </a>
            <!-- 打赏按钮 -->
            <a class="reward-btn" v-if="blogInfo.websiteConfig.isReward == 1">
              <i class="iconfont iconerweima"/> 打赏
              <!-- 二维码 -->
              <div class="animated fadeInDown reward-main">
                <ul class="reward-all">
                  <li class="reward-item">
                    <img
                        class="reward-img"
                        :src="blogInfo.websiteConfig.weiXinQRCode"
                    />
                    <div class="reward-desc">微信</div>
                  </li>
                  <li class="reward-item">
                    <img
                        class="reward-img"
                        :src="blogInfo.websiteConfig.alipayQRCode"
                    />
                    <div class="reward-desc">支付宝</div>
                  </li>
                </ul>
              </div>
            </a>
          </div>
          <!--上一篇和下一篇-->
          <div class="pagination-post">
            <!-- 上一篇 -->
            <div
                :class="isFull(article.lastArticle.id)"
                v-if="article.lastArticle.id"
            >
              <router-link :to="'/articles/' + article.lastArticle.id">
                <img
                    class="post-cover"
                    :src="article.lastArticle.articleCover"
                />
                <div class="post-info">
                  <div class="label">上一篇</div>
                  <div class="post-title">
                    {{ article.lastArticle.articleTitle }}
                  </div>
                </div>
              </router-link>
            </div>
            <!-- 下一篇 -->
            <div
                :class="isFull(article.nextArticle.id)"
                v-if="article.nextArticle.id"
            >
              <router-link :to="'/articles/' + article.nextArticle.id">
                <img
                    class="post-cover"
                    :src="article.nextArticle.articleCover"
                />
                <div class="post-info" style="text-align: right">
                  <div class="label">下一篇</div>
                  <div class="post-title">
                    {{ article.nextArticle.articleTitle }}
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <!-- 推荐文章 -->
          <div
              class="recommend-container"
              v-if="article.recommendArticleList.length"
          >
            <div class="recommend-title">
              <v-icon size="20" color="#4c4948">mdi-thumb-up</v-icon>
              相关推荐
            </div>
            <!--推荐列表-->
            <div class="recommend-list">
              <div
                  class="recommend-item"
                  v-for="item of article.recommendArticleList"
                  :key="item.id"
              >
                <router-link :to="'/articles/' + item.id">
                  <img class="recommend-cover" :src="item.articleCover" />
                  <div class="recommend-info">
                    <div class="recommend-date">
                      <i class="iconfont iconrili" />
                      {{ item.createTime | date }}
                    </div>
                    <div>{{ item.articleTitle }}</div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <!-- 分割线 -->
          <hr />
          <!-- 评论 -->
          <CommentArea :type="commentType" @getCommentCount="getCommentCount" />
        </v-card>
      </v-col>

    </v-row>
  </div>
</template>

<script>
import PageBanner from "@/components/common/PageBanner";
import CommentArea from "@/components/common/CommentArea";

import {getArticleById, likeArticle} from "@/api/articles";
import markdownToHtml from "@/utils/markdown";
//复制
import Clipboard from "clipboard"
//目录
import tocbot from "tocbot";


/**
 * 文章详情
 */
export default {
  name: "ArticleDetails",
  components: {
    PageBanner,
    CommentArea
  },
  created() {
    this.getArticle();
  },
  destroyed() {
    this.clipboard.destroy();
    tocbot.destroy();
  },
  data() {
    return {
      //分享图标配置
      config: {
        // url: '', // 网址，默认使用 window.location.href
        // source: '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        // title: '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: '饮梦的个人博客', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        // image: '', // 图片, 默认取网页中第一个img标签
        // sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban'], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
        wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>',
        sites: ["qzone", "wechat", "weibo", "qq"]
      },
      //文中的图片列表
      imgList: [],
      //文章
      article: {
        //文章id
        // id:String,
        //文章封面
        articleCover: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2Ftp01%2F1ZZQ2342Hb0-0-lp.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668435591&t=1ddfbebe006f71c0edfe7e5b0710bc26",
        //文章标题
        articleTitle: "文章标题",
        //文章分类
        categoryName: "文章分类",
        //阅读量
        viewsCount: "0",
        //创建时间
        createTime: new Date(),
        //更新时间
        updateTime: new Date(),
        //标签
        tagDTOList: [],
        //点赞数量
        likeCount: 99,
        nextArticle: {
          id: 0,
          articleCover: ""
        },
        lastArticle: {
          id: 0,
          articleCover: ""
        },
        //推荐文章
        recommendArticleList: [],
        //最新文章
        newestArticleList: []
      },
      //文章字数
      wordNum: "",
      //阅读时间
      readTime: "",
      //评论数
      commentCount: 0,
      commentType: 1,
      //文章链接
      articleHref: window.location.href,
      clipboard: null,
    };
  },
  methods: {
    /**
     * 获取文章信息
     */
    getArticle() {
      const _this = this;
      getArticleById(this.$route.params.articleId)
          .then(
              ({data}) => {
                document.title = data.data.articleTitle;
                //将markdown转换为Html
                this.article = data.data;
                this.article.articleContent = markdownToHtml(this.article.articleContent)
                this.$nextTick(
                    () => {
                      // 统计文章字数
                      this.wordNum = this.deleteHTMLTag(this.article.articleContent).length;
                      // 计算阅读时间
                      this.readTime = Math.round(this.wordNum / 400) + "分钟";
                      // 添加代码复制功能
                      this.clipboard = new Clipboard(".copy-btn");
                      this.clipboard.on("success", () => {
                        this.$toast({type: "success", message: "复制成功"});
                      });
                      // 添加文章生成目录功能
                      let nodes = this.$refs.article.children;
                      if (nodes.length) {
                        for (let i = 0; i < nodes.length; i++) {
                          let node = nodes[i];
                          let reg = /^H[1-4]$/;
                          if (reg.exec(node.tagName)) {
                            node.id = i.toString();
                          }
                        }
                      }
                      tocbot.init({
                        tocSelector: "#toc", //要把目录添加元素位置，支持选择器
                        contentSelector: ".article-content", //获取html的元素
                        headingSelector: "h1, h2, h3", //要显示的id的目录
                        hasInnerContainers: true,
                        onClick: function (e) {
                          e.preventDefault();
                        }
                      });
                      // 添加图片预览功能
                      const imgList = this.$refs.article.getElementsByTagName("img");
                      for (let i = 0; i < imgList.length; ++i) {
                        this.imgList.push(imgList[i].src);
                        imgList[i].addEventListener(
                            "click",
                            function (e) {
                              _this.previewImg(e.target.currentSrc);
                            }
                        );
                      }
                    }
                );
              }
          )
          .catch(error => this.$toast({type: "error", message: "文章获取失败" + error}));
    },
    /**
     * 删除html标签
     * @param content
     * @returns {*}
     */
    deleteHTMLTag(content) {
      return content
          .replace(/<\/?[^>]*>/g, "")
          .replace(/[|]*\n/, "")
          .replace(/&nbsp;/gi, "");
    },
    /**
     * 图片预览
     * @param img
     */
    previewImg(img) {
      this.$imagePreview({
        images: this.imgList,
        index: this.imgList.indexOf(img),
        //配置项参考 https://photoswipe.com/options/
        defaultOpt: {
          //背景不透明度
          bgOpacity: 0.8,
          // 点击上层图层关闭预览
          tapToClose: true,
          // 右上角的全屏图标
          fullscreenEl: true,
          // 右上角的X图标
          closeEl: true,
          //图片循环
          loop: true
        }
      });
    },
    /**
     * 文章点赞
     */
    like() {
      //判断是否登录
      if (!this.$store.state.userInfo.userId) {
        //唤起登录框
        this.$store.state.loginFlag = true;
        return false;
      }
      likeArticle(this.$route.params.articleId)
          .then(({data}) => {
            if (data.status) {
              //判断是否点过赞
              if (this.$store.state.userInfo.articleLikeSet.indexOf(this.article.id) !== -1) {
                this.$set(this.article, "likeCount", this.article.likeCount - 1)
              } else {
                this.$set(this.article, "likeCount", this.article.likeCount + 1);
              }
              this.$store.commit("ARTICLE_LIKE", this.article.id)
            }
          })
    },
    /**
     * 获取到评论数
     * @param count
     */
    getCommentCount(count) {
      this.commentCount = count;
    }
  },
  computed: {
    blogInfo() {
      return this.$store.state.blogInfo;
    },
    //当前用户是否点赞
    isLike() {
      const articleLikeSet = this.$store.state.userInfo.articleLikeSet;
      return articleLikeSet == null
          ? "like-btn"
          : articleLikeSet.indexOf(this.article.id) !== -1
              ? "like-btn-active"
              : "like-btn";
    },
    //是否铺满
    isFull() {
      return function(id) {
        return id ? "post full" : "post";
      };
    }
  }
};
</script>

<style scoped>
.banner:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.article-info i {
  font-size: 14px;
}

.article-info {
  font-size: 14px;
  line-height: 1.9;
  display: inline-block;
}

@media (min-width: 760px) {
  .banner {
    color: #eee !important;
  }

  .article-info span {
    font-size: 95%;
  }

  .article-info-container {
    position: absolute;
    bottom: 6.5rem;
    padding: 0 18%;
    width: 100%;
    text-align: center;
  }

  .second-line,
  .third-line {
    /*display: inline;*/
    display: inline-block;
  }

  .article-title {
    font-size: 35px;
    /*margin: 20px 0 8px;*/
    margin: 8px 0;
  }

  .pagination-post {
    display: flex;
  }

  .post {
    width: 50%;
  }

  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(33.333% - 6px);
    height: 200px;
    background: #000;
    vertical-align: bottom;
  }
}

@media (max-width: 759px) {
  .banner {
    color: #eee !important;
    height: 360px;
  }

  .article-info span {
    font-size: 90%;
  }

  .separator:first-child {
    display: none;
  }

  .blog-container {
    margin: 322px 5px 0 5px;
  }

  .article-info-container {
    position: absolute;
    bottom: 1.3rem;
    padding: 0 5%;
    width: 100%;
    color: #eee;
    text-align: left;
  }

  .article-title {
    font-size: 1.5rem;
    margin-bottom: 0.4rem;
  }

  .post {
    width: 100%;
  }

  .pagination-post {
    display: block;
  }

  .recommend-item {
    position: relative;
    display: inline-block;
    overflow: hidden;
    margin: 3px;
    width: calc(100% - 4px);
    height: 150px;
    margin: 2px;
    background: #000;
    vertical-align: bottom;
  }
}

.article-operation {
  display: flex;
  align-items: center;
}

.article-category a {
  color: #fff !important;
}

.tag-container a {
  display: inline-block;
  margin: 0.5rem 0.5rem 0.5rem 0;
  padding: 0 0.75rem;
  width: fit-content;
  border: 1px solid #49b1f5;
  border-radius: 1rem;
  color: #49b1f5 !important;
  font-size: 12px;
  line-height: 2;
}

.tag-container a:hover {
  color: #fff !important;
  background: #49b1f5;
  transition: all 0.5s;
}

.aritcle-copyright {
  position: relative;
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: 0.875rem;
  line-height: 2;
  padding: 0.625rem 1rem;
  border: 1px solid #eee;
}

.aritcle-copyright span {
  color: #49b1f5;
  font-weight: bold;
}

.aritcle-copyright a {
  text-decoration: underline !important;
  color: #99a9bf !important;
}

.aritcle-copyright:before {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  background: #49b1f5;
  content: "";
}

.aritcle-copyright:after {
  position: absolute;
  top: 0.95rem;
  right: 0.95rem;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 0.5em;
  background: #fff;
  content: "";
}

.article-reward {
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reward-btn {
  position: relative;
  display: inline-block;
  width: 100px;
  background: #49b1f5;
  margin: 0 1rem;
  color: #fff !important;
  text-align: center;
  line-height: 36px;
  font-size: 0.875rem;
}

.reward-btn:hover .reward-main {
  display: block;
}

.reward-main {
  display: none;
  position: absolute;
  bottom: 40px;
  left: 0;
  margin: 0;
  padding: 0 0 15px;
  width: 100%;
}

.reward-all {
  display: inline-block;
  margin: 0 0 0 -110px;
  padding: 20px 10px 8px !important;
  width: 320px;
  border-radius: 4px;
  background: #f5f5f5;
}

.reward-all:before {
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 20px;
  content: "";
}

.reward-all:after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 2px;
  left: 0;
  margin: 0 auto;
  width: 0;
  height: 0;
  border-top: 13px solid #f5f5f5;
  border-right: 13px solid transparent;
  border-left: 13px solid transparent;
}

.reward-item {
  display: inline-block;
  padding: 0 8px;
  list-style-type: none;
}

.reward-img {
  width: 130px;
  height: 130px;
  display: block;
}

.reward-desc {
  margin: -5px 0;
  color: #858585;
  text-align: center;
}

.like-btn {
  display: inline-block;
  width: 100px;
  background: #969696;
  color: #fff !important;
  text-align: center;
  line-height: 36px;
  font-size: 0.875rem;
}

.like-btn-active {
  display: inline-block;
  width: 100px;
  background: #ec7259;
  color: #fff !important;
  text-align: center;
  line-height: 36px;
  font-size: 0.875rem;
}

.pagination-post {
  margin-top: 40px;
  overflow: hidden;
  width: 100%;
  background: #000;
}

.post {
  position: relative;
  height: 150px;
  overflow: hidden;
}

.post-info {
  position: absolute;
  top: 50%;
  padding: 20px 40px;
  width: 100%;
  transform: translate(0, -50%);
  line-height: 2;
  font-size: 15px;
}

.post-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.4;
  transition: all 0.6s;
  object-fit: cover;
}

.post a {
  position: relative;
  display: block;
  overflow: hidden;
  height: 150px;
}

.post:hover .post-cover {
  opacity: 0.8;
  transform: scale(1.1);
}

.label {
  font-size: 90%;
  color: #eee;
}

.post-title {
  font-weight: 500;
  color: #fff;
}

hr {
  position: relative;
  margin: 40px auto;
  border: 2px dashed #d2ebfd;
  width: calc(100% - 4px);
}

.full {
  width: 100% !important;
}

.right-container {
  padding: 20px 24px;
  font-size: 14px;
}

.right-title {
  display: flex;
  align-items: center;
  line-height: 2;
  font-size: 16.8px;
  margin-bottom: 6px;
}

.right-title i {
  font-weight: bold;
}

.recommend-container {
  margin-top: 40px;
}

.recommend-title {
  font-size: 20px;
  line-height: 2;
  font-weight: bold;
  margin-bottom: 5px;
}

.recommend-cover {
  width: 100%;
  height: 100%;
  opacity: 0.4;
  transition: all 0.6s;
  object-fit: cover;
}

.recommend-info {
  line-height: 2;
  color: #fff;
  position: absolute;
  top: 50%;
  padding: 0 20px;
  width: 100%;
  transform: translate(0, -50%);
  text-align: center;
  font-size: 14px;
}

.recommend-date {
  font-size: 90%;
}

.recommend-item:hover .recommend-cover {
  opacity: 0.8;
  transform: scale(1.1);
}

.article-item {
  display: flex;
  align-items: center;
  padding: 6px 0;
}

.article-item:first-child {
  padding-top: 0;
}

.article-item:last-child {
  padding-bottom: 0;
}

.article-item:not(:last-child) {
  border-bottom: 1px dashed #f5f5f5;
}

.article-item img {
  width: 100%;
  height: 100%;
  transition: all 0.6s;
  object-fit: cover;
}

.article-item img:hover {
  transform: scale(1.1);
}

.content {
  flex: 1;
  padding-left: 10px;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.content-cover {
  width: 58.8px;
  height: 58.8px;
  overflow: hidden;
}

.content-title a {
  transition: all 0.2s;
  font-size: 95%;
}

.content-title a:hover {
  color: #2ba1d1;
}

.content-time {
  color: #858585;
  font-size: 85%;
  line-height: 2;
}
</style>

<style lang="scss">
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;

  &:hover .copy-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;

    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }

    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }

    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
    }

    &::-webkit-scrollbar-track-piece {
      background: #1e1e1e;
      width: 6px;
    }
  }

  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, 0.66);
    user-select: none;
    counter-reset: linenumber;

    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;

      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }

  b.name {
    position: absolute;
    top: 7px;
    right: 45px;
    z-index: 1;
    color: #999;
    pointer-events: none;
  }

  .copy-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    color: #ccc;
    background-color: #525252;
    border-radius: 6px;
    display: none;
    font-size: 14px;
    width: 32px;
    height: 24px;
    outline: none;
  }
}
</style>
