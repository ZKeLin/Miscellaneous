#### set matrix zeroes （设置矩阵0）
Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.
给定一个m*n的矩阵，如果一个元素为0，则设置它所在的行/列元素都为0；

> example1
```
Input: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
```

> example2
```
Input: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
Output: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
```

> 方法一: 
循环遍历整个矩阵，找到为0的元素，通过Set数据结构记录该元素所在的行和列，再次循环遍历整个矩阵，如果Set中包含该行/列，则该行/列元素全部设置为0。  
分析： 时间复杂度为O(m*n),空间复杂度: O(m+n)


> 方法二:
循环遍历整个矩阵，找到为0的元素，设置该元素对应到第一行，第一列的值为0`(m[2][3] == 0 ==> m[0][3] = 0, m[2][0] = 0)`; 再次遍历整个矩阵，第一行中为0元素设置对应整列的值为0，第一列中为0元素设置对应的整行的值为0；考虑一下如果原第一行，第一列有为0的值，则需要特殊记录并处理；该方法的特点是将内部为0的位置，对应到了第一行第一列的位置，最后只需要考虑第一行第一列为0的值就可以。

[代码](./Set_Matrix_Zeroes.js)