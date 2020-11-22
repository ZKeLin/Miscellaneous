/**
 * 课程表II
 * https://leetcode-cn.com/problems/course-schedule-ii/
 * @param {} numCourses 
 * @param {*} prerequisites 
 */

function findOrder(numCourses, prerequisites) {
  let entry = [];
  // 存储每个课程的入度
  let indeg = new Array(numCourses).fill(0);
  // 存储有向图
  let edges = new Array(numCourses);
  for (let i = 0; i < numCourses; i++) {
    edges[i] = [];
  }
  for (let i = 0; i < prerequisites.length; i++) {
    let requistite = prerequisites[i];
    edges[requistite[1]].push(requistite[0]);
    indeg[requistite[0]]++;
  }

  for (let i = 0; i < numCourses; i++) {
    if (indeg[i] === 0) {
      entry.push(i);
    }
  }
  let result = [];
  while (entry.length > 0) {
    let lastElement = entry.pop();
    result.push(lastElement);
    for (let value of edges[lastElement]) {
      indeg[value]--;
      if (indeg[value] === 0) {
        entry.unshift(value);
      }
    }
  }
  if (result.length !== numCourses) {
    return [];
  }
  return result;
}

// console.log(findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]]));
console.log(findOrder(2, [[1, 0]]));
