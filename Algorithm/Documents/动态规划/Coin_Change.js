/**
 * Coin Change
 * https://leetcode.com/problems/coin-change/solution/
 */

function coinChange(coins, amount) {
  let max = amount + 1;
  let dp = new Array(amount + 1).fill(max);
  dp[0] = 0;

  for(let i = 1; i <= amount; i++) {
    for (let j = 0; j < coins.length; j++) {
      if(coins[j] <= i){
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
}

console.log(coinChange([1, 2, 5], 2));