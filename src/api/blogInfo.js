import request from "@/api/baseRequest";


/**
 * 获取到博客信息
 * @returns {*}
 */
export function blogInfo() {
    return request({
        method: "GET",
        url: "/information"
    })
}

/**
 * 上传访客信息
 * @returns {*}
 */
export function report(){
    return request({
        method : "POST",
        url:"/report"
    })
}