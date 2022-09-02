let state = {
  alerta: {
    activa: false,
    titulo: "Título por defecto.",
    mensaje: "Mensaje por defecto y algo más de texto.",
  },
};

const mutations = {
  SET_ALERTA(state, payload) {
    state.alerta = payload;
  },
};

const actions = {
  async setAlerta({ commit }, { alerta }) {
    commit("SET_ALERTA", alerta);
  },
};

const getters = {
  info() {
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
