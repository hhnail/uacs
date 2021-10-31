import axios from "axios";
import qs from "querystring";


export function getUserInfoByToken(accessToken) {
    return axios({
        url: "/user/getUserInfo",
        method: 'post',
        data: qs.stringify({accessToken: accessToken}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

