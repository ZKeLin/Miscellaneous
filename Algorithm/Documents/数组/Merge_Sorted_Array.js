/**
 * 合并已排好序的数组
 */

const merge = function (nums1, m, nums2, n) {
  let len = m + n;
  m--; n--;
  while(len > 0) {
    len--;
    if(n < 0 || nums1[m] > nums2[n]){
      nums1[len] = nums1[m--];
    }else{
      nums1[len] = nums2[n--];
    }
  }
}

let nums1 = [1,2,3,0,0,0], m = 3;
let nums2 = [2,5,6],       n = 3;
merge(nums1, m, nums2, n);
console.log(nums1);