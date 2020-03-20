<template>
    <div id="main">
       <router-view/>
    </div> 
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main{position: fixed;left: $navMenu;top: 75px;right: 0;bottom: 0;border:30px solid #f7f7f7;border-bottom: none;;background-color: #fff;}
</style>