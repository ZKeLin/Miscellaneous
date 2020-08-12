
function largestRectangle(heights) {
  if(heights.length == 0){
    return 0;
  }
  let max = 0;
  for(let i = 0; i < heights.length; i++) {
    let j = i;
    let height = heights[i];
    while(j < heights.length) {
      if(heights[j] < height) {
        height = heights[j];
      }
      // console.log(height, i, j);
      max = Math.max(max, height * (j - i + 1));
      j++;
    }
  }
  return max;
}

console.log(largestRectangle([4,2,3]));