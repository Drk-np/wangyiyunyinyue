import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        userId: ''
    },
    mutations: {
        saveUserId(state, userid) {
            state.userId = userid
        }

    },
    actions: {
        saveUserId({commit}, payload) {
            commit('saveUserId', payload)
        },
    },
    modules: {}
})
