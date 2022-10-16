import request from "@/api/baseRequest";

/**
 * 获取邮件验证码
 * @desc GET
 * @returns {*}
 */
export function emailCode(email){
    return request({
        method : "GET",
        url : "/web/code",
        params:{
            email:email
        }
    })
}

/**
 * 更改邮箱
 * @desc POST
 * @param params 请求参数
 * @returns {*}
 */
export function changeEmail(params){
    return request({
        method:"POST",
        url:"/web/user/email",
        data:params
    })
}