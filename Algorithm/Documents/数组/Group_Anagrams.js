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



// 方法二：将每个单词中的字母asc码相加，值相同的则为同一组。
function GroupAnagram2(strs) {
  let map = new Map();
  for(let value of strs) {
    let totalCode = value.split('').reduce((pre, cur) => { return pre + cur.charCodeAt(); }, 0);
    if(!map.has(totalCode)) map.set(totalCode, []);
    map.get(totalCode).push(value);
  }
  let results = [];
  for (let [key, value] of map) {
    results.push(value);
  }
  return results;
}

GroupAnagram2(["eat", "tea", "tan", "ate", "nat", "bat"]);