<template>
  <div class="footer-main" :class="{ active: isActive }">
    <section class="section">
      <div class="container no-padding">
        <PlayerAudioPlayer />
        <div class="footer-inner">
          <div class="controls">
            <svg
              @click="handleNav()"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="skip prev"
            >
              <path
                d="M22.75 11.701C23.75 12.2783 23.75 13.7217 22.75 14.299L9.25 22.0933C8.25 22.6706 7 21.9489 7 20.7942L7 5.20577C7 4.05107 8.25 3.32938 9.25 3.90673L22.75 11.701Z"
                fill="black"
                stroke="black"
              />
              <line
                x1="24.5"
                y1="4.5"
                x2="24.5"
                y2="21.5"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>

            <PlayerPlayButton :itemdata="item" :isFooter="true" />
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="skip next"
              @click="handleNav(true)"
            >
              <path
                d="M22.75 11.701C23.75 12.2783 23.75 13.7217 22.75 14.299L9.25 22.0933C8.25 22.6706 7 21.9489 7 20.7942L7 5.20577C7 4.05107 8.25 3.32938 9.25 3.90673L22.75 11.701Z"
                fill="black"
                stroke="black"
              />
              <line
                x1="24.5"
                y1="4.5"
                x2="24.5"
                y2="21.5"
                stroke="black"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div class="track-name">
            <p>{{ item.originalName | noExtension }}</p>
          </div>
          <div class="wf">
            <PlayerWaveForm
              :mediaItemKey="currentStem.key"
              :isFooter="true"
              :bars="100"
              :item="item"
            />
          </div>

          <TimeInfo :item="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

const clamp = function (min, number, max) {
  return Math.min(Math.max(number, min), max);
};

export default {
  data() {
    return {
      reverbValue: 0,
      seekValue: 0,
      isPlaying: false,
    };
  },
  computed: {
    ...mapState({
      item: (state) => state.player.item,
      currentStem: (state) => state.player.currentStem,
      // useTone: (state) => state.player.useTone,
      previewapiURL: (state) => state.previewapiURL,
      showFooter: (state) => state.player.showFooter,
      project: (state) => state.project,
    }),
    isActive() {
      return this.showFooter && this.item.id;
    },
    // useTone: {
    //   get() {
    //     return this.$store.state.player.useTone;
    //   },

    //   set(val) {
    //     this.$store.commit("player/SET_USETONE", val);
    //   },
    // },
  },
  props: {
    settings: {
      type: Object,
      required: false,
    },
  },
  mounted() {},
  watch: {},
  beforeDestroy() {},
  methods: {
    changeEffect() {
      //this.reverb.wet.value = this.reverbValue
      this.player.playbackRate = this.reverbValue;
      //
    },
    handleNav(next) {
      const items = [];
      this.project.subProjects.forEach((sp) => {
        sp.items.forEach((item) => {
          items.push(item);
        });
      });

       this.$store.commit("player/SET_ITEMSCUE", items);
      if (next) {
        this.$store.commit("player/SET_TARGETPOSITION", null);
        this.$store.commit("player/SET_NEXT");
      } else {
        this.$store.commit("player/SET_TARGETPOSITION", null);
        this.$store.commit("player/SET_PREVIOUS");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.stem-wrapper {
  margin: 0 0.5rem;
}

.footer-main {
  position: fixed;
  transform: translateY(80px);
  bottom: 0;
  border-top: 1px solid var(--primaryColor);
  width: 100%;
  background: var(--bgColor);
  height: 80px;
  display: flex;
  align-items: center;
  z-index: 4;
  transition: transform 0.4s cubic-bezier(0.77, 0.2, 0.05, 1);

  .skip {
    margin: 0 1rem;
    cursor: pointer;

    &.prev {
      transform: rotate(180deg);
    }
  }

  .section {
    width: 100%;
    // padding: 0 0.6rem;
  }

  &.active {
    transform: translateY(0);
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .track-name {
      padding: 0 2rem;
    }

    .footer-info {
      // width: 100%;
      color: var(--textColor);
      margin-left: auto;
      max-width: 104px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      @include breakpoint(sm) {
        margin-left: auto;
        max-width: 300px;
      }
    }

    .wf {
      padding-right: 1rem;
      width: 50%;
    }

    .controls {
      flex: 0 0 40px;
      display: flex;
      align-items: center;
      margin-left: -1.5rem;
    }
  }
}
</style>
