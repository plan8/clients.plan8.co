<template>
  <div class="item-wrapper">
    <div class="standard-item">
      <div class="controls">
        <PlayButton :itemdata="item" />
      </div>
      <div class="info">
        <p>{{ item.originalName | noExtension }}</p>
      </div>
      <div class="wf">
        <PlayerWaveForm
          :mediaItemKey="item.stems[0].key"
          :isFooter="true"
          :bars="100"
        />
      </div>
      <div class="time-info">
        <p>{{ currentTime | toTime }} / {{ item.duration | toTime }}</p>
      </div>
      <div class="actions">
        <svg
          @click="download"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 11C25 10.4477 24.5523 10 24 10C23.4477 10 23 10.4477 23 11L25 11ZM23.2929 37.7071C23.6834 38.0976 24.3166 38.0976 24.7071 37.7071L31.0711 31.3431C31.4616 30.9526 31.4616 30.3195 31.0711 29.9289C30.6805 29.5384 30.0474 29.5384 29.6569 29.9289L24 35.5858L18.3431 29.9289C17.9526 29.5384 17.3195 29.5384 16.9289 29.9289C16.5384 30.3195 16.5384 30.9526 16.9289 31.3431L23.2929 37.7071ZM23 11L23 37L25 37L25 11L23 11Z"
            fill="#006D4F"
          />
          <circle cx="24" cy="24" r="23" stroke="#006D4F" stroke-width="2" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PlayButton from "./Player/PlayButton.vue";
import saveAs from "file-saver";

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
    },
    download() {
      fetch(
        `${this.$config.previewURL}${this.item.stems[0].key}.mp3`
      )
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          saveAs(blob, `${this.item.originalName.replace(/\.[^/.]+$/, "")}.mp3`);
    
        });
      // saveAs(`${this.$config.previewURL}${this.item.stems[0].key}.mp3`, `${this.item.originalName}.mp3`);
      // console.log('this.item.originalName: ', this.item.originalName);
    },
  },
  components: { PlayButton },
};
</script>

<style lang="scss">
@import "@/assets/scss/mixins.scss";
.item-wrapper {
  display: inline-block;
  margin-bottom: 1rem;
  width: 100%;
  //   transition: all 1.4s ease-in-out;

  &:not(:last-child) {
    margin-right: 1rem;
  }

  .standard-item {
    display: flex;
    width: 100%;

    height: 60px;

    align-items: center;
    color: var(--textColor);
    //justify-content: space-between;

    .controls {
      display: flex;
      width: 54px;
      align-items: center;
      justify-content: flex-start;
      @include breakpoint(sm) {
        width: 80px;
      }
    }

    .wf {
      width: 100%;
      display: none;

      @include breakpoint(sm) {
        display: inline-block;
      }
    }

    .info {
      white-space: nowrap;

      margin-left: 1rem;

      @include breakpoint(sm) {
        //width: 200px;
      }

      p {
        overflow: hidden;
        text-overflow: ellipsis;
        width: 250px;

        // font-family: monospace;
        font-size: 1rem;
        @include breakpoint(sm) {
          width: 280px;
        }
      }
    }

    .time-info {
      display: none;

      @include breakpoint(sm) {
        display: inline-block;
      }
      margin-left: 2rem;
      min-width: 110px;
    }

    .actions {
      margin-left: auto;
      display: none;

      @include breakpoint(sm) {
        display: inline-block;
      }

      svg {
        width: 44px;

        circle {
          stroke: var(--primaryColorDarker);
        }

        path {
          stroke: var(--primaryColorDarker);
          fill: var(--primaryColorDarker);
        }
      }
    }
  }
}
</style>
