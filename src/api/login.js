/*获取验证码 */
import service from '@/utils/request';
export function getSms(data){
   return service.request({
        // `url` 是用于请求的服务器 URL
        url: '/getSms/',
        // `method` 是创建请求时使用的方法
        method: 'POST', // 默认是 get
        data,
        
    })
}
/*登录 */
export function Login(data) {
    return service.request({
        url: '/login/',
        method:'POST',
        data,
    })
}
/*注册 */
export function Register(data){
    return  service.request({
        url:'/register/',
        method:'POST',
        data,
    })
}