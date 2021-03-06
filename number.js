'use strict';
//八进制和二进制表示
{
	let num8 = 0o767;
	console.log(num8);
	let num2 = 0b111110111;
	console.log(num2);
	let num10 = 503;
	console.log(num10===num8);//不同进制只要值相等就是恒等的
}

//Number.isFinite(), Number.isNaN()检查Infinite和NaN这两个特殊值
{
	console.log(Number.isFinite(1));
	console.log(Number.isFinite(Infinity));
	console.log(Number.isFinite(-Infinity));
	console.log(Number.isNaN(2));
	console.log(Number.isNaN(NaN));
	console.log(Number.isNaN(-NaN));
	//它们与传统的全局方法isFinite()和isNaN()的区别在于，传统方法先调用Number()将非数值的值转为数值，再进行判断，而这两个新方法只对数值有效，非数值一律返回false。
	console.log(Number.isFinite('3'));
	console.log(Number.isNaN('4'));
}

//ES6将全局方法parseInt()和parseFloat()，移植到Number对象上面，行为完全保持不变。
{
	console.log(Number.parseFloat('123.abc123'));
	console.log(Number.parseFloat('123.123'));
	console.log(Number.parseInt('123.abc123'));
	//这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。
	console.log(Number.parseFloat===parseFloat);
	console.log(Number.parseInt === parseInt);
}

//Number.isInteger()用来判断一个值是否为整数。需要注意的是，在JavaScript内部，整数和浮点数是同样的储存方法，所以3和3.0被视为同一个值。
{
	console.log(Number.isInteger(3));
	console.log(Number.isInteger(3.0));
}

//Number.EPSILON新增一个极小的常量Number.EPSILON在于为浮点数计算，设置一个误差范围。
{
	let num1 = 0.1;
	let num2 = 0.2;
	let num3 = 0.3;
	let num4 = num1+num2;
	console.log(num4);
	console.log(Number.EPSILON);
	console.log(Math.abs(num3-num4)<=Number.EPSILON);
}

//安全整数和Number.isSafeInteger()，JavaScript能够准确表示的整数范围在-2^53到2^53之间（不含两个端点），超过这个范围，无法精确表示这个值。
//ES6引入了Number.MAX_SAFE_INTEGER和Number.MIN_SAFE_INTEGER这两个常量，用来表示这个范围的上下限。
//Number.isSafeInteger()则是用来判断一个整数是否落在这个范围之内。
{
	console.log('Number.isSafeInteger、Number.MAX_SAFE_INTEGER、Number.MIN_SAFE_INTEGER');
	console.log(Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1);
	console.log(Number.MIN_SAFE_INTEGER === -(Math.pow(2, 53) - 1));
	console.log(Number.isSafeInteger('a')); // false
	console.log(Number.isSafeInteger(null)); // false
	console.log(typeof NaN);
	console.log(Number.isSafeInteger(NaN)); // false
	console.log(Number.isSafeInteger(Infinity)); // false
	console.log(Number.isSafeInteger(-Infinity)); // false

	console.log(Number.isSafeInteger(3)); // true
	console.log(Number.isSafeInteger(1.2)); // false
	console.log(Number.isSafeInteger(9007199254740990)); // true
	console.log(Number.isSafeInteger(9007199254740992)); // false

	console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)); // false
	console.log(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)); // true
	console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)); // true
	console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)); // false
}

//ES6在Math对象上新增了17个与数学相关的方法
{
	console.log('Math方法');
	//Math.trunc方法用于去除一个数的小数部分，返回整数部分
	console.log(Math.trunc(4.312));
	//Math.round四舍五入返回整数
	console.log(Math.round(1234.56));
	//Math.sign方法用来判断一个数到底是正数、负数、还是零
	console.log(Math.sign(-4));
	console.log(Math.sign(4));
	console.log(Math.sign(1.23));
	console.log(Math.sign(-0.123));	
}