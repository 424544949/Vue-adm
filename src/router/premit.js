import router from "./../router";
import {getToken} from "@/utils/app";
import { removeToKen, removeUserName } from "../utils/app";
import store from "./../store/index"


const whiteRouter = ['/login'];
//路由守卫
export default router.beforeEach((to,from ,next) => {
    if(getToken()){
        console.log("存在")
        if(to.path === '/login'){
            removeToKen()
            removeUserName()
            store.commit("app/SET_TOKEN","")
            store.commit("app/SET_USERNAME","")
            next();
        }else{
            next();
        }
    }else{
        console.log("不存在")
        if(whiteRouter.indexOf(to.path) !== -1){
            next();
        }else{
            next('login') //路由跳转
        }
    }
})