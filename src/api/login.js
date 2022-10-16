import request from "@/api/baseRequest";


/**
 * 登录
 * @param param 登录参数
 * @returns {*}
 */
export function login(param) {
    return request({
        method: "POST",
        url: "/web/user/login",
        data:param
    })
}

/**
 * 注册
 * @desc POST
 * @param params 注册参数
 * @returns {*}
 */
export function register(params){
    return request({
        method: "POST",
        url: "/web/user/register",
        data:params
    })
}

/**
 * 退出登录
 * @desc GET
 * @returns {*}
 */
export function logout(){
    return request({
        method: "GET",
        url: "/web/user/logout"
    })
}

