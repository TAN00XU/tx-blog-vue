import request from "@/api/baseRequest";


/**
 * 获取首页文章信息
 * @param current 当前第几页
 * @returns {*}
 */
export function homeArticle(current) {
    return request({
        method: "GET",
        url: "/web/articles",
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
        url: "/web/articles/categories"
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
        url: "/web/articles/archives",
        // url: "/api/articles/archives?current=1",
        params : {
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
        method : "GET",
        url : "/web/articles/tags"
    })
}