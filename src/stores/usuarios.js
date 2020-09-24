
const module = {
  namespaced: true,
  state: {
    usuarios: new Array(),
    usuarioLogado: undefined
  },
  mutations: {
    mutationUsuarioLogado(state, usuario) {
      state.usuarioLogado = usuario;
    }
  },
  getters: {},
  actions: {
    setUsuarioLogado(context, usuario) {
      localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
      context.commit("mutationUsuarioLogado", usuario);
    },
    getUsuarioLogado(context) {
      const logado = localStorage.getItem('usuarioLogado');
      if (logado) { context.commit('mutationUsuarioLogado', JSON.parse(logado)); }
      return context.state.usuarioLogado;
    },
    logout(context) {
      localStorage.removeItem('usuarioLogado');
      context.commit("mutationUsuarioLogado", undefined);
    }
  }
};

export default module;
