/**
 * let
 */
'use strict';

//let声明的变量只在它所在的代码块有效
{
	{
		let a = 'let';
		var b = 'var';
	}
	console.log(b);
	//console.log(a);//Uncaught ReferenceError: a is not defined
}

//变量提升 只是提升变量的声明，并不会把赋值也提升上来
{
	var tmp = new Date();
	function f(){
	  	console.log(typeof tmp);//undefined
	    var tmp = "hello world";
	}
	f()
}

//Not work in babel-node
//let不存在变量提升
{	
	console.log(typeof foo);//Uncaught ReferenceError: foo is not defined
	let foo = 2;
}

//Not work in babel-node
//暂时性死区，即在块作用域中如果存在let声明的变量，那么就算该变量在上一级作用域有定义，依然不能在声明前使用
{
	var temp = 2;
	if(true){
		console.log(temp);//Uncaught ReferenceError: temp is not defined
		let temp = 3;
	}
}

//let不允许在相同作用域内，重复声明同一个变量
{
	if(true){
		let a = 2;
		//let a = 3;//Uncaught SyntaxError: Identifier 'a' has already been declared

		let b = 3;
		//var b = 4;//Uncaught SyntaxError: Identifier 'b' has already been declared
	}
}

//在ES6中有块级作用域之后funtion声明符合块级作用域规则，但是var声明依然不符合
{
	console.log(tmp);
	//console.log(f());//Uncaught ReferenceError: f is not defined
}

//在ES5中运行会得到'I am inside'，因为存在函数提升，函数声明都会提升到当前作用域的顶部，得到执行；
//在ES6中运行会得到'I am outside'，ES6支持块级作用域，不管会不会进入if代码块，其内部声明的函数皆不会影响到作用域的外部。
{
	function f() { console.log('I am outside!'); }
	(function () {
		if(false) {
			// 重复声明一次函数f
			function f() { console.log('I am inside!'); }
		}
		f();
	}());
}

//let可以实现一些需要通过闭包才能实现的功能
{
	for(let i=0;i<5;i++){
		setTimeout(function(){
			console.log(i);
		},i*1000)
	}
	for(var i=0;i<5;i++){
		(function(index){
			setTimeout(function(){
				console.log(index);
			},i*1000);
		})(i)
	}
}

