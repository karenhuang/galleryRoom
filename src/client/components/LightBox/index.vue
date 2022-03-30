<template>
  <transition name="mask" v-if="component">
    <div class="mask" @click="close">
      <div class="container" @click.stop>
        <component :props="params" :is="component"></component>
        <light-box-text :props="params"></light-box-text>
        <a class="close" href="javascript:;" @click="close">Close</a>
      </div>
    </div>
  </transition>
</template>
<style lang="scss" src="./style.scss" scoped>
  
</style>
<script>
  import {
    mapState
  } from 'vuex'
  import LightBoxImage from 'components/LightBoxImage'
  import LightBoxText from 'components/LightBoxText'
  export default {
    name: 'light-box',
    components: {
      LightBoxImage,
      LightBoxText
    },
    computed: {
      ...mapState({
        component: state => state.lightBox.component,
        params: state => state.lightBox.params
      })
    },
    methods: {
      close: function () {
        this.$store.commit('lightBox/CLOSE')
      }
    }
  }

</script>
