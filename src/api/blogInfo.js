import request from "@/api/baseRequest";


/**
 * 获取到博客信息
 * @returns {*}
 */
export function blogInfo() {
    return request({
        method: "GET",
        url: "/web/website/config"
    })
}