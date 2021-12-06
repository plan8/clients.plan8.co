<template>
  <div class="section">
    <div class="container">
   <p>  <pre>Test{{test}}</pre></p>
    </div>
  </div>
</template>

<script>


export default {
    data(){
        return {
            test: {}
        }
    },
    mounted(){
        this.test = this.$config
         this.$store.commit("SET_ISLOADING", false);
        console.log('   this.$config: ',    this.$config);
    }
  
  
}
</script>

<style>

</style>
