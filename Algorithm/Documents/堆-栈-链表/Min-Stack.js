/**
 * initialize your data structure here.
 */
var MinStack = function() {
  this.stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.unshift(x);
};

/**
 * @return {number}
 */
MinStack.prototype.pop = function() {
  this.stack.shift();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  return this.stack[0];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  let min;
  if(this.stack.length > 0){
    min = this.stack[0];
  }
  let i = 0;
  while(i < this.stack.length){
    if(min > this.stack[i]){
      min = this.stack[i];
    }
    i++;
  }
  return min;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
let minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
console.log(minStack.stack);
console.log(minStack.getMin()); // return -3
minStack.pop();
console.log(minStack.top());    // return 0
console.log(minStack.getMin()); // return -2