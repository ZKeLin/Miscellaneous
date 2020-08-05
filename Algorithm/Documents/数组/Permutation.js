

function Permutation(nums) {
  let list = [];
  backTrack(list, [], nums);
  return list;
}

function backTrack(list, tempList, nums) {
  if(tempList.length === nums.length) {
    list.push(tempList);
  }else {
    for (let i = 0; i < nums.length; i++) {
      if(tempList.findIndex(it => it === nums[i]) >= 0) continue;
      tempList.push(nums[i]);
      backTrack(list, [...tempList], nums);
      tempList.pop();
    }
  }
}

console.log(Permutation([1,2,3]));