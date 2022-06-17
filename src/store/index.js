import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
            commit('saveUserId',payload)
        },
    },
    modules: {}
})
