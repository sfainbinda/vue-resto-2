<template>
  <div class="row">
    <p v-if="usuario.admin" class="fs-4 fw-bolder f text-start mt-2 mb-4">
      Pedidos realizados
    </p>
    <p v-else class="fs-4 fw-bolder f text-start mt-2 mb-4">
      Compras realizadas
    </p>
    <div v-if="pedidosFiltrados.length == 0">
      <div v-if="usuario.admin" class="alert alert-primary" role="alert">
        Aún no se agregaron pedidos.
      </div>
      <div v-else class="alert alert-primary" role="alert">
        Aún no realizaste ningún pedido. Ve a la sección
        <router-link :to="{ name: 'Productos' }">productos</router-link> para
        comprar.
      </div>
    </div>
    <div
      v-else
      class="col-sm-6 pb-3"
      v-for="pedido in pedidosFiltrados"
      :key="pedido.id"
    >
      <div class="card">
        <h5 class="card-header">Pedido #{{ pedido.id }}</h5>
        <div class="card-body">
          <div class="d-flex flex-column mb-3">
            <span><b>Cliente:</b> {{ pedido.usuario }}</span>
            <span><b>Teléfono:</b> {{ pedido.telefono }}</span>
            <span><b>Fecha y hora:</b> {{ pedido.fecha }}</span>
            <hr />
            <span v-if="pedido.direccion == ''"><b>Retira en tienda.</b></span>
            <div v-else class="d-flex flex-column">
              <span
                ><b>Calle:</b> {{ pedido.direccion }}
                {{ pedido.numeracion }}</span
              >
              <span
                ><b>Piso:</b> {{ pedido.piso }}. <b>Dpto.:</b>
                {{ pedido.departamento }}</span
              >
              <span><b>Barrio:</b> {{ pedido.barrio }}</span>
            </div>

            <hr />
            <span
              ><b>Forma de pago:</b>
              {{ pedido.efectivo ? "efectivo" : "Mercado Pago" }}</span
            >
            <span v-show="pedido.efectivo"
              ><b>Abona con:</b> $ {{ pedido.cambio }}</span
            >
            <span v-show="!pedido.efectivo"
              ><b>Nro. comprobante Mercado Pago:</b> {{ pedido.codigo }}</span
            >
          </div>
          <hr />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Producto</th>
                <th scope="col" class="text-end">Cantidad</th>
                <th scope="col" class="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, indice) in pedido.items" :key="item.id">
                <th scope="row">{{ indice + 1 }}</th>
                <td>{{ item.producto.nombre }}</td>
                <td class="text-end">{{ item.cantidad }}</td>
                <td class="text-end">
                  $ {{ item.cantidad * item.producto.valor }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-end">
            <span class="fw-bolder">Valor total: ${{ pedido.valor }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  name: "PedidosVista",
  data() {
    return {
      pedidos: [],
    };
  },
  computed: {
    ...mapState("usuario", ["usuario"]),
    pedidosFiltrados() {
      let filtrados = [];
      if (this.pedidos.length > 0) {
        if (this.usuario.admin) {
          filtrados = this.pedidos;
        } else {
          filtrados = this.pedidos.filter(
            (pedido) => pedido.usuarioId == this.usuario.id
          );
        }
      }
      return filtrados;
    },
  },
  async mounted() {
    await this.obtenerPedidos();
  },
  methods: {
    async obtenerPedidos() {
      try {
        this.$store.dispatch("cargando/setCargando", { cargando: true });
        const res = await axios({
          method: "GET",
          url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/pedidos",
        });
        if (res.status == 200) {
          this.pedidos = res.data;
        }
        this.$store.dispatch("cargando/setCargando", { cargando: false });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
