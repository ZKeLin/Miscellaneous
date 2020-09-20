/**
 * Find Median from Data Stream
 * https://leetcode.com/problems/find-median-from-data-stream/submissions/
 */
/**
 * initialize your data structure here.
 */
const MedianFinder = function() {
  this.maxHeap = [];
  this.minHeap = [];
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  heapPushItem(this.maxHeap, num);
  heapPushItem(this.minHeap, heapPopItem(this.maxHeap), false);

  if(this.maxHeap.length < this.minHeap.length){
    heapPushItem(this.maxHeap, heapPopItem(this.minHeap, false));
  }
  // console.log(this.maxHeap, this.minHeap);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  return this.maxHeap.length > this.minHeap.length ? this.maxHeap[0] : (this.maxHeap[0] + this.minHeap[0]) * 0.5;
};

/**
 * 往堆中push
 * @param heap
 * @param item
 */
function heapPushItem(heap, item, isMaxHeap = true) {
  let index = heap.length;
  heap.push(item);
  while(true) {
    let parentIndex = (index - 1) >>> 1;
    let parent = heap[parentIndex];
    if(parent !== undefined && (isMaxHeap && parent < item || !isMaxHeap && parent > item)){
      heap[parentIndex] = item;
      heap[index] = parent;
      index = parentIndex;
    }else{
      return;
    }
  }
}

/**
 * 堆中取元素
 */
function heapPopItem(heap, isMaxHeap = true){
  let first = heap[0];
  if(first !== undefined){
    const last = heap.pop(); // 取最后一个值补到第一个，是不是为了防止数组过多的移动元素
    if(first !== last){
      heap[0] = last;
      let index = 0;
      const length = heap.length;
      while(index < length) {
        const leftIndex = (index + 1) * 2 - 1;
        const left = heap[leftIndex];
        const rightIndex = leftIndex + 1;
        const right = heap[rightIndex];

        if(left !== undefined && (isMaxHeap && left > last || !isMaxHeap && left < last) ) {
          if(right !== undefined && (isMaxHeap && right > left || !isMaxHeap && right < left)){
            heap[index] = right;
            heap[rightIndex] = last;
            index = rightIndex;
          }else{
            heap[index] = left;
            heap[leftIndex] = last;
            index = leftIndex;
          }
        }else if(right !== undefined && (isMaxHeap && right > last || !isMaxHeap && right < last)){
          heap[index] = right;
          heap[rightIndex] = last;
          index = rightIndex;
        }else{
          return first;
        }
      }
    }else{
      return first;
    }
  }

}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// let maxHeap = [];
// let minHeap = [];
//
// heapPushItem(maxHeap, 3)
// heapPushItem(maxHeap, 2)
// heapPushItem(maxHeap, 5)
// heapPushItem(maxHeap, 10)
// heapPushItem(maxHeap, 9)
// heapPushItem(minHeap, 2, false)
// heapPushItem(minHeap, 3, false)
// heapPushItem(minHeap, 5, false)
//
// console.log(heapPopItem(maxHeap));
// console.log(heapPopItem(minHeap, false));

let obj = new MedianFinder();
obj.addNum(2);
obj.addNum(4);
obj.addNum(6);
obj.addNum(10);
obj.addNum(19);
obj.addNum(20);

console.log(obj.maxHeap, obj.minHeap);