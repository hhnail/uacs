import axios from "axios";
import qs from "querystring";

export function login(values) {
    return axios({
        url: "/user/login",
        method: 'post',
        data: qs.stringify(values),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
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

export function updateUserSettings(data) {
    return axios.post("/association/updateUserSettings",data)
}
export function getUserInfo(accessToken) {
    return axios({
        url: "/user/getUserInfo",
        method: 'post',
        data: qs.stringify({accessToken: accessToken}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
export function getPermissionListByUserId(userId) {
    return axios.get(`/association/getPermissionListByUserId/${userId}`)
}





