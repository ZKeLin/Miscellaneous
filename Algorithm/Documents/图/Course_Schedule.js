/**
 * Course Schedule
 * https://leetcode.com/problems/course-schedule/
 */


function canFinish(numCourse, prerequisites) {
  let {graph, indegree} = buildGraph(numCourse, prerequisites);
  let count = 0, queue = [];
  for (let i = 0; i<indegree.length; i++) {
    if(indegree[i] === 0) queue.push(i); // 将入度为0的节点放到列表中
  }
  console.log(graph, indegree);
  while(queue.length !== 0) {
    let course = queue.pop();
    count++;
    for (let i = 0; i < numCourse; i++) {
      if(graph[course][i] !== 0){
        if(--indegree[i] === 0) {
          queue.push(i);
        }
      }
    }
  }
  return count === numCourse;
}

/**
 * 构建图
 * @param numCourse
 * @param prerequisites
 */
function buildGraph(numCourse, prerequisites) {
  let graph = [];
  let i = 0;
  while (i < numCourse) {
    graph.push(new Array(numCourse).fill(0));
    i++;
  }
  let indegree = new Array(numCourse).fill(0);
  for (let value of prerequisites) {
    let first = value[0];
    let last = value[1];
    if(graph[last][first] === 0){
      indegree[first]++;
    }
    graph[last][first] = 1;
  }
  return {
    graph,
    indegree
  };
}

console.log(canFinish(3, [[1,0],[1,2],[0,1]]));