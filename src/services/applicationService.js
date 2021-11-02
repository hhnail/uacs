import axios from "axios";
import qs from "querystring";

export function getApplicationList(associationIds) {
    return axios({
        url: '/association/getApplicationList',
        method: 'post',
        data: qs.stringify({associationIds: associationIds}),
        // headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
}

