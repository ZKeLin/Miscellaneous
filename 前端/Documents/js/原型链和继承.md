### 原型链，new和继承

#### 原型链

 * 什么是原型

   JavaScript 常被描述为一种**基于原型的语言 (prototype-based language)**——每个对象拥有一个**原型对象**，对象以其原型为模板、从原型继承方法和属性。准确的说这些方法和属性是定义在Object的构造函数(constructor functions)之上的`prototype`属性上，而非对象的实例中。

   ```javascript
   function Parent() {
     this.name = 'name';
   }
   // 通过在prototype上定义方法来扩展Parent
   Parent.prototype.getName = function() {
     return this.name;
   } 
   ```

   对象的原型可以通过`Object.getPrototypeOf(obj)`或者已被弃用的`__proto__`属性获得。

   ```javascript
   const parent1 = new Parent();
   const parent1Proto = Object.getPrototypeOf(obj);
   // parent1.__proto__;
   ```

   

 * 为什么会有原型

   JavaScript不像C++和Java一样属于静态语言，它是属于一种动态语言，而且ES5版本没有类的概念直到ES6语法上才出现了类。所以在早期JavaScript是通过在原型定义属性和方法来扩展对象的，一直延续到现在。

 * 原型链又是什么？

   早期JavaScript通过在原型上定义属性和方法来实现类似于传统的OOP语言中的类对象。而且在传统的OOP中，如果创建了类，并且实例化该类，是通过将类中的属性方法进行复制一份到实例中。而JavaScript中并不是复制一份，而是在构造器和对象实例之间建立一个链接(它是\__proto__属性，是从构造函数的`prototype`属性派生的), 之后通过该链接上溯原型链， 找到相应的方法或着属性。

   ```javascript
   function Something() {}
   console.log(doSomething.prototype);
   ```

   输出为:

   ```javascript
   {
       constructor: ƒ Something(),
       __proto__: {
           constructor: ƒ Object(),
           hasOwnProperty: ƒ hasOwnProperty(),
           isPrototypeOf: ƒ isPrototypeOf(),
           propertyIsEnumerable: ƒ propertyIsEnumerable(),
           toLocaleString: ƒ toLocaleString(),
           toString: ƒ toString(),
           valueOf: ƒ valueOf()
           ...
       }
   }
   ```

   如果在原型上添加其他属性

   ```javascripr
   Something.prototype.foo = 'bar';
   console.lg(Something.prototype);
   ```

   输出为:

   ```javascript
   {
       foo: "bar",
       constructor: ƒ Something(),
       __proto__: {
           constructor: ƒ Object(),
           hasOwnProperty: ƒ hasOwnProperty(),
           isPrototypeOf: ƒ isPrototypeOf(),
           propertyIsEnumerable: ƒ propertyIsEnumerable(),
           toLocaleString: ƒ toLocaleString(),
           toString: ƒ toString(),
           valueOf: ƒ valueOf()
           ...
       }
   }
   ```

   在prototype上会有一个foo属性的字段，如果你通过`new`关键字实例化一个对象，则可以通过访问foo字段获取foo属性的值；

   ```javascript
   let something = new Something();
   console.log(something.foo); // "bar"
   ```

   如果在something实例上添加foo属性: 

   ```javascript
   something.foo = 'foo';
   console.log(something.foo); // "foo"
   ```

   如果打印something实例会是什么那？

   ```javascript
   {
     	foo: "foo",
       __proto__: {
           foo: "bar",
           constructor: ƒ Something(),
           __proto__: {
               constructor: ƒ Object(),
               hasOwnProperty: ƒ hasOwnProperty(),
               isPrototypeOf: ƒ isPrototypeOf(),
               propertyIsEnumerable: ƒ propertyIsEnumerable(),
               toLocaleString: ƒ toLocaleString(),
               toString: ƒ toString(),
               valueOf: ƒ valueOf()
               ...
           }
       }
   }
   ```

   所以从上面可以看到something的\__proto__指向的就是Something的prototype。在你访问foo属性的时候，他会先从自身的属性中查找，如果有则返回，如果没有则继续往上查找也就是  `__proto__`, 其实就是Something.prototype中查找，如果还没有则继续往上查找即`Something.__proto__.__proto__`, 如果还没有找到则继续往上找，最后, 原型链上面的所有的 `__proto__` 都被找完了, 浏览器所有已经声明了的 `__proto__` 上都不存在这个属性，然后就得出结论，这个属性是 `undefined`.

####  new 做了什么?

使用代码解释一下new操作符做了什么: 

1. 创建一个新对象p1。

2. 将`p1.__proto__` 指向`P.prototype`;

3. 将this绑定到新创建的对象p1上。

4. 返回新对象

   4.1 如果返回值为undefined，则返回this;

   4.2 如果返回值是基本类型的值，比如number，string等，则返回this;

   4.3 如果返回的是对象类型，比如{ a: 1 }，则返回这个对象;

