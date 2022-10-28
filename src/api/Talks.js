import request from "@/api/baseRequest";


/**
 * 获取首页说说
 * @returns {*}
 */
export function homeTalks(){
    return request({
        method: "GET",
        url: "/home/talks",
    })
}