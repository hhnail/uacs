import axios from "axios";

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



