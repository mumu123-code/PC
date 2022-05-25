import request from "../../api/request";

export function loginGet(data) {
    return request({
        method: "post",
        url: "/user/auth/login",
        data,
    });
}

export function loginGetOut() {
    return request({
        method: "get",
        url: "/user/logout",
    });
}
