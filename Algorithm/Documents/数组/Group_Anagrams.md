### Group Anagrams(同字母逆序词)

description: Given an array of strings, group anagrams together.（给定一个字符串数组，将是同字母逆序的字符串分到相同组中）;

example:
```
Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
```

#### 方法一(map + 排序)

遍历该字符串数组，将当前字符串进行排序，将排好序的字符串收集到`map`中,见[代码](./Group_Anagrams.js)中的`GroupAnagram`;

#### 方法二(mao + asc码)

遍历该字符串数组，将当前字符串中的每个字符相加(由于26个小写字母的asc码都是唯一的)，如果相加后的值相同说明为同字母逆序词。见[代码](./Group_Anagrams.js)中的`GroupAnagram2`;