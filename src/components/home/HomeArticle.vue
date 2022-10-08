<template>
  <div>
    <v-card
        class="animate__animated animate__zoomIn article-card"
        style="border-radius: 12px 8px 8px 12px"
        v-for="(article, index) of articleList"
        :key="article.id"
    >
      <!-- 文章封面图 -->
      <div :class="isRight(index)">
        <router-link :to="'/articles/' + article.id">
          <v-img
              class="on-hover"
              width="100%"
              height="100%"
              :src="article.articleCover"
          />
        </router-link>
      </div>
      <!-- 文章内容 -->
      <div class="article-wrapper">
        <!--标题-->
        <div style="line-height:1.4">
          <router-link :to="'/articles/' + article.id">
            {{ article.articleTitle }}
          </router-link>
        </div>
        <!--文章信息-->
        <div class="article-info">
          <!-- 是否置顶 -->
          <span v-if="article.isTop === 1">
            <span style="color:#ff7242">
              <i class="iconfont iconzhiding"/> 置顶
            </span>
            <span class="separator">|</span>
          </span>
          <!-- 发表时间 -->
          <v-icon size="14">mdi-calendar-month-outline</v-icon>
          {{ article.createTime | date }}
          <span class="separator">|</span>
          <!-- 文章分类 -->
          <router-link :to="'/categories/' + article.categoryId">
            <v-icon size="14">mdi-inbox-full</v-icon>
            {{ article.categoryName }}
          </router-link>
          <span class="separator">|</span>
          <!-- 文章标签 -->
          <router-link
              style="display:inline-block"
              v-for="tag of article.tagDTOList"
              :to="'/tags/' + tag.id"
              class="mr-1"
              :key="tag.id"
          >
            <v-icon size="14">mdi-tag-multiple</v-icon>
            {{ tag.tagName }}
          </router-link>
        </div>
        <!-- 文章内容 -->
        <div class="article-content">
          {{ article.articleContent }}
        </div>
      </div>
    </v-card>
    <!-- 无限加载 -->
    <infinite-loading
        @infinite="infiniteHandler"
        spinner="waveDots"
    >
      <!--
            加载的动画
            1、bubbles
            2、circles
            3、default
            4、spiral
            5、waveDots
            -->
      <!--      <div slot="spinner"></div>-->
      <div slot="no-more">没有更多内容了</div>
      <div slot="no-results">
        <br/>
        <hr/>
        暂无数据了
      </div>
    </infinite-loading>
  </div>
</template>

<script>
import {homeArticle} from "@/api/article";

