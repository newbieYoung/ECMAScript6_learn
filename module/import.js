import * as pro from './export.js';
import name,{project,num,increase} from './export.js';
console.log(project);
console.log(pro);
console.log(name);
//ES6模块是动态引用
console.log(num);
increase();
console.log(num);

/**
 * CommonJS模块的加载原理
 * require命令第一次加载该脚本，就会执行整个脚本，然后在内存生成一个对象，形如：
 * （在NodeJs环境中可以通过输出全局对象module来查看）
 * {
 * id: '...',//模块名
 * exports: { ... },//模块输出的各个接口
 * loaded: true,//模块的脚本是否执行完毕
 * ...
 * }
 * 以后需要用到这个模块的时候，就会到exports属性上面取值；
 * 即使再次执行require命令，也不会再次执行该模块，而是到缓存之中取值；
 * 也就是说，CommonJS模块无论加载多少次，都只会在第一次加载时运行一次；
 * 以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。
 */

//CommonJS模块输出的是被输出值的拷贝
let common = require('./common_module');
console.log(common.num);
common.increase();
console.log(common.num);

console.log(module);