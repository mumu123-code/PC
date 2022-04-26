import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "moment/locale/zh-cn"; // 引入 moment 汉化

import { Button, Form, FormItem, Input, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(Button).use(Form).use(FormItem).use(Input);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
