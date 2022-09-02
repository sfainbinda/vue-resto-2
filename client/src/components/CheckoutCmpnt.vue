<template>
  <div>
    <div v-if="$store.getters['carrito/info'].length > 0" class="card checkout">
      <h5 class="card-header">Carrito de compras - Checkout</h5>
      <div class="card-body">
        <ProductoCarrito
          v-for="(item, indice) in $store.getters['carrito/info']"
          :key="indice"
          :indice="indice"
          :item="item"
        />
        <hr />
        <form
          @submit.prevent="generarPedido"
          id="checkout-form"
          class="text-start"
        >
          <div class="mb-0 d-flex flex-column">
            <p class="lead fw-light fs-6">
              Ingresa datos de envío y forma de pago para concretar tu pedido.
            </p>
          </div>
          <div class="pb-3">
            <h5 class="fs-6 fw-bolder">¿ Te lo enviamos o lo retiras?</h5>
          </div>
          <div class="pb-3">
            <div class="form-check">
              <input
                :disabled="desactivado"
                class="form-check-input"
                type="radio"
                name="envioDomicilio"
                id="envioDomicilio"
                :value="true"
                v-model="envio"
              />
              <label class="form-check-label" for="envioDomicilio">
                Envío a domicilio
              </label>
            </div>
            <div class="form-check">
              <input
                :disabled="desactivado"
                class="form-check-input"
                type="radio"
                name="retiroTienda"
                id="retiroTienda"
                :value="false"
                v-model="envio"
              />
              <label class="form-check-label" for="retiroTienda">
                Retiro en tienda
              </label>
            </div>
          </div>
          <template v-if="envio">
            <div class="row pb-3">
              <div class="col-sm-12">
                <label class="form-label" for="direccion">Calle</label>
                <input
                  @blur="validarDireccion"
                  :disabled="desactivado"
                  class="form-control"
                  id="direccion"
                  placeholder="Ej.: Calle Sin Nombre"
                  type="text"
                  v-model="direccion"
                />
                <span class="form-text text-danger" v-if="errores.direccion"
                  >El campo es requerido</span
                >
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-4">
                <label class="form-label" for="numeracion">Numeración</label>
                <input
                  @blur="validarNumeracion"
                  :disabled="desactivado"
                  class="form-control"
                  id="numeracion"
                  placeholder="Ej.: 123"
                  type="text"
                  v-model="numeracion"
                />
                <span class="form-text text-danger" v-if="errores.numeracion"
                  >El campo es requerido</span
                >
              </div>
              <div class="col-sm-4">
                <label class="form-label" for="piso">Piso</label>
                <input
                  :disabled="desactivado"
                  class="form-control"
                  id="piso"
                  placeholder="Ej.: 1"
                  type="text"
                  v-model="piso"
                />
              </div>
              <div class="col-sm-4">
                <label class="form-label" for="departamento">Dpto.</label>
                <input
                  :disabled="desactivado"
                  class="form-control"
                  id="departamento"
                  placeholder="Ej.: A"
                  type="text"
                  v-model="departamento"
                />
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-sm-12">
                <label class="form-label" for="barrio">Barrio</label>
                <input
                  @blur="validarBarrio"
                  :disabled="desactivado"
                  class="form-control"
                  id="barrio"
                  type="text"
                  placeholder="Ej.: Sin nombre"
                  v-model="barrio"
                />
                <span class="form-text text-danger" v-if="errores.barrio"
                  >El campo es requerido</span
                >
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <label class="form-label" for="observaciones"
                  >Observaciones</label
                >
                <input
                  :disabled="desactivado"
                  class="form-control"
                  id="observaciones"
                  type="text"
                  placeholder="Ej.: Entre calles A y B"
                  v-model="observaciones"
                />
              </div>
            </div>
          </template>
          <div
            v-else
            class="alert alert-primary d-flex flex-column"
            role="alert"
          >
            <span>Te esperamos en Av. Hipólito Yrigoyen 255.</span>
            <span>En 45' tu pedido estará listo.</span>
          </div>
          <hr />
          <div>
            <h5 class="fs-6 fw-bolder">Contacto</h5>
          </div>
          <div class="row pb-3">
            <div class="col-sm-12">
              <label class="form-label" for="telefono">Teléfono</label>
              <input
                @blur="validarTelefono"
                :disabled="desactivado"
                class="form-control"
                id="telefono"
                type="text"
                placeholder="Ej.: 3512012141"
                v-model="telefono"
              />
              <span class="form-text text-danger" v-if="errores.telefono"
                >El campo es requerido</span
              >
            </div>
          </div>
          <hr />
          <div class="pb-3">
            <h5 class="fs-6 fw-bolder">Forma de pago</h5>
          </div>
          <div class="pb-3">
            <div class="form-check">
              <input
                :disabled="desactivado"
                class="form-check-input"
                type="radio"
                name="efectivo"
                id="efectivo"
                :value="true"
                v-model="efectivo"
              />
              <label class="form-check-label" for="efectivo"> Efectivo </label>
            </div>
            <div class="form-check">
              <input
                :disabled="desactivado"
                class="form-check-input"
                type="radio"
                name="mercado"
                id="mercado"
                :value="false"
                v-model="efectivo"
              />
              <label class="form-check-label" for="mercado">
                Mercado Pago
              </label>
            </div>
          </div>
          <div class="row" v-if="!efectivo">
            <div class="col-sm-12">
              <label class="form-label" for="codigo"
                >Código de transferencia</label
              >
              <input
                @blur="validarCodigoMP"
                :disabled="desactivado"
                class="form-control"
                id="codigo"
                type="number"
                v-model="codigo"
              />
              <span class="form-text text-danger" v-if="errores.codigomp"
                >El código debe tener 11 números</span
              >
            </div>
          </div>
          <div class="row" v-else>
            <div class="col-sm-12">
              <label class="form-label" for="cambio">¿Con cuánto abonas?</label>
              <input
                @blur="validarCambio"
                :disabled="desactivado"
                class="form-control"
                id="cambio"
                type="number"
                v-model="cambio"
              />
              <span class="form-text text-danger" v-if="errores.cambio"
                >El campo es requerido</span
              >
            </div>
          </div>
          <hr />
          <div class="mb-3 text-end">
            <span class="fs-4"
              >Total a pagar: <b>$ {{ total }}</b></span
            >
          </div>
          <div class="text-center">
            <div class="mb-3">
              <button class="btn btn-primary w-100" type="submit">
                Confirmar pedido
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div v-else class="card">
      <h5 class="card-header">Checkout</h5>
      <div class="card-body">
        <span>Aún no agregaste productos al pedido.</span>
      </div>
    </div>
  </div>
