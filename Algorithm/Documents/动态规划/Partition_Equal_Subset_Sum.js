/**
 * Partition Equal Subset Sum
 * https://leetcode.com/problems/partition-equal-subset-sum/
 * 可以这样理解：是否可以从输入数组中挑选出一些正整数，使得这些数的和 等于 整个数组元素的和的一半
 */

function canPartition(nums) {
  if(nums.length === 0){
    return false;
  }
  let sum = 0;
  for(let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }
  if(sum % 2 !== 0) return false;
  let subSum = sum / 2;
  let dp = new Array(subSum + 1).fill(false);
  dp[0] = true;
  for(let i = 0; i < nums; i++) {
    for(let j = subSum; j >= nums[i]; j--) {
      dp[j] |= dp[j - nums[i]];
    }
  }
  return dp[subSum];
}

console.log(canPartition([1, 2, 4, 5]));