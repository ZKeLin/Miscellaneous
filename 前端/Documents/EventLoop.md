### How JavaScript works: Event Loop

在介绍JavaScript的Event Loop之前先来看看JavaScript是怎么工作的，几乎每个人都听过V8，并且知道JavaScript是单线程的通过异步回调来提升性能。

#### The JavaScript Engine

这里我们主要看一下谷歌的V8引擎。V8引擎被用在Chrome浏览器和Node.js里面，V8引擎主要包含两个主要的组件：

<img src='https://cdn-images-1.medium.com/max/1600/1*OnH_DlbNAPvB9KLxUCyMsA.png'  width="300" height="200"/>

* Memory Heap 这是用于分配内存的地方
* Call Stack 这里面包含栈帧，也就是你代码执行的地方

#### The Runtime

在浏览器里有一些JavaScript工程师经常用的API，像DOM操作API，AJAX异步请求，setTimeout等。然而这些API并不是引擎提供的，而是浏览器本身提供的，看下图：

<img src="https://cdn-images-1.medium.com/max/1600/1*4lHHyfEhVB0LnQ3HlhSs8g.png" width="400" height="300"/>

#### The Call Stack

JavaScript是单线程的语言，这就意味着他只有一个调用栈，在同一时间只能执行一件事情。调用栈是一种数据结构，记录着我们的程序运行到哪了。如果我们调用一个函数时，我们就把该函数放到栈的最顶端，直到该函数调用完成，我们会把他从栈顶推出。  

下面让我们看一个例子：

```javascript
function multiply(x,y){
    return x * y;
}
function printSquare(x){
    let s = multiply(x,x);
    console.log(s);
}
printSquare(5);
```

上面的JavaScript代码在调用栈是这样的：  

当引擎刚开始执行这段代码的时候，调用栈是空的，由于程序的执行是顺序执行的，所以当执行到printSquare(5)的时候，在这里程序判断出这是函数调用，然后会将该函数推入到调用栈里，如下图：

<img src="https://cdn-images-1.medium.com/max/1600/1*Yp1KOt_UJ47HChmS9y7KXw.png" width="300" height="200" />

每一个进入调用栈的函数可以称为栈帧。

这个过程就是入栈出栈的过程，这也是几乎所有的程序都会执行的一个过程。

#### Event Loop

Event Loop的实现对单线程JavaScript高性能起着关键的作用，下面主要介绍一下JavaScript的Event Loop:

由于JavaScript的执行是单线程的，如果有一个I/O操作要运行好长时间，那下面的程序只能等着，为了不让程序阻塞，JavaScript发明了Event Loop，再加上回调函数，从而使程序能够异步执行。虽然JavaScript能够运用Event Loop和回调函数异步执行，但是如果Call Stack有函数在执行，而且这个函数是一个超级复杂的算法，需要运用大量的CPU资源进行运算，那JavaScript也只能等着，不像其他多线程语言一样可以另起一个线程进行计算，JavaScript会被阻塞直到函数调用完成，所以JavaScript有一个特性就是：不适合执行CPU密集型程序，而它适合I/O密集型程序。

下面看一个异步执行的例子： 

```javascript
function first() {
    console.log('first');
}
function second() {
    console.log('second');
}
function third() {
    console.log('third');
}
first();
setTimeout(second, 1000); // Invoke `second` after 1000ms
third();
```

执行结果如下：

```javascript
first
third
second
```

下面让我们来解刨Event Loop

其实直到ES6开始，JavaScript自身都没有一个关于异步的直接概念，JavaScript引擎没有做任何事情，只是在特定时刻执行一个代码块。  
所以，是谁告诉JS引擎要去执行你的程序块？事实上，JS引擎不是孤立运行的，它运行在一宿主环境中，例如浏览器或者是Nodejs。目前，JavaScript可以嵌入到所有设备中，从机器人到电灯泡。每一个设备代表JS引擎的不同类型的托管环境。  
所有环境的共同点是都会有一个Event Loop的内置机制，每一次调用JS引擎的时候，他会解决你的程序中多个块的执行，随着时间的推移，也就是说JS引擎对于任何JS代码来说仅仅只是按需执行的环境。  
当你的JavaScript程序要去服务端请求一些数据时候，你需要建立一个“response”代码(也就是回调函数)，JS引擎会告诉宿主环境：“嘿，我现在要挂起执行，但是当网络请求完成了并且你有一些数据了，一定要执行这个函数作为回应”。浏览器然后会建立监听作为回应，当有东西返回回来了，浏览器通过把他插入到Callback Queue来安排回调函数去执行。如下图

<img src="https://cdn-images-1.medium.com/max/1600/1*FA9NGxNB6-v1oI2qGEtlRQ.png" width="500" height="300" />

该图中的Web APIs是什么？实际上，他是一个你无法操纵的线程，你可以只调用他们，他们是并发启动浏览器的一部分。如果你是Nodejs，那么这些就是C++ API。  
那么究竟什么事Event Loop？  

<img src="https://cdn-images-1.medium.com/max/1600/1*KGBiAxjeD9JT2j6KDo0zUg.png" width="400" height="150" />

