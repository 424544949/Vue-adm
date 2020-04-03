
const state =  {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    count: 10,
}
const getters = {
    count: state => state.count + 10
}
const mutations = {
    SET_COLLAPSE(state) {
        console.log("login")
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
    },
}
const actions = {
    login(content, repuestData) {
        return new Promise((resolve, reject) => {
            //登录接口
            Login(repuestData).then(response => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
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