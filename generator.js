/**
 * generator
 */

//Generator函数是ES6提供的一种异步编程解决方案
//从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态
//执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数
//形式上，Generator函数是一个普通函数，但是有两个特征。一是，function命令与函数名之间有一个星号；二是，函数体内部使用yield语句
{
    console.log('Generator函数简单使用例子');
	function* generator(){
        console.log('first');
		console.log(yield 'hello');//yield句本身没有返回值，或者说总是返回undefined
        console.log('second');
		yield 'world';
        console.log('third');
		return 'ending';
	}
	let fg = generator();
	console.log(fg.next());
	console.log(fg.next());
	console.log(fg.next());
	console.log(fg.next());
    /**
     * 遍历器对象的next方法的运行逻辑如下：
     *（1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值
     *（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句
     *（3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值
     *（4）如果该函数没有return语句，则返回的对象的value属性值为undefined
     */
}
//yield语句不能用在普通函数中，否则会报错
{
    function normal(){
        //yield 'hello';
        return 'world';
    }
}
//Generator函数执行得到的遍历器的next方法可以传入一个参数，该参数就会被当作上一个yield语句的返回值。
//这个功能有很重要的语法意义，Generator函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。
{   
    function* generator(x){
        var y = 2 * (yield (x + 1));
        var z = yield (y / 3);
        return (x + y + z);
    }
    var a = generator(5);
    console.log(a.next());
    console.log(a.next());
    console.log(a.next());
    var b = generator(5);
    console.log(b.next());
    console.log(b.next(12));
    console.log(b.next(13));
}
//for...of循环可以自动遍历Generator函数，返回yield语句的值
{
    function* generator(){
        yield 1;
        yield 2;
        yield 3;
        yield 4;
        return 5;
    }
    for(let v of generator()){
        console.log(v);
    }
}