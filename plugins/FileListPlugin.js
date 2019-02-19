class FlieListPlugin {
    apply(compiler) {
        // emit
        compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, cb) => {
            console.log(compilation)
        })
    }
}

module.exports = FlieListPlugin