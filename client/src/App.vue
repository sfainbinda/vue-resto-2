<template>
  <div id="app" class="overflow-auto">
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("usuario", ["usuario"]),
    ...mapState("carrito", ["carrito"]),
  },
  mounted() {
    // https://programmerclick.com/article/39481517199/
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
      sessionStorage.setItem("carrito", JSON.stringify(this.carrito));
    });
  },
};
</script>
<style>
#app {
  background-color: #f6f6f6;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
