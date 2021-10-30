import {useEffect, useState} from "react";
import axios from "axios";
import {RECRUITMENT_STATE, RECRUITMENT_STATE_MAP} from "../constants/state";
import {listRecruitmentByUserId} from "../services/db";

function usePublish() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        listRecruitmentByUserId(userInfo.userId)
            .then(res => {
                console.log("==27 resData", res.data.data);
                setDataSource(res.data.data)
            }).catch(err => {
            console.log("==26 err", err);
        })
    }, [])

    const handleRollback = (recruitmentId) => {

    }

    const handleDelete = (recruitmentId) => {

    }

    const handlePass = (recruitmentId) => {
        axios({
            url: '/association/updateRecruitmentState',
            method: 'post',
            data: {
                recruitmentId: recruitmentId,
                state: RECRUITMENT_STATE.EXAMINE_PASS.value
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then(res => {
            console.log("==20 usePublish", res.data)
        }).catch(err => {
            console.log("==20 usePublish", err)
        })
    }

    const handleRefuse = (recruitmentId) => {

    }

    return {dataSource, handleRollback, handleDelete, handlePass, handleRefuse}
}

export default usePublish