/**
 * 双向链表
 * @constructor
 */

function DLinkNode() {
  this.key;
  this.value;
  this.pre;
  this.next;
}

let head, tail;

// 添加node的时候往头部添加
function addNode(node) {
  node.pre = head;
  node.next = head.next;

  head.next.pre = node;
  head.next = node;

}

// 删除node
function removeNode(node) {
  let pre = node.pre;
  let next = node.next;

  pre.next = next;
  next.pre = pre;
}

// 将节点移动到头部
function moveToHead(node) {
  removeNode(node);
  addNode(node);
}

// 队尾元素移除
function tailToPop() {
  let pre = tail.pre;

  removeNode(pre);
  return pre;
}


function LRUCache(capacity) {
  this.capacity = capacity;
  this.count = 0;
  this.cache = new Map();
  head = new DLinkNode();
  head.pre = null;
  tail = new DLinkNode();
  tail.next = null;

  head.next = tail;
  tail.pre = head;
}

LRUCache.prototype.put = function (key, value) {
  if(this.cache.has(key)){
    let node = this.cache.get(key);
    node.value = value;
    moveToHead(node);
  }else{
    let node = new DLinkNode();
    node.key = key;
    node.value = value;
    this.cache.set(key, node);

    addNode(node);
    this.count++;
    if(this.count > this.capacity){
      let node = tailToPop();
      this.cache.delete(node.key);
      this.count--;
    }
  }
};

LRUCache.prototype.get = function (key) {
  if(!this.cache.has(key)){
    return -1;
  }
  let node = this.cache.get(key);
  moveToHead(node);

  return node.value;
};


let cache = new LRUCache( 2 /* capacity */ );

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.cache);
console.log(cache.get(1));       // returns 1
cache.put(3, 3);    // evicts key 2
console.log(cache.get(2));       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
console.log(cache.get(1));       // returns -1 (not found)
console.log(cache.get(3));      // returns 3
console.log(cache.get(4));       // returns 4

