<template>
  <div class="toggle-outer-wrapper">
    <p>{{ label }}</p>
    <span
      class="toggle-wrapper"
      role="checkbox"
      :aria-checked="value.toString()"
      tabindex="0"
      @click="toggle"
      @keydown.space.prevent="toggle"
    >
      <span class="toggle-background" :class="backgroundStyles" />
      <span class="toggle-indicator" :style="indicatorStyles" />
    </span>

  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },

  computed: {
    backgroundStyles() {
      return {
        active: this.value,
        "not-active": !this.value,
      };
    },
    indicatorStyles() {
      return { transform: this.value ? "translateX(26px)" : "translateX(0)" };
    },
  },
  methods: {
    toggle() {
      this.$emit("input", !this.value);
      
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixins.scss";

.toggle-outer-wrapper {
  display: flex;
align-items: flex-end;


 
  .active {
    background-color: var(--primaryColorDarker);
  }

  .not-active {
    background-color: var(--bgColor);
  }

  

  .toggle-wrapper {
    --toggleWidth: 50px;
    --toggleHeight: 24px;
    --toggleKnobSize: calc(var(--toggleHeight) - 2px);
    margin-left: 1rem;
    display: inline-block;
    position: relative;
    cursor: pointer;
    width: var(--toggleWidth);
    height: var(--toggleHeight);
    border-radius: 9999px;
    border: 1px solid var(--primaryColor);
  }

  .toggle-wrapper:focus {
    outline: 0;
  }

  .toggle-background {
    display: inline-block;
    border-radius: 9999px;
    height: 100%;
    width: 100%;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.4s ease;
  }

  .toggle-indicator {
    position: absolute;
    height: var(--toggleKnobSize);
    width: var(--toggleKnobSize);
    left: 0;
    bottom: 0;
    background-color: var(--primaryColor);
    border-radius: 9999px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.4s ease;
  }
}
</style>
