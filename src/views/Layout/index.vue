<template>
    <div id="layout">
        <layoutNav/>
        <layoutHeader/>
        <layoutMain/>
    </div> 
</template>
<script>
import layoutNav from './Compinents/Nav'
import layoutHeader from './Compinents/Header'
import layoutMain from './Compinents/Main'
export default {
    name: 'Layout',
    components: {layoutNav, layoutHeader, layoutMain},
    setup(){

    }
}
</script>
<style lang="scss" scoped>
#layout{background-color: #f7f7f7;}
</style>