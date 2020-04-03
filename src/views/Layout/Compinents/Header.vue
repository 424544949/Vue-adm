<template>
    <div id="herder">
        <div class="pull-left heder-icon" @click="navMenuState"><svg-icon  iconClass="menu" className="menu" /></div>
        <div class="pull-right heder-icon">
            <div class="pull-left user-info">
                {{username}}
            </div>
            <div class="pull-left" @click="exit"><svg-icon iconClass='return'  className = "menu"/></div>
        </div>
    </div> 
</template>
<script>
import { computed } from '@vue/composition-api'
export default {
    setup(props,{ root,}){
        const username = computed(() => root.$store.state.app.user_name)
        const navMenuState = () =>{
            root.$store.commit("app/SET_COLLAPSE")
        }
        const exit = () => {
            root.$store.dispatch("app/exit").then(() => {
                root.$router.push({
                    name :"login"
                })
            })
        }
        console.log(username)
        return {
            navMenuState,
            username,
            exit
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#herder{
    position: fixed;
    left: $navMenu;
    top: 0;
    right: 0;
    height: 85px;
    background-color: #fff;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0,0.1));
    @include webkit(transition,all .3s ease 0s);
}
.open{
    #herder{left: $navMenu;}
}
.close{
    #herder{left: $navMenuMin;}
}
.heder-icon{
    padding: 0 32px;
    svg{
        width: 100px;
        height:100px;
        font-size: 25px;
        cursor: pointer;    
    }
}
.user-info{
    height: 100%;
    padding: 32px 32px;
    border-right: 1px solid black;
    + .heder-icon{
         padding: 32px 32px;
    }
}
</style>