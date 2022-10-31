import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

// import Layout from '../views/layout'

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
        path: "/personal", // 单个设备
        name: "personal",
        component: () => import("../views/equipment/personal.vue"),
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
        path: "/activatedCarbon", // 活性炭台账
        name: "activatedCarbon",
        component: () => import("../views/activatedCarbon/index.vue"),
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
      {
        path: "/charts", // 总设备
        name: "charts",
        component: () => import("../views/equipment/charts.vue"),
      },
      
    ]
  },
  {
    path: "/waste",
    name: "waste",
    component: () => import("../views/waste/index.vue"),
    children:[
      {
        path:"/wasteParameter", //电子台账
        name:"wasteParameter",
        component:()=>import("../views/waste/components/table.vue"),
      },
      {
        path:"/moveVideo", //视频教程
        name:"moveVideo",
        component:()=>import("../views/waste/components/moveVideo.vue"),
      },
      {
        path:"/wasteNetIn", //政策解读
        name:"wasteParameter",
        component:()=>import("../views/waste/components/netIn.vue"),
      },
      {
        path:"/wasteManagement", //政策解读
        name:"wasteParameter",
        component:()=>import("../views/waste/components/management.vue"),
      },
      {
        path:"/wastePlan", //政策解读
        name:"wasteParameter",
        component:()=>import("../views/waste/components/plan.vue"),
      },
      {
        path:"/wastePrevention", //政策解读
        name:"wasteParameter",
        component:()=>import("../views/waste/components/prevention.vue"),
      },
      {
        path:"/wasteReference", //政策解读
        name:"wasteParameter",
        component:()=>import("../views/waste/components/reference.vue"),
      },
      {
        path:"/statistics", //数据统计
        name:"statistics",
        component:()=>import("../views/waste/components/statistics.vue"),
      },
      {
        path:"/companyInfo",
        name:"companyInfo",
        component:()=>import("../views/waste/components/company.vue"),
      },
      {
        path:"/addInfo",  //标签配置信息
        name:"addInfo", 
        component:()=>import("../views/waste/components/addInfo.vue"),
      },
      {
        path:"/storageTank",  //储罐配置信息
        name:"storageTank",
        component:()=>import("../views/waste/components/storageTank.vue"),
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

let userInfo = {
  token: ''
};
if(window.location.href.includes('?')) {
  userInfo.token = window.location.href.split('?')[1].split('=')[1];
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
}

// 路由守卫
router.beforeEach((to,from,next) => {
  const user = sessionStorage.getItem('userInfo');

  let isLogin = user ? true : false;
  if(to.path == '/login' || to.path == '/') {
    next();
  } else {
    isLogin ? next() : next('/');
  }
});

export default router;
