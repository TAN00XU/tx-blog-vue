import baseRequest from "@/api/baseRequest";


/**
 * 更新用户信息
 * @param userInfo 用户信息
 * @returns {*}
 */
export function updateUserInfo(userInfo){
    return baseRequest({
        method : "PUT",
        url :"",
        data : userInfo
    })
}