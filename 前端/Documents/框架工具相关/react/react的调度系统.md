## Scheduler

当前版本为0.19.1， react的版本为16.13.1  

scheduler模块的主要任务是调度整个react的回调队列。

1. 是通过什么方式来持续触发调度函数的并且不会影响阻塞浏览器或者用户的相关操作的？
2. scheduler是怎么判断是否将执行任务交还给浏览器的？
3. 是通过什么数据结构来维护调度函数的？
4. ...

调度模块是将任务划分为不同的任务优先级，通过任务优先级的高低来决定当前应该执行的是什么任务，react的scheduler模块将任务划分为5个优先级以及每一个等级的Timeout分别是:

```javascript
export const NoPriority = 0; 
export const ImmediatePriority = 1; // 最高优先级，也就是时间耗尽的优先级
export const UserBlockingPriority = 2; // 用户操作的优先级
export const NormalPriority = 3; // 正常执行优先级
export const LowPriority = 4; // 低优先级
export const IdlePriority = 5; // 最低优先级
// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823;
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
```

#### 问题一: 是通过什么方式来持续触发调度函数的并且不会影响阻塞浏览器或者用户的相关操作的？

Scheduler提供了一个`SchedulerHostConfig` 模块，里面提供了以下方法:

```javascript
import {
  requestHostCallback,
  requestHostTimeout,
  cancelHostTimeout,
  shouldYieldToHost,
  getCurrentTime,
  forceFrameRate,
  requestPaint,
} from './SchedulerHostConfig';
```

这边是将SchedulerHostConfig模块抽象出来，用户自己可以实现相关接口，也可以使用默认的SchedulerHostConfig模块实现(SchedulerHostConfig.defualt.js)。先来看一下官方默认的实现。

##### non—DOM环境

首先进行环境判断，如果是non-DOM的环境，并且是MessageChannel不存在，则退化使用setTimeout方法执行_callback函数，先看一下在没有DOM的环境下是怎样持续触发执行 _callback函数的:  

```javascript
// 主要是requestHostCallback函数的执行
requestHostCallback = function(cb) {
  if (_callback !== null) {
    // Protect against re-entrancy.
    setTimeout(requestHostCallback, 0, cb); // setTimeout第三个参数，在执行requestHostCallback的时候会讲cb传递给requestHostCallback
  } else {
    _callback = cb;
    setTimeout(_flushCallback, 0); // 通过执行_flushCallback函数
  }
};
// 下面看一下_flushCallback的实现
let _callback = null;
let _timeoutID = null;
const _flushCallback = function() {
  if (_callback !== null) {
    try {
      const currentTime = getCurrentTime();
      const hasRemainingTime = true;
      _callback(hasRemainingTime, currentTime);
      _callback = null;
    } catch (e) {
      setTimeout(_flushCallback, 0); // 如果抛出异常则再次尝试执行。
      throw e;
    }
  }
};
```

如果是non-DOM的环境则使用setTimeout来执行相关_callback函数。并且没有判断当前环境下`shouldYieldToHost` (shouldYieldToHost的作用下面讲)直接返回false。还有获取当前时间的函数直接使用的`Date`相关api。

```javascript
shouldYieldToHost = function() { // 
	return false;
};
const initialTime = Date.now();
getCurrentTime = function() {
  return Date.now() - initialTime;
};
```

##### DOM环境

在DOM环境下获取当前时间使用的是performance相关api，**(performance和Date的对比)** ，如下通过判断相关api是否存在来决定使用哪些api:

```javascript
  if (
    typeof performance === 'object' &&
    typeof performance.now === 'function'
  ) {
    getCurrentTime = () => performance.now();
  } else {
    const initialTime = Date.now();
    getCurrentTime = () => Date.now() - initialTime;
  }
```

在支持MessageChannel的环境下，是通过持续发送消息来触发执行 `scheduledHostCallback`, 也就是外部传入的callback函数，其实就是调用的是flushWork，然后flushWork调用的是 workLoop。在执行`scheduledHostCallback`之前会将deadline赋值为当前时间+yieldInterval的一个接受时间(yieldInterval会根据当前设备的fps进行动态配置)。deadLine在后面进行判断当前任务是否超出截止时间的时候会用到，如果超出会将该任务放到下一个帧中。

```javascript
let yieldInterval = 5;
let deadline = 0;
const performWorkUntilDeadline = () => {
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime(); // 获取的是相对时间
    // Yield after `yieldInterval` ms, regardless of where we are in the vsync
    // cycle. This means there's always time remaining at the beginning of
    // the message event.
    deadline = currentTime + yieldInterval;
    const hasTimeRemaining = true;
    try {
      const hasMoreWork = scheduledHostCallback(
        hasTimeRemaining,
        currentTime,
      );
      if (!hasMoreWork) {
        isMessageLoopRunning = false;
        scheduledHostCallback = null;
      } else {
        // If there's more work, schedule the next message event at the end
        // of the preceding one.
        port.postMessage(null);
      }
    } catch (error) {
      // If a scheduler task throws, exit the current browser task so the
      // error can be observed.
      port.postMessage(null);
      throw error;
    }
  } else {
    isMessageLoopRunning = false;
  }
  // Yielding to the browser will give it a chance to paint, so we can
  // reset this.
  needsPaint = false;
};

const channel = new MessageChannel();
const port = channel.port2;
channel.port1.onmessage = performWorkUntilDeadline;

requestHostCallback = function(callback) {
  scheduledHostCallback = callback;
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    port.postMessage(null);
  }
};
```

