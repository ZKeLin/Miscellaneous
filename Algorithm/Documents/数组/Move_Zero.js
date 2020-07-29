/**
 * Move zeroes
 * @constructor
 */
function MoveZero(nums) {
  let nonZeroFoundAt = 0;
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] !== 0) {
      nums[nonZeroFoundAt++] = nums[i];
    }
  }

  for(let i = nonZeroFoundAt; i<nums.length; i++) {
    nums[i] = 0;
  }
  console.log(nums);
}

function MoveZero2(nums) {
  let nonZeroFoundAt = 0;
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] !== 0) {
      let temp = nums[nonZeroFoundAt];
      nums[nonZeroFoundAt] = nums[i];
      nums[i] = temp;
      nonZeroFoundAt++;
    }
  }
  console.log(nums);
}

MoveZero([0,1,0,3,12]);
MoveZero2([0,1,0,3,12]);