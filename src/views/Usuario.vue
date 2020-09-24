<template>
  <v-container>
    <v-layout row justify-end class="mb-3">
      <v-btn
        fab
        dark
        color="primary"
        v-if="!exibirFormulario"
        @click="exibirFormulario = !exibirFormulario"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn fab dark v-else color="primary" @click="cancelar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-layout>
    <form-usuario
      @salvo="atualizarLista"
      @cancelou="exibirFormulario = false"
      v-show="exibirFormulario"
      ref="form"
    ></form-usuario>
    <lista-usuario @editar="editar" @visualizar="visualizar" v-show="!exibirFormulario" ref="lista"></lista-usuario>
  </v-container>
</template>
<script>
import Vue from "vue";
import FormUsuario from "../components/usuario/FormUsuario.vue";
import ListaUsuario from "../components/usuario/ListaUsuario.vue";

export default Vue.extend({
  components: {
    FormUsuario,
    ListaUsuario
  },
  data() {
    return {
      exibirFormulario: false
    };
  },
  methods: {
    atualizarLista() {
      this.$refs.lista.atualizarLista();
      this.exibirFormulario = false;
    },
    editar(usuario) {
      this.$refs.form.setUsuario(usuario);
      this.exibirFormulario = true;
    },

    visualizar(usuario){
      this.$refs.form.visualizarUsuario(usuario);
      this.exibirFormulario = true
    },

    cancelar() {
      this.$refs.form.cancelar();
    }
  }
});
</script>
