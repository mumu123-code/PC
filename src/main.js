import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "moment/locale/zh-cn"; // 引入 moment 汉化
import "element-ui/lib/theme-chalk/index.css"; // element ui 的css

import {
  Button, Form, FormItem, Input, Message, Container, Aside, Main, Header, Menu, MenuItem, MenuItemGroup,Loading,Card,
  Submenu, Select, Option, Table, TableColumn, Pagination,radio,DatePicker,Row,Col,RadioGroup,Upload,Dialog,Tabs,TabPane
} from "element-ui";

import JsonExcel from 'vue-json-excel';
Vue.component('downloadExcel', JsonExcel)

Vue.use(Button).use(Form).use(FormItem).use(Input).use(Container).use(Aside).use(Main).use(Header)
  .use(Menu).use(MenuItem).use(MenuItemGroup).use(Submenu).use(Select).use(Option).use(Table).use(Dialog).use(Card)
  .use(TableColumn).use(Pagination).use(radio ).use(DatePicker).use(Row).use(Col).use(RadioGroup).use(Upload)
  .use(Loading.directive).use(Tabs).use(TabPane);

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
