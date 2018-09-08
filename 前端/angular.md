## 用200行js代码打造一个轻量级的angular框架 
[正文在这](https://blog.mgechev.com/2015/03/09/build-learn-your-own-light-lightweight-angularjs/)

### 主要组件(Main Components)
我们会用到的angular组件如下
* Controllers
* Directives
* Services  

为了实现这个功能，我们将要实现 $compile 服务,可以叫做DOMCompile。 还有 $provider 和 $injector,他们可以统称为Provider,为了实现双向数据绑定，还要实现一个同等级别的 Scope，如下图  
<img src="https://blog.mgechev.com/images/lightweight-ng/main-components.png" width="200" height="150" />  

#### Provider

上面提到，我们的Provider将会包含以下两个组件
* $provider
* $injector  

他们将会有以下职责

* Register Component (Controllers, Directives and Services)
* Resolve Component's Dependencies
* Initialize Components

#### DOMCompile

DOMCompile 是一个单例，它会遍历DOM树来寻找指令，这里只能支持寻找作为属性的指令，一旦DOMCompile找到要寻找的指令，它会提供scope管理的功能(指令可能需要一个新的scope)，并执行相关联的逻辑功能(在这里是link函数)，所以这个组件的主要功能如下:

* Compile the DOM
  * Traverse the DOM tree
  * Finds registered directives, used as attributes
  * Invoke the logic assoiated with then
  * Manages the scope

#### Scope

最后一个主要的实现的组件是scope，为了实现双向数据绑定我们需要 $scope 绑定属性，我们可以将这些属性组合成表达式并且监控他们，当我们发现组合的表达式的值改变了，我们将执行一个与这个表达式相关联回调函数，所以scope的主要功能是:

* Watches Expressions
* Evaluates all watched experssions on each $digest loop, until stable
* Invokes all the observers, which are associated with the watched expressions

以上介绍了各个组件的功能和要他们的职责，下面开始编写代码实现他们的功能

#### Provider

上面说到Provider将有以下功能

* Register Component (Controllers, Directives and Services)
* Resolve Component's Dependencies
* Initialize Components

所以他会有一下接口

* get(name, locals) 返回一个service和当前的依赖(依赖注入)
* invoke(fn, locals) 通过工厂函数和依赖初始化一个service
* directive(name, fn) 通过name和factory定义一个指令
* controller(name, fn) 注册一个controller,注意这个controller不是AngularJS核心的一部分。它只是通过$controller服务实现的
* service(name, fn) 注册一个service
* annotate(fn) 返回一个数组，数组里面包含依赖的服务名称

组件的注册代码如下

```javascript
var Provider = {
  _providers: {},
  directive: function (name, fn) {
    this._register(name + Provider.DIRECTIVES_SUFFIX, fn);
  },
  controller: function (name, fn) {
    this._register(name + Provider.CONTROLLERS_SUFFIX, function () {
      return fn;
    });
  },
  service: function (name, fn) {
    this._register(name, fn);
  },
  _register: function (name, factory) {
    this._providers[name] = factory;
  }
  //...
};
Provider.DIRECTIVES_SUFFIX = 'Directive';
Provider.CONTROLLERS_SUFFIX = 'Controller';

```

上面的实现了简单的组价注册的代码，我们定义了一个私有的对象 _providers 它包含了已注册的controller，service和directive的所有工厂方法。也定义了directive，controller，service，他们内部都执行了 _register方法（就是重新造了个_register的轮子，根据自己的需求）。在controller方法里，将传递的控制器包装在一个函数里面，希望能够多次的调用控制器，而不会缓存调用以后的返回值。看完get方法和ngl-directive指令，controller方法将会更明显。Provider还有下面几个方法:

* invoke
* get 
* annotate

```javascript
var Provider = {
  // ...
  get: function (name, locals) {
    if (this._cache[name]) {
      return this._cache[name];
    }
    var provider = this._providers[name];
    if (!provider || typeof provider !== 'function') {
      return null;
    }
    return (this._cache[name] = this.invoke(provider, locals));
  },
  annotate: function (fn) {
    var res = fn.toString()
        .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
        .match(/\((.*?)\)/);
    if (res && res[1]) {
      return res[1].split(',').map(function (d) {
        return d.trim();
      });
    }
    return [];
  },
  invoke: function (fn, locals) {
    locals = locals || {};
    var deps = this.annotate(fn).map(function (s) {
      return locals[s] || this.get(s, locals);
    }, this);
    return fn.apply(null, deps);
  },
  _cache: { $rootScope: new Scope() }
};
```

在get方法里会检查_cache里面有没有缓存这个Component，如果缓存了就直接返回(单例模式)。在这里默认就缓存了$rootScop,因为我们希望只有这一个实例，当应用启动时会用到它。如果我们在_cache里面没有找到相关的Component，我们会从_provides里获取它相应的factory方法，并且在会用invoke包装一层(在这里将获取它相应的依赖，并将它传递给当前的函数已达到依赖注入，这样传递给函数的参数就是相应的依赖)，然后把他缓存起来，下次用的时候直接从缓存中取得。在invoke中，第一件事就是给locals分配一个空对象如果没有本地依赖。什么事本地依赖？  
在AngularJS里面有两种依赖：

* Local Dependencies
* Global Dependenciew

全局依赖就是我们我们通过factory,service,filter等等注册的Component,它可以在应用中被每一个Component获取到。对于不同的controller都会有一个不同的作用域范围，$scope不是全局依赖对象，就像我们说的$http 或 $resource一样，他就像当我们创建一个装饰器时的$delegate。$scope和$delegate是本地依赖，对于每一个Component，都会有一个他自己的作用域对象$scope。回到invoke，当locals为null或者undefined的时候会获取当前Component的所有依赖的名字，当前实现的依赖注入只支持通过参数名来获取。

```javascript
function Controller($scope, $http) {
  // ...
}
angular.controller('Controller', Controller);
```

通过获取Controller的参数列表当前Controller需要的依赖，通过annotate方法可以很容易的获取所需要的依赖名，但是如果函数参数里面含有注释就像下面一样

```javascript
function Controller($scope /* only local scope, for the component */, $http) {
  // ...
}
angular.controller('Controller', Controller);
```

所以在annotate里面专门处理了这种情况，通过使用正则表达式 .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '') 将注释替换成空字符串，达到正确的获取依赖。  
获取到所有依赖以后，会遍历他们并且实例化他们，他会调用this.get()来获取相应的依赖，在这有一个缺陷就是会造成死循环由于使用的递归，如果A依赖于B和C,然后C又依赖于A,互相依赖会造成死循环或者叫循环依赖，在这里没有处理这种情况，但是你可以通过拓扑排序或者跟踪访问的节点来处理这种情况，现在Provider的实现已经完成，我们可以向下面那样来注册Component：

