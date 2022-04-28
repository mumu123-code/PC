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
