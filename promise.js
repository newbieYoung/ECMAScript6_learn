/**
 * promise
 */
//简单使用例子
{
	function timeout(ms) {
		return new Promise((resolve, reject) => {
			if(ms%2===0){
				setTimeout(function(){
					resolve(`resolve1 ${ms}`);
				},ms);
			}else{
				setTimeout(function(){
					reject(`reject1 ${ms}`);
				},ms);
			}
		});
	}

	timeout(1000).then(function(value){
		console.log(value);
	},function(error){
		console.log(error);
	});

	timeout(2001).then(function(value){
		console.log(value);
	},function(error){
		console.log(error);
	});

	//一般来说，不要在then方法里面定义Reject状态的回调函数（即then的第二个参数），总是使用catch方法
	timeout(3001).then(function(value){
		console.log(value);
	}).catch(function(error){
		console.log(`catch ${error}`);
	});

	let p1 = timeout(200);
	let p2 = timeout(600);
	let p3 = timeout(400);
	let p4 = timeout(4001);

	Promise.all([p1,p2,p3,p4]).then(function(value){
		console.log(value);
	}).catch(function(error){
		console.log(error);
	});

	Promise.race([p1,p2,p3,p4]).then(function(value){
		console.log(value);
	}).catch(function(error){
		console.log(error)
	});

	let promise = new Promise(function (resolve){
	    console.log('inner promise'); // 1
	    resolve(42);
	});
	promise.then(function(value){
	    console.log(value); // 3
	});
	console.log('outer promise'); // 2
}
//promise结合generator使用，按顺序处理任务流
{
	function task(name){
		return new Promise((resolve,reject)=>{
			setTimeout(function(){
				resolve(name);
			},1000);
		});
	}
	function showName(name){
		console.log('generator '+name);
		g.next();
	}
	function* generator(list){
		for(let name of list){
			yield task(name).then(showName);
		}
	}
	let g = new generator(['A','B','C']);
	g.next();
}