/**
 * Longest Palindromic Substring
 * 最长回文子串
 * @constructor
 * @return {string}
 */

function LongestPalindromicSubstring(str) {
  if (!str) return '';
  let start = 0, end = 0;
  for (let i = 0; i < str.length; i++) {
    let len1 = getPalindromicLength(str, i, i); // 为了获取中心点为一个字符的回文 eg: aba, abcba
    let len2 = getPalindromicLength(str, i, i + 1); // 为了获取中心点为两个字符的回文数 eg: abba, abccba
    let len = Math.max(len1, len2);
    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2)
    }
  }
  return str.substring(start, end + 1);
}

function getPalindromicLength(str, left, right) {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    left--;
    right++
  }
  return right - left - 1;
}

console.log(LongestPalindromicSubstring('cbba'));
