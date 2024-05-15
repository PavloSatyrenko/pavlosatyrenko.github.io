const path = require("path")

module.exports = {
    mode: "development",
    entry: "./dist/src/script.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
}