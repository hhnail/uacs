import {useEffect, useState} from "react";
import axios from "axios";

function usePublish() {

    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        axios({
            url: '/association/listRecruitment',
            method: 'post',
            data: {
                userId: userInfo.userId,
                state: ''
            },
            headers: {'Content-Type': 'application/json;charset=UTF-8'}
        }).then(res => {
            console.log("==27 resData", res.data.data);
            setDataSource(res.data.data)
        }).catch(err => {
            console.log("==26 err", err);
        })
    }, [])

    return dataSource
}

export default usePublish