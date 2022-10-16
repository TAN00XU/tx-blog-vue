import axios from "axios";
import store from '@/store'


const request = axios.create({
    //基础URL
    // baseURL: "http://localhost:8888",
    baseURL: "https://www.talkxj.com",
    timeout: 5000
});

// 添加请求拦截器
request.interceptors.request
    .use(function (config) {
        // 在发送请求之前做些什么
        if (store.state.token) {
            config.headers['Authorization'] = localStorage.token
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject("发起请求错误：" + error);
    });

// 添加响应拦截器
request.interceptors.response
    .use(
        function (response) {
            // 对响应数据做点什么
            const res = response.data;
            //0 为成功状态
            if (res.code !== 20000) {
                console.log("响应拦截器--失败")
                // //20001 用户未登录
                // if (res.code === 90002) {
                //     this.$messageBoard({
                //         type: 'warning',
                //         showClose: true,
                //         messageBoard: '未登录或登录超时，请重新登录哦'
                //     })
                //     return Promise.reject('error');
                // }
            }
            //返回响应数据
            return response;
        },
        function (error) {
            // 对响应错误做点什么
            return Promise.reject("服务器响应出错！" + error);
        }
    );

export default request;