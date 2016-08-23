/**
 * JavaScript的对象（Object），本质上是键值对的集合（Hash结构），但是只能用字符串当作键，这给它的使用带来了很大的限制；
 * ES6提供了Map数据结构，它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键；
 * 也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。
 */
'use strict';
//基本使用
{
	//Map也可以接受一个数组作为参数
	let map = new Map([['name','liy'],['age',24]]);
	console.log(map.get('name'));
	console.log(map.has('age'));
	//如果对同一个键多次赋值，后面的值将覆盖前面的值
	map.set('name','tsm');
	console.log(map.get('name'));
	//只有对同一个对象的引用，Map结构才将其视为同一个键
	let array1 = ['a'];
	let array2 = ['a'];
	let array3 = array1;
	map.set(array1,'array1');
	map.set(array2,'array2');
	console.log(map.get(array1));
	console.log(map.get(array2));
	map.set(array3,'array3');
	console.log(map.get(array1));
	console.log(map.get(array2));
	console.log(map.get(array3));
	console.log(map.size);
}
//map遍历
{
	console.log('遍历');
	let map = new Map([['name','liy'],['age',24],['address','深圳']]);
	//keys返回一个键名的遍历器
	for(let key of map.keys()){
		console.log(key);
	}
	//values返回一个键值的遍历器
	for(let value of map.values()){
		console.log(value);
	}
	//entries返回一个键值对的遍历器
	for(let entry of map.entries()){
		console.log(entry);
	}
	//Map结构的默认遍历器接口（Symbol.iterator属性），就是entries方法
	console.log(map[Symbol.iterator] === map.entries);
}
/**
 * WeakMap结构与Map结构基本类似，
 * 区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制；
 * 另外就算集合中有元素其size属性总是为undefined
 * 主要用途和WeakSet类似
 */
{
	let obj = {};
	let wmap = new WeakMap();
	//wmap.set(1, 2);//TypeError: Invalid value used as weak map key
	//wmap.set(Symbol(), 2);//TypeError: Invalid value used as weak map key
	wmap.set(obj,'obj');
	console.log(wmap.get(obj));
	console.log(wmap.size);//undefined
}