</template>
<script>
import ProductoCarrito from "@/components/ProductoCarritoCmpnt.vue";
import dayjs from "dayjs";
export default {
  components: { ProductoCarrito },
  name: "CheckoutCmpnt",
  props: {
    total: Number,
  },
  data() {
    return {
      envio: true,
      efectivo: true,
      codigo: 0,
      cambio: 0,
      direccion: "",
      numeracion: "",
      piso: "",
      departamento: "",
      barrio: "",
      desactivado: false,
      observaciones: "",
      telefono: "",
      errores: {
        direccion: false,
        numeracion: false,
        barrio: false,
        codigomp: false,
        cambio: false,
        telefono: false,
      },
    };
  },
  methods: {
    async generarPedido() {
      this.resetarErrores();
      let error = !this.validarFormulario();
      if (!error) {
        this.$store.dispatch("cargando/setCargando", { cargando: true });
        let pedido = {
          usuarioId: this.$store.getters["usuario/usuarioId"],
          items: this.$store.getters["carrito/info"],
          valor: this.total,
          envio: this.envio,
          efectivo: this.efectivo,
          codigo: this.codigo,
          cambio: this.cambio,
          direccion: this.direccion,
          numeracion: this.numeracion,
          piso: this.piso,
          departamento: this.departamento,
          barrio: this.barrio,
          observaciones: this.observaciones,
          telefono: this.telefono,
          fecha: dayjs().format("YYYY-MM-DD HH:mm"),
        };
        await this.$store
          .dispatch("carrito/generarPedido", { pedido })
          .finally(() => {
            this.$store.dispatch("cargando/setCargando", { cargando: false });
            let alerta = {
              activa: true,
              titulo: "¡Ya tomamos tu pedido!",
              mensaje: "Ve a compras para ver el resumen de tu pedido.",
            };
            this.$store.dispatch("alerta/setAlerta", { alerta });
            alerta = {
              activa: false,
              titulo: "",
              mensaje: "",
            };
            setTimeout(() => {
              this.$store.dispatch("alerta/setAlerta", { alerta });
            }, 2000);
          });
      }
    },
    validarDireccion() {
      let regex =
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
      let esValido = regex.test(this.direccion);
      this.errores.direccion = !esValido;
    },
    validarNumeracion() {
      let regex = /^[0-9\s]+$/g;
      let esValido = regex.test(this.numeracion);
      this.errores.numeracion = !esValido;
    },
    validarBarrio() {
      let regex =
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
      let esValido = regex.test(this.barrio);
      this.errores.barrio = !esValido;
    },
    validarCambio() {
      if (this.cambio === 0) {
        this.errores.cambio = true;
      } else {
        let regex = /^[0-9\s]+$/g;
        let esValido = regex.test(this.cambio);
        this.errores.cambio = !esValido;
      }
    },
    validarCodigoMP() {
      let regex = /^[0-9\s]{11}/;
      let esValido = regex.test(this.codigo);
      this.errores.codigomp = !esValido;
    },
    validarTelefono() {
      let regex = /^[0-9\s]+$/g;
      let esValido = regex.test(this.telefono);
      this.errores.telefono = !esValido;
    },
    validarFormulario() {
      if (this.envio == true) {
        this.validarDireccion();
        this.validarNumeracion();
        this.validarBarrio();
      }
      if (this.efectivo == true) {
        this.validarCambio();
      } else {
        this.validarCodigoMP();
      }

      this.validarTelefono();

      for (const propiedad in this.errores) {
        if (this.errores[propiedad] == true) {
          return false;
        }
      }

      if (this.$store.getters["carrito/info"].length == 0) {
        return false;
      }
      return true;
    },
    resetarErrores() {
      this.errores = {
        direccion: false,
        numeracion: false,
        barrio: false,
        codigomp: false,
        cambio: false,
        telefono: false,
      };
    },
  },
};
</script>
