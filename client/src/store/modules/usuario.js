import axios from "axios";

let state = {
  usuario: JSON.parse(sessionStorage.getItem("usuario")) || null,
  usuarios: [],
};

const mutations = {
  LOGIN(state, payload) {
    state.usuario = payload;
    sessionStorage.setItem("logueado", true);
  },
  LOGOUT(state) {
    state.usuario = null;
  },
  OBTENER_USUARIOS(state, payload) {
    state.usuarios = payload;
  },
};

const actions = {
  async autenticar({ commit }, { email, contrasenia }) {
    try {
      const res = await axios({
        method: "GET",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/usuarios",
      });
      if (res.status == 200) {
        let usuario = res.data.find(
          (usuario) =>
            usuario.email == email && usuario.contrasenia == contrasenia
        );
        if (usuario) {
          commit("LOGIN", usuario);
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
  async registrar({ commit }, { usuario }) {
    try {
      const res = await axios({
        method: "POST",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/usuarios",
        data: usuario,
      });
      if (res.status == 201) {
        commit("LOGIN", res.data);
      }
    } catch (error) {
      console.error(error);
    }
  },
  desloguear({ commit }) {
    commit("LOGOUT");
  },
  async getUsuarios({ commit }) {
    try {
      const res = await axios({
        method: "GET",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/usuarios",
      });
      if (res.status == 200) {
        commit("OBTENER_USUARIOS", res.data);
      }
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  nombreCompleto: (state) => {
    return `${state.usuario.nombre}, ${state.usuario.apellido}`;
  },
  usuarioId: (state) => {
    return state.usuario.id;
  },
  esAdmin: (state) => {
    return state.usuario.admin;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
/*
Consultar:
https://www.ictshore.com/javascript/vuex-modules-tutorial/
https://codesandbox.io/s/kx3qjjv9o7?file=/src/components/UserList.vue
*/
