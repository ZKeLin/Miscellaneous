### Webpack 相关概念
webpack是一个模块打包工具，会将一切资源包括图片，字体，css，js等非代码资源和代码资源都看作是模块，所有的这些模块会存在一些依赖关系，所以webpack会根据入口文件找到相关的依赖，由于文件相互依赖，所以会存在一颗依赖图，然后遍历整个依赖图，进行相关操作，最终打包成你想要的文件。

#### Entry

entry是整个依赖图的入口，入口文件表明webpack应该将那个模块作为起点进行构建依赖图。
```javascript
//单入口文件
module.exports = {
  entry: './src/index.js'
}
//多个入口文件,entry是一个对象
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  }
}
```

#### Output

output是webpack的输出，用来告诉webpack如何将编译后的文件输出到磁盘。可以用来指定输出的目录，文件名，以及文件名的使用什么样的格式等等。output不像entry一样会有多个入口，output只有一个出口，对于多入口文件它是通过占位来输出不同的文件。

```javascript
//单入口
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  }
}
//多入口
module.exports = {
  entry: {
    app: './src/app.js',
    admin: './src/admin.js'
  },
  output: {
    filename: '[name].js', //[name]: 就是一个占位符
    path: __dirname + '/dist'
  }
}
```

#### Loaders

webpack开箱即用只支持js和json两种文件类型，通过loaders去支持其他的文件类型并且把他们转化为有效的模块，并且可以添加到依赖图中。`loaders本身是一个函数，接受源文件作为参数，返回转换的结果`。  

常用的loaders:
| 名称 | 描述 |
| ---- | ---- |
| babel-loader | 转换ES6，ES7等js新特性 |
| css-loader | 支持.css文件的加载和解析 |
| less-loader | 将less文件转换为css |
| ts-loader | 将TS装换成JS |
| file-loader | 进行图片、字体等的打包 |
| raw-loader | 将文件以字符串的形式导入 |
| thread-loader | 多线程打包js和css |

loaders的用法:  

```javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.txt$/, //test用于指定匹配规则
        use: 'raw-loader' //use指定使用的loader名称
      }
    ]
  }

}
```

#### Plugins

plugins的作用是增强webpack的功能，一般用于bundle文件的优化，资源管理和环境变量注入。`作用于整个构建过程`。loader没法干的事情，都可以通过plugins完成。

常见的pligins:

| 名称 | 描述 |
| ---- | ---- |
| CommonsChunkPligin | 将chunks相同的模块代码提取成公共的js |
| CleanWebpackPlugin | 清理构建目录 |
| ExtractTextWebpackPlugin | 将css从bundle文件里提取成一个独立的css文件 |
| CopyWebpackPlugin | 将文件或者文件夹拷贝到构建的输出目录 |
| HtmlWebpackPlugin | 创建html文件区承载输出的bundle |
| UglifyjsWebpackPlugin | 压缩js |
| ZipWebpackPlugin | 将打包的资源生成一个zip包 |

Plugin的使用：

```javascript
module.exports = {
  ...,
  plugins: [ //多个plugin都放在plugins数组中
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ]
}

```

#### Mode

Mode是用来指定当前的构建环境：production,development还是none，  
设置mode还可以使用webpack内置的函数，默认值为production。（webpack 4.0才有的概念）

设置不同的mode开启的函数；
| 选项 | 描述 |
| ---- | ---- |
| development | 设置`process.env.MODE`的值为`development`，并开启`NamedChunksPlugin`和`NamedModulePlugin`。 |
| production | 设置`process.env.MODE`的值为`production`,开启`FlagDependencyUsagePlugin`,`FlagIncludedChunksPlugin`,`ModuleConcatenaionPlugin`,`NoEmitOnErrorsPlugin`,`OccurrenceOrderPlugin`,`SideEffectsPlugin`和`TerserPlugin`. |
| none | 不开启任何优化 |

