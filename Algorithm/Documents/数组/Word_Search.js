/**
 * word search dfs + backtrace
 */

function wordSearch(board, word) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if(dfs(board, i, j, word)) {
        return true;
      }
    }
  }
  return false;
}

function dfs(board, i, j, word) {
  if(word.length === 0) {
    return true;
  }
  console.log(i, j, word);
  if(i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] !== word[0]) {
    return false;
  }
  console.log(board[i][j], word);
  let temp = board[i][j];
  board[i][j] = '*';
  let result = dfs(board, i-1, j, word.substring(1, word.length)) || dfs(board, i+1, j, word.substring(1, word.length))
  || dfs(board, i, j-1, word.substring(1, word.length)) || dfs(board, i, j+1, word.substring(1, word.length));
  board[i][j] = temp;
  return result;
}

console.log(wordSearch([
  ['A', 'B', 'C', 'E'],
  ['S', 'F', 'C', 'S'],
  ['A', 'D', 'E', 'E']
], "ABCCED"));