<template>
  <div class="main">
    <NavegacionCmpnt class="navegacion" />
    <div class="p-3">
      <LoadingSpinner v-if="$store.getters['cargando/getCargando']" />
      <div class="container" style="margin-top: 125px">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import NavegacionCmpnt from "@/components/NavegacionCmpnt.vue";
export default {
  name: "InicioVista",
  components: {
    LoadingSpinner,
    NavegacionCmpnt,
  },
};
</script>
<style scoped>
.main {
  background-color: #f6f6f6;
  height: 100vh;
  width: 100vw;
}
.navegacion {
  width: 100vw;
}
/* .signin {
  height: 100vh;
} */
</style>
