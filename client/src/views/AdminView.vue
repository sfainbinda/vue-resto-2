<template>
  <div>
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <span class="fs-5 fw-bolder">Administrar productos</span>
      <button @click="agregarProducto" class="btn btn-primary btn-sm">
        Nuevo producto
      </button>
    </div>
    <div>
      <div class="input-group flex-nowrap mb-3">
        <span class="input-group-text" id="addon-wrapping">🔎</span>
        <input
          type="text"
          class="form-control"
          placeholder="Escribe para buscar un producto"
          aria-label="Buscá un producto"
          aria-describedby="addon-wrapping"
          v-model="buscado"
        />
      </div>
      <div class="mb-3">
        <button
          @click="filtrar(filtro.valor)"
          v-for="(filtro, i) in filtros"
          :key="i"
          class="btn btn-outline-primary me-2"
          type="button"
        >
          {{ filtro.clave }}
        </button>
      </div>
    </div>
    <div class="d-flex">
      <div class="izquierda">
        <Producto
          v-for="producto in filtrados"
          :key="producto.id"
          :producto="producto"
          @obtenerProductos="obtenerProductos()"
        />
        <div class="d-flex justify-content-end me-2">
          <div
            v-if="$store.getters['alerta/info'].alerta.activa"
            class="position-absolute bottom-0"
            style="width: 32rem"
          >
            <Alerta />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { productosMixins } from "../store/mixins/productosMixins.js";
import Alerta from "@/components/AlertaCmpnt.vue";
import Producto from "@/components/ProductoCmpnt.vue";
export default {
  components: { Alerta, Producto },
  mixins: [productosMixins],
  name: "AdminView",
  data() {
    return {
      buscado: "",
      filtros: [
        { clave: "Todos", valor: "todos" },
        { clave: "Empanadas", valor: "empanadas" },
        { clave: "Ensaladas", valor: "ensaladas" },
        { clave: "Hamburguesas", valor: "hamburguesas" },
        { clave: "Lomos", valor: "lomos" },
        { clave: "Papas", valor: "papas" },
        { clave: "Pizzas", valor: "pizzas" },
      ],
      filtrados: [],
      productos: [],
      timeoutId: null,
    };
  },
  async mounted() {
    await this.obtenerProductos();
    // this.filtrados = this.productos;
  },
  methods: {
    agregarProducto() {
      this.$router.push({ name: "ProductoAlta" });
    },
    calcularTotal() {
      let carrito = this.$store.getters["carrito/info"];
      let parcial = 0;
      if (carrito.length) {
        carrito.forEach((item) => {
          parcial += item.producto.valor * item.cantidad;
        });
      }
      return parcial;
    },
    filtrar(categoria) {
      if (categoria === "todos") {
        this.filtrados = this.productos;
      } else {
        this.filtrados = this.productos.filter(
          (p) => p.categoria === categoria
        );
      }
    },
    async obtenerProductos() {
      try {
        this.$store.dispatch("cargando/setCargando", { cargando: true });
        await this.getProductos().then((res) => {
          if (res.status == 200) {
            this.productos = res.data;
            this.filtrados = this.productos;
          }
          this.$store.dispatch("cargando/setCargando", { cargando: false });
        });
      } catch (error) {
        console.log("Error.", error);
      }
    },
  },
  watch: {
    buscado: function (valor) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      this.timeoutId = setTimeout(() => {
        this.filtrados = this.productos.filter((producto) =>
          producto.nombre.toLowerCase().includes(valor)
        );
      }, 700);
    },
  },
};
</script>
<style scoped>
.etiqueta {
  padding: 0.25rem;
  font-size: 0.75rem;
}
.izquierda {
  width: 100%;
}
.producto {
  background-color: #ffffff;
}
</style>
