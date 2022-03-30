<template>
  <div>
    <router-link to="/GalleryRoom" class="button">GalleryRoom</router-link>
  </div>
</template>

<style lang="scss" scoped>
div {
  width: 900px;
  margin: 0 auto;
}

.button {
  margin: 1em 0.5em;
  font-size: 1.05em;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  background-color: #fff;
  color: #42b983;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  text-decoration: none;
  &:hover,
  &.router-link-active {
    color: #fff;
    background-color: #4fc08d;
  }
}
</style>

<script>
import { mapState } from "vuex";
import Logo from "components/Logo";
import List from "components/List";
export default {
  name: "index",
  asyncData({ store, router }) {
    return store.dispatch("INIT");
  },
  computed: {
    ...mapState({
      logo: (state) => state.init.logo,
      list: (state) => state.init.list,
    }),
  },
  components: {
    Logo,
    List,
  },
};
</script>
