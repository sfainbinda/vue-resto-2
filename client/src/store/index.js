import Vue from "vue";
import Vuex from "vuex";
import alerta from "@/store/modules/alerta.js";
import cargando from "@/store/modules/cargando.js";
import carrito from "@/store/modules/carrito.js";
import productos from "@/store/modules/productos.js";
import usuario from "@/store/modules/usuario.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    alerta,
    cargando,
    carrito,
    productos,
    usuario,
  },
});
