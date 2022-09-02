<template>
  <div class="fixed-top">
    <header class="p-3 bg-dark">
      <div class="container">
        <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
        >
          <div>
            <img src="../assets/logos/pizza_logo.jpg" class="logo rounded" />
            <!-- <a
              href="https://www.freepik.es/vector-gratis/ejemplo-lindo-icono-vector-historieta-pizza-concepto-icono-comida-rapida-estilo-dibujos-animados-plana_12090273.htm#query=pizza%20logo&position=29&from_view=search"
              >Image by catalyststuff</a
            >
            on <a href="https://www.freepik.es/">Freepik</a> -->
          </div>
          <template v-if="$store.getters['usuario/esAdmin']">
            <ul
              class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 menu"
            >
              <li>
                <router-link
                  class="nav-link px-2 text-white"
                  :to="{ name: 'Admin' }"
                >
                  Productos
                </router-link>
              </li>
              <li>
                <router-link
                  class="nav-link px-2 text-white"
                  :to="{ name: 'Pedidos' }"
                >
                  Pedidos
                </router-link>
              </li>
            </ul>
          </template>
          <template v-else>
            <ul
              class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 menu"
            >
              <li>
                <router-link
                  class="nav-link px-2 text-white"
                  :to="{ name: 'Productos' }"
                >
                  Productos
                </router-link>
              </li>
              <li>
                <router-link
                  class="nav-link px-2 text-white"
                  :to="{ name: 'Pedidos' }"
                >
                  Compras
                </router-link>
              </li>
            </ul>
          </template>
          <div class="dropdown">
            <a
              href="#"
              class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span class="me-2">{{
                this.$store.getters["usuario/nombreCompleto"]
              }}</span>
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="32"
                height="32"
                class="rounded-circle me-2"
              />
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark text-small shadow"
              aria-labelledby="dropdownUser1"
            >
              <!-- <li><a class="dropdown-item" href="">Mis datos</a></li>
              <li><hr class="dropdown-divider" /></li> -->
              <li @click="desloguear">
                <a class="dropdown-item" href="">Cerrar sesión</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "NavegacionCmpnt",
  computed: {
    ...mapState("usuario", ["usuario"]),
  },
  methods: {
    desloguear() {
      let reset = this.resetStorage();
      if (reset) {
        this.$store.dispatch("carrito/vaciarCarrito");
        this.$store.dispatch("usuario/desloguear");
        this.$router.push({ name: "acceso" });
      }
    },
    resetStorage() {
      sessionStorage.removeItem("logueado");
      sessionStorage.removeItem("usuario");
      sessionStorage.removeItem("carrito");
      return true;
    },
  },
};
</script>
<style scoped>
.logo {
  height: 80px;
  position: absolute;
  width: 80px;
}
.menu {
  margin-left: 100px;
}
.anexo {
  background-color: #f6f6f6;
  height: 60px;
  width: 100vw;
}
</style>
