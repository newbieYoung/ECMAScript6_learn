'use strict';
//基本用法
{
    function timeout(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve,ms);
        });
    }
    async function print(value,ms){
        await timeout(ms);
        console.log(value);
    }
    print('hello print',2000);

    //async函数返回一个Promise对象，async函数内部return语句返回的值会成为then方法毁掉函数的参数
    async function demo0(){
        return 'hello demo0';
    }
    demo0().then((params)=>{
        console.log(params);
    });

    //async函数内部抛出错误，会导致返回的Promise对象变为reject状态，抛出的错误对象会被catch方法回调函数接收到
    async function demo1(){
        throw new Error('出错了');
    }
    demo1().then((params)=>{
        console.log(params);
    },(errors)=>{
        console.log(errors);
    });

    //async函数返回的Promise对象，必须等到内部所有await执行完，才会发生状态变化，才会执行then方法指定的回调
    async function demo2(value,ms){
        await timeout(ms);
        return value;
    }
    demo2('hello promise',3000).then((params)=>{
        console.log(params);
    });

    //一般await命令后边是一个Promise对象，如果不是，则会转换成一个立即resolve的Promise对象
    async function demo3(){
        return await 123;
    }
    demo3().then((params)=>{
        console.log(params);
    });

    //await命令后边的Promise对象如果变成了reject状态，则reject的参数会被catch方法接收到
    async function demo4(){
        await Promise.reject('出错了 demo4');
    }
    demo4().then((params)=>{
        console.log(params);
    },(errors)=>{
        console.log(errors)
    });

    //只要有一个await语句后面的Promise变为reject，那么整个async函数都会中断执行
    async function demo5(){
        await Promise.reject('出错了 demo5');
        await Promise.resolve('hello demo5');//不会执行
        console.log('end of demo5');//不会执行
    }
    demo5().then((params)=>{
        console.log(params);
    },(errors)=>{
        console.log(errors)
    });

    //有时候我们希望即使前一个异步操作失败，也不要中断后边的异步操作，这时可以讲失败的await放在try catch结构里边
    async function demo6(){
        try{
            await Promise.reject('出错了 demo6');
        }catch(e){
            console.log('catch demo6 reject');
        }
        console.log('ready resolve demo6');//会执行
        return await Promise.resolve('hello demo6');//会执行
    }
    demo6().then((params)=>{
        console.log(params);
    },(errors)=>{
        console.log(errors)
    });
}

//使用注意点
{
    function timeout(ms){
        return new Promise((resolve)=>{
            setTimeout(resolve,ms);
        });
    }

    //最好把await命令放在try catch结构中
    async function attention1() {
        try{
            await timeout(2000);
        }catch(error){
            console.log(error);
        }
    }

    //多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时出发
    async function attention2(){
        try{
            await Promise.all([timeout(2000),timeout(3000)]);
        }catch(error){
            console.log(error);
        }
    }
}

//async函数实现原理，就是将Generator函数和自动执行器，包装在一个函数里（略）