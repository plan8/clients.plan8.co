<template>
  <div class="time-info">
    <p>{{ currentTime | toTime }} / {{ item.duration | toTime }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    props: ["item"],
   data() {
    return {
      currentTime: 0,
    };
  },
   computed: {
    ...mapState({
      playerItem: (state) => state.player.item,
       project: (state) => state.project,
    }),

    isActiveItem() {
      return this.playerItem.id == this.item.id;
    },
  },
  mounted() {
    this.$nuxt.$on("audio-playing", this.updateTime);
  },
  methods: {
    updateTime(progObj) {
      if (this.isActiveItem) {
        this.currentTime = progObj.currentTime;
      }
    }
   
  }
  
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.time-info {
  display: none;
  flex: 1;

  @include breakpoint(sm) {
    display: inline-block;
  }
  margin-left: 2rem;
  min-width: 110px;
}
</style>