```javascript
Provider.service('RESTfulService', function () {
  return function (url) {
    // make restful call & return promise
  };
});

Provider.controller('MainCtrl', function (RESTfulService) {
  RESTfulService(url)
  .then(function (data) {
    alert(data);
  });
});
```

之后可以invoke一个Controller：

```javascript
var ctrl = Provider.get('MainCtrl' + Provider.CONTROLLERS_SUFFIX);
Provider.invoke(ctrl);
```

#### DOMCompile

它的主要职责是:

* Compile the DOM
  * Traverse the DOM tree
  * Finds registered directives, used as attributes
  * Invoke the logic assoiated with then
  * Manages the scope

实现以上的功能，用下面两个api就够了  

* bootstrap() 引导应用（类似于angular.bootstrap，只不过它总是用html的根元素来作为应用的root）
* compile(el,scope) 调用与给定元素（el）相关的所有指令的逻辑，并为el的每个子元素递归调用自身。我们需要与当前元素相关联的scope，因为这是实现双向数据绑定的方式。由于每一个directive都有自己的scope,所以在递归调用自身的时候，我们将传递给他当前的scope。

```javascript
var DOMCompiler = {
  bootstrap: function () {
    this.compile(document.children[0],
      Provider.get('$rootScope'));
  },
  compile: function (el, scope) {
    var dirs = this._getElDirectives(el);
    var dir;
    var scopeCreated;
    dirs.forEach(function (d) {
      dir = Provider.get(d.name + Provider.DIRECTIVES_SUFFIX);
      if (dir.scope && !scopeCreated) {
        scope = scope.$new();
        scopeCreated = true;
      }
      dir.link(el, scope, d.value);
    });
    Array.prototype.slice.call(el.children).forEach(function (c) {
      this.compile(c, scope);
    }, this);
  },
  // ...
};
```

