//拦截器
import axios from 'axios'
import { Message } from 'element-ui'
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devapi';
var service = axios.create({
    baseURL: BASEURL,
    timout:15000,//请求超时的时间
  
});
// 添加请求拦截器
service.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        console.log(config.headers)
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
        let data = response.data;

        if(data.resCode != 0){
            Message.error(data.message)
            return Promise.reject(data)
        }else{
            return response;
        }
    }, function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
export default service
