
import {Login} from '@/api/login';
import {setToKen, setUserName, getToken, getUserName, removeUserName, removeToKen } from '../../utils/app';
const state =  {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    user_name: getUserName('admin_username')||'',
    to_ken: getToken('admin_token')||'',
}
const getters = {
    isCollapse:state => state.isCollapse,
    user_name:state => state.user_name
}
const mutations = {
    SET_COLLAPSE(state) {
        console.log("app")
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
    SET_TOKEN(state,value){
        state.to_ken = value;
    },
    SET_USERNAME(state,value){
        state.user_name = value;
    },
}
const actions = {
    login(content, repuestData) {
        return new Promise((resolve, reject) => {
            //登录接口
            Login(repuestData).then(response => {
                let data = response.data.data;
                console.log(data)
                //存储username 和token 
                content.commit('SET_TOKEN',data.token)
                content.commit('SET_USERNAME',data.username)
                setToKen(data.token)
                setUserName(data.username)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    exit(content){
        return new Promise((resolve,reject) => {
            removeUserName()
            removeToKen()
            content.commit("SET_TOKEN","")
            content.commit("SET_USERNAME","")
            resolve()
        })
    }
}
export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}