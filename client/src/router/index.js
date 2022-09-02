import Vue from "vue";
import VueRouter from "vue-router";

import InicioVista from "@/views/InicioVista.vue";
import PedidosVista from "@/views/PedidosVista.vue";
import ProductosVista from "@/views/ProductosVista.vue";
import AdminView from "@/views/AdminView.vue";

import SignView from "@/views/SignView.vue";
import ErrorView from "@/views/ErrorView.vue";
import ErrorLoginView from "@/views/ErrorLoginView.vue";
import ProductoCrudCmpnt from "@/components/ProductoCrudCmpnt.vue";

Vue.use(VueRouter);

/* eslint-disable */
const routes = [
  {
    path: "/",
    name: "acceso",
    component: SignView,
  },
  {
    path: "/inicio",
    name: "Inicio",
    component: InicioVista,
    beforeEnter: (to, from, next) => {
      let logueado =
        sessionStorage.getItem("logueado") === "true" ? true : false;
      if (logueado) {
        next();
      } else {
        router.push("/error-login");
        next(false);
      }
    },
    children: [
     {
        path: "/inicio/productos",
        name: "Productos",
        component: ProductosVista,
      },
      {
        path: "/inicio/pedidos",
        name: "Pedidos",
        component: PedidosVista,
      },
      {
        path: "/inicio/admin/productos",
        name: "Admin",
        component: AdminView,
        beforeEnter: (to, from, next) => {
          let usuario = JSON.parse(sessionStorage.getItem("usuario"));
          if (usuario.admin) {
            next();
          } else {
            router.push("/");
            next(false);
          }
        },
      },
      {
        path: "/inicio/admin/crud",
        name: "ProductoCrud",
        component: ProductoCrudCmpnt,
        beforeEnter: (to, from, next) => {
          let usuario = JSON.parse(sessionStorage.getItem("usuario"));
          if (usuario.admin) {
            next();
          } else {
            router.push("/");
            next(false);
          }
        },
      },
    ],
  },
  {
    path: "/error-login",
    name: "errorlogin",
    component: ErrorLoginView,
  },
  {
    path: "*",
    name: "error",
    component: ErrorView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
