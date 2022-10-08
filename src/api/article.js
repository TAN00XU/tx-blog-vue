import request from "@/api/baseRequest";


/**
 * 获取首页文章信息
 * @param current 当前第几页
 * @returns {*}
 */
export function homeArticle(current){
    return request({
        method: "GET",
        url: "/web/articles",
        params:{
            current: current
        }
    })
}