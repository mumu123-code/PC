import request from "../../api/request";

// 获取总设备列表
export function deviceList() {
    return request({
        method: "get",
        url: "/sensorData/generalDeviceInterface",
    });
}

// 获取生产状态条形图
export function getProductionStatus(data) {
    return request({
        method: "post",
        url: "/sensorData/productionStatusData",
        data,
    })
}

// 获取历史设备信息
export function getReportDetail(data) {
    return request({
        method: "post",
        url: "/sensorData/list",
        data,
    })
}
// 获取设备信息
export function getReport(data) {
    return request({
        method: "post",
        url: "/sensorData/listToday",
        data,
    })
}
// 设备界面数据查看（每小时历史数据）
export function getListSecond(data) {
    return request({
        method: "post",
        url: "/sensorData/listSecond",
        data,
    })
}

// 获取台账累计时间
export function loadCumulativeTime(deviceId) {
    return request({
        method: "get",
        url: "/activatedCarbonLedger/loadCumulativeTime?deviceId=" + deviceId
    })
}

//获取活性炭寿命和状态
export function loadCarbonObj(deviceId) {
    return request({
        method: "get",
        url: "/activatedCarbonState/load?deviceId=" + deviceId
    })
}
