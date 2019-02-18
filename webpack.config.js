let path = require('path')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'loader')]
        // alias: {
        //     loader1: path.resolve(__dirname, 'loader', 'loader1.js')
        // }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
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
    }
}