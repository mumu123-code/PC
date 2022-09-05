import request from "../../api/request";
//获取诊断报告
export function getAbnormalList(data) {   
    return request({
        method: "post",
        url: "/abnormalBehavior/listPage",
        data,
    });
}
//获取诊断报告列表
export function getDiagnoseReportList(data){
    return request({
        method:"post",
        url:"/diagnoseReport/listPage",
        data,
    })
}
//修改报告状态
export function editReportState(data){
    return request({
        method:"post",
        url:"/diagnoseReport/updateStatus",
        data,
    })
}
//获取诊断报告详情
export function getReportDetail(data){
    return request({
        method:"post",
        url:"/diagnoseReport/load",
        data,
    })
}
//添加电子档案
export function addArchives(data){
    return request({
        method:"post",
        url:"/electronicFile/add",
        data
    })
}
//查看电子档案列表
export function getFile(data){
	return request({
		method:"post",
		url:"/electronicFile/list",
		data
	})
}

//获取活性炭列表
export function getActivatedCarbon(data){
    return request({
        method:"post",
        url:"/activatedCarbonLedger/threeDayData",
        data
    })
}

//添加活性炭数据
export function addActivatedCarbon(data){
    return request({
        method:"post",
        url:"/activatedCarbonLedger/update",
        data
    })
}

/*/固废电子秤/*/
//固废台账列表(月)
// export function getMonthWasteParameter(data){
//     return request({
//         method:"post",
//         url:"/waste/pageList",
//         data
//     })
// }


 
export function getMonthWasteParameter(data){
    return request({
        method:"get",
        // url:"/waste/detailQuery",
        url:"/company-waste/waste/detailQuery/withMonth",
        data
    })
}

//获取全部明细(word文档导出)
export function getWasteAllDetail(){
    return request({
        method:"get",
        // url:"/company-waste/waste/detailQuery",
        url:"/company-waste/waste/detailQuery/withMonth/exportWord",
        // data
    })
}


//固废月台账导出数据    
export function getExportMonthWasteParameter(data){
    return request({
        method:"post",
        url:"/company-waste/waste/listToXSSF",
        data
    })
}

//固废台账列表(年)
export function getYearsWasteParameter(data){
    return request({
        method:"post",
        url:"/company-waste/waste/pageMonthList",
        data
    })
}

//固废年台账导出数据
export function getExportYearsWasteParameter(data){
    return request({
        method:"post",
        url:"/company-waste/waste/monthListToXSSF",
        data
    })
}

//获取设备列表
export function getDeviceList(){
    return request({
        method:"get",
        url:"/company-waste/device/list"
    })
}

//获取危废代码列表
export function getWasteInfo(data){
    return request({
        method:"get",
        // url:"/waste/wasteCompanyInitPageList",
        url:"/company-waste/code/readCodeDict?wasteCode="+data,
        // data
    })
}

//获取国标代码字典
export function getHwDictList(){
    return request({
        method:"get",
        url:"/company-waste/hwDict/get"
    })
}

//获取附件台账Word文档导出
export function getFileParameter(data){
    return request({
        method:"get",
        // url:"/waste/exportGroupOutList",
        url:"/company-waste/waste/summaryQuery/byMonth/exportWord",
        // responseType: 'blob',
        data,
    })
}

//获取出库记录Word文档导出
export function getFileRecord(data){
    return request({
        method:"get",
        // url:"/waste/exportOutList",
        url:"/company-waste/waste/detailQuery/withMonth/exportWord",
        // responseType: 'blob',
        data
    })
}

//获取数据统计数据
export function getStatistical(data){
    return request({
        method:"get",
        url:"/company-waste/waste/androidShow",
        data
    })
}

//获取配置信息列表
export function getConfigurationInfoList(data){
    return request({
        method:"get",
        // url:"/waste/wasteCompanyInitPageList",
        url:"/company-waste/code/read",
        data
    })
}

//添加标签配置信息
export function addConfigurationInfo(data){
    return request({
        method:"post",
        url:"/company-waste/code/create",
        // url:"/waste/saveOrUpdateWasteCompanyInit",
        data
    })
}

//修改标签配置信息
export function editConfigurationInfo(data){
    return request({
        method:"put",
        url:"/company-waste/code/update",
        // url:"/waste/saveOrUpdateWasteCompanyInit",
        data
    })
}

//获取设备列表（储罐信息添加）
export function getStorageDeviceList(){
    return request({
        method:"get",
        url:"/company-waste/waste/list"
    })
}

//添加或修改储罐信息
export function addAndEditStorageInfo(data){
    return request({
        method:"post",
        url:"/company-waste/storageTankDevice/addOrUpdate",
        data
    })
}

//获取储罐信息列表
export function getStorageInfoList(data){
    return request({
        method:"post",
        url:"/company-waste/storageTankDevice/list",
        data
    })
}

//企业信息(固废)
export function getCompanyInfo(){
    return request({
        method:"get",
        url:"/company-waste/user/getBasic"
    })
}

//修改企业信息(固废)
export function editCompanyInfo(data){
    return request({
        method:"post",
        url:"/company-waste/user/update",
        data
    })
}

//获取仓库列表
export function getStorageList(){
    return request({
        method:"get",
        url:"/company-waste/warehouse/read"
    })
}

//添加仓库信息
export function addStorageInfo(data){
    return request({
        method:"post",
        url:"/company-waste/warehouse/create",
        data
    })
}

//编辑仓库信息
export function editStorageInfo(data){
    return request({
        method:"put",
        url:"/company-waste/warehouse/update",
        data
    })
}

//获取未配置仓库废物代码和名称列表
export function getNotConfiguredStorageCode(data){
    return request({
        method:"get",
        url:"/company-waste/code/readWarehouse",
        data
    })
}

//获取未配置储罐废物代码和名称列表
export function getNotConfiguredStorageTankCode(data){
    return request({
        method:"get",
        url:"/company-waste/code/readCodeDict",
        data
    })
}
/*/固废电子秤/*/