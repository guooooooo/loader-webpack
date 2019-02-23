let HtmlWebpackPlugin = require('html-webpack-plugin')

// 把外联的标签换成内联的
class InlineSourcePlugin {
    constructor({match}) {
        this.reg = match
    }
    processTag(tag, compilation) {
        let newTag, url
        if (tag.tagName === 'link' && this.reg.test(tag.attributes.href)) {
            newTag = {
                tagName: 'style'
            }
            url = tag.attributes.href
        }
        if (tag.tagName === 'script' && this.reg.test(tag.attributes.src)) {
            newTag = {
                tagName: 'script'
            }
            url = tag.attributes.src
        }
        if (url) {
            newTag.innerHTML = compilation.assets[url].source()
            delete compilation.assets[url] // 删除掉原本应该生成的文件
            return newTag
        }
        return tag
    }
    // 处理引入标签的数据
    processTags(data, compilation) {
        let headTags = []
        let bodyTags = []
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilation))
        })
        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compilation))
        })
        return {...data, headTags, bodyTags}
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('InlineSourcePlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('alterPlugin', (data, cb) => {
                data = this.processTags(data, compilation)
                cb(null, data)
            })
        })
    }
}

module.exports = InlineSourcePlugin