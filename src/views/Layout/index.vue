<template>
    <div id="layout" :class="[menuState ? 'close':'open']">
        <layoutNav/>
        <layoutHeader/>
        <layoutMain/>
    </div> 
</template>
<script>
import layoutNav from './Compinents/Nav'
import layoutHeader from './Compinents/Header'
import layoutMain from './Compinents/Main'
import { computed } from '@vue/composition-api'
export default {
    name: 'Layout',
    components: {layoutNav, layoutHeader, layoutMain},
    setup(props,{ root }){
        const menuState = computed(() => root.$store.state.app.isCollapse)
        return {
            menuState
        }
    }
}
</script>
<style lang="scss" scoped>
#layout{background-color: #f7f7f7;}
</style>