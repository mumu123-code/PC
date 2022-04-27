import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login/Login.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
    children: [
      {
        path: "/equipment", // 总设备
        name: "equipment",
        component: () => import("../views/equipment/index.vue"),
      },
      {
        path: "/historyEquipment", // 历史设备
        name: "historyEquipment",
        component: () => import("../views/equipment/historyEquipment.vue"),
      },
      {
        path: "/report", // 诊断报告
        name: "report",
        component: () => import("../views/report/index.vue"),
      },
      {
        path: "/standing", // 台账报表
        name: "standing",
        component: () => import("../views/standing/index.vue"),
      },
      {
        path: "/material", // 原辅材料台账
        name: "material",
        component: () => import("../views/standing/material.vue"),
      },
      {
        path: "/historyChart", // 历史台账
        name: "historyChart",
        component: () => import("../views/standing/historyChart.vue"),
      },
      {
        path: "/consumablesChart", // 耗材台账
        name: "consumablesChart",
        component: () => import("../views/standing/consumablesChart.vue"),
      },
      {
        path: "/electronicFile", // 电子档案
        name: "electronicFile",
        component: () => import("../views/electronicFile/index.vue"),
      },
      {
        path: "/abnormal", // 异常行为
        name: "abnormal",
        component: () => import("../views/abnormal/index.vue"),
      },
    ]
  },
];

const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
