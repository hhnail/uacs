import axios from "axios";
import {TREE_NODE_TYPE} from "../constants/type";

export function getInterviewAddress() {
    return axios.get('/association/getInterviewAddress')
}


export function getClassTree() {
    return axios.get('/association/getClassTree')
}

export function addTreeNode(data) {
    return axios.post('/association/addTreeNode', data)
}

export function deleteTreeNode(treeId) {
    return axios.delete(`/association/deleteTreeNode/${treeId}`)
}




