<template>
  <div class="p-3 mb-3" style="heigt: 100vh">
    <div class="mb-3 d-flex justify-content-between align-items-center">
      <span v-if="producto.id == 0" class="fs-5 fw-bolder">Nuevo producto</span>
      <span v-else class="fs-5 fw-bolder">Editar producto</span>
    </div>
    <form @submit.prevent="guardar" id="crud-form" class="text-start">
      <div class="mb-3">
        <label class="form-label" for="nombre">Nombre del producto</label>
        <input
          @blur="validarNombre"
          class="form-control"
          id="nombre"
          type="text"
          v-model="producto.nombre"
        />
        <span class="form-text text-danger" v-if="errores.nombre"
          >El campo es requerido.</span
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="descripcion">Breve descripción</label>
        <input
          @blur="validarDescripcion"
          class="form-control"
          id="descripcion"
          type="text"
          v-model="producto.descripcion"
        />
        <span class="form-text text-danger" v-if="errores.descripcion"
          >El campo es requerido.</span
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="valor">Valor</label>
        <input
          @blur="validarValor"
          class="form-control"
          id="valor"
          type="number"
          v-model.number="producto.valor"
        />
        <span class="form-text text-danger" v-if="errores.valor"
          >El valor del producto no puede ser menor $ 1,00.</span
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="imagen">Imagen</label>
        <select
          @blur="validarImagen"
          class="form-select"
          id="categoria"
          v-model="producto.imagen"
        >
          <option
            :key="indice"
            :value="imagen.valor"
            v-for="(imagen, indice) in imagenes"
          >
            {{ imagen.texto }}
          </option>
        </select>
        <span class="form-text text-danger" v-if="errores.imagen"
          >Debe seleccionar una imagen para el producto.</span
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="categoria">Categoría</label>
        <select
          @blur="validarCategoria"
          class="form-select"
          id="categoria"
          v-model="producto.categoria"
        >
          <option
            v-for="(categoria, i) in categorias"
            :key="i"
            :value="categoria.valor"
          >
            {{ categoria.texto }}
          </option>
        </select>
        <span class="form-text text-danger" v-if="errores.categoria"
          >Debe elegir una categoría para el producto.</span
        >
      </div>
      <div class="mb-3 d-flex justify-content-end">
        <button @click="volver" class="btn btn-secondary cst-btn btn-sm mx-2">
          Cancelar
        </button>
        <button
          v-if="!agregando"
          class="btn btn-primary cst-btn btn-sm"
          type="submit"
        >
          Guardar
        </button>
        <button v-else class="btn btn-primary cst-btn" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Agregando...
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { productosMixins } from "../store/mixins/productosMixins.js";
import { mapState } from "vuex";

