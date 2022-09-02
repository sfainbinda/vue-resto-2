import axios from "axios";

let state = {
  carrito: JSON.parse(sessionStorage.getItem("carrito")) || [],
  // data: {
  //   envio: false,
  //   direccion: "",
  //   numeracion: "",
  //   piso: "",
  //   departamento: "",
  //   barrio: "",
  //   observaciones: "",
  //   telefono: "",
  //   efectivo: false,
  //   cambio: 0,
  //   codigo: 0,
  //   usuarioId: 0,
  // },
  // error: false,
};

const mutations = {
  AGREGAR_PRODUCTO(state, payload) {
    state.carrito.push(payload);
  },
  QUITAR_PRODUCTO(state, payload) {
    state.carrito.splice(payload.indice, 1);
  },
  AGREGAR_UNIDAD(state, payload) {
    state.carrito[payload.indice].cantidad++;
  },
  QUITAR_UNIDAD(state, payload) {
    state.carrito[payload.indice].cantidad == 1
      ? 1
      : state.carrito[payload.indice].cantidad--;
  },
  VACIAR_CARRITO(state) {
    state.carrito = [];
    state.error = false;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
  SET_USUARIO_ID(state, payload) {
    state.data.usuarioId = payload;
  },
};

const actions = {
  setUsuarioId({ commit }, { usuarioId }) {
    commit("SET_USUARIO_ID", { usuarioId });
  },
  agregarProducto({ commit }, { producto }) {
    if (state.carrito != []) {
      let existe = state.carrito.find(
        (item) => item.producto.id == producto.id
      );
      if (existe) {
        console.log("Ya está en el carrito.");
      } else {
        commit("AGREGAR_PRODUCTO", { producto, cantidad: 1 });
      }
    }
  },
  eliminarProducto({ commit }, { indice }) {
    if (state.carrito != []) {
      commit("QUITAR_PRODUCTO", { indice });
    }
  },
  agregarUnidad({ commit }, { indice }) {
    if (state.carrito != []) {
      commit("AGREGAR_UNIDAD", { indice });
    }
  },
  quitarUnidad({ commit }, { indice }) {
    if (state.carrito != []) {
      commit("QUITAR_UNIDAD", { indice });
    }
  },
  vaciarCarrito({ commit }) {
    commit("VACIAR_CARRITO");
  },
  async generarPedido({ commit }, { pedido }) {
    try {
      const res = await axios({
        method: "POST",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/pedidos",
        data: pedido,
      });
      if (res.status == 201) {
        commit("SET_ERROR", false);
        commit("VACIAR_CARRITO");
      } else {
        commit("SET_ERROR", true);
      }
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  info() {
    return state.carrito;
  },
  data() {
    return state.data;
  },
  pedido() {
    return state;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
