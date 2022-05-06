import request from "../../api/request";

//获取暂存的原辅料台账
export function getStaging(data) {
    return request({
        method: "get",
        url: "/ledger/temporaryStorage",
        data,
    });
}

//添加台账
export function addParameter(data) {
    return request({
        method: "post",
        url: "/ledger/add",
        data,
    });
}

//获取历史原辅材料和耗材台账
export function getHistory(data) {
    return request({
        method: "post",
        url: "/ledger/listPage",
        data,
    });
}

