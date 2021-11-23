import {useEffect, useState} from "react";
import axios from "axios";
import {RECRUITMENT_STATE, RECRUITMENT_STATE_MAP} from "../constants/state";
import {listRecruitmentByUserId} from "../services/db";
import {message} from "antd";
import {updateRecruitmentState} from "../services/recruitmentSerivce";

function usePublish() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const [dataSource, setDataSource] = useState([])

    const refreshRecruitment = () => {
        listRecruitmentByUserId(userInfo.userId)
            .then(res => {
                // console.log("==27 resData", res.data.data);
                setDataSource(res.data.data)
            })
    }
    useEffect(() => {
        refreshRecruitment()
    }, [])

    const handleRollback = (recruitmentId) => {
        updateRecruitmentState(recruitmentId, RECRUITMENT_STATE.UN_COMMIT.value).then(() => {
            refreshRecruitment()
            message.success("操作成功！")
        })
    }

    const handleCommit = (recruitmentId) => {
        updateRecruitmentState(recruitmentId, RECRUITMENT_STATE.EXAMINING.value).then(() => {
            refreshRecruitment()
            message.success("操作成功！")
        })
    }

    const handlePublish = (recruitmentId) => {
        updateRecruitmentState(recruitmentId, RECRUITMENT_STATE.PUBLISHED.value).then(() => {
            refreshRecruitment()
            message.success("操作成功！")
        })
    }

    const handleOffline = (recruitmentId) => {
        updateRecruitmentState(recruitmentId, RECRUITMENT_STATE.OFFLINE.value).then(() => {
            refreshRecruitment()
            message.success("操作成功！")
        })
    }

    // const handleDelete = (recruitmentId) => {
    //     updateRecruitmentState(recruitmentId, RECRUITMENT_STATE.EXAMINE_PASS.value).then(() => {
    //         refreshRecruitment()
    //         message.success("操作成功！")
    //     })
    // }

    const handlePass = (recruitmentId) => {
        updateRecruitmentState(recruitmentId, RECRUITMENT_STATE.EXAMINE_PASS.value).then(() => {
            refreshRecruitment()
            message.success("操作成功！")
        })
    }

    const handleRefuse = (recruitmentId) => {
        updateRecruitmentState(recruitmentId, RECRUITMENT_STATE.EXAMINE_REFUSE.value).then(() => {
            refreshRecruitment()
            message.success("操作成功！")
        })
    }

    return {
        dataSource,
        handleRollback,
        // handleDelete,
        handleOffline,
        handleCommit,
        handlePublish,
        handlePass,
        handleRefuse
    }
}

export default usePublish