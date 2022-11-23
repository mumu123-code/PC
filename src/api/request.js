import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.elianwei.com/company1", //https://api.elianwei.com/company/ http://192.168.2.62:8994/company/
  timeout: 50000,
});

// 请求拦截
instance.interceptors.request.use((config) => {
  let Token;
  if (sessionStorage.getItem('userInfo')) {
    Token = JSON.parse(sessionStorage.getItem('userInfo')).token;
  }
  let headers = config.headers;
  // let Token = token;//sessionStorage.getItem('Token');
  // Token == undefined ?
  Token && (headers.Token = Token);
  return config;
});

// 响应拦截
instance.interceptors.response.use((config) => {
  return config.data; 
  // if(config.status === 200 && config.data.code === '1') {
  //   return config.data;
  // }
});

// 返回的是一个 axios 即是一个 promise
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }

  return instance(options);
}
export default request;
