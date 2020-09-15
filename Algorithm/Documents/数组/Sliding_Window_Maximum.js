/**
 * Sliding Window Maximum
 * https://leetcode.com/problems/sliding-window-maximum/
 */
// todo 时间复杂度太高
function slidingWindowMax(nums, k) {
  if(nums.length <= 0 || k <= 0){
    return [];
  }

  let maxArr = [];
  let tempMax = Number.MIN_SAFE_INTEGER;
  let windowLeft = 0;
  let windowRight = k - 1;
  while(windowRight < nums.length) {
    for (let i = windowLeft; i <= windowRight; i++) {
      if(nums[i] > tempMax){
        tempMax = nums[i];
      }
    }
    maxArr.push(tempMax);
    tempMax = Number.MIN_SAFE_INTEGER;
    windowLeft++;
    windowRight++;
  }

  return maxArr;
}

console.log(slidingWindowMax([1, -1], 1));