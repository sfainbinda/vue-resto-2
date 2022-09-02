import axios from "axios";

let state = {
  productos: JSON.parse(sessionStorage.getItem("productos")) || null,
  producto: JSON.parse(sessionStorage.getItem("producto")) || null,
  error: "Error en módulo productos.",
};

const mutations = {
  OBTENER_PRODUCTOS(state, payload) {
    state.productos = payload;
  },
  OBTENER_PRODUCTO(state, payload) {
    state.producto = payload;
  },
  SET_ERROR(state, payload) {
    state.error = payload;
  },
};

const actions = {
  async getProductos({ commit }) {
    try {
      const res = await axios({
        method: "GET",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos",
      });
      if (res.status == 200) {
        commit("OBTENER_PRODUCTOS", res.data);
      } else {
        commit("SET_ERROR", "Error la obtener productos");
      }
    } catch (error) {
      console.error(error);
    }
  },
  async getProducto({ commit }, { id }) {
    try {
      const res = await axios({
        method: "GET",
        url: `https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos/${id}`,
      });
      if (res.status == 200) {
        commit("OBTENER_PRODUCTO", res.data);
      } else {
        commit("SET_ERROR", "Error la obtener producto.");
      }
    } catch (error) {
      console.error(error);
    }
  },
  async deleteProducto({ commit }, { id }) {
    try {
      const res = await axios({
        method: "DELETE",
        url: `https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos/${id}`,
      });
      if (res.status != 200) {
        commit("SET_ERROR", "Error al eliminar producto.");
      }
    } catch (error) {
      console.error(error);
    }
  },
  async putProducto({ commit }, { producto }) {
    try {
      const res = await axios({
        method: "PUT",
        url: `https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos/${producto.id}`,
        data: producto,
      });
      if (res.status != 200) {
        commit("SET_ERROR", "Error al modificar producto.");
      }
    } catch (error) {
      console.error(error);
    }
  },
  async postProducto({ commit }, { producto }) {
    try {
      const res = await axios({
        method: "POST",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos",
        data: producto,
      });
      if (res.status != 201) {
        commit("SET_ERROR", "Error al crear producto.");
      }
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  todos: (state) => {
    return state.productos;
  },
  pizzas: (state) => {
    return state.productos.filter(
      (producto) => producto.categoria === "pizzas"
    );
  },
  empanadas: (state) => {
    return state.productos.filter(
      (producto) => producto.categoria === "empanadas"
    );
  },
  hamburguesas: (state) => {
    return state.productos.filter(
      (producto) => producto.categoria === "hamburguesas"
    );
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