整个过程是外部通过调用requestHostCallback，将外部传入的callback函数赋值给scheduledHostCallback，并判断isMessageLoopRunning是否为true（如果为true，说明有callback正在执行，不进行下一步操作），如果为false则通过port2发送消息给port1，port1将performWorkUntilDeadline函数作为onmessage的回调，接收到消息以后会重新计算deadline，并执行scheduledHostCallback函数，会将hasTimeRemaining和currentTime传入scheduledHostCallback，scheduledHostCallback会判断后面是否还有更多的任务，如果还有则继续发送消息执行performWorkUntilDeadline的回调，直到没有任务可以执行。  

#### 问题二: scheduler是怎么判断是否将执行任务交还给浏览器的？

还有一个函数就是使用deadLine的函数shouldYieldToHost，该函数的作用是判断是否将执行权返还给浏览器的其他的任务，像用户的输入操作或者重绘操作。

```javascript
 // TODO: Make this configurable
// TODO: Adjust this based on priority?
const maxYieldInterval = 300;
let needsPaint = false;
const scheduling = navigator.scheduling;
shouldYieldToHost = function() {
  const currentTime = getCurrentTime();
  if (currentTime >= deadline) {
    if (needsPaint || scheduling.isInputPending()) {
      // There is either a pending paint or a pending input.
      return true;
    }
    // There's no pending input. Only yield if we've reached the max
    // yield interval.
    return currentTime >= maxYieldInterval;
  } else {
    // There's still time left in the frame.
    return false;
  }
};
requestPaint = function() {
  needsPaint = true;
};
```

shouldYieldToHost函数回去判断当前时间是否超出deadline时间，如果超出则去判断浏览器是否需要重绘，是否有用户输入，当前时间是否已经超过了预设的最大执行时间，如果是则返回true，后面根据返回值进行相应的处理，比如将react的相关任务暂停执行，放到下一个帧中等等。  

shouldYieldToHost中有一段官方注释:

> There's no time left. We may want to yield control of the main thread, so the browser can perform high priority tasks. The main ones are painting and user input. If there's a pending paint or a pending input, then we should yield. But if there's neither, then we can yield less often while remaining responsive. We'll eventually yield  regardless, since there could be a pending paint that wasn't accompanied by a call to `requestPaint`, or other main thread tasks like network events.

#### 问题三: 是通过什么数据结构来维护调度函数的？

Scheduler中维护着两个数组，分别是taskQueue和timerQueue，分别表示着工作队列和时间队列，taskQueue里面放着的将要执行的任务，也就是优先级比较高的任务，而timerQueue存放着优先级较低的任务(可能任务的当前时间还没有过期)，timerQueue中的任务会经常转移到taskQueue中，两个队列通过小顶堆维护着，taskQueue数组的第一个元素始终是当前优先级最高的也就是距离当前时间最近的那个任务。Scheduler通过判断当前任务的开始时间是否小于当前时间，如果小于当前时间直接放到taskQueue队列中，如果大于当前时间则放到timerQueue队列中。主要是通过sceduleCallback函数来进行任务的调度，以及决定当前的任务应该放到那个队列中。

```javascript
// Tasks are stored on a min heap
var taskQueue = [];
var timerQueue = [];

function unstable_scheduleCallback(priorityLevel, callback, options) {
  var currentTime = getCurrentTime();

  var startTime;
  var timeout;
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay;
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
    timeout =
      typeof options.timeout === 'number'
        ? options.timeout
        : timeoutForPriorityLevel(priorityLevel);
  } else {
    timeout = timeoutForPriorityLevel(priorityLevel);
    startTime = currentTime;
  }

  var expirationTime = startTime + timeout;

  var newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  };
  if (enableProfiling) {
    newTask.isQueued = false;
  }

  if (startTime > currentTime) {
    // This is a delayed task.
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // All tasks are delayed, and this is the task with the earliest delay.
      if (isHostTimeoutScheduled) {
        // Cancel an existing timeout.
        cancelHostTimeout();
      } else {
        isHostTimeoutScheduled = true;
      }
      // Schedule a timeout.
      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);
    if (enableProfiling) {
      markTaskStart(newTask, currentTime);
      newTask.isQueued = true;
    }
    // Schedule a host callback, if needed. If we're already performing work,
    // wait until the next time we yield.
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
}
```

并且在每一次执行workLoop是都会更新timerQueue和taskQueue,当timerQueue中的任务开始时间小于等于当前时间的时候说明timerQueue有一些任务需要加到taskQueue去执行。timerQueue中放的是缓冲的一些执行时间未到的任务，taskQueue中放的时间已经过期要立即执行的任务，然后随着时间的推移timerQueue中的任务会被放到taskQueue中。来确保任务都会被执行。

```javascript
function advanceTimers(currentTime) {
  // Check for tasks that are no longer delayed and add them to the queue.
  let timer = peek(timerQueue);
  while (timer !== null) {
    if (timer.callback === null) {
      // Timer was cancelled.
      pop(timerQueue);
    } else if (timer.startTime <= currentTime) {
      // Timer fired. Transfer to the task queue.
      pop(timerQueue);
      timer.sortIndex = timer.expirationTime;
      push(taskQueue, timer);
      if (enableProfiling) {
        markTaskStart(timer, currentTime);
        timer.isQueued = true;
      }
    } else {
      // Remaining timers are pending.
      return;
    }
    timer = peek(timerQueue);
  }
}
```

