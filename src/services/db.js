import axios from "axios";


// ============================ 社团模块 ============================
export function getAllAssociationList() {
    return axios.get('/association/getAllAssociationList')
}

export function getRoleList() {
    return axios.get('/association/getRoleList')
}

export function getAllUsers() {
    return axios.get('/association/getAllUsers')
}


export function addUser(user) {
    return axios.post('/association/addUser', user)
}

export function getUserById(userId) {
    return axios.get(`/association/getUserById/${userId}`)
}

export function updatePermissionById(data) {
    return axios({
        url: "/association/updatePermissionById",
        method: 'post',
        data: data,
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
}

export function getPermissionList() {
    return axios.get("/association/getPermissionList")
}

export function getPermissionListByUserId(userId) {
    return axios.get(`/association/getPermissionListByUserId/${userId}`)
}

export function listRecruitment(recruitmentId) {
    return axios.get(`/association/listRecruitment/${recruitmentId}`)
}

export function listRecruitmentByUserId(userId) {
    return axios({
        url: '/association/listRecruitment',
        method: 'post',
        data: {
            userId: userId,
            state: ''
        },
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
}

export function getAssociationDetail(associationId) {
    return axios.get(`/association/associationInfo/${associationId}`)
}


export function getRecentRecruitment(associationId,size=1) {
    return axios.get(`/association/getRecentRecruitment/${associationId}/${size}`)
}







