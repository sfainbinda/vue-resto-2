<template>
  <div class="card mb-3 producto me-2 p-4 rounded-3">
    <div class="d-flex">
      <div class="me-2">
        <img
          :src="require(`../${producto.imagen}`)"
          class="card-img-top rounded-3"
        />
      </div>
      <div style="width: 100%">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-column justify-content-center">
            <span class="fs-6 fw-bolder">{{ producto.nombre }}</span>
            <span class="fs-6">{{ producto.descripcion }}</span>
            <span class="fs-6">$ {{ producto.valor }},00</span>
          </div>
        </div>
        <div class="text-end">
          <button
            @click="eliminarProducto(producto.id)"
            class="btn btn-error btn-sm me-1"
            data-bs-toggle="modal"
            :data-bs-target="`#modal${producto.id}`"
            type="button"
          >
            Eliminar
          </button>
          <button
            @click="editarProducto(productoid)"
            class="btn btn-primary btn-sm me-1"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { productosMixins } from "../store/mixins/productosMixins.js";
import { mapState } from "vuex";

export default {
  name: "ProductoAdminCmpnt.vue",
  mixins: [productosMixins],
  data() {
    return {
      cargando: false,
    };
  },
  computed: {
    ...mapState("productos", ["productos"]),
  },
  async beforeMount() {
    await this.obtenerProductos();
  },
  methods: {
    async obtenerProductos() {
      this.cargando = true;
      await this.$store
        .dispatch("productos/getProductos")
        .finally(() => (this.cargando = false));
    },
    async eliminarProducto(id) {
      this.cargando = true;
      await this.$store
        .dispatch("productos/deleteProducto", { id: id })
        .then(async () => await this.obtenerProductos());
    },
    editarProducto(id) {
      this.$router.push({
        name: "ProductoEdicion",
        params: {
          id: id,
        },
      });
    },
    agregarProducto() {
      this.$router.push({ name: "ProductoAlta" });
    },
  },
};
</script>
<style scoped>
@supports (object-fit: cover) {
  img {
    /* background-color: #ffffff; */
    height: 7rem;
    object-fit: scale-down;
    object-position: center center;
    width: 7rem;
  }
}
@supports (object-fit: cover) {
  .portada {
    /* background-color: #ffffff; */
    height: 20rem;
    object-fit: scale-down;
    object-position: center center;
    width: 20rem;
  }
}
.etiqueta {
  padding: 0.25rem;
  font-size: 0.75rem;
}
.izquierda {
  width: 60%;
}
.derecha {
  background-color: #ffffff;
  height: 100vh;
  width: 40%;
}
.producto {
  background-color: #ffffff;
}
</style>
