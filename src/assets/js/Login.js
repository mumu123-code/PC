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

//获取验证码
export function getVerificationCode(data){
    return request({
        method:"post",
        url:"/base/sms/send",
        data
    })
}

//注册
export function registeredUser(data){
    return request({
        method:"post",
        url:"/user/auth/register",
        data
    })
}