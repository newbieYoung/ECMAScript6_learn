let project = {
	name:'ECMAScript6_learn',
	author:'young',
	createTime:'2015'
}

let num = 0;

function increase(){
	num++;
}

export default project.name;
export {project,num,increase};