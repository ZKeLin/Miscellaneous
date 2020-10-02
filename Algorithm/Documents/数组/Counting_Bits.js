/**
 * Counting Bits
 * https://leetcode.com/problems/counting-bits/
 * solution: https://leetcode.com/problems/counting-bits/discuss/79557/How-we-handle-this-question-on-interview-Thinking-process-%2B-DP-solution
 * @param num
 */

function countBits(num) {
  let results = new Array(num + 1).fill(0);
  let offset = 1;
  for (let i = 1; i<= num; i++ ) {
    if(offset * 2 === i) {
      offset *= 2;
    }
    results[i] = results[i - offset] + 1;
  }
  return results;
}


console.log(countBits(5))