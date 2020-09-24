<template>
  <v-card>
    <v-navigation-drawer app permanent :mini-variant="mini" color="grey darken-3" dark>
      <template v-slot:prepend>
        <v-layout justify-center class="py-3">
          <v-btn icon @click="openMenu" v-show="mini">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
          <v-btn icon @click="closeMenu" v-show="!mini">
            <v-icon>mdi-backburger</v-icon>
          </v-btn>
        </v-layout>
      </template>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item v-show="adm" link to="/usuario">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Usuários</v-list-item-title>
        </v-list-item>
        <v-list-item v-show="adm" link to="/cliente">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/projeto">
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Nova Pagina</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<style scoped>
.v-list-item--active {
  color: white;
}
.v-navigation-drawer {
  border-radius: 0px !important;
}
</style>
<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      mini: true,
      logado: '',
      adm: "",
    };
  },
  methods: {
    openMenu() {
      this.mini = false;
    },
    closeMenu() {
      this.mini = true;
    },
    verificaUsuarioLogado(){
       this.logado  = JSON.parse(localStorage.getItem('usuarioLogado'))
       if(this.logado.tipoUsuario === 'ADMINISTRADOR SISTEMA'){
         this.adm = true
       }
       else{
         this.$router.push('/')
         this.adm = false
       }
    }
  },
  mounted() {
    this.verificaUsuarioLogado();
    window.addEventListener("keydown", event => {
      // Se clicar na tecla "}"
      if (event.keyCode === 221) {
        this.openMenu();
      }
      // Se clicar na tecla "{"
      if (event.keyCode == 219) {
        this.closeMenu();
      }
    });
  }
});
</script>

