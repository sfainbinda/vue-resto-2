<template>
  <div class="d-flex justify-content-between mb-3">
    <div>
      <h5 class="fs-6 fw-bolder">{{ item.producto.nombre }}</h5>
      <div>
        <button
          @click="eliminarProducto(indice)"
          class="btn btn-link text-decoration-none p-0"
          type="button"
        >
          Quitar del carrito
        </button>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div class="d-flex align-items-center">
        <button @click="restarUnidad(indice)" type="button" class="btn px-3">
          <span>-</span>
        </button>
        <small class="d-block text-muted px-3">
          <b>{{ item.cantidad }}</b>
        </small>
        <button @click="agregarUnidad(indice)" type="button" class="btn px-3">
          <span>+</span>
        </button>
      </div>
      <div class="d-flex flex-column justify-content-center align-items-end">
        <span class="fw-bolder">$ {{ calcularSubtotal(item) }},00</span>
      </div>
    </div>
  </div>
</template>
<script>
import { productosMixins } from "../store/mixins/productosMixins.js";
import { mapState } from "vuex";

export default {
  name: "ProductoCarritoCmpnt",
  mixins: [productosMixins],
  props: {
    item: Object,
    indice: Number,
  },
  computed: {
    ...mapState("usuario", ["usuario"]),
    ...mapState("carrito", ["carrito"]),
  },
  methods: {
    agregarUnidad(indice) {
      this.$store.dispatch("carrito/agregarUnidad", { indice });
    },
    calcularSubtotal(item) {
      return item.producto.valor * item.cantidad;
    },
    async eliminarProducto(indice) {
      await this.$store.dispatch("carrito/eliminarProducto", { indice });
    },
    restarUnidad(indice) {
      this.$store.dispatch("carrito/quitarUnidad", { indice });
    },
  },
};
</script>
<style scoped>
@supports (object-fit: cover) {
  img {
    background-color: #ffffff;
    height: 9rem;
    object-fit: cover;
    object-position: center center;
    width: 9rem;
  }
}
.producto {
  background-color: #f4f5f7;
}
.cst-btn {
  min-width: 100px;
}
.etiqueta {
  padding: 0.25rem;
  font-size: 0.75rem;
}
</style>
