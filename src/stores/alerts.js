
const module = {
    namespaced: true,
    state: {
        message: '',
        color: '',
        showSnackbar: false
    },
    mutations: {
        showSnackbar(state, payload) {
            state.message = payload.msg;
            state.color = payload.color;
            state.showSnackbar = true;
        },
        hideSnackbar(state) {
            state.showSnackbar = false;
        }
    },
    getters: {},
    actions: {
        showSnackbarInfo(context, msg) {
            context.commit('showSnackbar', { color: 'info', msg });
        },
        showSnackbarSuccess(context, msg) {
            context.commit('showSnackbar', { color: 'success', msg });
        },
        showSnackbarWarning(context, msg) {
            context.commit('showSnackbar', { color: 'warning', msg });
        },
        showSnackbarError(context, msg) {
            context.commit('showSnackbar', { color: 'error', msg });
        }
    }

};

export default module;
