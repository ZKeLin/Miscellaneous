/**
 * Best_Time_To_Buy_And_Sell_Stock_
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
 */

function maxProfit(prices) {
  let i = 0, maxIndex = 0, minIndex = 0, maxProfit = 0;
  while(i < prices.length) {
    if(prices[minIndex] > prices[i]){
      minIndex = i;
      maxIndex = i;
    }
    if(prices[maxIndex] < prices[i] && i > minIndex){
      maxIndex = i;
    }
    if(maxIndex > minIndex && prices[maxIndex] - prices[minIndex] > maxProfit){
      maxProfit = prices[maxIndex] - prices[minIndex];
    }
    i++;
  }
  return maxProfit;
}

console.log(maxProfit([7,1,5,3,6,4]));