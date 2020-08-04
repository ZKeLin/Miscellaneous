/**
 * Longest Valid Parentheses
 * @param s
 * @constructor
 */

function LongestValidParentheses(s) {
  let stack = new Stack();
  stack.push(-1);
  let longestLength = 0, i = 0;
  while(i < s.length) {
    if(s[i] === '('){
      stack.push(i);
    }else{
      stack.pop();
      if(stack.isEmpty()) {
        stack.push(i);
      }else{
        longestLength = Math.max(longestLength, i - stack.getTop());
      }
    }
    i++;
  }
  return longestLength;
}

function Stack() {
  this.data = [];
}

Stack.prototype.push = function (number) {
  this.data.push(number);
};

Stack.prototype.pop = function () {
  return this.data.pop();
};

Stack.prototype.getTop = function () {
  return this.data[this.data.length - 1];
};

Stack.prototype.isEmpty = function () {
  return this.data.length === 0;
};


console.log(LongestValidParentheses("(()"));