export default {
  name: "HomeArticle",
  data() {
    return {
      //文章列表
      articleList: [
        {
          "id": 1,
          "articleCover": "https://static.talkxj.com/articles/3dffb2fcbd541886616ab54c92570de3.jpg",
          "articleTitle": "博客技术总结",
          "articleContent": "##  1.技术介绍\n**前端**：vue + vuex + vue-router + axios + vuetify + element + echarts\n\n**后端**：SpringBoot + nginx + docker + SpringSecurity + Swagger2 + MyBatisPlus + Mysql + Redis + elasticsearch + rabbitMQ + MaxWell\n\n**其他**：接入QQ，微博第三方登录\n\n## 2.运行环境\n**开发工具**：IDEA\n\n**服务器**：阿里云2核4G CentOS7.2\n\n**CDN**：阿里云全站加速\n\n**对象存储**：阿里云OSS\n\n## 3.项目截图\n![QQ截图20210320171133.png](https://static.talkxj.com/articles/1616231666692.png)\n\n![QQ截图20210320235519 1.jpg](https://static.talkxj.com/articles/1616255938601.jpg)\n\n![QQ截图2",
          "createTime": "2020-06-29T12:12:09",
          "isTop": 1,
          "type": 1,
          "categoryId": 1,
          "categoryName": "项目介绍",
          "tagDTOList": [
            {
              "id": 2,
              "tagName": "Vue"
            },
            {
              "id": 15,
              "tagName": "项目"
            }
          ]
        },
        {
          "id": 53,
          "articleCover": "https://static.talkxj.com/articles/ceb6402f4d22c463638533577f54619b.png",
          "articleTitle": "我的2021",
          "articleContent": "## 前言\n\n滴，2021剩余体验卡最后一天。\n\n今年对我来说算是感触最深的一年，从学生到打工人再到学生的变化，哈哈。\n\n## 实习生活\n\n实习的日子累并快乐着，刚开始的时候很多地方都不懂，也没接触过公司项目，全都是靠组长和同事的指导。当时和很多同学一样觉得自己水平不行，跟不上同事进度，甚至都想辞职。\n\n不过经过一段时间的锻炼后，自己也能独立完成业务和开发模块，心态也逐渐的好了起来，也得到了同事的夸奖和组长的肯定，收获还是颇多的，学到了挺多项目规范和技术。印象最深的就是当时有个需求是开发实时监控功能，需要用到Websocket，当时正好在做博客的聊天室功能，于是就接下了这个活。做公司项目和个人项目最大的区别就是需要考虑的更多，个人项目基本实现功能就行，公司项目需要考虑到各种情况，防止出现线上问题。最后的上线效果还是非常好的（虽然经过了测试各种毒打），当看到自己的代码上线运行的那一刻，心里还是十分自豪的。\n\n![1640919442167 1.jpg](https://static.talkxj.com/articles/f5a549894aa225a688d6904429a0f08e.",
          "createTime": "2021-12-31T12:03:51",
          "isTop": 0,
          "type": 1,
          "categoryId": 9,
          "categoryName": "生活随笔",
          "tagDTOList": [
            {
              "id": 28,
              "tagName": "2021"
            }
          ]
        },
        {
          "id": 49,
          "articleCover": "https://static.talkxj.com/articles/771941739cbc70fbe40e10cf441e02e5.jpg",
          "articleTitle": "全站https配置",
          "articleContent": "> 鉴于很多同学对https配置不太熟悉，至此写个教程\n\n## 1.申请ssl证书（阿里云为例）\n\n打开阿里云控制台SSL证书应用\n\n![QQ截图20210910200231.png](https://static.talkxj.com/articles/dd0538acf8dfbc6f8b1684e79b2d6e2a.png)\n\n进入后点击SSL证书 -> 免费证书 -> 立即购买\n\n![QQ截图20210910200545.png](https://static.talkxj.com/articles/255c1ca536c79e6a17fffde54c9b5118.png)\n\n完成后点击创建证书 -> 证书申请\n\n![QQ截图20210910200739.png](https://static.talkxj.com/articles/42bb4a24dcd932307e31ef29e6ae82ec.png)\n\n填写好你的相关信息等待申请成功\n\n![QQ截图20210910200900.png](https://static.talkxj.com/articles/4934c51d",
          "createTime": "2021-09-10T20:30:44",
          "isTop": 0,
          "type": 1,
          "categoryId": 1,
          "categoryName": "项目介绍",
          "tagDTOList": [
            {
              "id": 15,
              "tagName": "项目"
            },
            {
              "id": 27,
              "tagName": "https"
            }
          ]
        },
        {
          "id": 30,
          "articleCover": "https://static.talkxj.com/articles/885607723eee90de876c1dadea3cced1.jpg",
          "articleTitle": "策略模式初见",
          "articleContent": "## 1.需求\n\n文件上传是一个很常见的功能，支持单种文件格式类型就不必多说了，但需要支持多种格式文件上传该怎么写最好呢，这时可以用到策略模式来解决。\n\n## 2.讲解\n\n现在有个功能，要求实现CSV，XLSX，XLS数据格式的文件导入，并返回数据。\n\n这里就可以采取枚举 + 抽象方法的方式解决。话不多说，上代码。\n\n```java\n@Getter\n@AllArgsConstructor\npublic enum FileSuffixHandler {\n    CSV(\".csv\"){\n        @Override\n        public Map<String, List<List<String>>> getFileData(File file) throws IOException {\n            return CSVUtils.getCSVData(file);\n        }\n    },\n    XlSX(\".xlsx\") {\n        @Override\n        public Map<String, List<List<String>>",
          "createTime": "2021-03-25T11:54:57",
          "isTop": 0,
          "type": 1,
          "categoryId": 12,
          "categoryName": "设计模式",
          "tagDTOList": [
            {
              "id": 18,
              "tagName": "策略模式"
            }
          ]
        },
        {
          "id": 25,
          "articleCover": "https://static.talkxj.com/articles/c99ffff7fd87877dbd76cbd96d954b7d.jpg",
          "articleTitle": "杭漂生活记录",
          "articleContent": "## 前言\n\n转眼间就到了实习的日子，这一天比想象中来的要快，背上行囊就立刻出发了。来到杭州的原因是因为有学长内推进古茗，所以直接过来了，毕竟这种机会可遇不可求😁。\n\n![1605804293286_gaitubao_434x221.jpg](https://static.talkxj.com/articles/1605804491254.jpg)\n\n四个多小时的路程不算长也不算短，对于第一次出省的我来说还是挺激动的😂。路上也没有出什么岔子，安全抵达目的地，等了一会学长就接我过去了。之前在学校看了两个星期面试题，所以周末两天在周边逛了下，体验一下杭州的生活。这边的物价没有网上说的那么恐怖，感觉和长沙差不多，还能接受😀，周边的环境设施什么的都挺好的。\n\n古茗面试是星期一下午2点，第一次面试为了体现我的正式，特意去理发店搞了个发型😂。中午吃完饭12点多就出发了，结果出门的时候忘带口罩，直接打滴滴过去😭，花了二十大洋。提前了半个小时在公司楼底下等。\n\n到了公司楼层，前台就领我进去了，里面挺大的，比想象中的要更好，大概有几百人。首先是做一套笔试题，限时半个小时，大部分都是考数据结构和网络协议啥",
          "createTime": "2020-11-20T00:40:08",
          "isTop": 0,
          "type": 1,
          "categoryId": 9,
          "categoryName": "生活随笔",
          "tagDTOList": [
            {
              "id": 12,
              "tagName": "面试"
            },
            {
              "id": 13,
              "tagName": "杭州"
            }
          ]
        },
        {
          "id": 24,
          "articleCover": "https://static.talkxj.com/articles/c4e930ffa0f922fa07dfc7dfe077990c.jpg",
          "articleTitle": "下一站启程",
          "articleContent": "## 前言\n\n转眼间，暑假就已经接近尾声了，这大概是人生中最长的一假期了吧，呆家里足足九个月时间，就这样快度过了。\n\n下学期就大三开学了，离实习也只有仅仅三个月，大学生活就这样快结束了。回首往事，似乎也没留下什么值得纪念的事情，唯一参加的有意义的活动就是校园歌手大赛了吧😆，准备了一个月拿了三等奖，还是挺开心的。整个大一就是差不多浑浑噩噩的混过去了，到了暑假才开始看视频学习。有一说一，刚开始学习的时候是最有兴趣的，整天除了吃饭就是看视频，做出了个小玩意内心自豪感十足，反而到后期经常做项目倒觉得乏味了，没有乐趣感。\n\n大二上学期做了几个练手项目，开始放寒假，没想到因为疫情的影响，改为在家上网课，这学习效率大家也心知肚明😂，只能说保持不退步了。在这段时间里也没什么目标，东学一点，西学一点的，没有很大的收获，最后就把技术整合起来完成了这个博客，算是对上学期的总结吧。\n\n然后到了大二暑假，没有了网课的时间限制，就去考驾照了。炎炎夏日，每天练车的感觉也是无比酸爽的，天天6点起床，强行纠正生物钟🙃。好在碰到了好教练，学起来也事半功倍，都一次性过了，总共耗时大概一个半月，拿到证的时候感觉努力没有白费，",
          "createTime": "2020-08-27T11:28:41",
          "isTop": 0,
          "type": 1,
          "categoryId": 9,
          "categoryName": "生活随笔",
          "tagDTOList": [
            {
              "id": 11,
              "tagName": "生活"
            }
          ]
        },
        {
          "id": 13,
          "articleCover": "https://static.talkxj.com/articles/a31d598cf1676b21787639326084d918.jpg",
          "articleTitle": "项目部署教程",
          "articleContent": "## 1.打包后端项目jar包\n\n打开pom.xml文件，修改packaging方式为jar\n\n![QQ截图20210813231637 1.png](https://static.talkxj.com/articles/25de8986f7af569e7586936b847f596a.png)\n\n点击右侧maven插件 -> package\n\n![QQ截图20210813231652 1.png](https://static.talkxj.com/articles/1f03c29f1da200e8bc7eab611697475b.png)\n\n打包成功后会在target目录下生成jar包\n\n![QQ截图20210813231721 1.png](https://static.talkxj.com/articles/a8c50ac983abf425dfccda924b4d0ab3.png)\n\n\n## 2.编写Dockerfile文件\n\n```sh\nFROM java:8\nVOLUME /tmp\nADD blog-springboot-0.0.1.jar blog.jar       \n",
          "createTime": "2020-07-06T09:28:21",
          "isTop": 0,
          "type": 1,
          "categoryId": 1,
          "categoryName": "项目介绍",
          "tagDTOList": [
            {
              "id": 10,
              "tagName": "Linux"
            },
            {
              "id": 15,
              "tagName": "项目"
            }
          ]
        },
        {
          "id": 3,
          "articleCover": "https://static.talkxj.com/articles/db33914d490eb15b81e6ff4cfacaea84.jpg",
          "articleTitle": "项目配置介绍",
          "articleContent": "> 项目需要配置的地方不多，主要就两个地方需要注意：邮箱授权和第三方授权需要提前申请\n\n## 1.基本设置\n\n### 1.1 打开application.yml，修改数据库ip等基本信息\n\n![QQ截图20210818144550.png](https://static.talkxj.com/articles/b984c1f473e8903be92408bfa698afe9.png)\n\n这些基本的配置就不多说了，基本就是改下服务器ip和账号密码什么的\n\n### 1.2 获取QQ邮箱授权码（邮箱验证码用）\n\n打开QQ邮箱官网，点击设置 -> 账户 -> 往下翻\n\n![QQ截图20200630213835.png](https://static.talkxj.com/articles/1593524350827.png)\n\n点击生成授权码\n\n![QQ截图20200630220934.png](https://static.talkxj.com/articles/1593526185438.png)\n\n更改application中的邮箱配置\n\n![QQ截图20200630221617.png",
          "createTime": "2020-06-30T22:20:05",
          "isTop": 0,
          "type": 1,
          "categoryId": 1,
          "categoryName": "项目介绍",
          "tagDTOList": [
            {
              "id": 4,
              "tagName": "QQ"
            },
            {
              "id": 5,
              "tagName": "微博"
            },
            {
              "id": 15,
              "tagName": "项目"
            }
          ]
        },
        {
          "id": 2,
          "articleCover": "https://static.talkxj.com/articles/7cdd5d97ce85a65988f510ff79c90e46.jpg",
          "articleTitle": "Docker安装运行环境",
          "articleContent": "## 1.必装环境（最低1核2G）\n\n### 1.1.安装Docker\n\n```java\nyum install -y yum-utils device-mapper-persistent-data lvm2    //安装必要工具\nyum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo //设置yum源\nyum install -y docker-ce  //下载docker\nsystemctl start docker   //启动docker\n```\n\n### 1.2.安装MySQL\n\n```java\ndocker pull mysql //下载MySQL镜像\ndocker run --name mysql --restart=always -p 3306:3306 -e MYSQL_ROOT_PASSWORD=密码 -d mysql //启动MySQL\n```\n\n### 1.3.安装Redis\n\n```java\ndocker pull redis ",
          "createTime": "2020-06-29T17:42:39",
          "isTop": 0,
          "type": 1,
          "categoryId": 1,
          "categoryName": "项目介绍",
          "tagDTOList": [
            {
              "id": 3,
              "tagName": "Docker"
            },
            {
              "id": 15,
              "tagName": "项目"
            }
          ]
        }
      ],
      //当前页
      current:1
    }
  },
  methods: {
    infiniteHandler($state) {
      let md = require("markdown-it")();
      //获取首页文章
      homeArticle(this.current)
          .then(
              ({data}) => {
                console.log("时候", data)
                if (data.data.length && data.code !== 200) {
                  // 去除markdown标签
                  data.data.forEach(item => {
                    item.articleContent = md
                        .render(item.articleContent)
                        .replace(/<\/?[^>]*>/g, "")
                        .replace(/[|]*\n/, "")
                        .replace(/&npsp;/gi, "");
                  });
                  this.articleList.push(...data.data);
                  this.current++;
                  $state.loaded();
                } else {
                  $state.complete();
                }
              }
          )
          .catch(() => {
                $state.complete();
              }
          )

    }
  },
  computed: {
    //图片是否靠右
    isRight() {
      return function (index) {
        if (index % 2 === 0) {
          return "article-cover left-radius";
        }
        return "article-cover right-radius";
      };
    },
  }
}
</script>

