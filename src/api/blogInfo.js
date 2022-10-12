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

/**
 * 上传访客信息
 * @returns {*}
 */
export function report(){
    return request({
        method : "POST",
        url:"/web/report"
    })
}