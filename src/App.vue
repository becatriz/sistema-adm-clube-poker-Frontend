<template>
  <v-app>
    <v-app v-if="usuarioLogado">
      <app-drawer></app-drawer>
      <app-bar></app-bar>
      <v-content class="mt-5">
        <router-view />
      </v-content>
    </v-app>
    <v-app v-else class="login-template">
      <form-login></form-login>
    </v-app>
    <v-snackbar :color="color" right vertical :timeout="3000" v-model="snackbar">
      {{ msg }}
      <v-btn color="white"  text @click="snackbar = false">Fechar</v-btn>
    </v-snackbar>
  </v-app>
</template>
<style scoped>
.v-application .login-template {
  background-image: url(https://images.pexels.com/photos/269630/pexels-photo-269630.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940);
  background-repeat: no-repeat;
  background-size: cover;
}

</style>

<script>
import Vue from "vue";
import AppBar from "./components/AppBar.vue";
import AppDrawer from "./components/AppDrawer.vue";
import FormLogin from "./components/usuario/FormLogin.vue";

export default Vue.extend({
  name: "App",
  components: {
    AppBar,
    AppDrawer,
    FormLogin
  },
  mounted() {
    this.$store.dispatch("usuarios/getUsuarioLogado");
  },
  computed: {
    usuarioLogado() {
      return this.$store.state.usuarios.usuarioLogado;
    },
    snackbar: {
      get() {
        return this.$store.state.alerts.showSnackbar;
      },
      set(newValue) {
        this.$store.state.alerts.showSnackbar = newValue;
      }
    },
    msg: {
      get() {
        return this.$store.state.alerts.message;
      },
      set(newValue) {
        this.$store.state.alerts.message = newValue;
      }
    },
    color: {
      get() {
        return this.$store.state.alerts.color;
      },
      set(newValue) {
        this.$store.state.alerts.color = newValue;
      }
    }
  }
});
</script>
