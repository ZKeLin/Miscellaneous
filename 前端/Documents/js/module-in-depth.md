## 重新认识JavaScript Module

在早期，javascript程序很小，在一个文件中就能满足想要的需求，大多数只作为基本的脚本任务，并不像现在一样用来满足复杂的业务逻辑和交互逻辑，所以javascript在设计之初并没有提供完善的模块系统，
后面随着对js的大量使用，逐渐出现了一些将js按需导入的单独的模块机制，比如CommonJS(Node)和基于AMD其他模块系统(RequireJS),再就是现在已经标准化的ES6模块系统。

### AMD模块系统

AMD全称是Asynchronous Module Definition(异步模块定义)，AMD api定义了一种异步加载模块以及依赖项的方式。在浏览器环境下，相对于同步加载，在性能，调试，可用性以及跨域等方面比较有优势。 

AMD api相关:  
#### define() 函数
   ```javascript
     define(id?, dependencies?, factory)
   ```
* id: 第一个参数id, string类型，用来指明当前定义模块的唯一标示。
* dependencies: 要依赖的依赖项，一个以模块id组成的数组类型，默认为 ["require", "exports", "moduleId"]。
* factory: 执行以实例化模块或对象的函数。 如果工厂是一个函数，则只能执行一次。 如果factory参数是一个对象，则应将该对象分配为模块的导出值。

##### example

建立一个id为alpha的模块，并且依赖["require", "exports", "beta"]三项，并且导出一个名为verb的函数
```javascript
define("alpha", ["require", "exports", "beta"], function (require, exports, beta) {
   exports.verb = function() {
       return beta.verb();
       //Or:
       //return require("beta").verb();
   }
});
```   

使用上面导出的`alpha`模块

```javascript
define(['alpha'], function (alpha) { 
  return alpha.verb() + 2; // 使用alpha导出的verb函数
});
```

定义一个无依赖的模块

```javascript
define({
  add: function(a, b) {
    return a + b;
  } 
});
```

使用简化的CommonJS包装定义的模块：

```javascript
define(function (require, exports, moduleId) {
    var a = require('a'),b = require('b');
    exports.action = function () {};
});
```

#### CMD模块


### CommonJS模块系统

