import axios from "axios";

export function getInterviewAddress() {
    return axios.get('/association/getInterviewAddress')
}


export function getClassTree() {
    return axios.get('/association/getClassTree')
}

