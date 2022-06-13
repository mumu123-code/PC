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
//查看电子档案
export function getFileDetail(data){
    return request({
        method:"post",
        url:"/electronicFile/list",
        data,
    })
}

//固废台账列表(月)
export function getMonthWasteParameter(data){
    return request({
        method:"post",
        url:"/waste/pageList",
        data
    })
}

//固废月台账导出数据    
export function getExportMonthWasteParameter(data){
    return request({
        method:"post",
        url:"/waste/listToXSSF",
        data
    })
}

//固废台账列表(年)
export function getYearsWasteParameter(data){
    return request({
        method:"post",
        url:"/waste/pageMonthList",
        data
    })
}

//固废年台账导出数据
export function getExportYearsWasteParameter(data){
    return request({
        method:"post",
        url:"/waste/monthListToXSSF",
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

//获取设备列表
export function getDeviceList(){
    return request({
        method:"get",
        url:"/device/list"
    })
}

//获取危废代码列表
export function getWasteInfo(data){
    return request({
        method:"post",
        url:"/waste/wasteCompanyInitPageList",
        data
    })
}

//获取附件台账Word文档导出
export function getFileParameter(data){
    return request({
        method:"post",
        url:"/waste/exportGroupOutList",
        responseType: 'blob',
        data,
    })
}

//获取出库记录Word文档导出
export function getFileRecord(data){
    return request({
        method:"post",
        url:"/waste/exportOutList",
        responseType: 'blob',
        data
    })
}