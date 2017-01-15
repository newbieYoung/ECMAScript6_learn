/**
 * 装饰器
 * 本质是利用了ES5的Object.defineProperty属性来实现的装饰器模式
 */
'use strict';
//修饰类
{
	@decorator
	class Component{

	}
	function decorator(target){
		target.hello = function(){
			console.log('hello i am Component decorated by decorator');
		};	
	}
	let component = new Component();
	component.hello();
}