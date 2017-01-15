'use strict';
//proxy构造
{
	let proxy = new Proxy({},{
		get:function(target,property){
			return Math.floor(Math.random()*256);
		}
	});
	console.log(proxy.name);
	console.log(proxy.age);
}