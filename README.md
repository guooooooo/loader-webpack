## webpack 学习以及常用loader plugin实现

### loader的寻找方式
- use中使用绝对路径
```js
module: {
    rules: [
        {
            test: /\.js$/,
            use: path.resolve(__dirname, 'loader', 'loader1.js')
        }
    ]
}
```
- resolveLoader中的别名
```js
resolveLoader: {
    alias: {
        loader1: path.resolve(__dirname, 'loader', 'loader1.js')
    }
},
module: {
    rules: [
        {
            test: /\.js$/,
            use: 'loader1'
        }
    ]
}
```
- resolveLoader中自定义loader的寻找路径
```js
resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loader')]
},
module: {
    rules: [
        {
            test: /\.js$/,
            use: 'loader1'
        }
    ]
}
```
### loader的加载顺序
loader执行顺序: 从右向左，从下向上

loader分类: pre 在前面执行  post 在后面执行  normal 正常

加载顺序: pre => normal => inline => post

可以配置loader的加载顺序
```js
module: {
    rules: [
        {
            test: /\.js$/,
            use: {
                loader: 'loader1'
            },
            enforce: 'pre'
        },
        {
            test: /\.js$/,
            use: {
                loader: 'loader2'
            }
        },
        {
            test: /\.js$/,
            use: {
                loader: 'loader3'
            },
            enforce: 'post'
        }
    ]
}
```

inline 方式
```js
let str = requrie('inline-loader!./a.js')
// pre => normal => inline => post
let str = requrie('-!inline-loader!./a.js')
// inline => post
let str = requrie('!inline-loader!./a.js')
// pre => inline => post
let str = requrie('!!inline-loader!./a.js')
// inline
```

### pitch方法
每个loader模块都支持一个.pitch属性，上面的方法会优先于loader的实际方法执行
```js
module: {
    rules: [
        {
            test: /\.js$/,
            use: ['loader3', 'loader2', 'loader1']
        }
    ]
}
```
```js
|- loader3 `pitch`
  |- loader2 `pitch`
    |- loader1 `pitch`
      |- requested module is picked up as a dependency
    |- loader1 normal execution
  |- loader2 normal execution
|- loader3 normal execution
```

在pitch中返回值除了跳过余下loader外，不仅会使`.addDependency()`不触发（不将该模块资源添加进依赖），而且无法读取模块的文件内容。

loader会将pitch返回的值作为“文件内容”来处理，并返回给webpack。
