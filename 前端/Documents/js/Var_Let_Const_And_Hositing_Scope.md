### VAR, LET and CONST -Hoisting, and Scope

像很多现代语言一样，JavaScript为变量声明提供了很多不同的方法。JavaScript有var,let和const关键字来声明变量并且有不同的用法。下面让我们深入探讨这些变量声明方法时可能遇到的警告和细微差别。  
下面是var,let,const的[官方](https://www.ecma-international.org/ecma-262/6.0/)和[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)的定义:  

`Var` keyword declares a variable which is scoped to its current execution context, optionally initializing to a value.  

`Let` keyword declares a block scoped variable, optionally initializing it to a value.  

`Const` keyword declares constants which are block scoped much like variables defined using `let` but the value of a constant cannot change. The const declaration creates a read-only reference to a value.

### HOISTING

概念上，变量提升是将变量和函数的声明放到代码的顶部。技术上的实现是变量和函数的声明在编译阶段被放入内存中，但仍保留在代码键入的地方。HOISTING的重点是允许您在代码中声明函数之前使用它们。  

* 变量和函数声明是需要移动的，变量赋值或初始化是不需要移动。
* 声明并不会移动到代码的首部，相反，他们是提前进入内存中。

在JavaScript中，所有的变量通过`var`关键字声明的变量都会有一个初识的值undefined。这是由于变量提升是把变量的声明放在内存中，并且给一个初始化的值undefined。具体行为如下面这个例子: 

```javascript
console.log(a); //undefined
console.log(b); // throw ReferenceError: b is not defined
var a = 1;
```

但是通过let或者是const声明的变量，当提升的时候并不会初始化一个undefined值。 相反，它们处于称为Temporal Dead Zone的状态，并且在它们的定义之前不会被初始化。

```javascript
console.log(x); //throw ReferenceError: Cannot access 'x' before initialization
let x = 1;
```

下面的代码表明了let和const变量的提升效果:

```javascript
var x = 10; 
{ 
  console.log(x); //throw ReferenceError: Cannot access 'x' before initialization
  let x = 5; 
}
```

### SCOPE

通过`var`关键字定义的变量具有作为当前执行上下文的作用域。他们不是块作用域，因此可以被定义在外面的块访问到，前提是他仍然在其执行上下文的范围内。但是。`let`和`const`变量是块级作用域的，不能从块外部访问到,如下:

```javascript
(function (){
  {
    var x = 2;
    let y = 3;
    const z = 4;
  }
  if(true){
    console.log(x); // 2
    console.log(y); // ReferenceError: y is not defined
    console.log(z); // ReferenceError: z is not defined
  }
  console.log(x); // 2
  console.log(y); // ReferenceError: y is not defined
  console.log(z); // ReferenceError: z is not defined
})()
console.log(x); //ReferenceError: x is not defined
```

当你通过`var`关键字声明一个全局变量时，该变量会依附到全局上下文中(浏览器中的window和node中的global)，然而通过`let`和`const`声明的全局变量则不会是这种情况。

### GOTCHAS

当你不使用关键字声明变量而是直接赋值的变量，这个变量则会依附到全局执行上下文中。但是这个极不推荐的做法，他会让调试变得非常困难。

```javascript
x = 'this gets attached to the global this';
console.log(this.x); // this gets attached to the global this

function testFn(){
  y = 'this also gets attached to the global this';
  console.log(this.y); //this also gets attached to the global this
}

testFn()
```

通过`var`声明变量可以在它们文法作用域中重复声明，但是值会被最后一个声明的值覆盖掉。但是通过`let`和`const`声明的变量则不可以，会报错。

```javascript
var x = 1;
var x = 2;
console.log(x); //2
let y = 1;  //SyntaxError: Identifier 'y' has already been declared
let y = 2; //SyntaxError: Identifier 'y' has already been declared
const z = 1; //SyntaxError: Identifier 'z' has already been declared
const z = 2; //SyntaxError: Identifier 'z' has already been declared
```

如果使用let或const在多个switch case下声明变量，这也会导致问题。

```javascript
var x = 1;
switch(x){
  case 0: 
    let foo = 20; //SyntaxError: Identifier 'foo' has already been declared
    break;
  case 1: 
    let foo = 20; //SyntaxError: Identifier 'foo' has already been declared
    break;
}
```

当然，可以通过使用花括号来定义不同的块来避免它，但这应该可以重构。  

另外一个陷阱就是关于常量，他的值是虽然不可以被重新分配，但是它仍然是可变的。如果值是对象，则可以修改对象的属性。

```javascript
const obj = {
  lastName: 'jhone'
}
obj.firstName = 'hooooo';

console.log(obj); //{lastName: "jhone", firstName: "hooooo"}
```