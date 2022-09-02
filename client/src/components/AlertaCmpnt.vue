<template>
  <div>
    <div class="alert alert-success" role="alert">
      <div class="d-flex flex-column">
        <span
          ><b>{{ $store.getters["alerta/info"].alerta.titulo }}</b></span
        >
        <span>{{ $store.getters["alerta/info"].alerta.mensaje }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AlertaCmpnt",
};
</script>
<style scoped></style>
