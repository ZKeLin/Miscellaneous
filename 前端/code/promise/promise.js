'use strict'

import { objectOrFunction, isFunction } from './utils';
// promise.js

const State = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2
}

const queue = new Array(1000);

function fulfillmentError() {
  return new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

class Promise {

  constructor(resolver) {
    this._result = this._state = undefined;
    this._subscribers = [];

    typeof resolver !== 'function' && needsResolver();
    this instanceof Promise ?
      initializePromise(this, resolver) :
      needsNew()
  }


  catch(onRejection) {
    return this.then(null, onRejection)
  }

  finally(callback) {
    let promise = this;
    let constructor = promise.constructor;

    if ( isFunction(callback) ) {
      return promise.then(value => constructor.resolve(callback()).then(() => value),
                         reason => constructor.resolve(callback()).then(() => { throw reason; }));
    }

    return promise.then(callback, callback);
  }

  then(onFullfillment, onRejection) {
    const parent = this;

    const child = new this.constructor(noop);

    if (child[PROMISE_ID] === undefined) {
      makePromise(child);
    }

    const { _state } = parent;

    if (_state) {
      const callback = arguments[_state - 1];

      asap(() => invokeCallback(_state, child, callback, parent._result));
    } else {
      subscribe(parent, child, onFullfillment, onRejection);
    }

    return child;
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(
      function resolvePromise(value) {
        resolve(promise, value);
      },
      function rejectPromise(reason) {
        reject(promise, reason)
      }
    )
  } catch (e) {
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
    fulfill(promise, value);
  }
}

function reject(promise, reason) {
  if (promise._state !== State.PENDING) return;
  promise._state = State.REJECTED;
  promise._result = reason;


  asap(publishRejection, promise);
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function handleMaybeThenable(promise, maybeThanable, then) {
  if (maybeThanable.constructor === promise.constructor &&
    then === originThen &&
    maybeThanable.constructor.resolve === originResolve) {
      handleMaybeThenable(promise, maybeThanable);
  } else {
    if(then === undefined){
      fulfill(promise, maybeThanable);
    } else if(isFunction(then)) {
      handleForeignThenable();
    }
  }

}

function handleForeignThenable(promise, thenable, then) {
  asap(promise => {
   let sealed = false;
   let error = tryThen(then, thenable, value => {
     if (sealed) { return; }
     sealed = true;
     if (thenable !== value) {
       resolve(promise, value);
     } else {
       fulfill(promise, value);
     }
   }, reason => {
     if (sealed) { return; }
     sealed = true;

     reject(promise, reason);
   }, 'Settle: ' + (promise._label || ' unknown promise'));

   if (!sealed && error) {
     sealed = true;
     reject(promise, error);
   }
 }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === State.FULFILLED) {
    fulfill(promise, thenable._result)
  } else if (thenable._state === State.REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(
      thenable, 
      undefined, 
      value => resolve(promise, value),
      reason => reject(promise, reason)
      );
  }
}

function subscribe(parent, child, onFulfillment, onRejection) {
  let { _subscribers } = parent;
  let { length } = _subscribers;

  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + State.FULFILLED] = onFulfillment;
  _subscribers[length + State.REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }

}

let len = 0;

function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if(len === 2){
    sheduleFlush()();
  }
}

function sheduleFlush() {
  function flush() {
    for (let i = 0; i < queue.length; i += 2) {
      const callback = queue[i];
      const arg = queue[i + 1];

      callback(arg);

      queue[i] = undefined;
      queue[i + 1] = undefined;
    }

    len = 0;
  }

  return () => setTimeout(flush, 0);
}


function fulfill(promise, value) {
  if(promise._state !== State.PENDING) return ;

  promise._result = value;
  promise._state = State.FULFILLED;

  if(promise._subscribers.length !== 0) {
    asap(publish, promise);
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

    if (child) {
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