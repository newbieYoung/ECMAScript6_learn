/**
 * 数组相关
 */
'use strict';
//concat把传入的数组或非数组值与原数组合并,组成一个新的数组并返回
{
	let arr1 = [1,2];
	let arr2 = [3,4];
	console.log(arr1.concat(arr2));
}
//reverse把数组元素顺序颠倒
{
	let array = [0,1,2,3,4];
	console.log(array.reverse());
	console.log(array);
}
//map把数组中的每个元素按某个逻辑处理，并把新的值按顺序组成一个新的数组
{
	let array = ['a','b','c','d'];
	function toUpperCase(str){
		return str.toUpperCase();
	}
	console.log(array.map(toUpperCase));
	console.log(array);
}
//filter查找数组中满足条件的元素，并把这些按顺序组成一个新的数组
{
	let array = [1,2,3,4,5,6,7];
	function biggerThanFive(num){
		return num>5;
	}
	console.log(array.filter(biggerThanFive));
	console.log(array);
}
//some用某个方法查找数组中是否存在满足条件的元素
{
	let bigArray = [1,2,3,4,5,6];
	let thinArray = [1,2,3];
	function biggerThanThree(num){
		return num>3;
	}
	console.log(bigArray.some(biggerThanThree));
	console.log(thinArray.some(biggerThanThree));
}
//every用某个方法查找数组中的元素是否全满足某个条件
{
	let bigArray = [5,6,7,8,9];
	let thinArray = [1,2,3,4];
	function biggerThanFour(num){
		return num>4;
	}
	console.log(bigArray.every(biggerThanFour));
	console.log(thinArray.every(biggerThanFour));
}
//Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
{
	let arrayLike = {
		'0':0,
		'1':1,
		'2':2,
		length:3//类数组中必须具有length属性
	}
	/**
	 * 类数组转换成数组的主要步骤是：
	 * 根据length得到数组长度，然后遍历对象，如果属性值转换成数值之后在数组长度之内就会赋值否则不会。
	 */
	console.log(Array.from(arrayLike));
	//只要是部署了Iterator接口的数据结构，Array.from都能将其转为数组
	console.log(Array.from('hello'));
	let set = new Set(['a', 'b']);
	console.log(Array.from(set));
	//Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
	console.log(Array.from(arrayLike, x => x * x));
}
//Array.of方法用于将一组数量大于等于3的值，转换为数组。
{
	console.log(Array.of(3, 11, 8));
	console.log(Array.of(3));
	console.log(Array.of());
	//在严格模式下Array方法并不存在重载现象
	console.log(new Array(3,11,8));
	console.log(new Array(3));
	console.log(new Array());
}