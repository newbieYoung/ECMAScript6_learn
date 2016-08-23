/**
 * 修饰器
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