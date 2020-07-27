## 重新认识JavaScript Module

在早期，javascript程序很小，在一个文件中就能满足想要的需求，大多数只作为基本的脚本任务，并不像现在一样用来满足复杂的业务逻辑和交互逻辑，所以javascript在设计之初并没有提供完善的模块系统，
后面随着对js的大量使用，逐渐出现了一些将js按需导入的单独的模块机制，比如CommonJS(Node)和基于AMD其他模块系统(RequireJS),再就是现在已经标准化的ES6模块系统。

### AMD模块系统

AMD全称是Asynchronous Module Definition(异步模块定义)，AMD定义了一种异步加载模块以及依赖项的方式。在浏览器环境下，相对于同步加载，在性能，调试，可用性以及跨域等方面比较有优势。 

AMD规范 相关接口:
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

#### define.amd 属性

为了清楚表明全局定义函数（脚本src浏览器加载所需）符合AMD API，任何全局定义函数都应具有一个名为“amd”的属性，其值是一个对象。 这有助于避免与可能定义了不符合AMD API的define（）函数的任何其他现有JavaScript代码冲突。

#### RequireJS

[RequireJS](https://requirejs.org/)是AMD规范的一种实现。

##### example

```javascript
//如何为允许在环境中加载模块的一个以上版本的实现定义一个示例：
define.amd = {
  multiversion: true
};

//最简单的定义
define.amd = {};
```

#### CMD模块

CMD全称为Common Module Definition，是Sea.js所推广的一种模块系统，跟AMD语法上很像都可以通过`define`来定义，但是有区别。

##### Module Definition - define

模块通过`define`关键字来定义的，它是一个function。

```javascript
define(factory);
```
1. define函数接受一个参数，the module factory。
2. factory可以是一个函数，也可以是其他可用的值。
3. 如果factory是一个函数，则这个函数接受三个参数。分别是"require", "exports", 和 "module"。
4. 如果factory不是一个函数，则将模块的导出设置为该对象。

##### Sample Code

一个经典的例子  

math.js
```javascript
define(function(require, exports, module) {
  exports.add = function() {
    var sum = 0, i = 0, args = arguments, l = args.length;
    while (i < l) {
      sum += args[i++];
    }
    return sum;
  };
});
```

increment.js
```javascript
define(function(require, exports, module) {
  var add = require('math').add;
  exports.increment = function(val) {
    return add(val, 1);
  };
});
```
program.js
```javascript
define(function(require, exports, module) {
  var inc = require('increment').increment;
  var a = 1;
  inc(a); // 2

  module.id == "program";
});
```

factory不是函数的例子

object-data.js
```javascript
define({
    foo: "bar"
});
```

array-data.js

```javascript
define([
   'foo',
   'bar'
]);
```

string-data.js

```javascript
define('foo bar');
```

##### Sea.js

CMD和Sea.js的关系是：CMD是一种规范，而Sea.js是实现了该规范的模块加载库。

Sea.js的基本操作

这个小游戏有两个模块 spinning.js 和 main.js，遵循统一的写法：
```javascript
// 所有模块都通过 define 来定义
define(function(require, exports, module) {

  // 通过 require 引入依赖
  var $ = require('jquery');
  var Spinning = require('./spinning');

  // 通过 exports 对外提供接口
  exports.doSomething = ...

  // 或者通过 module.exports 提供整个接口
  module.exports = ...

});
```
上面就是 Sea.js 推荐的 CMD 模块书写格式。跟Node.js很像。

### AMD约CMD的主要区别

1. 对于依赖的模块，AMD是提前执行，CMD是延时执行。CMD推崇as lazy as possible。
2. CMD推崇 _依赖就近_ ，AMD推崇 _依赖前置_ 。

```javascript
// AMD推荐写法
define(['./a', './b'], function (a, b) {
  a.doSomething();
  b.doSomething();
});

//CMD推荐写法
define(function (require, exports, module) {
  let a = require('./a');
  a.doSomething();
  
  let b = require('./b');
  b.doSomething();
});
```

### CommonJS模块系统

CommonJS规范为代表的就是node js的模块依赖系统。  
在node中一个文件就是一个模块，有自己的作用域，在这个文件中除了导出的变量其他的变量，函数等等都是私有的，对其他文件是不可见的。其实就是有一个大函数包裹这这个文件里面的内容，该函数有三个参数
```javascript
function (require, exports, module, __filename, __dirname) {
  let a = 5;
  const addX = function(x) {
    return a + x;
  };

  module.exports.addX = addX;
}
```
而对于我们在引用模块和使用的时候 `function (require, exports, module, __filename, __dirname){}` 是不可见的。node在处理该文件的时候默认会给添加该函数，这样我们才可以使用里面的require，exports和module三个变量。  
而exports == module.exports, 是为了我们方便使用导出功能特意将exports指向了module.exports, 所以exports不能随便覆盖不然会将exports的指向改掉。  
module是一个对象里边包含了一下成员变量
```javascript
Module = {
  id: '.',
  exports: { addX: [Function] },
  parent: null,
  filename:
   '/Users/userName/Documents/我的学习/前端/Documents/js/code/commonjs.js',
  loaded: false,
  children: [],
  paths:
   [ '/Users/userName/Documents/我的学习/前端/Documents/js/code/node_modules',
     '/Users/userName/Documents/我的学习/前端/Documents/js/node_modules',
     '/Users/userName/Documents/我的学习/前端/Documents/node_modules',
     '/Users/userName/Documents/我的学习/前端/node_modules',
     '/Users/userName/Documents/我的学习/node_modules',
     '/Users/userName/Documents/node_modules',
     '/Users/userName/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
```

##### 模块的加载机制

CommonJS的模块加载机制输入的是值(不包括对象)的拷贝，也就是是说导出的值是多少使用时就是多少，模块内部的变化就影响不到该值了。例如
```javascript
// common.js
let b = 5;

exports.b = b;

exports.addB = function() {
  b++;
};
```
```javascript
let { b, addB } = require('./commonjs');
console.log(b); //5
addB();
console.log(b); //5
```
如果是对象
```javascript
// commonjs.js
const a = {
  x: 5
};

exports.add = function () {
  return a.x++;
};

exports.a = a;
```
```javascript
let { add, a } = require('./commonjs');

console.log(a); // { x: 5 }
add();
console.log(a); // { x: 6 }
```

#### require的内部处理流程



参考:  

[AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)  
[CMD](https://github.com/cmdjs/specification/blob/master/draft/module.md)