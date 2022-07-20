 // 判断类型
 function isAlarmType(type){
    type = Number(type);
    let typeName = "";
      switch(type){
        case 1:
          typeName = "无组织排放（频繁开门）";
          break;
        case 2:
          typeName = "无组织排放（未及时关门）";
          break;
        case 3:
          typeName = "无组织排放（作业前，风机未及时开启）";
          break;
        case 4:
          typeName = "无组织排放（作业结束后，提前开门，风机未及时开启）";
          break;
        case 5:
          typeName = "无组织排放（风机提前关闭）";
          break;
        case 6:
          typeName = "排放浓度异常偏高";
          break;
        case 7:
          typeName = "末端治理设施不正常运行（处理设施失效）";
          break;
        case 8:
          typeName = "末端治理设施不正常运行（风管管道泄漏或风机损坏）";
          break;
        case 9:
          typeName = "末端治理设施不正常运行（活性炭用量不足或质量较差）";
          break;
        case 10:
          typeName = "末端治理设施不正常运行（底棉未及时更换导致堵塞）";
          break;
        case 11:
          typeName = "调漆间频繁开门";
          break;
        case 12:
          typeName = "调漆间未及时关门";
          break;
        case 13:
          typeName = "调漆间风机未开";
          break;
        case 14:
          typeName = "危废间风机未开";
          break;
        case 15:
          typeName = "调漆间油漆涂料未密闭保存";
          break;
        case 16:
          typeName = "风机可以关闭";
          break;
        case 17:
          typeName = "门可以打开";
          break;
        case 18:
          typeName = "未使用水性漆";
          break;
        case 19:
          typeName = "设备供电不正常";
          break;
        case 20:
          typeName = "应急报警";
          break;
    }
    return typeName;
  }
function typeData(){
	let data = [
		{value:1,name:"无组织排放（频繁开门）"},
		{value:2,name:"无组织排放（未及时关门）"},
		{value:3,name:"无组织排放（作业前，风机未及时开启）"},
		{value:4,name:"无组织排放（作业结束后，提前开门，风机未及时开启）"},
		{value:5,name:"无组织排放（风机提前关闭）"},
		{value:6,name:"排放浓度异常偏高"},
		{value:7,name:"末端治理设施不正常运行（处理设施失效）"},
		{value:8,name:"末端治理设施不正常运行（风管管道泄漏或风机损坏）"},
		{value:9,name:"末端治理设施不正常运行（活性炭用量不足或质量较差）"},
		{value:10,name:"末端治理设施不正常运行（底棉未及时更换导致堵塞）"},
		{value:11,name:"调漆间频繁开门"},
		{value:12,name:"调漆间未及时关门"},
		{value:13,name:"调漆间风机未开"},
		{value:14,name:"危废间风机未开"},
		{value:15,name:"调漆间油漆涂料未密闭保存"},
		{value:16,name:"风机可以关闭"},
		{value:17,name:"门可以打开"},
		{value:18,name:"未使用水性漆"},
		{value:19,name:"设备供电不正常"},
	]
	return data;
}
//建议
function isAdvice(type){
	type = Number(type);
	let typeName = "";
	switch(type){
		case 1:
		typeName = "建议减少开门次数。";
		break;
		case 2:
		typeName = "建议降低开门时长。";
		break;
		case 3:
		typeName = "建议先正常启动风机后,再进行作业。";
		break;
		case 4:
		typeName = "建议生产结束后先打开风机,等待10分钟后,再关闭风机,打开车间大门。";
		break;
		case 5:
		typeName = "建议在生产设备停止后,等待10分钟后,再关闭风机,打开车间大门。";
		break;
		case 6:
		typeName = "有超标风险,建议更换活性炭或灯管、增加活性炭用量。";
		break;
		case 7:
		typeName = "建议尽快更换活性炭或灯管等耗材。";
		break;
		case 8:
		typeName = "建议检查风机管道是否有泄漏,并及时维修。";
		break;
		case 9:
		typeName = "建议增加活性炭用量或采用符合国家要求的活性炭。";
		break;
		case 10:
		typeName = "建议尽快更换底棉。";
		break;
		case 11:
		typeName = "建议降低调漆间开门次数。";
		break;
		case 12:
		typeName = "建议调漆间及时关门。";
		break;
		case 13:
		typeName = "建议调漆间打开风机、涂料桶等加盖密封。";
		break;
		case 14:
		typeName = "建议打开危废间风机。";
		break;
		case 15:
		typeName = "建议油漆涂料不使用时加盖密闭保存。";
		break;
		case 16:
		typeName = "建议关闭风机。";
		break;
		case 17:
		typeName = "建议打开车间大门。";
		break;
		case 18:
		typeName = "建议使用水性漆。";
		break;
		case 19:
		typeName = "建议检查设备电源连接是否正常。";
		break;
		case 20:
		typeName = "请立即停止生产活动";
		break;
	}
	return typeName;
}

function getDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year - 60;
	} else if (type === 'end') {
		year = year + 2;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;
	return `${year}-${month}-${day}`;
}


//时间 计算当前时间所属区间阶段 15分钟为一个区间
// function areaTime(){
// 	 let timeObj = "";
// 	 let time = new Date().getMinutes();
// 	 let day = new Date();
// 	 day = day.toLocaleDateString() + " " +day.getHours() + ":";
// 	 let reg = new RegExp( '/' , "g" );
// 	 day = day.replace(reg,"-");
// 	 if(0 > time || time < 15){
// 		timeObj = day + "00:00" +"&"+ day + "15:00";
// 	 }else if(15 > time ||time < 30){
// 		timeObj = day + "15:00" +"&"+ day + "30:00";
// 	 }else if(30 > time || time < 45){
// 		timeObj = day + "30:00" +"&"+ day + "45:00";
// 	 }else{
// 		timeObj = day + "45:00" +"&"+ day + "59:59";
// 	 }
// 	 return timeObj;
//  }	
 //判断安装位置
 function isInstallationPosition(type){
	 let typeName = "";
	 switch(type){
		 case 1:
		 typeName = "烤漆房（喷漆房）";
		 break;
		 case 2:
		 typeName = "调漆间";
		 break;
		 case 3:
		 typeName = "危废间";
		 break;
	 }
	 return typeName;
 }
 function roomData(){
	let data = [
		{value:1,name:"烤漆房（喷漆房）"},
		{value:2,name:"调漆间"},
		{value:3,name:"危废间"}, 
	]
	return data;
}

//打开附件
function openFile(strUrl) {
	let a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	a.target = "_blank";
	a.href = strUrl;
	a.click();
	document.body.removeChild(a);
}

module.exports = {
	isAlarmType,
	typeData,
	isAdvice,
	getDate,
	// areaTime,
	isInstallationPosition,
  roomData,
	openFile
}