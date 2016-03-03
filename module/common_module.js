let num = 0;

function increase() {
    num++;
}

module.exports = {
	//输出函数就可以取得内部值的变化了
    get num() {
        return num;
    },
    //如果仅仅输出值,就算内部值发生了变化也不影响输出的值
    //num: num,
    increase: increase,
};
