<template>
  <v-data-table  :headers="headers" :items="clientes" class="elevation-4">
    <template v-slot:item.actions="{ item }">
      <v-btn icon small color="blue" @click="editar(item)">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon small @click="exibeModal(item)" color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn icon small @click="visualizar(item)" color="green">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <v-dialog :overlay-opacity="opacity" :retain-focus="false" v-model="dialog" max-width="290">
        <v-card>
          <v-card-title >Remover</v-card-title>
          <v-card-text>Tem Certeza que deseja excluir este item?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="red darken-1" text @click="remover()">Remover</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-data-table>
</template>
<script>
import Vue from "vue";
import ClienteService from "../../services/ClienteService";
import Cliente from "../../models/Cliente";

export default Vue.extend({
  data() {
    return {
      clientes: new Array(),
      buscando: true,
      dialog: false,
      itemExluir: "",
      opacity: 0.1,
      headers: [
        { text: "Clube", value: "nome_clube" },
        { text: "ID Clube", value: "id_clube" },
        { text: "Responsavél", value: "responsavel" },
        { text: "Email", value: "email" },
        { text: "Celular", value: "celular" },
        { text: "Plataforma", value: "plataforma.nome_aplicativo" },
        { text: "Ações", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    async atualizarLista() {
      try {
        this.clientes = await ClienteService.buscarTodos();
      } catch (error) {
        if (error.message == "Request failed with status code 401") {
          this.$store.dispatch(
            "alerts/showSnackbarError",
            "Sessão expirada. Favor, efetuar login novamente"
          );
          setTimeout(() => {
            this.$store.dispatch("usuarios/logout");
          }, 5000);
        } else {
          this.$store.dispatch(
            "alerts/showSnackbarError",
            "Erro ao buscar clientes"
          );
        }
      } finally {
        this.buscando = false;
      }
    },
    editar(item) {
      this.$emit("editar", item);
    },

    visualizar(item){
      this.$emit("visualizar", item);

    },

    exibeModal(item) {
      this.dialog = true;
      this.itemExluir = item;
    },

    async remover() {
      try {
        await ClienteService.remover(this.itemExluir.id);
        this.atualizarLista();
        this.$store.dispatch("alerts/showSnackbarSuccess", "Cliente removido");
        this.dialog = false;
      } catch (error) {
        if (error.message == "Request failed with status code 401") {
          this.$store.dispatch(
            "alerts/showSnackbarError",
            "Sessão expirada. Favor, efetuar login novamente"
          );
          setTimeout(() => {
            this.$store.dispatch("usuarios/logout");
          }, 5000);
        } else {
          this.$store.dispatch(
            "alerts/showSnackbarError",
            "Cliente não pode ser exluido, pois já esta vinculado a um Usuário"
          );
        }
        this.dialog = false;
      } finally {
        this.buscando = false;
      }
    }
  },
  mounted() {
    this.atualizarLista();
  }
});
</script>
<style>
.btnExluir {
  display: inline;
  margin-left: 5%;
}
</style>