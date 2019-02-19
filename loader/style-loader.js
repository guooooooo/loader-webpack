let loaderUtils = require('loader-utils')
function loader(source) {
    // let str = `
    //     let style = document.createElement('style')
    //     style.innerHTML = ${JSON.stringify(source)}  
    //     document.body.appendChild(style)  
    // `
    // return str
}

loader.pitch = function (remainingRequest) {
    // remainingRequest
    // /Volumes/MacDataDisk/workspace/loader-webpack/loader/css-loader.js!/Volumes/MacDataDisk/workspace/loader-webpack/loader/less-loader.js!/Volumes/MacDataDisk/workspace/loader-webpack/src/index.less
    
    // 让style-loader去处理css-loader!less-loader!./index.less
    // require路径返回的就是css-loader处理好的结果 require('!!css-loader!less-loader!./index.less')
    let str = `
        let style = document.createElement('style')      
        style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)})  
        document.body.appendChild(style)  
    `
    return str
}

module.exports = loader