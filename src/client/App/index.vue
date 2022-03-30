<template>
  <div id="app">
    <router-view></router-view>
    <light-box></light-box>
  </div>
</template>

<style lang="scss" src="./style.scss">
  
</style>
<script>
  import LightBox from 'components/LightBox'
  export default {
    name: 'App',
    components: {
      LightBox
    }
  }
</script>