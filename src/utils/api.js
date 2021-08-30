import http from '../utils/http'
//
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/testIp/request/"
let home = "/homepage/block/page"

// get请求
export function getmusic(params){
    return http.get(`${home}`,params)
}
