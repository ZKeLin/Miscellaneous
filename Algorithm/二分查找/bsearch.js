//二分查找


function bsearch(arr,value,len){

	let low = 0;
	let high = len;
	while(low <= high){
		let mid = (low + high) >> 1;
		console.log(mid);
		if(arr[mid] == value){
			return mid;
		}else if(value < arr[mid]){
			high = mid - 1;
		}else{
			low = mid + 1;
		}
	}

	return -1;
}

//利用二分法实现求平方根

function sqrt_b(value,jq){
	let low = 0;
	let high = Math.max(value,1.0); //可以求小于1大于0的平方根
	let mid = value / 2;
	while(Math.abs(mid * mid - value) > jq){
		if(mid * mid == value){
			return mid;
		}else if(mid * mid < value){
			low = mid;
		}else{
			high = mid;
		}
		mid = (low + high) / 2;
	}
	return mid;
}







