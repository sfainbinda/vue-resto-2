import axios from "axios";

export const usuariosMixins = {
  methods: {
    async getUsuarios() {
      return await axios({
        method: "GET",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/usuarios",
      });
    },
    async getUsuario(id) {
      return await axios({
        method: "GET",
        url: `https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/usuarios/${id}`,
      });
    },
    async postUsuario(usuario) {
      return await axios({
        method: "POST",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/usuarios",
        data: usuario,
      });
    },
  },
};
