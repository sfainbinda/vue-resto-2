<template>
  <div
    class="p-3 card d-flex justify-content-center rounded-end"
    style="width: 30vw"
  >
    <form
      @submit.prevent="iniciarSesion"
      id="signin-form"
      class="text-start p-3"
      v-if="signIn"
    >
      <div class="mb-3 d-flex flex-column">
        <span class="fs-5 fw-bolder"> Iniciar sesión </span>
        <span class="fs-6 fw-light">
          Ingresa tu correo y contraseña para ingresar.
        </span>
      </div>
      <div class="mb-3">
        <label class="form-label" for="email">Correo electrónico</label>
        <input
          @blur="validarEmail"
          class="form-control"
          id="email"
          type="email"
          v-model.trim="data.email"
        />
        <span class="form-text text-danger" v-if="errores.email"
          >El formato de correo no es válido.</span
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="contrasenia">Contraseña</label>
        <input
          @blur="validarContrasenia"
          class="form-control"
          id="contrasenia"
          type="password"
          v-model.trim="data.contrasenia"
        />
        <span class="form-text text-danger" v-if="errores.contrasenia"
          >El campo es requerido.</span
        >
      </div>
      <div class="text-center">
        <div class="mb-3">
          <span>¿No tiene una cuenta?</span>
          <button @click="cambiarVista" type="button" class="btn btn-link">
            Crea una.
          </button>
        </div>
        <div class="mb-3">
          <button v-if="!cargando" class="btn btn-primary w-100" type="submit">
            Iniciar sesión
          </button>
          <button v-else class="btn btn-primary w-100" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Cargando...
          </button>
        </div>
      </div>
      <div
        v-if="errorDeSesion"
        class="alert alert-danger text-center"
        role="alert"
      >
        Usuario o contraseña incorrecta.
      </div>
    </form>
    <form
      @submit.prevent="registrarUsuario"
      id="signup-form"
      class="text-start p-3"
      v-else
    >
      <div class="mb-3 d-flex flex-column">
        <span class="fs-5 fw-bolder"> Registrate </span>
        <span class="fs-6 fw-light">
          Completa el formulario y comienza a comprar.
        </span>
      </div>
      <div class="mb-3">
        <label class="form-label" for="nombre">Nombre</label>
        <input
          @blur="validarNombre"
          class="form-control"
          id="nombre"
          type="text"
          v-model.trim="data.nombre"
        />
        <span class="form-text text-danger" v-if="errores.nombre"
          >El campo es requerido.</span
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="apellido">Apellido</label>
        <input
          @blur="validarApellido"
          class="form-control"
          id="apellido"
          type="text"
          v-model.trim="data.apellido"
        />
        <span class="form-text text-danger" v-if="errores.apellido"
          >El campo es requerido.</span
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="email">Correo electrónico</label>
        <input
          @blur="validarEmail"
          class="form-control"
          id="email"
          type="email"
          v-model.trim="data.email"
        />
        <span class="form-text text-danger" v-if="errores.email"
          >El formato de correo no es válido.</span
        >
      </div>
      <div class="mb-3">
        <label class="form-label" for="contrasenia">Contraseña</label>
        <input
          @blur="validarContrasenia"
          class="form-control"
          id="contrasenia"
          type="password"
          v-model.trim="data.contrasenia"
        />
        <span class="form-text text-danger" v-if="errores.contrasenia"
          >El campo es requerido.</span
        >
      </div>
      <div class="text-center">
        <div class="mb-3">
          <span>¿Ya tienes una cuenta?</span>
          <button @click="cambiarVista" type="button" class="btn btn-link">
            Inicia sesión.
          </button>
        </div>
        <div class="mb-3">
          <button v-if="!cargando" class="btn btn-primary w-100" type="submit">
            Crear cuenta
          </button>
          <button v-else class="btn btn-primary w-100" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Cargando...
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "SignIn",
  data() {
    return {
      errorDeSesion: false,
      cargando: false,
      signIn: true,
      errores: {
        nombre: false,
        apellido: false,
        email: false,
        contrasenia: false,
      },
      data: {
        nombre: "",
        apellido: "",
        email: "",
        contrasenia: "",
      },
    };
  },
  computed: {
    ...mapState("usuario", ["usuario", "usuarios"]),
  },
  methods: {
    async registrarUsuario() {
      try {
        this.errorDeSesion = false;
        for (const propiedad in this.errores) {
          if (this.errores[propiedad] == true) {
            return false;
          }
        }
        this.cargando = true;
        let usuario = {
          nombre: this.data.nombre,
          apellido: this.data.apellido,
          email: this.data.email,
          contrasenia: this.data.contrasenia,
          admin: false,
        };
        await this.$store
          .dispatch("usuario/registrar", { usuario })
          .then(() => this.$router.push({ name: "Productos" }))
          .finally(() => (this.cargando = false));
      } catch (error) {
        console.log("Error.", error);
      }
    },
    async iniciarSesion() {
      this.errorDeSesion = false;
      this.cargando = true;
      await this.$store
        .dispatch("usuario/autenticar", {
          email: this.data.email,
          contrasenia: this.data.contrasenia,
        })
        .then(() => {
          if (this.usuario == null) {
            this.errorDeSesion = true;
          } else {
            sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
            if (this.usuario.admin) {
              this.$router.push({ name: "Admin" });
            } else {
              this.$router.push({ name: "Productos" });
              sessionStorage.setItem("carrito", JSON.stringify([]));
            }
          }
        })
        .finally(() => (this.cargando = false));
    },
    validarEmail() {
      let regex = /.+@.+\..+/;
      let esValido = regex.test(this.data.email);
      this.errores.email = !esValido;
    },
    validarContrasenia() {
      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,50}$/;
      let esValido = regex.test(this.data.contrasenia);
      this.errores.contrasenia = !esValido;
    },
    validarNombre() {
      let regex =
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
      let esValido = regex.test(this.data.nombre);
      this.errores.nombre = !esValido;
    },
    validarApellido() {
      let regex =
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
      let esValido = regex.test(this.data.apellido);
      this.errores.apellido = !esValido;
    },
    cambiarVista() {
      this.signIn = !this.signIn;
      this.limpiarFormulario();
    },
    limpiarFormulario() {
      this.data = {
        nombre: "",
        apellido: "",
        email: "",
        contrasenia: "",
      };
      this.errores = {
        nombre: false,
        apellido: false,
        email: false,
        contrasenia: false,
      };
    },
  },
};
</script>
<style scoped>
.sign-img {
  background-color: darkgrey;
  width: 20vw;
}
@supports (object-fit: cover) {
  img {
    height: 35rem;
    width: 20vw;
    object-fit: cover;
    object-position: center center;
  }
}
</style>
