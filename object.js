'use strict';
//Object.create
{
	function person(name){
		this.name = name;
	}
	let liy = new person('liy');
	let createLiy = Object.create(liy);
	console.log(createLiy.__proto__);
	console.log(createLiy.__proto__===liy);
}
//测试Object和Function之间的关系
{
	console.log(Object.__proto__.constructor);
	console.log(Function.prototype.__proto__ === Object.prototype); //true
	console.log(Object.prototype.__proto__ === null); //true
	//所有对象包括函数对象的原型最终都指向了Object.prototype，Object.prototype.__proto__ === null，原型链至此结束，且Object.prototype.__proto__不可写
	Object.prototype.age = 12;
	function ObjectA(){

	}	
	console.log(new ObjectA().age);
	ObjectA.prototype.__proto__ = null;
	console.log(new ObjectA().age);
}
//测试Object
{
	Object.prototype.age = 12;
	function ObjectA(){

	}
	console.log(new ObjectA().age);
	console.log(ObjectA.prototype===Object.prototype);//false
	console.log(ObjectA.prototype.age === Object.prototype.age);//true
	let p1 = ObjectA.prototype;
	new ObjectA();
	console.log(p1===ObjectA.prototype);//true
	Object.prototype.age = 13;
	Object.prototype.sex = 0;
	console.log(new ObjectA().age);
	console.log(new ObjectA().sex);
	console.log(ObjectA.prototype===p1);//true
	ObjectA.prototype.name = 'liy';
	console.log(new Object().name);//undefined
	console.log(new ObjectA().name);
	Object.prototype.name = 'tsm';
	console.log(new Object().name);
	console.log(new ObjectA().name);
	//综上所述，JavaScript中应该存在一个根对象，不管是Object.prototype还是Function.prototype都是该根对象的深克隆，JavaScript中每个对象都有__proto__属性指向其构造函数的原型对象，但是Object.prototype.__proto__为空且不可写用来指定原型链的结束
}
//prototype
{
	function UiDatePicker(){

	}
	UiDatePicker.prototype.result = [];
	UiDatePicker.prototype.name = 'ui-datepicker';
	let picker1 = new UiDatePicker();
	picker1.name = 'picker1';//直接赋值会在当前实例中新增一个属性
	picker1.result.push(0);//如果没有赋值则会遍历到原型链中的属性
	console.log(picker1);
	let picker2 = new UiDatePicker();
	console.log(picker2.result);//由于picker1修改了原型中的result属性，而picker2实例中没有创建result属性，所以这里会访问原型中的属性
	console.log(picker2.name);
}
//__proto__
{
	function Employee() {
	
	}
	Employee.prototype.company = 'futu';
	let young = new Employee();
	//__proto__ 属性是否等于对象构造函数的prototype属性
	console.log(young.__proto__===Employee.prototype);
	//更改原型中的属性
	young.__proto__.company = 'futu.web';
	console.log(Employee.prototype.company);
	//重新指定原型
	let country = {
		country:'China'
	}
	young.__proto__ = country;
	console.log(young.__proto__===Employee.prototype);
}
//getPrototypeOf、setPrototypeOf这两个方法操作的都是对象的__proto__属性
{
	function Employee(){

	}
	Employee.prototype.company = 'futu';
	let young = new Employee();
	let proto = Object.getPrototypeOf(young);
	proto.company = 'futu.web';
	console.log(Employee.prototype.company);
	console.log(Employee.prototype===young.__proto__);//true
	Object.setPrototypeOf(young,{
		country:'China'
	});
	console.log(Employee.prototype===young.__proto__);//false
	console.log(Object.getPrototypeOf(young).country);
	console.log(young.company);
	console.log(Employee.prototype.company);
}
//observe、unobserve
{
	var o = {};
	function observer(changes){
		changes.forEach(function(change) {
			console.log('发生变动的属性：' + change.name);
			console.log('变动前的值：' + change.oldValue);
			console.log('变动后的值：' + change.object[change.name]);
			console.log('变动类型：' + change.type);
		});
	}
	//监听
	Object.observe(o, observer);
	//变化
	setTimeout(function(){
		o.name = 'liy';
	},1000);
}