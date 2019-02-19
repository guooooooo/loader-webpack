
class AsyncPlugin {
    apply(compiler){
        compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
            setTimeout(() => {
                console.log('文件发射')
                cb()
            }, 1000);
        })
    }
}

module.exports = AsyncPlugin