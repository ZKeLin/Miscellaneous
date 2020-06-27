#### First Missing Position (第一个不在正确位置的数)

Given an unsorted integer array, find the smallest missing positive integer.   
给定一个乱序的整型数组，找到最小的不在正确位置的值。   

```
example1:
Input: [1,2,0]
Output: 3
```

```
example2:
Input: [3,4,-1,1]
Output: 2
```

```
example3:
Input: [7,8,9,11,12]
Output: 1
```

> 解题思路:  
  将数组中的每个大于0并且小于数组长度的值与位置(位置是从1开始的)相对应起来，比如数组`[4,3,2,1]`对应后的数组为`[1,2,3,4]`,在比如`[4,3,-1,1] => [1,-1,3,4]`,如果当前位置上的值跟当前位置不相等，则返回该位置，否则返回数组长度 + 1;
  
[代码](./First_Missing_Position.js)

