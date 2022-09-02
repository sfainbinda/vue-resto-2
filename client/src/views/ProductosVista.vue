<template>
  <div>
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
        />
      </div>
      <div class="derecha rounded-3 ms-4">
        <Checkout :total="calcularTotal()" />
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
</template>
<script>
import { productosMixins } from "../store/mixins/productosMixins.js";
import Checkout from "@/components/CheckoutCmpnt.vue";
import Producto from "@/components/ProductoCmpnt.vue";
import Alerta from "@/components/AlertaCmpnt.vue";
export default {
  components: { Alerta, Checkout, Producto },
  mixins: [productosMixins],
  name: "ProductosVista",
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
    this.filtrados = this.productos;
  },
  methods: {
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
  width: 60%;
}
.derecha {
  width: 40%;
}
.producto {
  background-color: #ffffff;
}
</style>