```javascript
function newFunction() {
  // 第一步创建一个新对象
  const p1= new Object();
  // 第二步将`p1.__proto__` 指向`P.prototype`;
  const construtor = [].shift.call(arguments); // 获取传入的构造函数
  p1.__proto__ = constructor.prototype;
  // 第三步将this指向p1,并将剩余参数传入
  const ret = p1.apply(this, arguments); 
  // 第四步返回该对象
  return typeof ret === 'object' ? ret : p1;
}
```



#### 继承

* 原型继承

  1. 实现

     ```javascript
     // Parent对象
     function Parent() {
       this.name = 'parentName';
     }
     Parent.prototype.getName = function() {
       return this.name;
     }
     // Child对象，要继承Parent对象
     function Child() {}
     
     Child.prototype = new Parent();
     Child.prototype.constructor = Child;
     
     const child1 = new Child();
     child1.getName(); // "parentName"
     
     ```

     * 注意: 为什么不直接`Child.prototype = Parent.prototype` ?

       如果直接将`Parent.prototype` 赋值给`Child.prototype`，则在调用child1.getName()方法的时候会报name为undefined;因为此时child1.getName()方法中的this指向的Child，而Child对象并没有name属性，所以如果是直接赋值则父对象上的属性比如name则不会绑定到子对象上。

  2.  存在问题

     * 如果有属性的值为引用类型的值，一旦某个实例修改了这个属性，所有实例都会收到影响。

       ```javascript
       // Parent对象
       function Parent() {
         this.names = ['name1', 'name2', 'name3'];
       }
       Parent.prototype.getNames = function() {
         return this.names;
       }
       // Child对象，要继承Parent对象
       function Child() {}
       
       Child.prototype = new Parent();
       Child.prototype.constructor = Child;
       
       const child1 = new Child();
       const child2 = new Child();
       child1.names.pop();
       console.log(child1.getNames()); // ["name1", "name2"]
       console.log(child2.getNames()); // ["name1", "name2"]
       ```

     * 不能传递参数给Parent对象，如果Parent对象需要传递参数，而在Child的函数体中并没有对Parent的做传递参数的操作。所以如果需要传递参数给Parent，则这种方式是不能的。

* 构造函数继承

   1. 实现

      ```javascript
      // 其实主要是解决了上面原型继承存在的两个问题
      function Parent(parentName) {
        this.parentName = parentName;
        this.names = ['name1', 'name2', 'name3'];
      }
      Parent.prototype.getNames = function() {
        return this.names;
      }
      
      function Child() {
        this.childName = [].shift.call(arguments);
        // 继承代码
        Parent.apply(this, arguments);
        // 其实就是将Parent中的属性在此复制一份;
        // 类似直接将代码拿过来 this.names = ['name1', 'name2', 'name3'];
      }
      
      const child1 = new Child('child1', 'parentName1');
      const child2 = new Child('child2', 'parentName2');
      child1.names.pop();
      // 解决问题1
      console.log(child1.names); // ["name1", "name2"]
      console.log(child2.names); // ["name1", "name2", "name3"]
      // 解决问题2
      console.log(child1.parentName); // parentName1
      console.log(child2.parentName); // parentName2
      ```

      

   2. 存在问题

      如果方法或者属性想被继承，只能在构造函数中定义。如果每次都定义在构造函数中，则会导致内存被滥用（每次实例化都会创建一遍方法或者属性，多占一块内存）。

* 组合继承

  通过原型继承可以直接调用Prototype上面的方法或者属性，但是会导致引用类型的属性被其他实例修改的问题。

  使用构造函数继承不能直接调用prototype上面的属性方法，导致实例化的时候都会去复制一遍构造函数中的属性方法，内存会被滥用。所以取其精华，去其槽粕。

  1. 实现

     ```javascript
     function Parent(parentName) {
       this.parentName = parentName;
       this.names = ['name1', 'name2', 'name3'];
     }
     Parent.prototype.getNames = function() {
       return this.names;
     }
     
     function Child() {
       this.childName = [].shift.call(arguments);
       // 构造函数继承
       Parent.apply(this, arguments); // 1
     }
     // 原型继承
     Child.prototype = new Parent(); // 2
     Child.prototype.constructor = Child;
     ```

     

  2. 存在问题

     Parent会被调用两次分别是在1，2行。

* 寄生组合继承

  1. 实现

     ```javascript
     function Parent(parentName) {
       this.parentName = parentName;
       this.names = ['name1', 'name2', 'name3'];
     }
     Parent.prototype.getNames = function() {
       return this.names;
     }
     
     function Child() {
       this.childName = [].shift.call(arguments);
       // 构造函数继承
       Parent.apply(this, arguments);
     }
     // 原型继承
     // 方式1
     let tempFunction = function (){};
     tempFunction.prototype = Parent.prototype;
     Child.prototype = new tempFunction();
     // 方式2
     // 也可以使用Object.create()方法
     Child.prototype = Object.create(Parent.prototype);
     
     Child.prototype.constructor = Child;
     
     ```

     

* class类继承

  从语法层面上解决了继承问题。 

  ```javascript
  class Parent {
    
  }
  class Child extends Parent {
    
  }
  ```

  