<template>
  <v-form>
    <v-container fluid>
      <v-layout align-center justify-center row fill-height>
        <v-flex xs10 sm8 md6 lg4>
          <v-card class="form-login pa-4">
            <v-card-title>Login</v-card-title>
            <v-card-text>
              <v-text-field
                name="login"
                label="Usuário"
                v-model="usuario.login"
                :error-messages="errors.collect('login')"
              ></v-text-field>
              <v-text-field
                name="senha"
                type="password"
                label="Senha"
                v-model="usuario.senha"
                :error-messages="errors.collect('senha')"
                @keyup.enter="login"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn block rounded color="primary" :loading="logando" @click="login">Entrar</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import Vue from "vue";
import Usuario from "../../models/Usuario";
import UsuarioService from "../../services/UsuarioService";

export default Vue.extend({
  data() {
    return {
      usuario: new Usuario(),
      logando: false
    };
  },
  methods: {
    async login() {
      if (!(await this.$validator.validate())) {
        return;
      }
      try {
        this.logando = true;
        const logado = await UsuarioService.logar(this.usuario);
        this.$router.push("/");
        this.$store.dispatch("usuarios/setUsuarioLogado", logado);
      } catch (error) {
        if (error.errorMessage) {
          this.$store.dispatch("alerts/showSnackbarError", error.errorMessage);
        } else {
          this.$store.dispatch(
            "alerts/showSnackbarError",
            "Login ou senha inválidos "
          );
        }
      } finally {
        this.logando = false;
      }
    }
  }
});
</script>
<style scoped>
.form-login {
  margin-top: 200px;
  border-radius: 20px;
}
</style>

