let babel = require('@babel/core')
let loaderUtils = require('loader-utils')

function loader(source) {  // this  loaderContext
    let callBack = this.async()
    let options = loaderUtils.getOptions(this)    //{ presets: [ '@babel/preset-env' ] }
    babel.transform(source, {
        ...options,
        sourceMap: true,
        // this.resourcePath 当前处理模块的绝对路径 
        // /Volumes/MacDataDisk/workspace/loader-webpack/src/index.js
        // filename: 源码映射文件名
        filename: this.resourcePath.split('/').pop()
    }, function(err, result) {
        callBack(err, result.code, result.map)
    })
    return source
}

module.exports = loader