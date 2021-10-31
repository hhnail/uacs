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

export function getUserInfoByToken(accessToken) {
    return axios({
        url: "/user/getUserInfo",
        method: 'post',
        data: qs.stringify({accessToken: accessToken}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export function updateUserSettings(data) {
    return axios.post("/user/reset",data)
}

