import axios from "axios";
import store from '../redux/store'
// TODO 异步请求的loading效果
// 设置请求根路径
// axios.defaults.baseURL=""

axios.interceptors.request.use(function (config) {
    console.log("发起请求!!")
    store.dispatch({
        type:"change_isLoading",
        payload:true
    })
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    console.log("请求响应!!")
    store.dispatch({
        type:"change_isLoading",
        payload:false
    })
    return response;
}, function (error) {
    return Promise.reject(error);
});