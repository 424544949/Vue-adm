<template>
<div>
    <svg :class="svrClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</div>
</template>
<script>
import { ref ,computed,onMounted} from '@vue/composition-api'
export default {
    name:'SvgIcon',
    // props :['iconClass','className'],
    props:{
        iconClass :{
            type:String,
            default:''
        },
        className:{
            type:String,
            default:''
        }
    },
    setup(props){
        const msg = ref('全局组件');
        // 计算属性得出最终结果并返回
        const iconName = computed(() => `#icon-${props.iconClass}`)
        const svrClass = computed(() => {
            if(props.className){
                return `svg-icon ${props.className}`
            }else{
                return `svg-icon`
            }
        })


        return{
            msg,
            iconName,
            svrClass,
        }
    }
}
</script>
<style lang="scss" scoped>
.svg-icon{width: 2rem;height: 2rem;font-size: 100px;float: left;}
</style>    