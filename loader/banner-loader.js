let loaderUtils = require('loader-utils')
let validateOptions = require('schema-utils')
let fs = require('fs')

function loader(source) {
    this.cacheable && this.cacheable()
    let options = loaderUtils.getOptions(this)
    let callBack = this.async()
    let schema = {
        type: 'object',
        properties: {
            text: {
                type: 'string'
            },
            filename: {
                type: 'string'
            }
        }
    }
    validateOptions(schema, options, 'banner-loader')
    if (options.filename) {
        this.addDependency(options.filename) // 加入模块依赖关系 便于webpack watch
        fs.readFile(options.filename, 'utf8', function (err, data) {
            callBack(err, `/**${data}*/${source}`)
        })
    } else {
        callBack(null, `/**${options.text}*/${source}`)
    }
}

module.exports = loader