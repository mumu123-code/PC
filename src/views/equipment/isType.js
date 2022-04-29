export function workingState(index) {
    const stateArr = ['闲置', '烤漆', '喷漆'];
    return stateArr[index];
}

// 获取当天日期
export function getNowTime() {
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth(); //得到月份
    var date = now.getDate(); //得到日期
    month = month + 1;
    month = month.toString().padStart(2, "0");
    date = date.toString().padStart(2, "0");
    return `${year}-${month}-${date}`;
}