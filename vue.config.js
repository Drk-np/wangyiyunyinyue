const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    devServer: {
        overlay: { // 让浏览器 overlay 同时显示警告和错误
            warnings: true,
            errors: true
        },
        host: "0.0.0.0",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        hotOnly: true, // 热更新
        // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
        proxy: { //配置多个跨域
            "/api": {
                target: "http://8.141.170.231:8001",
                changeOrigin: true,
                // ws: true,//websocket支持
                secure: false,
                pathRewrite: {
                    "^/api": ""
                }
            },
            // "/api2": {
            //     target: "http://8.141.170.231:8001",
            //     changeOrigin: true,
            //     //ws: true,//websocket支持
            //     secure: false,
            //     pathRewrite: {
            //         "^/api2": "/"
            //     }
            // },
        }

    },

    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src"),
                "@components/": resolve("src/components"),
                "@router/": resolve("src/router"),
                "@store/": resolve("src/store"),
                "@utils/": resolve("src/utils"),
            }
        }
    },

}
