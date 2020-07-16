
function BuyAndSellStock(prices) {
  let stack = [];
  let i = 0;
  let profit = 0;
  while(i < prices.length) {
    if(stack.length > 0 && prices[i] < stack[stack.length - 1]) {
      console.log(stack);
      profit += stack[stack.length - 1] - stack[0];
      stack = [];
    }
    stack.push(prices[i]);
    i++;
  }
  if(stack.length !== 0){
    profit += stack[stack.length - 1] - stack[0];
  }
  return profit;
}

console.log(BuyAndSellStock([7,6,4,3,1]));