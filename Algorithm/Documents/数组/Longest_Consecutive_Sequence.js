/**
 * Longest Consecutive Sequence
 * https://leetcode.com/problems/longest-consecutive-sequence/
 */

function longestConsecutive(arrs) {
  let numSet = new Set();
  for (let i = 0; i < arrs.length; i++) {
    numSet.add(arrs[i]);
  }
  let longestLen = 0;
  numSet.forEach(it => {
    if(!numSet.has(it - 1)){
      let currentLen = 1;
      let currentNum = it;
      while(numSet.has(currentNum + 1)) {
        currentLen++;
        currentNum++;
      }
      longestLen = Math.max(longestLen, currentLen);
    }
  });
  return longestLen;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));