/**
 * happy number
 */
function isHappy(n) {
  let slow = n, fast = n;
  do{
    slow = digitSquareSum(slow);
    fast = digitSquareSum(fast);
    fast = digitSquareSum(fast);
    console.log(slow, fast);
  }while (slow !== fast); // 利用了happy number是一个环的特性，从而使用 弗洛伊德循环检测算法（Floyd Cycle detection algorithm），一块一慢最终相遇说明有环。
  return slow === 1;

}

function digitSquareSum(n) {
  let sum = 0, temp;
  while(n !== 0) {
    temp = n % 10;
    sum += temp * temp;
    n = Math.floor(n / 10)

  }
  return sum;
}

isHappy(24);