/**
 * Word Break
 * https://leetcode.com/problems/word-break/
 * @param s
 * @param wordDict
 */
function wordBreak(s, wordDict) {
  let dp = new Array(s.length+1).fill(false);
  dp[0] = true;

  for(let i = 1; i <= s.length; i++) {
    for(let j = 0; j < i; j++) {
      let word = s.slice(j, i);
      console.log(j, i, word);
      if(dp[j] === true && wordDict.includes(word)){
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}


// console.log(wordBreak('leetcode', ['leet', 'code']));
console.log(wordBreak('applepenapple', ["apple", "pen"]));