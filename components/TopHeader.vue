<template>
  <section class="section top">
    <div class="container top-header">
      <div>
        <p class="is-size-3 title is-bold">{{ project.name }}</p>
        <p class="subtitle">
          Created by {{ project.uid.name }} · {{ infoText }}
        </p>
        <div class="actions">
          <button class="btn rounded" @click="download()">
            Zip and download
          </button>
        </div>
        <div class="project-settings">
          <Toggle :label="'Solo Trig'"  v-model="soloMode" />
        </div>
        

        <!-- 
        <div class="togglebutton">
          <div class="button r" id="button-1">
            <input type="checkbox" class="checkbox" />
            <div class="knobs"></div>
            <div class="layer"></div>
          </div>
        </div> -->
        <!-- <div class="actions">
          
          <div class="icon" v-if="showSettingsButton" @click="toggleSettings()">
            <svg
              id="settings"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="24"
                cy="24"
                r="23"
                stroke="#006D4F"
                stroke-width="2"
              />
              <line
                x1="14"
                y1="12"
                x2="14"
                y2="36"
                stroke="#006D4F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="24"
                y1="12"
                x2="24"
                y2="36"
                stroke="#006D4F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <line
                x1="34"
                y1="12"
                x2="34"
                y2="36"
                stroke="#006D4F"
                stroke-width="2"
                stroke-linecap="round"
              />
              <circle id="knob" cx="24" cy="23" r="3" fill="#006D4F" />
              <circle id="knob" cx="34" cy="31" r="3" fill="#006D4F" />
              <circle id="knob" cx="14" cy="27" r="3" fill="#006D4F" />
            </svg>
          </div>

          <div class="icon" @click="download()">
            <svg
              width="48"
              id="download"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 11C25 10.4477 24.5523 10 24 10C23.4477 10 23 10.4477 23 11L25 11ZM23.2929 37.7071C23.6834 38.0976 24.3166 38.0976 24.7071 37.7071L31.0711 31.3431C31.4616 30.9526 31.4616 30.3195 31.0711 29.9289C30.6805 29.5384 30.0474 29.5384 29.6569 29.9289L24 35.5858L18.3431 29.9289C17.9526 29.5384 17.3195 29.5384 16.9289 29.9289C16.5384 30.3195 16.5384 30.9526 16.9289 31.3431L23.2929 37.7071ZM23 11L23 37L25 37L25 11L23 11Z"
                fill="#006D4F"
              />
              <circle
                cx="24"
                cy="24"
                r="23"
                stroke="#006D4F"
                stroke-width="2"
              />
            </svg>
          </div>
        </div> -->
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

    dynamicLogo() {
      return this.project.settings.theme == 1 || this.project.settings.theme == 2;
    },
    soloMode: {
      get() {
        return this.project.settings.toneOptions.soloMode || false;
      },
      set(value) {
        this.$store.commit('SET_SOLOMODE', value)
      },
    },
    showSettingsButton() {
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

.top-header {
  display: flex;
  justify-content: space-between;

  .project-settings {
     margin-top: 2rem;

     @include breakpoint(sm) {
       margin-top: 4rem;

     }
  }

  .actions {
    margin-top: 2rem;
    display: flex;

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
    svg {
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
