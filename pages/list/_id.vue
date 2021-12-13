<template>
  <div>
    <TopHeader />
    <section class="section">
      <div class="container">
        <div v-for="(sp, indexOne) in project.subProjects" class="subproject" :key="sp.id">
          <p class="title is-size-4">{{ sp.name }}</p>
          <Description :description="sp.description" />
          <div v-for="(item, index) in sp.items" :key="item.id" class="standard-item-outer">
            <p v-if="project.settings.showIndex">{{indexArray[indexOne][index]}}</p>
            <StandardItem :item="item" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Description from "../../components/Description.vue";

export default {
  components: { Description },
  head() {
    return {
      title: `${this.project.name} | Plan8`,
    };
  },
  data() {
    return {
      // project: {
      //     name: ''
      // },
    };
  },
  computed: {
    ...mapState(["isLoading", "project"]),
    indexArray(){
      let soundCount = 0;
      let arr = []

      this.project.subProjects.forEach((sp, index) => {
         let sub = []
         arr.push(sub)

        sp.items.forEach((item) => {
          soundCount++;
          arr[index].push(soundCount)
        });

      })
      
      console.log('arr: ', arr);
      return arr
    }
  },
  mounted() {
    this.$store.commit("player/SET_SHOWFOOTER", true);
    this.$store.commit("SET_ISLOADING", false);
  },

  async asyncData({ route, store, app }) {
    try {
      const { id } = route.params;

      const apiRoot =
        process.env.NODE_ENV == "production"
          ? "https://hqapi.plan8.co/v1"
          : "http://localhost:3000/v1";

      let projectId;

      if (id) {
        projectId = id;
      } else {
        projectId = "619b7749fc984a00176ee238";
      }
      const projectPath = `${apiRoot}/projects/${projectId}/public`;
      const project = await $fetch(projectPath);

      // const project = store.dispatch('getPublicProject', {
      //   projectId: id
      // })

      store.commit("SET_PROJECT", project);

      // return {
      //   project,
      // };
    } catch (error) {
      return {
        // project: {
        //   name: 'Not Found'
        // }
      };
    }
  },
};
</script>

<style lang="scss">
.standard-item-outer {
     display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0 1.2rem;
    
    border-radius: 30px;
    margin-left: -1rem;
    margin-right: -1rem;

    &:hover {
      background: var(--bgColorAlternative);
    }

  p {
    margin-right: 1.5rem;
    min-width: 18px;
    
  }

}
</style>
