let loaderUtils = require('loader-utils')

function loader(source) {
    // 返回一个文件路径
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {content: source})
    this.emitFile(filename, source)
    // console.log(filename);
    return `module.exports = "${filename}"`
}
loader.raw = true // 二进制 buffer

module.exports = loader