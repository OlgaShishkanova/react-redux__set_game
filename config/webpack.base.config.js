let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader",
                ],
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!sass-loader",
                })
            },
        ]
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080",
            "/images": "http://localhost:8080"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new ExtractTextPlugin('style.css')
    ]
};