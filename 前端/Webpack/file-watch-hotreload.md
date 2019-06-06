### Webpack 监听文件和热加载

#### 自动监听文件构建

* 第一种方式: 通过在`package.json`中`script`添加`webpack --watch`

  ```json
  {
    ...,
    "script": {
      "build": "webpack",
      "watch": "webpack --watch", 
    },
    ...
  }
  ```

  运行`npm run watch` 就可以监听文件的变化进行实时bundle。

* 第二种方式: 通过配置config文件

  文件监听的原理:  

  webpack会轮询的判断文件的最后编辑时间是否发生变化  
  如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等待aggregateTimeout的时间再去执行，防止在这个时间内又有新的文件发生变化，导致发生多次没有必要的bundle。

  webpack.config.js配置如下:
  ```javascript
  module.export = {
    watch: true, //默认为false，不开启
    watchOptions: { //配置其他的选项
      ignored: /node_modules/, //默认为空，不监听的文件或者文件夹，支持正则
      aggregateTimeout: 300, //监听到变化发生后会等待300ms再去执行，默认是300
      poll: 1000 //判断文件是否发生变化是通过不断的访问系统指定文件有没有变化来实现的，这里配置的意思是每秒访问1000次
    }
  }
  ```

#### 热更新,让浏览器自动刷新

  通过使用`webpack-dev-server`(简称WDS)来实现热更新操作
  WDS不会刷新浏览器，不输出到文件而是放在内存中。通过配合`HotModuleReplacementPlugin`(webpack内置插件)插件使用。

  ```json
  //package.json
  {
    ...,
    "script": {
      "dev": "webpack-dev-server --open", // --open 构建完成打开浏览器
    },
    ...
  }
  ```
  ```javascript
  //webpack.config.js
  const webpack = require('webpack');

  module.exports = {
    ...,
    mode: 'development',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
      contentBase: './dist', //指定WDS服务的基础目录
      hot: true, //开启热更新
    }
  }
  ```

  也可以自定义热更新服务，而不是用WDS,借助`express`或者`koa`和`webpack-dev-middleware`中间件来实现,代码如下: 

  ```javascript
  const express = require('express');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');

  const app = express();

  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler,{
    publicPath: config.output.publicPath
  }));

  app.listen(3000,function(){
    console.log('app listening on port 3000');
  });
  ```
  适用于更灵活的定制场景



  ##### 热更新基本原理:
  



