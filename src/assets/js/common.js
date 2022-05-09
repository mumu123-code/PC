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

//固废台账列表
export function getWasteParameter(data){
    return request({
        method:"post",
        url:"/waste/pageList",
        data
    })
}