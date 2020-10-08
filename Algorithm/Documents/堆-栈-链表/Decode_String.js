/**
 * Decode String
 * https://leetcode.com/problems/decode-string/
 */

function decodeString(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ']') {
      let tempStr = '';
      while(stack[0] !== '[') {
        tempStr += stack.shift();
      }
      stack.shift();
      let k = 0;
      let base = 1;
      while(stack.length > 0 && !Number.isNaN(Number.parseInt(stack[0]))){
        let tempNumber = Number.parseInt(stack.shift());
        k = k + tempNumber * base;
        base *= 10;
      }

      while (k !== 0) {
        for (let j = tempStr.length - 1; j >= 0; j--) {
          stack.unshift(tempStr[j]);
        }
        k--;
      }

    } else {
      stack.unshift(s[i]);
    }
  }
  return stack.reverse().join('');
}

console.log(decodeString('30[a2[bc]]'));