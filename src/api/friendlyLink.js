import request from "@/api/baseRequest";


/**
 * 获取友链列表
 * @returns {*}
 */
export function ListFriendlyLink(){
    return request({
        method: "GET",
        url: "/friendlyLinks"
    })
}