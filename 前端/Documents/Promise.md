### 手动实现一个Promise

#### Promise A+规范

##### 专业术语

1. promise: promise是一个拥有then方法的对象或者是函数，其行为符合此规范
2. thenable: thenabel是说定义了then方法的对象和函数。
3. value: value可以使合法的JavaScript任何值包括(undefined,thenable或者是promise)
4. exception: exception是一个使用throw抛出异常状态的值。
5. reason: reason指明了为什么一个promise被rejected。

##### 需求

一个promise对象必须是三个状态(pending,fulfilled,rejected)中的一个。

1. pending: 该状态可能会被转换成fulfilled或者rejected中的一个。
2. fulfilled: 

