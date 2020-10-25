
class Tools {
  generaTreeByArr(arr, treeNode) {
    if(arr.length === 0) return null;
    let head = new treeNode(0, null, null);
    for(let i = 0; i < arr.length; i = 2 * i){
      let left = arr[i+1] ? new treeNode(arr[i + 1], null, null) : null;
      let right = arr[i+2] ? new treeNode(arr[i+2], null, null) : null;
      let tempTree = new treeNode(arr[i], left, right);
    }
  }
}