<style scoped>
/*文章信息*/
.article-wrapper {
  font-size: 14px;
}

.article-wrapper a:hover {
  color: aqua;
}


/*图片靠左*/
.left-radius {
  border-radius: 8px 0 0 8px !important;
  order: 0;
}

/*图片靠右*/
.right-radius {
  border-radius: 0 8px 8px 0 !important;
  order: 1;
}

/*文章内容*/
.article-content {
  line-height: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

@media (min-width: 760px) {
  /*文章内容*/
  .article-wrapper {
    padding: 0 2.5rem;
    width: 55%;
  }

  .article-wrapper a {
    font-size: 1.5rem;
    transition: all 0.3s;
  }

  /*文章图片*/
  .article-cover {
    overflow: hidden;
    height: 100%;
    width: 45%;
  }

  .on-hover {
    transition: all 0.6s;
  }

  .article-card {
    display: flex;
    align-items: center;
    height: 280px;
    width: 100%;
    margin-top: 20px;
  }

  .article-card:hover .on-hover {
    transform: scale(1.1);
  }
}

@media (max-width: 759px) {

  /*文章图片*/
  .article-cover {
    border-radius: 8px 8px 0 0 !important;
    height: 230px !important;
    width: 100%;
  }

  .article-cover div {
    border-radius: 8px 8px 0 0 !important;
  }

  /*文章信息*/
  .article-wrapper {
    padding: 1.25rem 1.25rem 1.875rem;
  }

  .article-wrapper a {
    font-size: 1.25rem;
    transition: all 0.3s;
  }
}

/*文章信息*/
.article-info {
  font-size: 95%;
  color: #858585;
  line-height: 2;
  margin: 0.375rem 0;
}

.article-info a {
  font-size: 95%;
  color: #858585 !important;
}

.article-info a:hover {
  font-size: 100%;
  color: #00CED1 !important;
}

</style>