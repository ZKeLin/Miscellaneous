/**
 * Jump Game
 * @return {boolean}
 */
/**
 * 思路：从后往前遍历，如果前一个的value + position 能够到达上一个能够跳过去的位置
 * @param nums
 * @return {boolean}
 * @constructor
 */
function JumpGame(nums) {
  let lastIndex = nums.length - 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    if(i + nums[i] >= lastIndex){ //当前位置加上当前值大于等于上一个能够跳过去的位置
      lastIndex = i;
      console.log('lastIndex', lastIndex);
    }
  }
  return lastIndex === 0;
}

console.log(JumpGame([2, 0, 1, 1, 4]));
console.log(JumpGame([3,2,1,0,4]));

/**
 * JumpGame2
 * @return {number}
 * @param nums
 * https://leetcode.com/problems/jump-game-ii/
 */
// todo
function JumpGame2(nums) {

}