bootstrap的实现不是很重要，他只是调用了compile函数，并将根元素传递给它。有趣的是compile函数，在函数内部使用了一个_getElDirective函数，来获取当前元素相关联所有指令，后面会涉及到_getElDirective的实现。一旦获取到了所有的指令名字，将会调用Provider.get(),来获取每一个指令，之后便会判断这些指令是否需要创建一个新的scope对象，如果需要并且没有实例化任何scope,我们会调用$scope.new()，来生成一个新的scope,并且会继承当前scope的原型，之后便是调用指令的link函数，并传入合适的参数。之后便是循环el的孩子，并且会递归调用compile，这里涉及到了树的DFS(Depth-First Search)算法。下面让我们看看_getElDirectives()

```javascript
// ...
_getElDirectives: function (el) {
  var attrs = el.attributes;
  var result = [];
  for (var i = 0; i < attrs.length; i += 1) {
    if (Provider.get(attrs[i].name + Provider.DIRECTIVES_SUFFIX)) {
      result.push({
        name: attrs[i].name,
        value: attrs[i].value
      });
    }
  }
  return result;
}
// ...
```

这个方法会迭代el的所有属性，一旦找到一个属性，并且该属性已将被注册为指令，会把它的name和value包装成对象并push到result数组里面，最后返回该result。
到这里已将将DOMCompile实现完成

#### scope

它可能是最困难的实现了，由于脏检查功能，在AngularJS里面会调用$digest循环。所有的数据绑定机制会发生是因为它会监视表达式，这些表达式会在$digest循环里到评比。调用此循环后，它将遍历所有监视的表达式，并检查表达式的最后一个值与当前表达式的评比结果相比较，如果他们不相等，他会调用与当前表达式相关连的回调函数。一个监视者可能是这样的对象{ expr, fn, last },expr则是监视的表达式，fn则是那个回调函数，last则是表达式已知的最后一个值。例如，我们可以监视表达式拥有一个回调函数的foo表达式，表达式的值和在html元素里的值不一样的时候将会调用回调函数，这类似于ng-bind的实现

实现的scope将会有以下的方法

* $watch(expr, fn)  watches the expression expr. Once we detect change in the expr value we invoke fn (the callback) with the new value
* $destroy() - destroys the current scope
* $eval(expr) - evaluates the expression expr in the context of the current scope
* $new() - creates a new scope, which prototypically inherits from the target of the call
* $digest() - runs the dirty checking loop

下面是scope的实现

```javascript
function Scope(parent, id) {
  this.$$watchers = [];
  this.$$children = [];
  this.$parent = parent;
  this.$id = id || 0;
}
Scope.counter = 0;

Scope.prototype.$watch = function (exp, fn) {
  this.$$watchers.push({
    exp: exp,
    fn: fn,
    last: Utils.clone(this.$eval(exp))
  });
};

Scope.prototype.$new = function () {
  Scope.counter += 1;
  var obj = new Scope(this, Scope.counter);
  Object.setPrototypeOf(obj, this);
  this.$$children.push(obj);
  return obj;
};

Scope.prototype.$destroy = function () {
  var pc = this.$parent.$$children;
  pc.splice(pc.indexOf(this), 1);
};

Scope.prototype.$digest = function () {
  var dirty, watcher, current, i;
  do {
    dirty = false;
    for (i = 0; i < this.$$watchers.length; i += 1) {
      watcher = this.$$watchers[i];
      current = this.$eval(watcher.exp);
      if (!Utils.equals(watcher.last, current)) {
        watcher.last = Utils.clone(current);
        dirty = true;
        watcher.fn(current);
      }
    }
  } while (dirty);
  for (i = 0; i < this.$$children.length; i += 1) {
    this.$$children[i].$digest();
  }
};

Scope.prototype.$eval = function (exp) {
  var val;
  if (typeof exp === 'function') {
    val = exp.call(this);
  } else {
    try {
      with (this) {
        val = eval(exp);
      }
    } catch (e) {
      val = undefined;
    }
  }
  return val;
};
```




