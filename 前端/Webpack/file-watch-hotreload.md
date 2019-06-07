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
  
  1. Webpack Compile 将js编译打包成bundle。
  2. HMR(HotModuleReplacement) Server: 将热更新的文件输出给 HMR runtime
  3. Bundle Server: 提供文件在浏览器的访问的服务
  4. HMR Runtime: 会被注入到浏览器中，更新文件的变化
  5. bundle.js: 构建输出的文件

  如下图:
  <img src='../images/hot-reload.png' alt='图片来自极客时间'>

  启动阶段:
  当WDS第一次启动的时候，webpack进行编译，将一些文件转换然后打包，打包成功以后传输给Bundle Server，Bundle Server会自动开启浏览器(如果开启)访问http://localhost:8080(默认端口)，然后浏览器访问该服务，等待服务器bundle完成以后，会下载bundle.js到客户端，在启动Bundle Server的同时开启websocket服务，也就是HMR Server,通过HMR Server来和浏览器进行信息交互,客户端会与服务端进行一个socket连接，来接受服务端socket发送的信息，通过服务端发送的指定消息来做相应的处理。

  文件变动:
  如果文件变动了(通过webpack watch检测到)，然后重新bundle，WDS检测到wabpack bundle完成，并且文件发生变化，通过web socket发送消息给浏览器，浏览器会重新reload文件到本地，实现实时更新。

  具体的WDS源码如下: (已删除处理异常代码)
  ```javascript
  function startDevServer(config, options) {

    let compiler;

    try {
      compiler = webpack(config); //webpack开始编译文件，生成compiler编译器
    } catch (err) {
      throw err;
    }

    if (options.progress) {
      new webpack.ProgressPlugin({
        profile: argv.profile,
      }).apply(compiler);
    }

    try {
      server = new Server(compiler, options, log); //启动Bundle Server
    } catch (err) {
      throw err;
    }

    if (options.socket) {
      //已省略
    } else {
      findPort(options.port) //如果为指定port,则会使用默认的port,如果默认端口被使用，会寻找当前未使用的端口，并将查询的端口返回出来。
        .then((port) => {
          options.port = port;
          server.listen(options.port, options.host, (err) => {//启动server监听
            if (err) {
              throw err;
            }
          });
        })
        .catch((err) => {
          throw err;
        });
    }
  }

  processOptions(config, argv, (config, options) => {//初始化默认配置，启动服务。
    startDevServer(config, options);
  });

  //Server.js
  //以下代码，在socket建立连接成功以后，会对浏览器发送一下消息，浏览器收到这些消息以后做一下相应的配置
  if (this.hot) {
    this.sockWrite([connection], 'hot');
  }

  if (this.options.liveReload !== false) {
    this.sockWrite([connection], 'liveReload', this.options.liveReload);
  }

  if (this.progress) {
    this.sockWrite([connection], 'progress', this.progress);
  }

  if (this.clientOverlay) {
    this.sockWrite([connection], 'overlay', this.clientOverlay);
  }

  if (this.clientLogLevel) {
    this.sockWrite([connection], 'log-level', this.clientLogLevel);
  }
  ```

  以上是WDS入口文件执行的相关程序，下面看一下Server监听文件变化的源代码和浏览器收到相应消息事件作出的处理:

  ```javascript
  
    //Server Server.js中的_watch方法，通过使用chokidar模块监控文件变化
    const watcher = chokidar.watch(watchPath, watchOptions);  //
    // disabling refreshing on changing the content
    if (this.options.liveReload !== false) {
      watcher.on('change', () => {
        this.sockWrite(this.sockets, 'content-changed'); //如果文件发生变化，则向浏览器发送content-changed消息，然后浏览器
      });
    }
    this.contentBaseWatchers.push(watcher);

    //Client index.js
    //当收到content-changed消息以后，会让浏览器重新reload
    'content-changed': function contentChanged() {
      log.info('[WDS] Content base changed. Reloading...');
      self.location.reload();
    },
    //当接收到hash消息后，会将status.currentHash 设置为服务端发送过来的hash
    hash: function hash(_hash) {
      status.currentHash = _hash;
    },

    //Client reloadApp.js
    if (hot) {
      log.info('[WDS] App hot update...'); // eslint-disable-next-line global-require

      var hotEmitter = require('webpack/hot/emitter');

      hotEmitter.emit('webpackHotUpdate', currentHash); //出发webpackHotUpdate事件，并将当前hash传送过去

      if (typeof self !== 'undefined' && self.window) {
        // broadcast update to window
        self.postMessage("webpackHotUpdate".concat(currentHash), '*');
      }
    } // allow refreshing the page only if liveReload isn't disabled
    else if (liveReload) { //如果是liveReload则执行applyReload方法进行location.reload();
      var rootWindow = self; // use parent window for reload (in case we're in an iframe with no valid src)

      var intervalId = self.setInterval(function () {
        if (rootWindow.location.protocol !== 'about:') {
          // reload immediately if protocol is valid
          applyReload(rootWindow, intervalId);
        } else {
          rootWindow = rootWindow.parent;

          if (rootWindow.parent === rootWindow) {
            // if parent equals current window we've reached the root which would continue forever, so trigger a reload anyways
            applyReload(rootWindow, intervalId);
          }
        }
      });
    }

    function applyReload(rootWindow, intervalId) {
      clearInterval(intervalId);
      log.info('[WDS] App updated. Reloading...');
      rootWindow.location.reload();
    }

    //webpack/hot/dev-server.js
    if (module.hot) {
      var lastHash;
      var upToDate = function upToDate() {//判断服务器发送过来的最后hash是否在全局变量__webpack_hash__数组中。
        return lastHash.indexOf(__webpack_hash__) >= 0;
      };
      var log = require("./log");
      var check = function check() {
        module.hot
          .check(true)
          .then(function(updatedModules) {
            if (!updatedModules) {
              window.location.reload();
              return;
            }

            if (!upToDate()) {
              check();
            }

            require("./log-apply-result")(updatedModules, updatedModules);

            if (upToDate()) {
              log("info", "[HMR] App is up to date.");
            }
          })
          .catch(function(err) {
            var status = module.hot.status();
            if (["abort", "fail"].indexOf(status) >= 0) {
              window.location.reload();
            } else {
              log("warning", "[HMR] Update failed: " + (err.stack || err.message));
            }
          });
      };
      var hotEmitter = require("./emitter");
      hotEmitter.on("webpackHotUpdate", function(currentHash) {//收到webpackHotUpdate事件以后执行check()方法。
        lastHash = currentHash;
        if (!upToDate() && module.hot.status() === "idle") {
          log("info", "[HMR] Checking for updates on the server...");
          check();
        }
      });
    } else {
      throw new Error("[HMR] Hot Module Replacement is disabled.");
    }

  ```





