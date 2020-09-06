/**
 * House Robber
 * https://leetcode.com/problems/house-robber/
 * rob(i) = Math.max( rob(i - 2) + currentHouseValue, rob(i - 1) )
 */

// 递归
function HouseRobber(nums) {
  // let i = 0;
  // let last = 0, now = 0;
  // while(i < nums.length) {
  //   last = now;
  //   now = Math.max(last + nums[i], now);
  //   i++;
  // }
  // return now;
  return rob(nums, nums.length - 1);
}

function rob(nums, i) {
  if(i < 0){
    return 0;
  }
  console.log(i);
  return Math.max(rob(nums, i - 2) + nums[i], rob(nums, i - 1));
}


/**
 * 遍历
 */
function rob2(nums) {
  if(nums.length === 0) return 0;
  let prev1 = 0;
  let prev2 = 0;
  for(let num of nums) {
    let temp = prev1;
    prev1 = Math.max(prev2 + num, prev1);
    prev2 = temp;

  }
  return prev1;
}
console.log(rob2([1,2,1,3]));