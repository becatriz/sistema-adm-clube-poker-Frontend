<template>
  <v-form>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex x12 sm6>
          <v-text-field
            outlined
            clearable
            name="login"
            type="text"
            label="Login"
            v-model="usuario.login"
            v-validate="'required'"
            :error-messages="errors.collect('login')"
          ></v-text-field>
        </v-flex>
        <v-flex x12 sm6>
          <v-text-field
            outlined
            clearable
            type="text"
            label="Senha"
            name="senha"
            v-model="usuario.senha"
            v-validate="'required'"
            :error-messages="errors.collect('senha')"
          ></v-text-field>
        </v-flex>
        <v-flex x12 sm6>
          <v-select
            outlined
            clearable
            type="text"
            label="Cliente"
            name="cliente"
            :items="clientes"
            v-model="selectedCliente"
            v-validate="'required'"
            :error-messages="errors.collect('cliente')"
          ></v-select>
        </v-flex>
           <v-flex x12 sm6>
          <v-select
            outlined
            clearable
            type="text"
            label="Tipo Usuário"
            name="tipo_usuario"
            :items="tiposUsuarios"
            v-model="selectedTipoUsuarios"
            v-validate="'required'"
            :error-messages="errors.collect('tipo_usuario')"
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
import Usuario from "../../models/Usuario";
import UsuarioService from "../../services/UsuarioService";
import ClienteService from "../../services/ClienteService";

export default Vue.extend({
  data() {
    return {
      usuario: new Usuario(),
      salvando: false,
      clientesBuscados: [],
      tipoUsuariosBuscados: [],
      tiposUsuarios: [],
      clientes: [],
      selectedCliente: "",
      selectedTipoUsuarios:"",
      visualizar: false,
    };
  },
  async mounted() {
    this.loadClientes();
    this.loadTipoUsuarios();
  },
  methods: {
    getClienteSelecionado() {
      this.usuario.cliente = this.clientesBuscados.find(value => {
        return value.nome_clube === this.selectedCliente;
      });
    },

     getTipoUsuarioSelecionado() {
      this.usuario.usuario = this.tipoUsuariosBuscados.find(value => {
        return value.tipo === this.selectedTipoUsuarios;
      });
        
    },

    resetForm(){
      //this.usuario = ""
      this.usuario.login = "";
      this.usuario.senha = "";
      this.selectedCliente = "";
      this.selectedTipoUsuarios = "";
    
    },

    async salvar() {
      
      this.getClienteSelecionado();
      this.getTipoUsuarioSelecionado();
    
      if (await this.$validator.validate()) {
        this.salvando = true;
        try {
          const result = await UsuarioService.salvar(this.usuario);
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
          }else{
            this.$store.dispatch(
              "alerts/showSnackbarError",
              "Erro ao salvar usuário"
            );
          }
        } finally {
          this.salvando = false;
        }
      }
    },
    setUsuario(usuario) {
      this.visualizar = false
      this.selectedCliente = usuario.cliente.nome_clube;
      this.selectedTipoUsuarios = usuario.tipo_usuario.tipo;
      this.usuario = usuario;

    },
     visualizarUsuario(usuario) {
      this.visualizar = true
      this.selectedCliente = usuario.cliente.nome_clube;
      this.selectedTipoUsuarios = usuario.tipo_usuario.tipo;
      this.usuario = usuario;

    },
    cancelar() {
      this.visualizar = false
      this.usuario = new Usuario();
      this.resetForm();
      this.$validator.reset();
      this.$emit("cancelou");
      
    },
  
    async loadClientes() {
      try {
        this.clientesBuscados = await ClienteService.buscarTodos();
        for (let i = 0; i < this.clientesBuscados.length; i++) {
          this.clientes.push(this.clientesBuscados[i].nome_clube);
        }
      } catch (error) {
        this.$store.dispatch(
          "alerts/showSnackbarError",
          "Erro ao buscar clientes"
        );
        
      } finally {
        this.buscando = false;
      }
    },
    async loadTipoUsuarios() {
      try {
        this.tipoUsuariosBuscados = await UsuarioService.buscarTipoUsuario();
        for (let i = 0; i < this.tipoUsuariosBuscados.length; i++) {
          this.tiposUsuarios.push(this.tipoUsuariosBuscados[i].tipo);
        }
      } catch (error) {
        this.$store.dispatch(
          "alerts/showSnackbarError",
          "Erro ao buscar tipo usuários"
        );
      } finally {
        this.buscando = false;
      }
    }
  }
});
</script>

