/**
 * Queue Reconstruction by Height
 * https://leetcode.com/problems/queue-reconstruction-by-height/
 * https://leetcode-cn.com/problems/queue-reconstruction-by-height/comments/
 */

function reconstruction(people) {
  people.sort((a, b) => {
    return a[0] === b[0] ? a[1] - b[1] : b[0] - a[0];
  });
  people.reverse();
  let markArr = new Array(people.length); // 从0到people长度的序号
  for (let i = 0; i < markArr.length; i++) markArr[i] = i;
  let tempArr = [];
  for (let i = 0; i < people.length; i++) { // 每个人从markArr中根据k值取号，取完以后markArr要及时的删掉当前取得号
    let k = people[i][1];
    let position = markArr[k];
    markArr.splice(k, 1);
    tempArr[position] = people[i];
  }
  return tempArr;
}

console.log(reconstruction([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]));