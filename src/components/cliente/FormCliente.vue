<template>
  <v-form>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex x12 sm6>
          <v-text-field
            outlined
            name="nome_clube"
            type="text"
            label="Nome do Clube"
            v-model="cliente.nome_clube"
            v-validate="'required'"
            :error-messages="errors.collect('nome_clube')"
          ></v-text-field>
        </v-flex>
        <v-flex x12 sm6>
          <v-text-field
            outlined
            pattern="[0-9]+$"
            name="id_clube"
            type="number"
            label="ID do Clube"
            v-model="cliente.id_clube"
            v-validate="'required'"
            :error-messages="errors.collect('id_clube')"
          ></v-text-field>
        </v-flex>
        <v-flex x12 sm6>
          <v-text-field
            outlined
            name="responsavel"
            type="text"
            label="Reponsável"
            v-model="cliente.responsavel"
            v-validate="'required'"
            :error-messages="errors.collect('responsavel')"
          ></v-text-field>
        </v-flex>
        <v-flex x12 sm6>
          <v-text-field
            outlined
            name="email"
            type="email"
            label="Email"
            v-model="cliente.email"
            v-validate="'required|email'"
            :error-messages="errors.collect('email')"
          ></v-text-field>
        </v-flex>
        <v-flex x12 sm6>
          <v-text-field
            outlined
            name="celular"
            type="text"
            label="Celular"
            v-validate="'required'"
            v-model="cliente.celular"
           v-mask="'###########'"
            :error-messages="errors.collect('celular')"
          ></v-text-field>
        </v-flex>
        <v-flex x12 sm6>
          <v-select
            outlined
            type="text"
            name="plataforma"
            v-validate="'required'"
            label="Plataforma"
            :items="plataformas"
            v-model="selected"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout justify-end class="px-3">
        <v-btn large rounded text color="error" @click="cancelar">Cancelar</v-btn>
        <v-btn
          large
          raised
          color="primary"
          class="ml-3"
          :loading="salvando"
           v-bind:disabled="visualizar == true"
          @click="salvar"
        >Salvar</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
import Vue from "vue";
import Cliente from "../../models/Cliente";
import ClienteService from "../../services/ClienteService";

export default Vue.extend({
  data() {
    return {
      cliente: new Cliente(),
      salvando: false,
      visualizar: '',
      plataformas: [],
      plataformasBuscadas: [],
      selected: ""
    };
  },
  async mounted() {
    try {
      this.plataformasBuscadas = await ClienteService.buscarPlatafoma();
      for (let i = 0; i < this.plataformasBuscadas.length; i++) {
        this.plataformas.push(this.plataformasBuscadas[i].nome_aplicativo);
      }
    } catch (error) {
      this.$store.dispatch(
        "alerts/showSnackbarError",
        "Erro ao buscar plataformas"
      );
    } finally {
      this.buscando = false;
    }
  },

  methods: {
    getPlataformaSelecionada() {
      this.cliente.plataforma = this.plataformasBuscadas.find(value => {
        return value.nome_aplicativo === this.selected;
      });
    },

    resetForm() {
      //this.cliente = ""
      this.cliente.nome_clube = "";
      this.cliente.id_clube = "";
      this.cliente.responsavel = "";
      this.cliente.email = "";
      this.cliente.celular = "";
      this.selected = "";
    },

  

    async salvar() {
      this.getPlataformaSelecionada();
      if (await this.$validator.validate()) {
        this.salvando = true;
        try {
          const result = await ClienteService.salvar(this.cliente);
          this.$store.dispatch(
            "alerts/showSnackbarSuccess",
            "Salvo com sucesso!"
          );
          this.$emit("salvo");
          this.resetForm();
          this.$validator.reset();
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
              "Erro ao salvar cliente"
            );
          }
        } finally {
          this.salvando = false;
        }
      }
    },
    setCliente(cliente) {
      this.visualizar = false
      this.selected = cliente.plataforma.nome_aplicativo;
      this.cliente = cliente;
    },

    visualizarCliente(cliente) {
      this.visualizar = true
      this.selected = cliente.plataforma.nome_aplicativo;
      this.cliente = cliente;
      
    },

    cancelar() {
      this.visualizar = false
      this.cliente = new Cliente();
      this.resetForm();
      this.$validator.reset();
      this.$emit("cancelou");
    }
  }
});
</script>

