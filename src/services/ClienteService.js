import Axios from "axios";
import config from '@/config';

export default class ClienteService {
  static async salvar(cliente) {
    if (cliente.id) {
      ClienteService.atualizar(cliente);
    } else {
      ClienteService.cadastrar(cliente);
    }
  }
  static async cadastrar(cliente) {
    const usuarioLogado = this.getUsuarioLogado();
    Axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: usuarioLogado.token
    }

    if(usuarioLogado.tipoUsuario != 'ADMINISTRADOR SISTEMA') return
    try {
      const response = await Axios.post(
        `${config.apiHost}/cliente/cadastrarCliente`,
        cliente
      );
      return response.data;
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        throw {
          message: error.message
        };
      } else {
        throw {
          message: `ClienteService: erro ao salvar cliente: ${
            error.message
            }`
        };
      }
    }
  }
  static async atualizar(cliente) {
    const usuarioLogado = this.getUsuarioLogado();
    Axios.defaults.headers = {
      'Content-Type': 'application/json',
      Authorization: usuarioLogado.token
    }
    try {
      const response = await Axios.put(
        `${config.apiHost}/cliente/atualizarCliente`,
        cliente
      );
      return response.data;
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        throw {
          message: error.message
        };
      } else {
        throw {
          message: `ClienteService: erro ao atualizar cliente: ${
            error.message
            }`
        };
      }
    }
  }

  static async buscarPlatafoma() {
    try {
      const response = await Axios.get(`${config.apiHost}/plataforma/listaPlataformas`);
      return response.data;
    } catch (error) {
      throw {
        message: `Plataforma: erro ao buscar todos os plataformas cadastradas: ${
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
      const response = await Axios.get(`${config.apiHost}/cliente/listaClientes`);
      return response.data;
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        throw {
          message: error.message
        };
      } else {
        throw {
          message: `ClienteService: erro ao buscar todos os clientes cadastrados: ${
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
      const response = await Axios.delete(`${config.apiHost}/cliente/deletarCliente/${id}`);
      return response.data;
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        throw {
          message: error.message
        };
      } else {
        throw {
          message: `ClienteService: Erro ao remover cliente: ${
            error.message
            }`
        };
      }
    }
  }
  static getUsuarioLogado() {
    const logado = JSON.parse(localStorage.getItem('usuarioLogado') || '');
    return logado || { token: '' };
  }
}


