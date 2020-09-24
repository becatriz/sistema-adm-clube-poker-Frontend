import Axios from 'axios';
import config from '@/config';

const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');

export default Axios.create({
  baseURL: config.apiHost,
  headers: {
    'x-access-token': usuarioLogado.token
  }
});
