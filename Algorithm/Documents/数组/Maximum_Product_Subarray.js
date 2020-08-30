/**
 * Maximum Product Subarray
 * https://leetcode.com/problems/maximum-product-subarray/
 */
function MaxProduct(nums) {
  let len = nums.length;
  let temp = nums[0];

  let max = temp, min = temp;

  for (let i = 1; i < len; i++) {

    if(nums[i] < 0){
      let cache = max;
      max = min;
      min = cache;
    }

    max = Math.max(nums[i], nums[i] * max);
    min = Math.min(nums[i], nums[i] * min);

    temp = Math.max(temp, max);
  }

  return temp;
}

console.log(MaxProduct([2, 3, 2, 4, -3]));