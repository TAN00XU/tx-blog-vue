import request from "@/api/baseRequest";


/**
 * 登录
 * @param param 登录参数
 * @returns {*}
 */
export function login(param) {
    return request({
        method: "POST",
        url: "/web/login",
        data:param
    })
}

/**
 * 注册
 * @param param 注册参数
 * @returns {*}
 */
export function register(param){
    return request({
        method: "POST",
        url: "/web/register",
        data:param
    })
}