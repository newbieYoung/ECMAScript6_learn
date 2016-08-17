/**
 * 自定义promise，模拟实现ES6 Promise对象
 */
'use strict';

/**
 * {
 * 		_status
 * 		_resolveArr
 * 		_rejectArr
 * }
 */
class SelfPromise{
	constructor(func){
		this._status = 'pending';
		//没有考虑resolve或者reject的返回值也是一个promise对象的情况
		let resolve = (params)=>{
			this._status = 'fulfilled';
			for(let i=0;i<this._resolveArr.length;i++){
				this._resolveArr[i](params);
			}
		};
		let reject = (params)=>{
			this._status = 'rejected';
			for(let i=0;i<this._rejectArr.length;i++){
				this._rejectArr[i](params);
			}
		};
		func(resolve,reject);
	}
	then(resolve,reject){
		if(!this._resolveArr){
			this._resolveArr = [];
		}
		this._resolveArr.push(resolve);
		if(!this._rejectArr){
			this._rejectArr = [];
		}
		this._rejectArr.push(reject);
		return this;
	}
}

//测试
function timeout(ms) {
	return new SelfPromise((resolve, reject) => {
		if(ms%2===0){
			setTimeout(function(){
				resolve(`resolve ${ms}`);
			},ms);
		}else{
			setTimeout(function(){
				reject(`reject ${ms}`);
			},ms);
		}
	});
}

timeout(1000).then(function(value){
	console.log(value);
},function(error){
	console.log(error);
});
