import axios from "axios";

export const productosMixins = {
  methods: {
    async getProductos() {
      return await axios({
        method: "GET",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos",
      });
    },
    async getProducto(id) {
      return await axios({
        method: "GET",
        url: `https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos/${id}`,
      });
    },
    async deleteProducto(id) {
      return await axios({
        method: "DELETE",
        url: `https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos/${id}`,
      });
    },
    async postProducto(producto) {
      return await axios({
        method: "POST",
        url: "https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos",
        data: producto,
      });
    },
    async putProducto(producto) {
      return await axios({
        method: "PUT",
        url: `https://62e013a498dd9c9df60d4a4c.mockapi.io/resto/productos/${producto.id}`,
        data: producto,
      });
    },
  },
};
