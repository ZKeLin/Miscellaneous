### 手动实现一个Promise

#### Promise A+规范

##### 专业术语

1. promise: promise是一个拥有then方法的对象或者是函数，其行为符合此规范
2. thenable: thenabel是说定义了then方法的对象和函数。
3. value: value可以使合法的JavaScript任何值包括(undefined,thenable或者是promise)
4. exception: exception是一个使用throw抛出异常状态的值。
5. reason: reason指明了为什么一个promise被rejected。

##### 需求

###### Promise States

一个promise对象必须是三个状态(pending,fulfilled,rejected)中的一个。

1. pending: 该状态可能会被转换成fulfilled或者rejected中的一个。
2. fulfilled: 该状态不会被转换为其他状态，并且必须拥有一个不能被改变的value。
3. rejected: 同fulfilled状态，该状态也不能被转换为其他的状态，该状态下必须有一个不能被改变reason，用来表明为什么会被rejected。

###### The `then` Method

一个promise必须提供一个then方法，能够获取当前或者最终的值或者是reason。  

promise的then方法接受两个参数

```javascript
  promise.then(onFulfilled, onRejected)
```

1. 两个参数都是可选的:
  如果onFulfilled不是一个函数，则忽略。
  如果onRejected不是一个函数，则忽略。
2. 如果onFulfilled是一个函数:  
  当promise状态被fulfilled时该函数被调用，并且将该状态下的value值作为第一个参数传入，并且该函数不能在promise fulfilled之前调用，并且只能调用一次。
3. 如果onRejected是一个函数:  
  当promise的状态被rejected时该函数调用，并且将rejected时的reason值作为第一个参数被传入，该函数不能在promise rejected之前调用，并且只能调用一次。
4. onFulfilled或onRejected被调用直到执行上下文栈仅仅包含一个platform code。(意思是两者被调用只能是fulfilled或者是rejected状态下)
5. onFulfilled和onRejected必须作为函数被调用。
6. `then` 可以在同一个promise中被多次执行。  
  如果`promise` 被fulfilled，则所有各自的onFulfilled回调都必须按照对它们的原始调用的顺序执行。  
  如果`promise` 被rejected了，则所有各自的onRejected回调都必须按照对它们的原始调用的顺序执行。
7. `then` 必须返回promise:  
  `promise2 = promise1.then(onFulfilled, onRejected);`

##### implementation(简易版)  

主要是publish，subscrib两个函数。充分运用订阅发布模式。
如果promise的状态为FULFILLED或者是REJECTED状态，则直接调用publish函数，
执行订阅的回调函数( onFullfillment或者onRejection )，并将当前promise._result通过参数传递给回调函数。
否则则生成一个child的promsie对象并将then方法的回调函数的返回值传递给parent的_result值，并返回child对象。  

`
Promise 实现的大体思路是在内部定义一个状态，该状态有三个值，并且状态值之间是有方向的，如果外部传入的异步函数有结果了，则通过调用Promise 提供的fulFill或reject函数，去通知promise 改变状态，并将结果通过then/catch的方式返回回来。
`

`
Promise内部会维护一个订阅Array(_subscribers),用来处理传入then的回调，当内部state由 PENDDING 变为其他状态的时候会去触发当前回调并将result/reason当作参数传入到回调函数中。
`

