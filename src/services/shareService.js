import axios from "axios";

export function getShareList() {
    return axios.get('/bulletin/getShareList')
}

export function getShareById(shareId) {
    return axios.get(`/bulletin/getShareById/${shareId}"`)
}

