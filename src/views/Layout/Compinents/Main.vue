<template>
    <div id="main">
        <div class="main_content">
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div> 
</template>
<script>
export default {
    name: "main_content",
    setup(props,{ root  }){

        return {
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main{
    height:100vh;
}
.main_content{
    width: 100%;
    height:100%;
    padding-top: $layoutHerder +30;
    padding-right: 30px;
    box-sizing: border-box;
    @include webkit(transition,all .3s ease 0s);
}
.content{
    width: 100%;
    height:100%;
    padding: 30px 30px 0 30px;
    border: 1px solid red;
    box-sizing:border-box ;
}
.open{
    .main_content{
        padding-left: $navMenu +30;
        @include webkit(transition,all .3s ease 0s);
    }
}
.close{
    .main_content{
        padding-left: $navMenuMin +30;
        @include webkit(transition,all .3s ease 0s);
    }
}
</style>