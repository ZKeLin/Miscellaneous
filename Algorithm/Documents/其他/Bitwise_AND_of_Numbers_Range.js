/**
 * 方法1，时间复杂度为O(n)
 * @param m
 * @param n
 * @return {number|*}
 */
function rangeBitwiseAnd1(m, n) {
  let result = m;
  if(m == 0){
    return 0;
  }
  if(m + 1 > n) {
    return m & n;
  }
  for (let i = m + 1; i <= n; i++) {
    result &= i;
  }
  return result;
}

/**
 * 方法2
 * 通过位运算左移右移，时间复杂度为m或者n的位数
 */
function rangeBitwiseAnd2(m, n) {
  if(m == 0){
    return 0;
  }
  let moveFactor = 1;
  while(m != n) {
    m >>= 1;
    n >>= 1;
    moveFactor <<= 1;
  }
  console.log(m, moveFactor);
  return m * moveFactor;
}


console.log(rangeBitwiseAnd2(2000, 2001));