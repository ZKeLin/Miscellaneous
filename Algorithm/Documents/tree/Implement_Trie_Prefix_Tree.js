/**
 * Implements Trie(Prefix Tree)
 * https://leetcode.com/problems/implement-trie-prefix-tree/
 */

function TrieNode(c) {
  this.val = c;
  this.children = new Array(26).fill(null);
  this.isWord = false; //通过该标志记录当前的序列单词是不是一个单词，为了和startWith区别
}
/**
 * Initialize your data structure here.
 */
function Trie() {
  this.root = new TrieNode(' ');
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
  let currentNode = this.root;
  for(let i = 0; i < word.length; i++) {
    let index = word[i].charCodeAt(0) - 'a'.charCodeAt(0);
    if(currentNode.children[index] === null){
      let trieNode = new TrieNode(word[i]);
      currentNode.children[index] = trieNode;
    }
    console.log(currentNode, index);
    currentNode = currentNode.children[index];
  }
  currentNode.isWord = true;
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
  let currentNode = this.root;
  for(let i = 0; i < word.length; i++) {
    let index = word[i].charCodeAt(0) - 'a'.charCodeAt(0);
    if(currentNode.children[index] === null) {
      return false;
    }
    currentNode = currentNode.children[index];
  }
  return currentNode.isWord;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
  let currentNode = this.root;
  for(let i = 0; i < prefix.length; i++) {
    let index = prefix[i].charCodeAt(0) - 'a'.charCodeAt(0);
    if(currentNode.children[index] === null) {
      return false;
    }
    currentNode = currentNode.children[index];
  }
  return true;
};

/**
 * Your Trie object will be instantiated and called as such:
 *
 */
let word = 'apple';
let obj = new Trie();
obj.insert(word);
let param_2 = obj.search(word);
let param_3 = obj.startsWith('b');

console.log(param_2, param_3);

