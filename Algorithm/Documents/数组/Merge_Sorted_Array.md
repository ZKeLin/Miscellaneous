### Merge Sorted Array(合并排好序的数组)

Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
给定两个排好序的数组nums1和nums2，将nums2合并到nums1，使nums1依旧是 排还序的数组。

> Note:
 The number of elements initialized in nums1 and nums2 are m and n respectively.
 You may assume that nums1 has enough space (size that is equal to m + n) to hold additional elements from nums2.

```
Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
```

由于是两个已经排好序的两个数组，并且nums的长度正好是m+n的长度，所以从后往前循环比较nums2和nums1的值，比较大的值给到nums1相应的位置[见代码](Merge_Sorted_Array.js)