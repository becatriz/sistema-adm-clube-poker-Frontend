<template>
  <v-app-bar app color="grey darken-3" class="elevation-0 px-5 py-2">
    <v-toolbar-title v-show="adm == false" class="headline">{{$route.meta.titleAdmClube}}</v-toolbar-title>
    <v-toolbar-title v-show="adm" class="headline">{{$route.meta.title}}</v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu offset-y>
      <template v-slot:activator="{on}">
        <v-avatar color="white" class="ml-3" size="40" v-on="on">
          <v-icon>mdi-account</v-icon>
        </v-avatar>
      </template>
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{usuarioLogado.login}}</v-list-item-title>
              <v-list-item-subtitle class="gray--text">{{usuarioLogado.tipoUsuario}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-power</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.v-avatar {
  border: 1px solid black;
  cursor: pointer;
}
.headline {
  color: white;
}
.pageFooter {
  top: 200;
}
</style>

<script>
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      logado: "",
      adm: "",
      tituloPagina: "",
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("usuarios/logout");
    },
  },
  computed: {
    usuarioLogado() {
      this.$route.meta.titleAdmClube = this.logado.clube
      return this.$store.state.usuarios.usuarioLogado;
    },
  },
  mounted() {
    this.logado = this.$store.state.usuarios.usuarioLogado;

    if (this.logado.tipoUsuario == "ADMINISTRADOR SISTEMA") {
      this.adm = true;
    } else {
      this.$route.meta.titleAdmClube = this.logado.clube
      this.adm = false;
    }
  },
});
</script>
