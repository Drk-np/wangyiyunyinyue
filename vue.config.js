const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
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
