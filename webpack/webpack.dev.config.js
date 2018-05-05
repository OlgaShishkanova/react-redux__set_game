let webpack = require('webpack');
let path = require('path');

let parentDir = path.join(__dirname, '../');
let src = path.join(__dirname, '../src');

module.exports = {
    entry: [
        path.join(src, 'index.js')
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },{
            test: /\.less$/,
            loaders: ["style-loader", "css-loder", "less-loader"]
        }
        ]
    },
    watch:true,
    mode: 'development',
    output: {
        path: parentDir + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: parentDir,
        compress: true,
        port: 8080
    }
}