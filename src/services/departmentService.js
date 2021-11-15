import axios from "axios";

export function deleteDepartment(departmentId) {
    return axios.delete(`/association/deleteDepartment/${departmentId}`)
}

