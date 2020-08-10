### Combination Sum

该种是一个系列，可以考虑用回溯法解题。  

回溯法（back tracking）（探索与回溯法）是一种选优搜索法，又称为试探法，
按选优条件向前搜索，以达到目标。但当探索到某一步时，发现原先选择并不优或达不到目标，就退回一步重新选择，这种走不通就退回再走的技术为回溯法，而满足回溯条件的某个状态的点称为“回溯点”。
有一种撞了南墙就回头换一种情况重新撞的感觉。

`Combination Sum`,`Combination Sum 2`和`Combination Sum 3`都可以通过回溯法求解，
大体的解题思路是利用递归的形式，使用一个临时数组来保存当前的循环的值，通过判断剩余和(remain)的值是不是恰好等于0,
如果等于0则将该临时数组放到容器中，如果小于0则直接退出当前函数(在推出当前函数时，remain的值会变成上一次函数的值，去重新遍历计算是否满足条件，正是递归会有该特性从而可以回溯)。

#### Combination Sum

Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

The same repeated number may be chosen from candidates unlimited number of times.

Note:
* All numbers (including target) will be positive integers.
* The solution set must not contain duplicate combinations.

```
Example 1:
Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]

Example 2:
Input: candidates = [2,3,5], target = 8,
A solution set is:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
```

#### Combination Sum 2

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

Each number in candidates may only be used once in the combination.

Note:
* All numbers (including target) will be positive integers.
* The solution set must not contain duplicate combinations.

```
Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8,
A solution set is:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]

Example 2:
Input: candidates = [2,5,2,1,2], target = 5,
A solution set is:
[
  [1,2,2],
  [5]
]
```

#### Combination Sum 3

Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.  

Note:  
   * All numbers will be positive integers.
   * The solution set must not contain duplicate combinations.
   

```
    example 1:
    Input: k = 3, n = 7
    Output: [[1,2,4]]

    example 2:
    Input: k = 3, n = 9
    Output: [[1,2,6], [1,3,5], [2,3,4]]
```