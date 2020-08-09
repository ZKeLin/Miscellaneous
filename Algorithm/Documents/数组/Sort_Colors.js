/**
 * sort colors
 * @constructor
 */
function SortColors(nums) {
  let second = nums.length - 1, first = 0;
  for (let i = 0; i <= second; i++) {
    while(nums[i] === 2 && i < second){ // 所有的2都放在右边
      let temp = nums[i];
      nums[i] = nums[second];
      nums[second] = temp;
      second--;
    }
    while(nums[i] === 0 && i > first) { //所有的0都放在左边
      let temp = nums[i];
      nums[i] = nums[first];
      nums[first] = temp;
      first++;
    }
  }
  return nums;
}


console.log(SortColors([2, 0, 2, 1, 1, 0]));