class FlieListPlugin {
    constructor({filename}) {
        this.filename = filename
    }
    apply(compiler) {
        // emit
        compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
            let assets = compilation.assets
            let content = `## 文件名    资源大小\r\n`
            Object.entries(assets).forEach(([filename, statObj]) => {
                content += `- ${filename}    ${statObj.size()} bytes\r\n`
            })
            assets[this.filename] = {
                source() {
                    return content
                },
                size() {
                    return content.length
                }
            }
        })
    }
}

module.exports = FlieListPlugin