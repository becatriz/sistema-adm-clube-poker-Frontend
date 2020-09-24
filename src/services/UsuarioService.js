import Axios from "@/axios";
import config from '@/config';

export default class UsuarioService {

 static async salvar(usuario) {
   
    if (usuario.id) { UsuarioService.atualizar(usuario); } else { UsuarioService.cadastrar(usuario); }
  }
 static async cadastrar(usuario) {
  const usuarioLogado = this.getUsuarioLogado();
  Axios.defaults.headers = {
    'Content-Type': 'application/json',
     Authorization: usuarioLogado.token
  }
  if(usuarioLogado.tipoUsuario != 'ADMINISTRADOR SISTEMA') return
    try {
      const response = await Axios.post(
        `${config.apiHost}/usuario/cadastrarUsuario`,
        usuario
      );
      return response.data;
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        throw {
          message: error.message
        };
      } else {
        throw {
          message: `UsuarioService: erro ao salvar usuário: ${
            error.message
            }`
        };
      }
    }
  }
 static async atualizar(usuario) {
  const usuarioLogado = this.getUsuarioLogado();
  Axios.defaults.headers = {
    'Content-Type': 'application/json',
     Authorization: usuarioLogado.token
  }
    try {
      const response = await Axios.put(
        `${config.apiHost}/usuario/atualizarUsuario`,
        usuario
      );
      return response.data;
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        throw {
          message: error.message
        };
      } else {
        throw {
          message: `UsuarioService: erro ao atualizar usuário: ${
            error.message
            }`
        };
      }
    }
  }

  static async buscarTipoUsuario() {
    
    try {
      const response = await Axios.get(`${config.apiHost}/tipo/usuario`);
      return response.data;
    } catch (error) {
      throw {
        message: `UsuarioService: erro ao buscar todos os tipos de usuários cadastradas: ${
          error.message
        }`
      };
    }
  }

 static async buscarTodos() {
  const usuarioLogado = this.getUsuarioLogado();
  Axios.defaults.headers = {
    'Content-Type': 'application/json',
     Authorization: usuarioLogado.token
  }

  if(usuarioLogado.tipoUsuario != 'ADMINISTRADOR SISTEMA') return
   
    try {
      const response = await Axios.get(`/usuario/listaUsuarios`);
      return response.data;
    } catch (error) { 
      if (error.message == "Request failed with status code 401") {
        throw {
          message: error.message
        };
      } else {
        throw {
          message: `UsuarioService: erro ao buscar usuários cadastrados: ${
            error.message
            }`
        };
      }
    }
  }
  static async remover(id) {
    const usuarioLogado = this.getUsuarioLogado();
    Axios.defaults.headers = {
      'Content-Type': 'application/json',
       Authorization: usuarioLogado.token
    }
    try {
      const response = await Axios.delete(`${config.apiHost}/usuario/deletarUsuario/${id}`);
      return response.data;
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        throw {
          message: error.message
        };
      } else {
        throw {
          message: `UsuarioService: erro ao remover usuário: ${
            error.message
            }`
        };
      }
    }
  }
  static async logar(usuario) {
    try {
      const response = await Axios.post(`${config.apiHost}/usuario/login`, usuario);
      return response.data;
    } catch (error) {
      throw {
        message: `UsuarioService: erro ao autenticar usuário: ${error.message}`,
        errorMessage: error.response.data.errorMessage
      };
    }
  }
  static getUsuarioLogado() {
    const logado  = JSON.parse(localStorage.getItem('usuarioLogado') || '');
    return logado || {token: ''};
  }
}
