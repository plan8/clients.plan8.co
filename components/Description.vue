<template>
  <div class="description" v-if="description && description.length">
      <p class="">{{description}}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    description: {
      type: String,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      item: (state) => state.player.item,
    }),
  },

  mounted() {},
  watch: {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.description {
    
    margin-bottom: 2rem;
    p {
       
        font-weight: normal !important;
    }
}
</style>
