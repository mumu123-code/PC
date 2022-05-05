import request from "../../api/request";
//获取诊断报告
export function getAbnormalList(data) {   
    return request({
        method: "post",
        url: "/abnormalBehavior/listPage",
        data,
    });
}
