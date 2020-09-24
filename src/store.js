import Vue from 'vue';
import Vuex from 'vuex';
import alerts from './stores/alerts';
import usuarios from './stores/usuarios';

Vue.use(Vuex); // $store

export default new Vuex.Store({
    modules: {
        alerts,
        usuarios
    }
});
