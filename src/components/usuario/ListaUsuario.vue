<template>
  <v-data-table :headers="headers" :items="usuarios" class="elevation-5 ">
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
      <v-row justify="center">
        <v-dialog   :overlay-opacity="opacity" :retain-focus="false" v-model="dialog" max-width="290">
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
      </v-row>
    </template>
  </v-data-table>
</template>
<script>
import Vue from "vue";
import UsuarioService from "../../services/UsuarioService";
import Usuario from "../../models/Usuario";

export default Vue.extend({
  data() {
    return {
      usuarios: [],
      dialog: false,
      buscando: true,
      itemExluir: "",
      opacity: 0.1,
      headers: [
        { text: "Login", value: "login"},
        { text: "Id Cliente", value: "cliente.id" },
        { text: "Tipo Usuário", value: "usuario.tipo" },
        { text: "Ações", value: "actions", sortable: false }
      ]
    };
  },
  methods: {
    async atualizarLista() {
      try {
        this.usuarios = await UsuarioService.buscarTodos();
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
            "Erro ao buscar usuários"
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
        await UsuarioService.remover(this.itemExluir.id);
        this.atualizarLista();
        this.$store.dispatch("alerts/showSnackbarSuccess", "Usuario removido");
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
            "Erro ao remover usuário"
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
