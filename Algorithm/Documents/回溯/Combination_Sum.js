/**
 * Combination Sum
 * @backtrack 回溯法
 */
function CombinationSum(candidates, target) {
  let list = [];
  candidates.sort((a, b) => (a - b));
  backtrack(list, [], candidates, target, 0);

  function backtrack(arrContainer, tempList, candidates, remain, start) {
    if (remain < 0) {

    } else if (remain === 0) {
      arrContainer.push(tempList);
    } else {
      for (let i = start; i < candidates.length; i++) {
        tempList.push(candidates[i]);
        backtrack(arrContainer, [...tempList], candidates, remain - candidates[i], i);
        tempList.pop(); //当backtrack函数执行完成的时候将
      }
    }
  }

  return list;
}

CombinationSum([2, 3, 6, 7], 7);

/**
 * CombinationSumII
 * @param candidate
 * @param target
 */
function CombinationSumII(candidate, target) {
  let list = [];
  candidate.sort((a, b) => (a - b));
  backtrack(list, [], candidate, target, 0);

  function backtrack(arrContainer, tempArr, arr, remain, start) {
    if (remain < 0) {

    } else if (remain === 0) {
      arrContainer.push(tempArr);
    } else {
      for (let i = start; i < arr.length; i++) {
        if (i > start && arr[i] === arr[i - 1]) continue; //因为是排好序的，如果如果后一个等于前一个则说明该值已经被用过，直接跳过就好了
        tempArr.push(arr[i]);
        backtrack(arrContainer, [...tempArr], arr, remain - arr[i], i + 1);
        tempArr.pop();
      }
    }
  }

  return list;
}

CombinationSumII([10, 1, 2, 7, 6, 1, 5], 8);


/**
 * Combination Sum III
 * Find all possible combinations of k numbers that add up to a number n,
 * given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.
 *
 */
function CombinationSumIII(k, n) {
  let list = [];
  backtrack(list, [], k, n, 1);
  function backtrack(arrContainer, tempList, k, remain, start) {
    if (tempList.length > k) {

    } else if (tempList.length === k && remain === 0) {
      arrContainer.push(tempList);
    } else {
      for (let i = start; i <= 9; i++) {
        tempList.push(i);
        backtrack(arrContainer, [...tempList], k, remain - i, i + 1);
        tempList.pop();
      }
    }
  }
  return list;
}

console.log(CombinationSumIII(3, 7));