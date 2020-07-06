/***
 * 查找中位数
 */

const findMedianFromTwoSortedArray = function (nums1, nums2) {
    let m = nums1.length, n = nums2.length;
    if (m > n) { // 确保m <= n;
        let temp1 = nums2;
        nums2 = nums1;
        nums1 = temp1;
        let temp2 = m;
        m = n;
        n = temp2;
    }

    let iMin = 0, iMax = m, halfLen = Math.floor((m + n + 1) / 2);

    while (iMin <= iMax) {
        let i = Math.floor((iMin + iMax) / 2);
        let j = halfLen - i;
        if (i > iMin && nums1[i - 1] > nums2[j]) {
            iMax = i - 1; // i 太大了，需要减小i的值
        } else if (i < iMax && nums2[j - 1] > nums1[i]) {
            iMin = i + 1;
        } else {
            console.log(i, j);
        
            let leftMax = 0;
            if(i === 0){
                leftMax = nums2[j - 1];
            }else if(j === 0){
                leftMax = nums1[i - 1];
            }else{
                leftMax = Math.max(nums2[j - 1],nums1[i - 1])
            }
            if((m + n) % 2 !== 0) return leftMax;
            let rightMin = 0;

            if(i == m){
                rightMin = nums2[j];
            }else if(j == n){
                rightMin = nums1[i];
            }else{
                rightMin = Math.min(nums2[j], nums1[i])
            }
            console.log(leftMax, rightMin);
            
            return (leftMax + rightMin)/2
        }
    }

};

console.log(findMedianFromTwoSortedArray([1, 2], [3, 4]));
