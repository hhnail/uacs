import axios from "axios";

export function getAllAssociationList() {
     axios.get('/association/getAllAssociationList').then(res => {
        return res.data.data
    })
}