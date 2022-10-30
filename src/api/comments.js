import request from "@/api/baseRequest";


/**
 * 获取评论
 * @param params
 * @returns {*}
 */
export function getComments(params) {
    return request({
        method: "GET",
        url: "/comments",
        params: params
    })
}

/**
 * 添加评论
 * @param comment
 * @returns {*}
 */
export function saveComment(comment) {
    return request({
        method: "POST",
        url: "/comments",
        data: {
            type: comment.type,
            topicId: comment.topicId,
            commentContent: comment.commentContent

        }
    })
}

