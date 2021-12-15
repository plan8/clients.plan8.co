<template>
  <div class="project-image-wrapper">
    <!-- <img :src="imgSrc" alt=""> -->

    <div
      class="project-image"
      :style="{ backgroundImage: `url(${imgSrc})` }"
    ></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      // imgSrc: ''
    };
  },
  computed: {
    ...mapState({
      project: (state) => state.project,
    }),
    imgSrc() {
      if (this.project.image && this.project.image.originalName) {
        const fileExt = this.project.image.originalName.split(".").pop();
        const rnd = Math.random();
        return `${this.$config.previewURL}${this.project.image.key}.${fileExt}?buster=${rnd}`;
      }
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";
.project-image-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  margin-top: 4rem;
  

  @include breakpoint(sm) {
    justify-content: flex-start;
    margin-top: 0;
    margin-right: 2rem;
      margin-bottom: 0;
      padding-top: 1.2rem;
  }

  .project-image {

        @include breakpoint(sm) {
                height: 280px;
    width: 280px;
       
  }
    height: 112px;
    width: 112px;
    aspect-ratio: 1 / 1;
    background: url('/app-icon.png') no-repeat center center;

    background-size: cover;
    filter: drop-shadow(20px 20px 36px rgba(0, 0, 0, 0.18));
  }
}
</style>