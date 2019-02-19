let path = require('path')
let DonePlugin = require('./plugins/DonePlugin')
let AsyncPlugin = require('./plugins/AsyncPlugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let FileListPlugin = require('./plugins/FileListPlugin')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // resolveLoader: {
    //     modules: ['node_modules', path.resolve(__dirname, 'loader')]
    //     // alias: {
    //     //     loader1: path.resolve(__dirname, 'loader', 'loader1.js')
    //     // }
    // },
    devtool: 'source-map',
    // watch: true,
    // module: {
    //     rules: [
    //         {
    //             test: /\.less$/,
    //             use: ['style-loader', 'css-loader', 'less-loader']
    //         },
    //         {
    //             test: /\.jpg$/,
    //             use: {
    //                 // loader: 'file-loader'
    //                 loader: 'url-loader',
    //                 options: {
    //                     limit: 20*1024
    //                 }
    //             }
    //         },
    //         {
    //             test: /\.js$/,
    //             use: {
    //                 loader: 'banner-loader',
    //                 options: {
    //                     text: 'guo',
    //                     filename: path.resolve(__dirname, './src/banner.js')
    //                 }
    //             }
    //             // use: {
    //             //     loader: 'babel-loader',
    //             //     options: {
    //             //         presets: [
    //             //             '@babel/preset-env'
    //             //         ]
    //             //     }
    //             // }
    //         }
    //     ]
        // rules: [
        //     {
        //         test: /\.js$/,
        //         use: {
        //             loader: 'loader1'
        //         },
        //         enforce: 'pre'
        //     },
        //     {
        //         test: /\.js$/,
        //         use: {
        //             loader: 'loader2'
        //         }
        //     },
        //     {
        //         test: /\.js$/,
        //         use: {
        //             loader: 'loader3'
        //         },
        //         enforce: 'post'
        //     }
        // ]
    // }
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new DonePlugin(),
        new AsyncPlugin(),
        new FileListPlugin({
            filename: 'list.md'
        })
    ]
}