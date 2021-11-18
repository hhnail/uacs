import axios from "axios";

export function getAssociationImageUrl(type,ownerId) {
    return axios.get(`/association/getAssociationImageUrl/${type}/${ownerId}`)
}

export function deleteImage(imageId) {
    return axios.delete(`/association/deleteImage/${imageId}`)
}

