// // vue.config.js
const path =  require('path');
const resolve = (dir) => path.join(__dirname, dir);
//
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析，(可选)
//
// const IS_PRODUCTION = ['production', 'prod'].includes(process.env.NODE_ENV);//判断是否是生产环境
// /** 正式配置项，以下参数 都是可选**/
module.exports = {
//     publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/',  // 打包公共路径
//     indexPath: 'index.html' , // 相对于打包路径index.html的路径
//     outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
//     assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
//     lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码，false不需要
//     runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
//     productionSourceMap: !IS_PRODUCTION, // 生产环境的 source map,
//     parallel: require("os").cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
//     pwa: {}, // 向 PWA 插件传递选项。
    chainWebpack: config => {
        config.resolve.symlinks(true); // 修复热更新失效
        // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
        config.plugin("html").tap(args => {
            // 修复 Lazy loading routes Error
            args[0].chunksSortMode = "none";
            return args;
        });
        config.resolve.alias // 添加别名
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@components', resolve('src/components'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'));
//
//         // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
//         if (IS_PRODUCTION) {
//             config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
//                 {
//                     analyzerMode: "static"
//                 }
//             ]);
//         }
    },
//     // //webpack的配置项
//     // configureWebpack: config => {
//     //     // 开启 gzip 压缩
//     //     // 需要 npm i -D compression-webpack-plugin
//     //     const plugins = [];
//     //     if (IS_PRODUCTION) {
//     //         plugins.push(
//     //             new CompressionWebpackPlugin({
//     //                 filename: "[path].gz[query]",
//     //                 algorithm: "gzip",
//     //                 test: productionGzipExtensions,
//     //                 threshold: 10240,
//     //                 minRatio: 0.8
//     //             })
//     //         );
//     //     }
//     //     config.plugins = [...config.plugins, ...plugins];
//     // },
//     css: {
//         extract: IS_PRODUCTION,
//         requireModuleExtension: false,// 去掉文件名中的 .module
//         loaderOptions: {
//                 // 给 less-loader 传递 Less.js 相关选项
//                 less: {
//                     // `globalVars` 定义全局对象，可加入全局变量
//                     globalVars: {
//                         primary: '#333'
//                     }
//                 }
//         }
//     },
    devServer: {
            overlay: { // 让浏览器 overlay 同时显示警告和错误
              warnings: true,
              errors: true
            },
            host: "localhost",
            port: 8080, // 端口号
            https: false, // https:{type:Boolean}
            open: false, //配置后自动启动浏览器
            hotOnly: true, // 热更新
            // proxy: 'http://localhost:8080'   // 配置跨域处理,只有一个代理
            proxy: { //配置多个跨域
                "/api": {
                    target: "http://197.0.0.1:8088",
                    changeOrigin: true,
                    ws: true,//websocket支持
                    secure: false,
                    pathRewrite: {
                        "^/api": "/"
                    }
                },
                "/api2": {
                    target: "http://197.0.0.2:8088",
                    changeOrigin: true,
                    //ws: true,//websocket支持
                    secure: false,
                    pathRewrite: {
                        "^/api2": "/"
                    }
                },
            }
        }
}

