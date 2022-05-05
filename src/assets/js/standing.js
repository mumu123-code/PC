import request from "../../api/request";

export function getHistoryMaterial(data) {
    return request({
        method: "post",
        url: "/ledger/listPage",
        data,
    });
}