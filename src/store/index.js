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
        playlist: [],
        currentMusic: {
            url: '',
            name: '',
            subtitle: '',
            author: '',
            musicId: '',
            isLike: null,
            share: ''
        },
        currentMusicIndex: null,
        musicMenuId: null
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
        ADDPLAYLIST(state, music) {
            if (state.musicMenuId !== music.musicMenuId && state.playlist.length !== music.musicList.length) {
                state.musicMenuId = music.musicMenuId
                state.playlist = music.musicList
            }
            state.currentMusicIndex = music.index
        },
        SETCUURENTMUSIC(state, music) {
            state.currentMusic.url = music.url
            state.currentMusic.name = music.name
            state.currentMusic.subtitle = music.subtitle
            state.currentMusic.author = music.author
            state.currentMusic.musicId = music.musicId
            state.currentMusic.isLike = music.isLike
            state.currentMusic.share = music.share
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
        addToMusicList({commit}, payload) {
            commit('ADDPLAYLIST', payload)
        },
        setCurrentMusic({commit}, payload) {
            commit('SETCUURENTMUSIC', payload)
        },
    },
    modules: {},
    getters: {
        currentIndex: state => state.currentMusicIndex,   //当前播放下标
        musicMenuId: state => state.musicMenuId,         //当前歌单
        playLength: state => state.playlist.length,   //歌单长度
        currentMusic: state => state.currentMusic  //当前歌曲
    }
})
