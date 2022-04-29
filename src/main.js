import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "moment/locale/zh-cn"; // 引入 moment 汉化
import "element-ui/lib/theme-chalk/index.css"; // element ui 的css

import {
  Button, Form, FormItem, Input, Message, Container, Aside, Main, Header, Menu, MenuItem, MenuItemGroup,
  Submenu, Select, Option, Table, TableColumn, Pagination,radio,DatePicker
} from "element-ui";

Vue.use(Button).use(Form).use(FormItem).use(Input).use(Container).use(Aside).use(Main).use(Header)
  .use(Menu).use(MenuItem).use(MenuItemGroup).use(Submenu).use(Select).use(Option).use(Table)
  .use(TableColumn).use(Pagination).use(radio ).use(DatePicker);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
