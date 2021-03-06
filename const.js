/**
 * 常量相关
 */
'use strict';
//const也用来声明并初始化常量，一旦声明，常量的值就不能改变。
{
	const PI = 3.1415926;
	//对常量的重新赋值，可能会报错可能不会报错，具体取决于编译环境。
	//PI = 2;//SyntaxError: "PI" is read-only
	console.log(PI);
}
//const的作用域与let命令相同：只在声明所在的块级作用域内有效。
{
	{
		//const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
		console.log(typeof KEY);//undefined
		const KEY = 3;
		//const声明的常量，也与let一样不可重复声明。
		//const KEY = 4;//TypeError: Duplicate declaration "KEY"
		console.log(KEY);
	}
	var KEY = 2;
	console.log(KEY);
}
//const常量不可变表示其指向的地址不可变，如果这个地址指向的是个对象，那么不能让该常量再指向其它对象了，但是当前对象的属性是可变的。
{
	const ME = {
		name:'liyang',
		year:'2016',
		age:25
	}
	console.log(ME.year+' '+ME.age);
	ME.year = '2017',
	ME.age = 26;
	console.log(ME.year+' '+ME.age);
	//ME = {};//SyntaxError: "ME" is read-only
}
//如果想让一个对象的属性不可更改，应该使用Object.freeze方法将其冻结，对于复杂对象还要冻结其对象属性
{
	const obj = Object.freeze({
		name:'liyang',
		age:24
	})
	//obj.age = '25';//Uncaught TypeError: Cannot assign to read only property 'age' of #<Object>
	console.log(obj.age);
}

// 在客户端中有效，NodJS中貌似无效
// ES6规定，var命令和function命令声明的全局变量，属于全局对象的属性；let命令、const命令、class命令声明的全局变量，不属于全局对象的属性
// var a = 'a';
// function consoleA(){//需要注意的是如果function是在块级作用域里边声明的则不属于全局变量，但是var就算是在块级作用域里边的声明的依然是全局变量
// 	var e = 'e';
// 	return e;
// }
// let b = 'b';
// const d = 'd';
// console.log('window.a='+window.a);
// console.log('window.consoleA->'+window.consoleA());
// console.log('window.e='+window.e);
// console.log('window.b='+window.b);
// console.log('window.d='+window.d);
