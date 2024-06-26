const path = require("path")

module.exports = {
    entry: "./dist/src/script.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    devServer: {
        static: "./dist",
    }
}