[参考](https://github.com/stefanpenner/es6-promise)

```javascript
'use strict'
// promise.js

const State = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2
}

class Promise {

  constructor(resolver) {
    this._result = undefined;
    this._state = State.PENDING;
    this._subscribers = [];

    typeof resolver !== 'function' && throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    this instanceof Promise ? 
    initializePromise(this, resolver) : 
    throw new TypeError(`Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.`)
  }


  catch(onRejection) {
    return this.then(null, onRejection)
  }

  finally() {
    let promise = this;
    let constructor = promise.constructor;

    if ( isFunction(callback) ) {
      return promise.then(value => constructor.resolve(callback()).then(() => value),
                         reason => constructor.resolve(callback()).then(() => { throw reason; }));
    }

    return promise.then(callback, callback);
  }

  /**
    *
    * then方法会重新返回一个Promise，并将当前传入then的onFullfillment/onRejection函数返回的值传入到新的Promise的result中，这样后面调用then就可以获取到前面then返回的结果了
    */
  then(onFullfillment, onRejection) {
    const parent = this;

    const child = new this.constructor(function () {});

    if (child[PROMISE_ID] === undefined) {
      makePromise(child);
    }

    const { _state } = parent;

    if (_state !== State.PENDING) {
      const callback = arguments[_state - 1];
      
      setTimeout(() => {
        () => invokeCallback(_state, child, callback, parent._result)
      }, 0);
    } else {
      subscribe(parent, child, onFullfillment, onRejection);
    }

    return child;
  }
}

Promise.resolve = function Resolve(object) {
  let Constructor = this;
  let promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
};
Promise.reject = function Reject(reason) {
  let Constructor = this;
  let promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
};

// 将resolve/reject传入到回调参数中
function initializePromise(promise, resolver) {
  try{
    resolver(
      function resolvePromise(value) {
        resolve(promise, value);
      },
      function rejectPromise(reason) {
        reject(promise, reason)
      }
    )
  }catch(e) {
    reject(promise, e);
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, fulfillmentError());
  } else if (objectOrFunction(value)) {
    let then;
    try {
      then = value.then;
    } catch (e) {
      reject(promise, e);
      return;
    }
    handleMaybeThenable(promise, value, then);
  } else {
    if(promise._state !== State.PENDING) return ;

    promise._result = value;
    promise._state = State.FULFILLED;

    if(promise._subscribers.length !== 0) {
      setTimeout(() => {
        publish(promise);
      }, 0);
    }
  }
}
// 执行订阅的_subscribers数组
function fulfill(promise, value) {
  if (promise._state !== PENDING) { return; }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    setTimeout(() => {
        publish(promise);
      }, 0);
  }
}

function reject(promise, reason) {
  if (promise._state !== State.PENDING) return;
  promise._state = State.REJECTED;
  promise._result = reason;

  setTimeout(() => {
    publish(promise)
  }, 0);

}


function subscribe(parent, child, onFulfillment, onRejection) {
  let { _subscribers } = parent;
  let { length } = _subscribers;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + State.FULFILLED] = onFulfillment;
  _subscribers[length + State.REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    setTimeout(() => {
      publish(parent);
    },0);
  }

}


function publish(promise) {
  let subscribers = promise._subscribers;

  let settled = promise._state;

  if(subscribers.length === 0) return ;

  let child, callback, detail = promise._result;

  for (let i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) { //如果child也是promise，将callback执行结果添加到child的状态中
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}


function invokeCallback(settled, promise, callback, detail) {
  let hasCallback = isFunction(callback),
  value, error, succeeded = true;

  if(hasCallback){
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }

  }else {
    value = detail;
  }

  if(promise._state !== State.PENDING) {
    // noop
  } else if(hasCallback && succeeded) {
    resolve(promise, value);
  } else if(succeeded === false) {
    reject(promise, error);
  } else if(settled === State.FULFILLED) {
    fulfill(promise, value);
  } else if(settled === State.REJECTED) {
    reject(promise, value);
  }
}
```

###### all函数   

`Promise.all(iterable)`来处理并行操作，参数接受一个可迭代的对象（数组），返回一个Promise，该方法只有所有的对象都成功的时候才会触发成功，一旦任何一个对象失败或者是抛出异常，则会立即触发promise的reject方法，并且把第一个触发失败的promise对象信息作为它的失败错误信息，一般用来处理多个并发请求。Promise.all执行的思路是内部维护一个_remaining变量, 当数组中的某一个Promise状态改变了_remaining会减1，当_remaining == 0的时候表明所有的promise已经执行完成，将结果给到内部的promise对象的result结果

```javascript

Promise.all = function (entries) {
  this.promise = new Promise(() => {});

  if(Array.isArray(entries)){
    this.length = entries.length;
    this._remaining = entries.length;

    this._result = new Array(this.length);

    if(this._result === 0) {
      fulfill(this._result);
    }else{
      this._enmerate(entries);
      if(this._remaining === 0) {
        fulfill(this.promise, this._result);
      }
    }
  }else {
    reject(this.promise, new Error('arguments is not interable'));
  }

  this._enmerate = function (input) {
    for(let i = 0; i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  }

  this._eachEntry = function (entry, i) {
    let promise = new Promise(() =>{});
    let then, didError, error;
    try{
      then = entry.then;
    }catch (e){
      didError = true;
      error = e;
    }

    if (didError) {
      reject(promise, error);
    } else {
      handleMaybeThenable(promise, entry, then);
    }
    this._willSettleAt(promise, i);

  }

  this._settleAt = function(state, i ,value) {
    let { promise } = this;

    if(promise._state === PENDING){
      this._remaining--;

      if(state === REJECTED){
        reject(promise, value);
      }else{
        this._result[i] = value;
      }
    }

    if(this._remaing === 0){
      fulfill(promise, this._result);
    }
  }

  this._willSettleAt = function(promise, i) {
    let _this = this;

    subscribe(
      promise, 
      undefined, 
      value => _this._settleAt(FULFILLed, i, value),
      reason => _this._settleAt(REJECTED, i ,reason)
    );
  }
}

```
