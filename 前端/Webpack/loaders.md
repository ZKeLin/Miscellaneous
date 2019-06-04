### Webpack Loader

常见loaders的使用:

#### 解析ES6，react的jsx语法 babel-loader

`babel-loader` 使用了了babel的相关特性，所以可以通过配置babel的配置`.babelrc`来进行相关的操作。  
如下面解析ES6的语法要用到`@babel/preset-env`

```bash
#通过安装babel的相关模块来支持babel-loader
npm i @babel/core @babel/preset-env babel-loader -D
```

```json
//.babelrc文件
{
  "presents":[
    "@babel/preset-env", //用来解析ES6相关语法
    "@babel/preset-react" //用来解析react的相关语法
  ],
  "plugins": [

  ]
}
```
相关webpack.config.js的编写如下:
```javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}
```

#### 解析css,less,sass等 css-loader,less-loader,style-loader

`less-loader` 用于将less语法转换成css语法，sass-loader和less-loader类似。
`css-loader`用于加载.css文件，并将其转换成commonjs对象。  
`style-loader` 将样式通过 \<style> 标签嵌入到head中。

```bash
#安装模块
npm i css-loader style-loader less less-loader -D
# less-loader依赖less
```

配置webpack配置文件
```javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
```

注意: loader的调用是链式调用，这里的调用是先调用`less-loader`将less转换成css，然后在调用`css-loader`将结果在传递给`style-loader`,所以它的执行顺序是在这里是从下往上调用的顺序(从右往左)

#### 解析图片，字体资源

`file-loader` 用于处理一些文件  

解析图片

```javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
```

解析字体

```javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}
```

除了上面的这个file-loader来处理图片和字体以外，还可以使用url-loader来处理，并且可以设置较小资源自动base64

```javascript
module.exports = {
  ...,
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { //options相当于给url-loader进行传递参数
              limit: 10240,//如果文件小于10k则给自动base64
            }
          }
        ]
      }
    ]
  }
}
```
