import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.elianwei.com/company",
  timeout: 50000,
});

// 请求拦截
instance.interceptors.request.use((config) => {
  let token;
  if (sessionStorage.getItem('userInfo')) {
    token = JSON.parse(sessionStorage.getItem('userInfo')).token;
  }


  const headers = config.headers;
  // if(!headers.Authorization)
  headers.Token = token;
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
