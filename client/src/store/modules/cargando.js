let state = {
  cargando: false,
};

const mutations = {
  SET_CARGANDO(state, payload) {
    state.cargando = payload;
  },
};

const actions = {
  async setCargando({ commit }, { cargando }) {
    commit("SET_CARGANDO", cargando);
  },
};

const getters = {
  getCargando() {
    return state.cargando;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
