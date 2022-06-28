import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let loginurl = "/login/"
let home = "/homepage/block/page"
let user = '/user/'
let personalized = '/personalized/'

// get请求
export function getmusic(params) {
    return http.get(`${home}`, params)
}

export function getcountries(params) {
    return http.get(`/countries/code/list`, params)
}

// 定义登录函数
export function login(url, params) {
    return http.get(`${loginurl}${url}`, params)
}

//获取用户详情
export function getUserInfo(url, params) {
    return http.get(`${user}${url}`, params)
}


//personalized 推荐歌单
//获取用户详情
export function getPersonalized(params) {
    return http.get(`${personalized}`, params)
}

//获取歌单详情
export function playlistDetail(params) {
    return http.get(`/playlist/detail`, {id: params})
}

//获取歌曲详情
export function songDetail(params) {
    return http.get(`/song/detail`, {ids: params})
}


//获取歌单音乐
export function playlistTrackAll(params) {
    return http.get(`/playlist/track/all`, {id: params})
}


//获取音乐 url
export function playcount(params) {
    return http.get(`/song/url`, params)
}
