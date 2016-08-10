/**
 * string
 */
'use strict';

//使用误区
{
	let name = 'liy';
	function showName(name){
		console.log(name);
	}
	showName(`${name}`);//可以充当函数参数
}

//标签模版其实不是模板，而是函数调用的一种特殊形式；“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。
{
	let a = 4;
	let b = 3;
	function tag(s,a,b){
		console.log(s);
		console.log(s[0]);
		console.log(s[1]);
		console.log(s[2]);
		console.log(a);
		console.log(b);
	}
	tag`Hello ${ a + b } world ${ a * b}`;
}

//模版字符串，是增强版的字符串，用反引号（`）标识
{
	console.log(`可以用来处理多行
		字符串`);
	console.log(`可以当成普通字符串`+'来处理');
	let ke = '可';
	let yi = '以';
	console.log(`${ke}${yi}嵌入变量`);
	console.log(`使用\`\$\{\}等模版字符串中的特殊字符需要使用反斜杠`);
	//注意模版字符串中声明变量会报错
	console.log(`大括号中可以放入任意JavaScript表达式，甚至是执行函数${setTimeout(function(){console.log('setTimeout');},1000)}`);
	function Person(name,age){
		this.name = name;
		this.age = age;
	}
	Person.prototype.toString = function(){//重写toString()方法
		return 'My name is '+this.name+' and I am '+this.age+' years old';
	}
	let liy = new Person('liy',24);
	console.log(`如果大括号中是对象则会默认调用对象的toString()方法${liy}`);

	console.log(`如果大括号里边的是字符串则${'照原样输出'}`);
	//使用函数在模版字符串中实现循环
	let data = { supplies: [ "broom", "mop", "cleaner" ] };
	function compile(data){
		var template = '';
		for(let i=0; i < data.supplies.length; i++) {
			template += `<li>${data.supplies[i]}</li>`;
		}
		return template;
	}
	let template = `<ul>${compile(data)}</ul>`;
	console.log(template);
}

//includes(), startsWith(), endsWith(), repeat()
{
	let str = 'hello world!';
	console.log(str.indexOf('hello'));
	console.log(str.includes('hello'));
	console.log(str.startsWith('hello'));
	console.log(str.endsWith('world!'));
	//这三个方法都支持第二个参数
	console.log(str.startsWith('llo',2));//第二个参数n表示从第n个位置开始
	console.log(str.includes('llo',2));
	console.log(str.endsWith('llo',5));//第二个参数n表示以第n个位置为截止
	console.log('hello'.repeat(3));
	console.log('小数会被取整'.repeat(2.2));//小数会被取整，其它不能转换成正整数的类型（比如：负整数、Infinity）就会报错
	console.log('NaN会被当成0'.repeat(NaN));//NaN会被当成0处理，某个字符串重复0次得到空字符串''
}

//JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。
{
	console.log('\uD842\uDFB7');

	//ES6中只要将码点放入大括号，就能按Unicode正确解读该字符
	let hello = 123;
	console.log(hell\u{6F});
	console.log('\u{1F680}' === '\uD83D\uDE80');

	let str1 = '𠮷';//汉字“𠮷”的码点是0x20BB7（十进制为134071），UTF-16编码为0xD842 0xDFB7（十进制为55362 57271）
	console.log(str1.length);
	console.log(str1.charAt(0));
	console.log(str1.charAt(1));
	console.log(str1.charCodeAt(0));//55362
	console.log(str1.charCodeAt(1));//57271
	//codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法
	console.log(str1.codePointAt(0));//134071
	let str2 = '我';//也就是说有的汉字长度算1有的算2
	console.log(str2.length);
	console.log(str2.charAt(0));
	console.log(str2.charCodeAt(0));
	console.log(str2.codePointAt(0));//对于那些两个字节储存的常规字符，codePointAt的返回结果与charCodeAt方法相同
	console.log(String.fromCharCode(134071));
	console.log(String.fromCodePoint(134071));

	let str = '我𠮷';
	//正常遍历不能识别Unicode码点大于0xFFFF的字符
	for(let i=0;i<str.length;i++){
		console.log(str[i]);
		console.log(str.charAt(i));
	}
	//for of遍历可以识别Unicode码点大于0xFFFF的字符
	for(let str of '我𠮷'){
		console.log(str);
	}
}