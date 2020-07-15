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

#### 方法二(mao + 字母标示)

遍历该字符串数组，首先声明一个默认值都为0，长度为26的数组arr，将当前字母的asc码-a的asc码的值所在arr中的位置加一，遍历完成后将数组转换为字符串作为map的key值，只要是同字母逆序词key值一定相等。见[代码](./Group_Anagrams.js)中的`GroupAnagram2`;