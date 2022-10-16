import request from "@/api/baseRequest";


/**
 * 获取评论
 * @param params
 * @returns {*}
 */
export function getComments(params){
    return request({
        method:"GET",
        url : "/api/comments",
        params:params
    })
}