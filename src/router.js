import Vue from "vue";
import Router from "vue-router";
import './styles/style.css'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        title: "Clube de Poker Online",
        titleAdmClube: ""
      },
      component: () => import("./views/Home.vue")
    },
    {
      path: "/cliente",
      name: "cliente",
      meta: {
        title: "Clientes",
        titleAdmClube: "Clientes"
      },
      component: () => import("./views/Cliente.vue")
    },
    {
      path: "/usuario",
      name: "usuario",
      meta: {
        title: "Usuários",
        titleAdmClube: "Usuários"
      },
      component: () => import("./views/Usuario.vue")
    },
    //Incluir novas rotas aqui
  ]
});