export default {
  name: "ProductoCrudCmpnt",
  mixins: [productosMixins],
  data() {
    return {
      agregando: false,
      cargando: false,
      categorias: [
        {
          texto: "Empanadas",
          valor: "empanadas",
        },
        {
          texto: "Ensaladas",
          valor: "ensaladas",
        },
        {
          texto: "Hamburguesas",
          valor: "hamburguesas",
        },
        {
          texto: "Lomos",
          valor: "lomos",
        },
        {
          texto: "Papas",
          valor: "papas",
        },
        {
          texto: "Pizzas",
          valor: "pizzas",
        },
      ],
      errores: {
        imagen: false,
        nombre: false,
        descripcion: false,
        valor: false,
        categoria: false,
      },
      producto: {
        id: 0,
        imagen: "",
        nombre: "",
        descripcion: "",
        valor: "",
        categoria: "",
      },
      imagenes: [
        {
          texto: "Empanadas árabes",
          valor: "empanadas_arabes",
        },
        {
          texto: "Empanadas criollas",
          valor: "empanadas_criollas",
        },
        {
          texto: "Empanadas de jamón y queso",
          valor: "empanadas_jamon_queso",
        },
        {
          texto: "Ensalada caesar",
          valor: "ensalada_caesar",
        },
        {
          texto: "Ensalada completa",
          valor: "ensalada_completa",
        },
        {
          texto: "Ensalada mediterranea",
          valor: "ensalada_mediterranea",
        },
        {
          texto: "Hamburguesa americana",
          valor: "hamburguesa_americana",
        },
        {
          texto: "Hamburguesa cheddar",
          valor: "hamburguesa_cheddar",
        },
        {
          texto: "Hamburguesa criolla",
          valor: "hamburguesa_criolla",
        },
        {
          texto: "Hamburguesa doble",
          valor: "hamburguesa_doble",
        },
        {
          texto: "Hamburguesa simple",
          valor: "hamburguesa_simple",
        },
        {
          texto: "Lomo americano",
          valor: "lomo_americano",
        },
        {
          texto: "Lomo chimi",
          valor: "lomo_chimi",
        },
        {
          texto: "Lomo completo",
          valor: "lomo_completo",
        },
        {
          texto: "Lomo de milanesa",
          valor: "lomo_milanesa",
        },
        {
          texto: "Lomo de pollo",
          valor: "lomo_pollo",
        },
        {
          texto: "Lomo vegetariano",
          valor: "lomo_vegano",
        },
        {
          texto: "Papas con cheddar",
          valor: "papas_cheddar",
        },
        {
          texto: "Papas con huevo",
          valor: "papas_huevo",
        },
        {
          texto: "Papas tradicionales",
          valor: "papas_tradicionales",
        },
        {
          texto: "Pizza calabresa",
          valor: "pizza_calabresa",
        },
        {
          texto: "Pizza fugazzeta",
          valor: "pizza_fugazzeta",
        },
        {
          texto: "Pizza jamón y palmito",
          valor: "pizza_jamon_palmito",
        },
        {
          texto: "Pizza jamón",
          valor: "pizza_jamon",
        },
        {
          texto: "Pizza mozzarella",
          valor: "pizza_mozzarella",
        },
        {
          texto: "Pizza napolitana",
          valor: "pizza_napolitana",
        },
        {
          texto: "Pizza roquefort",
          valor: "pizza_roquefort",
        },
        {
          texto: "Pizza rúcula",
          valor: "pizza_rucula",
        },
        {
          texto: "Pizza serrana",
          valor: "pizza_serrana",
        },
      ],
    };
  },
  computed: {
    ...mapState("productos", ["error"]),
  },
  async mounted() {
    if (this.$route.params.id != undefined) {
      await this.obtenerProducto(this.$route.params.id);
    }
  },
  methods: {
    async obtenerProducto(id) {
      try {
        this.cargando = true;
        await this.getProducto(id).then((res) => {
          if (res.status == 200) {
            this.producto = res.data;
            let imagen = this.imagenes.find((img) =>
              this.producto.imagen.includes(img.valor)
            );
            this.producto.imagen = imagen.valor;
            this.cargando = false;
          }
        });
      } catch (error) {
        console.log("Error.", error);
      }
    },
    async editarProducto(producto) {
      await this.$store
        .dispatch("productos/putProducto", { producto })
        .then(() => this.$router.push({ name: "Admin" }));
    },
    async agregarProducto(producto) {
      await this.$store
        .dispatch("productos/postProducto", { producto })
        .then(() => this.$router.push({ name: "Admin" }));
    },
    async guardar() {
      try {
        this.validarProducto();
        for (const propiedad in this.errores) {
          if (this.errores[propiedad] == true) {
            return false;
          }
        }
        this.agregando = true;
        let imagen = `assets/comida/${this.producto.imagen}.png`;
        this.producto.imagen = imagen;
        if (this.producto.id == 0) {
          await this.agregarProducto({
            imagen: this.producto.imagen,
            nombre: this.producto.nombre,
            descripcion: this.producto.descripcion,
            valor: this.producto.valor,
            categoria: this.producto.categoria,
            id: 0,
          }).then(() => {
            this.agregando = false;
            this.alertaAlta();
          });
        } else {
          await this.editarProducto(this.producto).then(() =>
            this.alertaEdicion()
          );
        }
      } catch (error) {
        console.log("Error.", error);
      }
    },
    alertaAlta() {
      let alerta = {
        activa: true,
        titulo: "¡Producto creado!",
        mensaje: "Ahora está disponible en productos.",
      };
      this.$store.dispatch("alerta/setAlerta", { alerta });
      setTimeout(() => {
        alerta = {
          activa: false,
          titulo: "",
          mensaje: "",
        };
        this.$store.dispatch("alerta/setAlerta", { alerta });
      }, 3000);
    },
    alertaEdicion() {
      let alerta = {
        activa: true,
        titulo: "¡Producto editado!",
        mensaje: "Cambios ya disponibles en productos.",
      };
      this.$store.dispatch("alerta/setAlerta", { alerta });
      setTimeout(() => {
        alerta = {
          activa: false,
          titulo: "",
          mensaje: "",
        };
        this.$store.dispatch("alerta/setAlerta", { alerta });
      }, 3000);
    },
    validarImagen() {
      this.errores.imagen = this.producto.imagen == "" ? true : false;
    },
    validarNombre() {
      this.errores.nombre = this.producto.nombre == "" ? true : false;
    },
    validarDescripcion() {
      this.errores.descripcion = this.producto.descripcion == "" ? true : false;
    },
    validarValor() {
      this.errores.valor = this.producto.valor < 1 ? true : false;
    },
    validarCategoria() {
      this.errores.categoria = this.producto.categoria == "" ? true : false;
    },
    validarProducto() {
      this.validarNombre();
      this.validarDescripcion();
      this.validarValor();
      this.validarCategoria();
      this.validarImagen();
    },
    // limpiarFormulario() {
    //   this.errores = {
    //     imagen: false,
    //     nombre: false,
    //     descripcion: false,
    //     valor: false,
    //     categoria: false,
    //   };
    //   this.producto = {
    //     imagen: "",
    //     nombre: "",
    //     descripcion: "",
    //     valor: "",
    //     categoria: "",
    //   };
    // },
    volver() {
      this.$router.push({ name: "Admin" });
    },
  },
};
</script>

<style scoped>
@supports (object-fit: cover) {
  img {
    height: 11rem;
    width: 11rem;
    object-fit: cover;
    object-position: center center;
  }
}
.cst-btn {
  min-width: 100px;
}
.img-opt {
  height: 20px;
  width: 20px;
}
</style>
