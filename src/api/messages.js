import request from "@/api/baseRequest";


/**
 * 获取留言信息
 *
 * @desc GET
 * @returns {*}
 */
export function messagesList() {
    return request({
        method: "GET",
        url: "/web/messages"
    })
}

/**
 * 添加留言
 *
 * @desc POST
 * @param message
 * @returns {*}
 */
export function addMessage(message) {
    return request({
        method: "POST",
        url: "/web/messages",
        data: message
    })
}