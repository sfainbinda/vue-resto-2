<template>
  <div
    class="bg-dark d-flex align-items-center justify-content-center"
    style="height: 100vh; width: 100vw"
  >
    <main class="px-3" style="width: 40vw">
      <h1 class="text-white">Algo salió mal.</h1>
      <p class="lead text-white">
        Para poder acceder a la ruta indicada debes iniciar sesión.
      </p>
      <p class="lead text-white">
        Haz click <a @click="volver" href="">aquí</a> para volver al inicio.
      </p>
    </main>
  </div>
</template>
<script>
export default {
  name: "ErrorLoginView",
  methods: {
    volver() {
      this.$router.push("/");
    },
  },
};
</script>
<style scoped></style>
