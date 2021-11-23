import axios from "axios";
import {RECRUITMENT_STATE} from "../constants/state";

export function updateRecruitmentState(recruitmentId, state) {
    return axios({
        url: `/association/updateRecruitmentState/${recruitmentId}/${state}`,
        method: 'get',
    })
}
