<template>
  <div id="lightboxText" :style="{ height: boardSize.height }">
    <header>
      <h3>{{ props.title }}</h3>
      <div class="author">{{ props.author }}</div>
    </header>
    <div>
      <div class="description">{{ props.description }}</div>
    </div>
    <footer></footer>
  </div>
</template>
<style lang="scss" src="./style.scss" scoped></style>
<script>
import { mapState } from "vuex";
export default {
  name: "light-box-text",
  props: ["props"],
  computed: {
    boardSize() {
      let width =
        this.props.width >= this.props.height
          ? window.innerWidth * 0.6
          : (window.innerHeight / this.props.height) * this.props.width * 0.8;
      let height = (width / this.props.width) * this.props.height;
      if (width > window.innerWidth * 0.6) {
        height = ((window.innerWidth * 0.6) / width) * height;
        width = window.innerWidth * 0.6;
      }
      if (height > window.innerHeight * 0.8) {
        width = ((window.innerHeight * 0.8) / height) * width;
        height = window.innerHeight * 0.8;
      }
      return {
        width,
        height,
      };
    },
    ...mapState({
      // browser: state => state.userAgent.browser
    }),
  },
};
</script>
