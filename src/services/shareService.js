import axios from "axios";

export function getShareList(userId) {
    return axios.get(`/bulletin/getShareList/${userId}`)
}

export function getShareById(shareId) {
    return axios.get(`/bulletin/getShareById/${shareId}"`)
}

export function getShareByAssociation(associationId) {
    return axios.get(`/bulletin/getShareByAssociation/${associationId}`)
}

