/**
 * https://leetcode.com/problems/search-in-rotated-sorted-array-ii/
 */

function search(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    let mid = (left + right) >> 1;
    if (nums[mid] === target) {
      return true;
    } else if (nums[left] === nums[mid] && nums[right] === nums[mid]) {
      left++;
      right--;
    } else if (nums[left] <= nums[mid]) {
      if ((nums[left] <= target) && (nums[mid] >= target)) { // 要加个等于
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }else{
      if((nums[mid] < target) &&  (nums[right] >= target) ) left = mid+1;
      else right = mid-1;
    }
  }
  return false;
}

// console.log(search([2, 5, 6, 0, 0, 1, 2], 5));
console.log(search([1], 1));