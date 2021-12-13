<template>
  <div>
    <section class="section top header-wrapper">
      <div class="container top-header">
        <div class="" v-if="hasImage">
          <ProjectImage />
        </div>

        <div>
          <p class="is-size-3 title is-bold">{{ project.name }}</p>
          <p class="subtitle mini">
            Created by {{ project.uid.name }} · {{ infoText }}
          </p>
          <div class="actions is-hidden-mobile">
            <button class="btn rounded" @click="download()">
              Zip and download
            </button>
          </div>
        </div>

        <div class="logo">
          <svg
            v-if="dynamicLogo"
            width="34"
            height="56"
            viewBox="0 0 34 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4.53882"
              y="20.749"
              width="23.9911"
              height="14.265"
              fill="#1B785E"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28.5913 27.8771C25.575 31.0933 21.2891 33.1022 16.5344 33.1022C11.7797 33.1022 7.49381 31.0933 4.47751 27.8771C7.49381 24.661 11.7797 22.652 16.5344 22.652C21.2891 22.652 25.575 24.661 28.5913 27.8771ZM28.5913 27.8771C31.368 24.9164 33.0688 20.9326 33.0688 16.5511C33.0688 7.41019 25.6661 0 16.5344 0C7.40271 0 0 7.41019 0 16.5511C0 20.9326 1.70078 24.9164 4.47751 27.8771C1.70078 30.8379 0 34.8217 0 39.2031C0 48.3441 7.40271 55.7543 16.5344 55.7543C25.6661 55.7543 33.0688 48.3441 33.0688 39.2031C33.0688 34.8217 31.368 30.8379 28.5913 27.8771Z"
              fill="#00B683"
            />
          </svg>
          <svg
            v-else
            width="28"
            height="45"
            viewBox="0 0 28 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5965 27.1867C6.09849 27.1867 0 21.0887 0 13.5932C0 6.09769 6.09849 0 13.5965 0C21.0945 0 27.1934 6.09699 27.1934 13.5932C27.1934 21.0894 21.0938 27.1867 13.5965 27.1867ZM13.5965 1.88764C7.14043 1.88764 1.88811 7.13868 1.88811 13.5932C1.88811 20.0477 7.14043 25.2987 13.5965 25.2987C20.0526 25.2987 25.3049 20.0477 25.3049 13.5932C25.3049 7.13868 20.0526 1.88764 13.5965 1.88764Z"
              fill="black"
            />
            <path
              d="M13.5965 45C6.09849 45 0 38.903 0 31.4082C0 23.9134 6.09849 17.8147 13.5965 17.8147C21.0945 17.8147 27.1934 23.9117 27.1934 31.4079C27.1934 38.9041 21.0938 45 13.5965 45ZM13.5965 19.701C7.14043 19.701 1.88811 24.952 1.88811 31.4065C1.88811 37.861 7.14043 43.112 13.5965 43.112C20.0526 43.112 25.3053 37.8638 25.3053 31.4082C25.3053 24.9527 20.0526 19.7023 13.5965 19.7023V19.701Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
    </section>
    <section class="section top">
      <div class="container">
        <div class="project-settings">
          <div class="" v-if="isButtonView">
            <Toggle :label="'Solo Trig'" v-model="soloMode" />
          </div>

          <div class="is-hidden-mobile" v-if="!isButtonView">
            <Toggle :label="'Waveforms'" v-model="showWaveForms" />
          </div>

          <div class="" v-if="!isButtonView">
            <Toggle :label="'Show Index'" v-model="showIndex" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      project: (state) => state.project,
    }),

    hasImage() {
      return this.project.image && this.project.image.originalName;
    },

    dynamicLogo() {
      return (
        this.project.settings.theme == 1 || this.project.settings.theme == 2
      );
    },
    soloMode: {
      get() {
        return this.project.settings.toneOptions.soloMode;
      },
      set(value) {
        this.$store.commit("SET_SOLOMODE", value);
      },
    },
    showWaveForms: {
      get() {
        return this.project.settings.showWaveForms;
      },
      set(value) {
        this.$store.commit("SET_SHOWWAVEFORMS", value);
      },
    },
    showIndex: {
      get() {
        return this.project.settings.showIndex;
      },
      set(value) {
        this.$store.commit("SET_SHOWINDEX", value);
      },
    },

    isButtonView() {
      return this.$route.name == "buttons-id";
    },
    infoText() {
      let soundCount = 0;
      const folderCount = this.project.subProjects.length;
      const totalItems = this.project.subProjects.map((sp) => {
        sp.items.forEach((item) => {
          soundCount++;
        });
      });
      const folderWord = folderCount > 1 ? "folders" : "folder";
      const soudnWord = soundCount > 1 ? "sounds" : "sound";
      return `${soundCount} ${soudnWord}, ${folderCount} ${folderWord}`;
    },
  },

  mounted() {},
  watch: {},
  beforeDestroy() {},
  methods: {
    download() {
      this.isZipping = true;

      this.$compress.generateZipFile(this.project, () => {
        this.isZipping = false;
      });
    },
    toggleSettings() {
      this.$store.commit("TOGGLE_SETTINGS");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.header-wrapper {
  background: var(--bgHeader);
}

.project-settings {
    display: flex;

    div {
      margin-right: 1rem;
    }
   
    margin-top: 2rem;

    @include breakpoint(sm) {
      margin-top: 2rem;
    }
  }

.top-header {
  display: flex;
  position: relative;
  flex-direction: column;
  // justify-content: space-between;

  @include breakpoint(sm) {
    flex-direction: row;
  }

  .mini {
    font-size: 0.9rem;
  }

  

  .actions {
    margin-top: 2rem;

    #download {
      display: none;

      @include breakpoint(sm) {
        display: block;
      }
    }

    .icon {
      padding-right: 0.8rem;
      padding-top: 1.5rem;
      cursor: pointer;

      svg {
        width: 50px;

        &#download {
          circle {
            stroke: var(--primaryColorDarker);
          }

          path {
            stroke: var(--primaryColorDarker);
            fill: var(--primaryColorDarker);
          }
        }

        &#settings {
          circle {
            stroke: var(--primaryColorDarker);

            &#knob {
              stroke: none;
              fill: var(--primaryColorDarker);
            }
          }

          line {
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

  .logo {
    position: absolute;
    right: 0;
    top: 0;
    height: 30px;
    margin-top: 0.5rem;
    margin-left: auto;

    @include breakpoint(sm) {
      height: 80px;
      padding-top: 1.2rem;
    }

    svg {
      height: 100%;
      width: auto;
      path {
        fill: var(--textColor);
      }
      rect {
        fill: var(--primaryColorDarker);
      }
    }
  }
}

.vue-js-switch {
  .v-switch-core {
    //  background-color: red !important;
  }
}
</style>
