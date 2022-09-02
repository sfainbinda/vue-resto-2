<template>
  <div class="p-3 mb-3" style="heigt: 100vh">
    <LoadingSpinner v-if="cargando" />
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <span class="fs-5 fw-bolder">Administrar productos</span>
      <button @click="agregarProducto" class="btn btn-primary">
        Nuevo producto
      </button>
    </div>
    <template v-if="productos != null && productos.length != 0">
      <div
        class="card mb-3"
        v-for="(producto, indice) in productos"
        :key="indice"
      >
        <div class="d-flex">
          <img :src="require(`../${producto.imagen}`)" class="card-img-top" />
          <div class="card-body d-flex justify-content-between pb-0">
            <div>
              <h5 class="card-title">{{ producto.nombre }}</h5>
              <div style="height: 8rem">
                <p class="card-text">
                  {{ producto.descripcion }}
                </p>
                <p class="card-text fw-bolder">$ {{ producto.valor }}</p>
                <button
                  @click="eliminarProducto(producto.id)"
                  class="btn btn-secondary cst-btn"
                  type="button"
                >
                  Eliminar
                </button>
                <button
                  @click="editarProducto(producto.id)"
                  class="btn btn-primary mx-2 cst-btn"
                  type="button"
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <div v-else class="card p-3 mb-3 d-flex">
      <span>Aún no se agregaron productos.</span>
    </div>
  </div>
</template>
<script>
import { productosMixins } from "../store/mixins/productosMixins.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { mapState } from "vuex";

export default {
  name: "ProductManagement",
  mixins: [productosMixins],
  components: { LoadingSpinner },
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
    height: 11rem;
    width: 11rem;
    object-fit: cover;
    object-position: center center;
  }
}
.cst-btn {
  min-width: 100px;
}
</style>
