import axios from "axios";
import qs from "querystring";

/**
 * 获取id存在于associationIds的社团的入团申请列表
 * @param associationIds
 * @returns {AxiosPromise}
 */
export function getApplicationList(associationIds) {
    return axios({
        url: '/association/getApplicationList',
        method: 'post',
        data: qs.stringify({associationIds: associationIds}),
        // headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
}

export function getApplicationDetail(applicationId) {
    return axios.get(`/association/getApplicationDetail/${applicationId}`)
}

/**
 * 获取某用户提交的全部申请
 * @param userId
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getApplicationByUserId(userId) {
    return axios.get(`/association/getApplicationByUserId/${userId}`)
}

export function updateApplicationState(data) {
    return axios.post('/association/updateApplicationState', data)
}

export function updateApplicationInterview(data) {
    return axios.post(`/association/updateApplicationInterview`, data)
}

