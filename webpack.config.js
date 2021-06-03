const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use:{
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ],
    },
    plugins:[ new HtmlWebpackPlugin({
        template: "./src/index.html"
    }) ],
    resolve: {
        extensions: [ '.ts', '.js']
    },
    devtool: false
}