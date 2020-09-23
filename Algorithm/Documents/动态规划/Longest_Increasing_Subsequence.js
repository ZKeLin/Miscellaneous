/**
 * Longest Increasing Subsequence
 * https://leetcode.com/problems/longest-increasing-subsequence/
 */

function longestLIS(nums) {
  if (nums.length === 0) {
    return 0;
  }
  let dp = new Array(nums.length);
  let maxLong = 1;
  dp[0] = 1;
  for(let j = 1; j < dp.length; j++) {
    let maxVal = 0;
    for(let i = 0; i < j; i++) {
      if(nums[i] < nums[j]) {
        maxVal = Math.max(maxVal, dp[i]);
      }
    }
    dp[j] = maxVal + 1;
    maxLong = Math.max(maxLong, dp[j]);
  }
  return maxLong;
}

console.log(longestLIS([0]));
// console.log(longestLIS([10, 9, 2, 5, 3, 7, 101, 18]));