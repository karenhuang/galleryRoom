<template>
  <div class="circleRoom">
    <div id="GalleryRoom">
      <div class="pt-btn">
        <router-link to="/index" class="button">index</router-link>
      </div>
      <canvas></canvas>
      <transition name="fade" appear>
        <div v-show="loading.status" id="loadingMask">
          <div>
            <img
              src="http://localhost:8080/karen/textures/loading.gif"
              alt=""
            />
            <p>Loading</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="scss" src="./style.scss" scoped></style>
<script>
import { mapState } from "vuex";
let async = require("async");
export default {
  name: "karen-circleroom",
  asyncData({ store, router }) {
    return store.dispatch("gallery/GET");
  },
  data() {
    return {
      room: null,
      targetIndex: null,
      countNum: 0,
      canvasRequire: false,
      loading: {
        status: true,
        progress: 0,
      },
    };
  },
  computed: {
    target() {
      return this.gallery ? this.gallery.pictures[this.targetIndex] : null;
    },
    ...mapState({
      gallery: (state) => state.gallery.data,
    }),
  },
  methods: {
    switchPainting() {
      this.$store.commit("lightBox/OPEN", {
        component: "LightBoxImage",
        params: this.target,
      });
      let unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === "lightBox/CLOSE") {
          unsubscribe();
          this.room.close();
        }
      });
    },
    init() {
      async.auto(
        {
          gallery: (next) => {
            if (this.gallery) {
              next();
            } else {
              this.$store.dispatch("gallery/GET");
              if (this.gallery) {
                next();
              }
            }
          },
          require: [
            "gallery",
            (result, next) => {
              if (!this.room) {
                this.room = require("../../modules/GalleryRoom")();
                this.canvasRequire = true;
                next();
              }
            },
          ],
          canvas: [
            "require",
            (result, next) => {
              if (this.canvasRequire) {
                this.room
                  .init(
                    this,
                    document.querySelector("#GalleryRoom"),
                    this.gallery
                  )
                  .then(() => {
                    next();
                  });
              }
            },
          ],
        },
        (err, result) => {
          if (err) {
            console.log("wrong");
          } else {
            this.room.start();
          }
        }
      );
    },
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.loading.status = true;
    if (this.room) {
      this.room.stopRenderThree();
      this.room.destroyAll();
    }
  },
};
</script>
