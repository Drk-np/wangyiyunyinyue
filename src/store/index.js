import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userId: ''
    },
    mutations: {
        saveUserId(context, userid) {
            context.state.userId = userid
        }

    },
    actions: {
        saveUserId({commit}, userid) {

        },
    },
    modules: {}
})
