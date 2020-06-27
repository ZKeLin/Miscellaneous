
/**
 * Given an unsorted integer array, find the smallest missing positive integer
 */

const FirstMissingPosition = function (arr) {
  let n = arr.length;

  for(let i = 0; i < n; i++) {
    let isExchange = false;
    if(arr[i] > 0 && arr[i] < n && arr[arr[i] - 1] != arr[i]){ //如果当前值不等于当前值所对应位置上的值，则交换两个值
      let temp1 = arr[arr[i] - 1];
      let temp2 = arr[i];
      arr[arr[i] - 1] = temp2;
      arr[i] = temp1;
      isExchange = true;
    }
    if(isExchange && arr[i] <= i && arr[i] > 0 && i > 0){ //防止小的数值(比当前i小的值)被交换后就循环不到该数值了
      i--;
    }
  }
  console.log(arr);
  for(let i = 0; i < n; i++) {
    if(arr[i] != i + 1){
      return i + 1;
    }
  }
  return n + 1;
}

console.log(FirstMissingPosition([4,3,-1,1]));
