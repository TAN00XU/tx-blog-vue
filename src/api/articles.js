import request from "@/api/baseRequest";


/**
 * 获取首页文章信息
 * @param current 当前第几页
 * @returns {*}
 */
export function homeArticle(current) {
    return request({
        method: "GET",
        url: "/articles",
        params: {
            current: current
        }
    })
}

/**
 * 获取文章分类
 * @returns {*}
 */
export function categoriesArticle() {
    return request({
        method: "GET",
        url: "/categories"
    })
}

/**
 * 获取文章归档
 * @param current 当前第几页
 * @returns {*}
 */
export function archivesArticle(current) {
    return request({
        method: "GET",
        url: "/articles/archives",
        params: {
            current: current
        }
    })
}

/**
 * 获取文章标签
 * @returns {*}
 */
export function tagsArticle() {
    return request({
        method: "GET",
        url: "/tags"
    })
}

/**
 * 根据文章id获取文章
 * @param articleId 文章id
 * @returns {*}
 */
export function getArticleById(articleId) {
    return request({
        method : "GET",
        url : `/articles/${articleId}`
    })
}

/**
 * 点赞文章根据文章id
 * @param articleId 文章id
 * @returns {*}
 */
export function likeArticle(articleId) {
    return request({
        method : "POST",
        url:`/articles/${articleId}/like`
    })
}


/**
 * 搜索文章
 * @param keywords
 * @returns {*}
 */
export function searchArticle(keywords){
    return request({
        method : "GET",
        url:"/articles/search",
        params:{
            keywords:keywords
        }
    })
}