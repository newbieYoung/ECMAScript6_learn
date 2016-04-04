/**
 * class
 */
'use strict';
{
	//let p1 = new Point(1,1);//class定义不存在变量提升，报错Point is not a function
	class Point{
		//定义class的方法的时候，前面不需要加上function这个保留字
		constructor(x,y){
			this.x = x;
			this.y = y;
		}
		//方法之间不需要逗号分隔，否则报错
		toString(){
			return `(x:${this.x},y:${this.y})`;
		}
	}
	//继承
	class Point3D extends Point{
		constructor(x,y,z){
			/**
			 * 子类必须在constructor方法中调用super方法，否则新建实例时会报错；
			 * 这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工；
			 * 如果不调用super方法，子类就得不到this对象。
			 */
			/**
			 * ES5的继承，实质是先创造子类的实例对象this，
			 * 然后再将父类的方法添加到this上面（Parent.apply(this)）;
			 * ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），
			 * 然后再用子类的构造函数修改this。
			 */
			super(x,y);
			/**
			 * 另一个需要注意的地方是，在子类的构造函数中，
			 * 只有调用super之后，才可以使用this关键字，否则会报错；
			 * 这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。
			 */
			this.z = z;
		}
		//与ES5一样，在Class内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为
		get x(){
			console.log('get x');
			//某个属性的get方法里边不能对该属性取值否值会报错Maximum call stack size exceeded
			//return this.x;
		}
		set x(value){
			console.log('set x');
			//某个属性的set方法里边不能对该属性赋值否则会报错Maximum call stack size exceeded
			//this.x = value;
		}
		toString(){
			return `(x:${this.x},y:${this.y},z:${this.z})`;
		}
	}
	let p3 = new Point3D(1,2,3);
	console.log(p3.toString());
	/**
	 * 大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性；
	 * Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
	 * 1、子类的__proto__属性，表示构造函数的继承，总是指向父类；
	 * 2、子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。
	 */
	console.log(Point.__proto__ === Function.prototype);
	console.log(Point.prototype.__proto__ === Object.prototype);
	console.log(Point3D.__proto__ === Point);//这里也解释了子类中为什么要显示的调用super方法
	console.log(Point3D.prototype.__proto__ === Point.prototype);
	let p1 = new Point(1,1);
	console.log(p1.toString());
	//实际只是一种语法糖
	//class的数据类型就是function，class本身就指向构造函数
	console.log(typeof Point);
	console.log(Point === Point.prototype.constructor);
	console.log(p1.constructor === Point.prototype.constructor);
	//class表达式
	let Person = class {
		/**
		 * 因为ES6明确规定，Class内部只有静态方法，没有静态属性；
		 * ES7有一个静态属性的提案ti，如下：
		 */
		//静态属性
	    //static type = 'Person';
	    //实例属性
	    //home = 'earth';
		constructor(name,age){
			this.name = name;
			this.age = age;
			//ES6为new命令引入了一个new.target属性，（在构造函数中）返回new命令作用于的那个构造函数
			console.log(new.target);
		}
		toString(){
			return `my name is ${this.name} and i am ${this.age}`;
		}
		//静态方法
	    static hello(){
	    	return 'how are you?';
	    }
	}
	let liy = new Person('liyang','25');
	console.log(liy.toString());
	console.log(Person.hello());
	//与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）
	console.log(p1.hasOwnProperty('x'));
	console.log(p1.hasOwnProperty('y'));
	console.log(p1.hasOwnProperty('toString'));
	console.log(p1.__proto__.hasOwnProperty('toString'));
	//与ES5一样，类的所有实例共享一个原型对象
	let p2 = new Point(2,2);
	console.log(p1.__proto__ === p2.__proto__);
	//本质上，ES6的Class只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，比如name属性
	console.log(Point.name);
	/**
	 * ES6允许继承原生构造函数定义子类，因为ES6是先新建父类的实例对象this，
	 * 然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承，
	 * 这意味着，ES6可以自定义原生数据结构（比如Array、String等）的子类，这是ES5无法做到的。
	 */
	class Foo {
	    constructor(...args) {
	        this.args = args;
	    } 
	    //Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器
	    * [Symbol.iterator]() {
	        for (let arg of this.args) {
	            yield arg;
	        }
	    }
	}
	for (let x of new Foo('hello', 'world')) {
		console.log(x);
	}
}
{
	//Mixin模式
}
//let p1 = new Point(1,1);//class定义遵循块级作用域，报错Point is not defined
