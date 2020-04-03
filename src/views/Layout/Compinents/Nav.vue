<template>
     <div id="nav">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" router unique-opened  background-color='transparent'  text-color="#fff" active-text-color="#fff" :collapse="isCollapse">
            <template v-for="(item,index) in routers">
                <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
                    <!-- 主菜单 -->
                    <template slot="title">
                        <!-- 子组件 -->
                        <svg-icon :iconClass="item.meta.icon" className="menu font12"/><span slot="title">{{item.meta.name}}</span>
                    </template>
                    <!-- 子集菜单 -->
                    <el-menu-item v-for="subitem in item.children" :key="subitem.id" :index = "subitem.path">{{subitem.meta.name}}</el-menu-item>
                </el-submenu>
            </template>
        </el-menu> 
    </div> 
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, computed} from '@vue/composition-api';
export default {
    name : 'Nav',
    setup(props, { root }){
        
        //数据定义
        const isCollapse = computed(() => root.$store.state.app.isCollapse);
        
        //路由    
        const routers = reactive(root.$router.options.routes)
        return {
            // 返回数据区
            isCollapse,
            routers,
            // 返回方法区
        }   
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav{position: fixed;
    width:$navMenu;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #344a5f;
    @include webkit(transition,all .3s ease 0s);
}
.open {
    #nav{width:$navMenu;}
}
.close{
    #nav{width: $navMenuMin;}
}
</style>