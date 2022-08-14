import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate" //持久化vuex
import {getUserInfo} from "@/utils/api";
import {use} from "element-ui";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        userInfo: {
            userId: '',
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
            share: '',
            picUrl: ''
        },
        currentMusicIndex: null,
        musicMenuId: null,
        menueListL: []
    },
    mutations: {
        //登录保存当前用户信息
        SAVEUSERID(state, userInfo) {
            state.userInfo.userId = userInfo.id
            state.userInfo.headUrl = userInfo.headUrl ? userInfo.headUrl : ''
            state.userInfo.nickname = userInfo.nickname ? userInfo.nickname : ''
        },
        //登出删除当前用户id
        DELETEUSERID(state, userid) {
            state.userInfo = {
                userId: '',
                headUrl: '',
                nickname: ''
            }
        },
        ADDPLAYLIST(state, music) {
            if (state.musicMenuId !== music.musicMenuId && state.playlist.length !== music.musicList.length) {
                state.musicMenuId = music.musicMenuId
                state.playlist = music.musicList
            }
            state.currentMusicIndex = Number(music.index)
        },
        SETCUURENTMUSIC(state, music) {
            state.currentMusic.url = music.url
            state.currentMusic.name = music.name
            state.currentMusic.subtitle = music.subtitle
            state.currentMusic.author = music.author
            state.currentMusic.musicId = music.musicId
            state.currentMusic.isLike = music.isLike
            state.currentMusic.share = music.share
            state.currentMusic.picUrl = music.picUrl
        },
        UPDATAMUSICINDEX(state, index) {
            state.currentMusicIndex = Number(index)
        },
        SAVEMENUELIST(state, index) {
            state.menueListL = index
        },
    },
    actions: {
        //登录保存当前用户id
        saveUserId({commit, dispatch}, payload) {
            commit('SAVEUSERID', payload)
            dispatch('getPlayList')
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
        upDateMusicIndex({commit, state}, payload) {
            commit('UPDATAMUSICINDEX', payload)
            commit('SETCUURENTMUSIC', state.playlist[state.currentMusicIndex])
        },
        async getPlayList({commit, state}, payload) {
            let res = await getUserInfo('playlist', {uid: state.userInfo.userId})
            commit('SAVEMENUELIST', res.playlist)
        }
    },
    modules: {},
    getters: {
        currentIndex: state => state.currentMusicIndex,   //当前播放下标
        musicMenuId: state => state.musicMenuId,         //当前歌单
        playLength: state => state.playlist.length,   //歌单长度
        currentMusic: state => state.currentMusic,  //当前歌曲
        playlist: state => state.playlist,  //当前歌曲列表
        menueList: state => state.menueListL,  //当前歌曲列表
        userInfo: state => state.userInfo //当前登录人信息
    }

})
