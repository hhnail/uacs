import axios from "axios";
import {store} from '../redux/store'
import {REDUXSTATE} from "../constants/redux";
import {message} from "antd";
// TODO 异步请求的loading效果
// 设置请求根路径
// axios.defaults.baseURL=""

axios.interceptors.request.use(function (config) {
    // console.log("发起请求!!")
    store.dispatch({
        type: REDUXSTATE.CHANGE_ISLOADING.type,
        payload: true
    })
    return config;
}, function (error) {
    // console.log('系统异常！', error)
    // message.error('系统出现异常，请稍后重试！')
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    // console.log("请求响应!!")
    store.dispatch({
        type: REDUXSTATE.CHANGE_ISLOADING.type,
        payload: false
    })
    return response;
}, function (error) {
    // console.log('系统异常！', error)
    message.error('系统出现异常，请稍后重试！', error)
    return Promise.reject(error);
});