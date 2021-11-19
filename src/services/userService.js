import axios from "axios";
import qs from "querystring";

// ============================ 用户模块 ============================
export function login(values) {
    return axios({
        url: "/user/login",
        method: 'post',
        data: qs.stringify(values),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export function getUserInfo(accessToken) {
    return axios({
        url: "/user/getUserInfo",
        method: 'post',
        data: qs.stringify({accessToken: accessToken}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 使用token获取用户信息
 * @param accessToken
 * @returns {AxiosPromise}
 */
export function getUserInfoByToken(accessToken) {
    return axios({
        url: "/user/getUserInfo",
        method: 'post',
        data: qs.stringify({accessToken: accessToken}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

/**
 * 更新系统右上角用户设置
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function updateUserSettings(data) {
    return axios.post("/user/reset", data)
}

/**
 * 查询社团成员
 * @param associationId
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getUserByAssociationId(associationId) {
    return axios.get(`/association/getUserByAssociationId/${associationId}`)
}

/**
 * 更新简历信息
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export function updateResume(data) {
    return axios.post("/user/updateResume", data)
}