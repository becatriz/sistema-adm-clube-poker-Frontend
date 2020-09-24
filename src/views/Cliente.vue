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
    <form-cliente
      @salvo="atualizarLista"
      @cancelou="exibirFormulario = false"
      v-show="exibirFormulario"
      ref="form"
    ></form-cliente>
    <lista-cliente @editar="editar" @visualizar="visualizar" v-show="!exibirFormulario" ref="lista"></lista-cliente>
  </v-container>
</template>
<script>
import Vue from "vue";
import FormCliente from "../components/cliente/FormCliente.vue";
import ListaCliente from "../components/cliente/ListaCliente.vue";

export default Vue.extend({
  components: {
    FormCliente,
    ListaCliente
  },
  data() {
    return {
      exibirFormulario: false,
      visualiza: false,
    };
  },

  methods: {
    atualizarLista() {
      this.$refs.lista.atualizarLista();
      this.exibirFormulario = false;
      
    },
    editar(cliente) {
      this.$refs.form.setCliente(cliente);
      this.exibirFormulario = true;  
    },
    visualizar(cliente) {
      this.$refs.form.visualizarCliente(cliente);
      this.exibirFormulario = true;  
    },
    cancelar() {
      this.$refs.form.cancelar();
    }
    
  }
});
</script>