Event Loop有一个简单工作就是去监控Call Stack和CallBack Queue。如果Call Stack是空的，他会从CallBack Queue获取第一个事件，并且把他推到Call Stack里面。

这种迭代在事件循环中称为tick。每个事件只是一个函数回调。
下面让我们看一个具体的例子：

```javascript
console.log('Hi');
setTimeout(function cb1() { 
    console.log('cb1');
}, 5000);
console.log('Bye');
```

执行这个例子看看到底发生了什么：

1. 刚开始整个状态都是空的。browser console是被清掉，调用栈是空的。
    
    #### 1/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*9fbOuFXJHwhqa6ToCc_v2A.png" width="400" height="250" />

2. console.log('Hi') 被推进了Call Stack

    #### 2/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*dvrghQCVQIZOfNC27Jrtlw.png" width="400" height="250" />

3. console.log('Hi') 被执行

    #### 3/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*yn9Y4PXNP8XTz6mtCAzDZQ.png" width="400" height="250" />

4. console.log('Hi') 被推出

    #### 4/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*iBedryNbqtixYTKviPC1tA.png" width="400" height="250" />

5. setTimeout(function cb1(){ ... }) 被推到Call Stack

    #### 5/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*HIn-BxIP38X6mF_65snMKg.png" width="400" height="250" />

6. setTimeout(...) 被执行。浏览器会在Web APIs里面创建一个，并且会执行计时。

    #### 6/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*vd3X2O_qRfqaEpW4AfZM4w.png" width="400" height="250" />

7. setTimeout(function cb1(){ ... }) 调用完成并且从Call Stack里面推出。

    #### 7/16

    <img src="https://cdn-images-1.medium.com/max/1600/1*_nYLhoZPKD_HPhpJtQeErA.png" width="400" height="250" />

8. console.log('Bye') 被推到Call Stack

    #### 8/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*1NAeDnEv6DWFewX_C-L8mg.png" width="400" height="250" />

9. console.log('Bye') 被执行

    #### 9/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*UwtM7DmK1BmlBOUUYEopGQ.png" width="400" height="250" />

10. console.log('Bye') 从Call Stack 推出

    #### 10/16

    <img src="https://cdn-images-1.medium.com/max/1600/1*-vHNuJsJVXvqq5dLHPt7cQ.png" width="400" height="250" />

11. 过了5000ms之后，定时器也完成了并且会把cb1回调函数，推到Callback Queue中。

    #### 11/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*eOj6NVwGI2N78onh6CuCbA.png" width="400" height="250" />

12. Event Loop会检查Call Stack是否为空，如果不为空它会等到Call Stack里面的栈帧全部都执行完成并且都推出Call Stack，将cb1从Callback Queue推到Call Stack。

    #### 12/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*jQMQ9BEKPycs2wFC233aNg.png" width="400" height="250" />

13. cb1 被执行，并且会把console.log('cb1') 推入栈顶。

    #### 13/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*hpyVeL1zsaeHaqS7mU4Qfw.png" width="400" height="250" />

14. console.log('cb1') 被执行

    #### 14/16
    
    <img src="https://cdn-images-1.medium.com/max/1600/1*lvOtCg75ObmUTOxIS6anEQ.png" width="400" height="250" />

15. console.log('cb1') 从Call Stack推出

    #### 15/16

    <img src="https://cdn-images-1.medium.com/max/1600/1*Jyyot22aRkKMF3LN1bgE-w.png" width="400" height="250" />

16. cb1 执行完成，从Call Stack推出

    #### 16/16

    <img src="https://cdn-images-1.medium.com/max/1600/1*t2Btfb_tBbBxTvyVgKX0Qg.png" width="400" height="250" />

以上就是
```javascript
console.log('Hi');
setTimeout(function cb1() { 
    console.log('cb1');
}, 5000);
console.log('Bye');
```
执行的过程，在这个过程setTimeout可以换成任意一个具有 I/O 操作的函数。 

注意，ES6特别说明了Event loop应该怎样工作，意味着在技术上他是JS引擎的职责范围之内，不在扮演者宿主环境角色。这个变化的一个主要原因是在ES6引入promise，因为promise需要权限对Event Loop的调度操作，直接和细粒度的控制。

上面的setTimeout函数并没有自己自动将callback放在Event loop queue里面，而是当时间到期后，环境把你的callback放到了Event loop queue里面，然后在未来的某一点去执行它，下面看一下这个代码：

```javascript
setTimeout(myCallback, 1000);
```

这并不意味着，myCallback将在1000ms过后立即执行，而是要大于等于1000ms后执行，他只是在1000ms过后被放到了队列中。然而，可能还有其他的事件在这之前被放到了队列里面，你的callback只能排队等者。

下面这个例子说明了，知道Call Stack被清空后才会执行callback函数

```javascript
console.log('Hi');
setTimeout(function() {
    console.log('callback');
}, 0);
console.log('Bye');
//执行结果为：
//Hi
//Bye
//callback
```

以上就是Event Loop的整体执行过程以及基本的原理，在ES6里面又出现了一个异步的promise来代替回调函数，以避免回调地狱，而在ES7+又提出了一个async await 来更优雅的方式编写异步程序，到后面会好好写一篇文章来介绍他们。


文章参考以下资源：

https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf
https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5














