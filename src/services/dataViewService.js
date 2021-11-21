import axios from "axios";


export function countAssociationGender(associationId) {
    return axios.get(`/association/countAssociationGender/${associationId}`)
}


export function countAssociationRecruitment(recruitmentId) {
    return axios.get(`/association/countAssociationRecruitment/${recruitmentId}`)
}
