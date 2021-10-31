import axios from "axios";

export function getShareList() {
    return axios.get('/bulletin/getShareList')
}

export function getShareById(shareId) {
    return axios.get(`/bulletin/getShareById/${shareId}"`)
}

export function getShareByAssociation(associationId) {
    return axios.get(`/bulletin/getShareByAssociation/${associationId}`)
}

