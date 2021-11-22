import axios from "axios";
import qs from "querystring";


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


export function getRecentRecruitment(associationId, size = 1) {
    return axios.get(`/association/getRecentRecruitment/${associationId}/${size}`)
}

export function getAssociationByUserId(data) {
    return axios.post('/association/getAssociationByUserId', qs.stringify(data))
}

export function getAssociationAsMember(userId) {
    return axios.post('/association/getAssociationAsMember', qs.stringify({userId}))
}

export function getAssociationType() {
    return axios.post('/association/getAssociationType')
}

export function reGrantPermissions2Role(roleId, permissionIds) {
    return axios({
        url: "/association/reGrantPermissions2Role",
        method: 'post',
        data: {
            roleId: roleId,
            permissionIds: permissionIds
        },
        headers: {'Content-Type': 'application/json;charset=UTF-8'}
    })
}


export function saveAssociation(data) {
    return axios.post(`/association/saveAssociation`, data)
}

export function checkAssociationExist(associationName) {
    return axios.get(`/association/checkAssociationExist/${associationName}`)
}

export function countAssociationTypeAndNum() {
    return axios.get(`/association/countAssociationTypeAndNum`)
}

export function getRecruitmentListCard(size) {
    return axios.get(`/association/getRecruitmentListCard/${size}`)
}







