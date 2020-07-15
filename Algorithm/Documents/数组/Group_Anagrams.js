/**
 * Group Anagram（同字母逆序词）
 * @constructor
 */

// 方法一：将每个字符串进行排序，然后统计
function GroupAnagram(strs) {
  let map = new Map();
  for(let value of strs) {
    let sortedWord = value.split('').sort().join('');
    if(!map.has(sortedWord)) map.set(sortedWord, []);
    map.get(sortedWord).push(value);
  }
  let results = [];
  for (let [key, value] of map) {
    results.push(value);
  }
  return results;
}



// 方法二：将每个单词中的字母asc码对应在数组的位置加一，数组中的值全部相同的则为同一组。
function GroupAnagram2(strs) {
  let map = new Map();
  for(let value of strs) {
    let arr = new Array(26);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = 0;
    }
    value.split('').forEach(it => {
      arr[it.charCodeAt() - 'a'.charCodeAt()]++;
    });
    let totalCode = arr.reduce((pre, cur) => { pre = "" + pre + cur; return pre; }, '');
    console.log(totalCode);
    if(!map.has(totalCode)) map.set(totalCode, []);
    map.get(totalCode).push(value);
  }
  let results = [];
  for (let [key, value] of map) {
    results.push(value);
  }
  return results;
}

console.log(GroupAnagram2(["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"]));