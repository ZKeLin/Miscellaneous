/**
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 */

function removeDuplicates(nums){
  if(!nums) return nums;
  let i = 0;
  for (let num of nums) {
    if(i < 2 || num > nums[i - 2]) {
      nums[i++] = num;
    }
  }
  return i;
}

console.log(removeDuplicates([1, 1, 1, 2, 2, 3]));