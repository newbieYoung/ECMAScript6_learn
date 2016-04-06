/**
 * Iterator的作用有三个：
 * 一、是为各种数据结构，提供一个统一的、简便的访问接口；
 * 二、是使得数据结构的成员能够按某种次序排列；
 * 三、是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。
 * ES6规定，默认的Iterator接口部署在数据结构的Symbol.iterator属性。
 * */
'use strict';

//为某对象添加自定义iterator示例
{
    let obj = {
        data: ['hello', 'world'],
        [Symbol.iterator]: function() {
            let self = this;
            let index = 0;
            return {
            	next:function(){
            		if(index<self.data.length){
            			return {
            				value:self.data[index++],
            				done:false
            			}
            		}else{
            			return {
            				value:undefined,
            				done:true
            			}
            		}
            	}
            }
        }
    };
    let iterator = obj[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}

//类数组对象添加自定义iterator示例
{
	let likeArray = {
		0:'e',
		1:'f',
		2:'g',
		length:3,
		[Symbol.iterator]:Array.prototype[Symbol.iterator]
	}
	let iterator = likeArray[Symbol.iterator]();
	console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
}

//遍历示例
{
	//空数组
	let arr = [];
	let iterator = arr[Symbol.iterator]();
	console.log(iterator.next());//{ value: undefined, done: true }

	//字符串
	let str = 'hello';
    iterator = str[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

	//普通数组
    arr = ['a', 'b', 'c'];
    iterator = arr[Symbol.iterator]();
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

    //null
	// arr = null;
	// iterator = arr[Symbol.iterator]();//Cannot read property 'Symbol(Symbol.iterator)' of null
	// console.log(iterator.next());
}