import Vue from "vue";
import SvgIcon from "./SvgIcon"
//自定义全局组件
Vue.component('svg-icon',SvgIcon);
// 第一个：目录
// 第二个是否遍历子集目录
// 第三个 定义遍历规则
const req = require.context('./svg',false,/\.svg$/)//读取结尾为.svg的文件
const requireAll = requireContext => {
  console.log(requireContext.keys().map(requireContext))
  return requireContext.keys().map(requireContext)
}
requireAll(req)   