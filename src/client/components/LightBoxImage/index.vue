<template>
  <div :style="{width:pictureSize.width}">
    <figure :style="pictureSize">
      <img width="100%" :src="path" :alt="props.title">
    </figure>
  </div>
</template>
<style lang="scss" src="./style.scss" scoped>
  
</style>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'light-box-image',
    props: ['props'],
    data() {
      return {
        hover: false
      }
    },
    computed: {
      path() {
        return this.props ? this.props.path.replace('medium', 'large') : ''
      },
      pictureSize() {
        let width = this.props.width >= this.props.height ? window.innerWidth * 0.6 : window.innerHeight / this.props.height * this.props.width * 0.8
        let height = width / this.props.width * this.props.height
        if (width > window.innerWidth * 0.6) {
          height = window.innerWidth * 0.6 / width * height
          width = window.innerWidth * 0.6
        }
        if (height > window.innerHeight * 0.8) {
          width = window.innerHeight * 0.8 / height * width
          height = window.innerHeight * 0.8
        }
        return {
          width: width + 'px',
          height: height + 'px'
        }
      },
      ...mapState({
        // component: state => state.lightBox.component,
        // browser: state => state.userAgent.browser
      })
    }
  }
</script>
