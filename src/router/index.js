import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    redirect: "login",
    hidden:true,
    meta: {
      name:'主页'
    }
  },
  {
    path: "/login",
    name: "login",
    hidden:true,
    meta: {
      name:'登录页'
    },
    component:() => import("../views/Login/login.vue")
  },
  {
    path: "/Console",
    name: "Console",
    redirect:'/index',
    meta: {
      name:'控制台'
    },
    component:() => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/index",
        name: "Console",
        meta: {
          name:'首页'
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  // 信息管理
  {
    path: "/info",
    name: "info",
    meta: {
      name:'信息管理'
    },
    component:() => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/infoIndex",
        name: "infoIndex",
        meta: {
          name:'信息列表'
        },
        component: () => import("../views/info/index.vue")
      },
      {
        path: "/infoCategorp",
        name: "infoCategorp",
        meta: {
          name:'信息分类'
        },
        component: () => import("../views/info/category.vue")
      }
    ]
  },
  // 用户管理
  {
    path: "/User",
    name: "User",
    meta: {
      name:'用户管理'
    },
    component:() => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/userIndex",
        name: "userIndex",
        meta: {
          name:'用户列表'
        },
        component: () => import("../views/User/index.vue")
      },
    ]
  },
];

const router = new VueRouter({
  routes
});

export default router;
