<template>
  <div v-show="!isLoading" class="">
    <main>
      <nuxt class="page" />
    </main>
    <FooterInfo />
    <PlayerFooter :settings="{ isClient: true }" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  head() {
    return {

      htmlAttrs: {
        class: this.currentTheme,
      },
    };
  },
  computed: {
    ...mapState({
      theme: (state) => state.project.settings.theme || 0,
      isLoading: (state) => state.isLoading,
    }),

    currentTheme() {
      switch (this.theme) {
        case 0:
          return "";
          break;
        case 1:
          return "theme-blue";
          break;
         case 2:
          return "theme-green";
          break;
         case 3:
          return "theme-gradient";
          break;


        default:
          break;
      }
    },
  },
  mounted(){
    document.addEventListener("keydown", this.$helpers.keyHandler);
  }
};
</script>

<style lang="scss">
.page {
  margin-bottom: 5rem;
}
</style>
