import request from "@/api/baseRequest";


/**
 * 获取留言信息
 * @returns {*}
 */
export function messagesList() {
    return request({
        method: "GET",
        url: "/web/messages"
    })
}


export function addMessage(message){
    return request({
        method: "POST",
        url: "/web/messages",
        data : message
    })
}