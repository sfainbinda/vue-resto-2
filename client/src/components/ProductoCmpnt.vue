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
          <div v-show="existe(producto)">
            <button class="btn btn-success etiqueta" disabled type="button">
              #Agregado
            </button>
          </div>
        </div>
        <div
          v-if="!existe(producto) && !$store.getters['usuario/esAdmin']"
          class="text-end"
        >
          <button
            type="button"
            class="btn btn-secondary btn-sm me-1"
            data-bs-toggle="modal"
            :data-bs-target="`#modal${producto.id}`"
          >
            Ver más
          </button>
          <button
            @click="agregarProducto(producto)"
            class="btn btn-primary btn-sm me-1"
          >
            Agregar al carrito
          </button>
        </div>
        <div v-if="$store.getters['usuario/esAdmin']" class="text-end">
          <button
            @click="eliminarProducto(producto.id)"
            type="button"
            class="btn btn-danger btn-sm me-1 cst-btn"
          >
            Eliminar
          </button>
          <button
            @click="editarProducto(producto.id)"
            class="btn btn-primary btn-sm me-1 cst-btn"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      :id="`modal${producto.id}`"
      tabindex="-1"
      :aria-labelledby="`modal${producto.id}`"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="`modal${producto.id}`">
              {{ producto.nombre }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="me-2 d-flex justify-content-center">
              <img
                :src="require(`../${producto.imagen}`)"
                class="card-img-top rounded-3 portada"
              />
            </div>
            <div class="d-flex flex-column">
              <span class="fs-6 fw-bolder">Ingredientes</span>
              <span class="fs-6">{{ producto.descripcion }}</span>
              <span class="fs-6 fw-bolder">$ {{ producto.valor }},00</span>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="agregarProducto(producto)"
              class="btn btn-primary btn-sm me-1"
              type="button"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { productosMixins } from "../store/mixins/productosMixins.js";
import { mapState } from "vuex";

export default {
  name: "ProductoCmpnt",
  mixins: [productosMixins],
  props: {
    producto: Object,
  },
  computed: {
    ...mapState("usuario", ["usuario"]),
    ...mapState("carrito", ["carrito"]),
  },
  data() {
    return {
      agregando: false,
      cargando: false,
    };
  },
  methods: {
    agregarProducto(producto) {
      this.$store.dispatch("carrito/agregarProducto", { producto });
    },
    existe(producto) {
      let carrito = this.$store.getters["carrito/info"];
      if (carrito.length > 0) {
        let existe = carrito.find((item) => item.producto.id == producto.id);
        if (existe) {
          return true;
        }
      }
      return false;
    },
    alertaBaja() {
      let alerta = {
        activa: true,
        titulo: "¡Producto eliminado!",
        mensaje: "Se quitó del listado de productos.",
      };
      this.$store.dispatch("alerta/setAlerta", { alerta });
      setTimeout(() => {
        alerta = {
          activa: false,
          titulo: "",
          mensaje: "",
        };
        this.$store.dispatch("alerta/setAlerta", { alerta });
      }, 3000);
    },
    async eliminarProducto(id) {
      this.cargando = true;
      await this.$store
        .dispatch("productos/deleteProducto", { id: id })
        .then(async () => {
          this.$emit("obtenerProductos");
          this.alertaBaja();
        });
    },
    editarProducto(id) {
      this.$router.push({
        name: "ProductoCrud",
        params: {
          id: id,
        },
      });
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
.cst-btn {
  min-width: 100px;
}
</style>
