/**
 * 方法一: 使用栈,如果下一个元素比栈顶元素大则推出该元素
 * @params numbers[]
 */

const trapByStacks = function (arr) {
  let total = 0, i = 0;
  let stacks = [];

  while(i < arr.length) {
    while(stacks.length !== 0 && arr[i] > arr[stacks[0]]) {
      let top = stacks[0];
      stacks.shift();
      if(stacks.length === 0){
        break;
      }
      let distance = i - stacks[0] - 1;
      let height = Math.min(arr[i], arr[stacks[0]]) - arr[top];
      total += distance * height;
    }
    stacks.unshift(i);
    console.log(stacks);
    i++;
  }

  return total;
}

/**
 * 方法二: 双指针
 * @param {*} arr 
 */
const trapByTwoPointer = function (arr) {
  let left = 0, right = arr.length - 1, total = 0;
  let leftMax = 0, rightMax = 0;
  while (left < right) {
    if(arr[left] < arr[right]){
      if(arr[left] >= leftMax){
        leftMax = arr[left];
      }else{
        total += (leftMax - arr[left]);
      }
      left++
    }else{
      if(arr[right] >= rightMax){
        rightMax = arr[right];
      }else{
        total += (rightMax - arr[right])
      }
      right--;
    }
  }
  return total;
}

console.log(trapByTwoPointer([0,1,0,0,1,0,1,3,2,1,2,1]));