const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  //   publicPath: './',   //请求路径
  devServer: { // 跨域请求的代理配置x 
    //   host: "localhost",
    proxy: { //配置跨域
      '/api': {
        target: "https://api.elianwei.com/company",//这里后台的地址
        changOrigin: true,//允许跨域
        pathRewrite: { //对请求路径进行重定向匹配到请求地址，
          '^/api': ''//请求的时候使用这个api
        }
      }
    }
  },
}
