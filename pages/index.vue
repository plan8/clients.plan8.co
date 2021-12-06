<template>
  <div class="section">
    <div class="container">
      <p class="title is-size-3">Nothing to see here, move along...</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
     this.$store.commit("SET_ISLOADING", false);
  }
}
</script>
