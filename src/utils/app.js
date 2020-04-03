import Cookit from "cookie.js"

const adminToKen = "admin_token"
const adminUserName = "admin_username"
export function getToken(){
    return Cookit.get(adminToKen)
}
export  function setToKen(token){
    return Cookit.set(adminToKen,token)
}
export  function removeToKen(){
    return Cookit.remove(adminToKen)
}
export function getUserName(){
    return Cookit.get(adminUserName)
}
export function setUserName(username){
    return Cookit.set(adminUserName,username)
}
export  function removeUserName(){
    return Cookit.remove(adminUserName)
}