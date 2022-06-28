import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        userId: '',
        userInfo: {
            headUrl: '',
            nickname: ''
        },
        Playlist: [],
        currentMusic: {
            url: '',
            name: '',
            subtitle: '',
            author: '',
            musicId: '',
            isLike: null,
            share: ''
        },
        currentMusicIndex:0
    },
    mutations: {
        //登录保存当前用户id
        SAVEUSERID(state, userid) {
            state.userId = userid
        },
        //登出删除当前用户id
        DELETEUSERID(state, userid) {
            state.userId = userid
            state.userInfo = {
                headUrl: '',
                nickname: ''
            }
        },
        ADDPLAYLIST(state,music){

        }
    },
    actions: {
        //登录保存当前用户id
        saveUserId({commit}, payload) {
            commit('SAVEUSERID', payload)
        },
        //登出删除当前用户id
        logout({commit}, payload) {
            commit('DELETEUSERID', payload)
        },
        // 添加到歌单
        addToMusicList({commit}, payload){
            commit('ADDPLAYLIST', payload)
        }
    },
    modules: {},
    getters:{

    }
})
