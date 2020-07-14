/**
 * Merge Intervals
 * @constructor
 */

function MergeIntervals(intervals) {
  // 首先将数组按照小值排序
  let sortedIntervals = intervals.sort((a, b) => { return a[0] - b[0]});
  if(sortedIntervals.length <= 0){ return sortedIntervals; }

  let tempInterval = sortedIntervals[0], mergeIntervals = [];
  mergeIntervals.push(tempInterval); //由于下面的循环会把第一个merge好的数据忽略掉，所以先push进去第一个值，因为后面tempInterval的值会改变(存的是引用，而不是拷贝)，所以会影响到第一个push进去的值，改变的值正好是正确的值
  for (let i = 0; i < sortedIntervals.length; i++) {
    if(tempInterval[1] >= sortedIntervals[i][0]) {
      tempInterval[1] = Math.max(tempInterval[1], sortedIntervals[i][1]);
    } else {
      tempInterval = sortedIntervals[i];
      mergeIntervals.push(tempInterval);
    }
  }
  return mergeIntervals;
}

console.log(MergeIntervals([[1,4],[0,4]]));
