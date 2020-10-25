/**
 * Find All Anagrams in a String
 * https://leetcode.com/problems/find-all-anagrams-in-a-string/
 */

function findAnagrams(s, p) {
  let result = [];
  let pMap = new Map();
  for (let i = 0; i < p.length; i++) {
    let key = p[i];
    pMap.set(key, 1);
  }

  let start = 0, end = 0;
  let position = 0;

  while(position < s.length - pMap.size) {
    let currentChar = s[position];
    if(pMap.has(currentChar)){
      pMap.set(currentChar, pMap.get(currentChar) - 1);
      start = position;
      end = start + pMap.size;
      while(start <= end){
        start++;
        if(pMap.has(s[start]) && pMap.get(s[start]) != 1){

        }
      }
      if(pMap.get(currentChar)){

      }


    }


    position++;
  }
}