import Vue from "vue"
import Router from "vue-router"
// import Home from "../components/Home.vue"

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: "/home",
            name: "学生管理",
            iconClass:"fa fa-users",
            redirect: "/home/student",
            // component: Home
            component: () => import("@/components/Home"), // 路由懒加载
            // component: resolve => require(["@/components/Home"], resolve)// 异步组件
            children: [
                {
                    path: "/home/student",
                    name: "学生列表",
                    iconClass: "fa fa-list",
                    component: () => import("@/components/students/StudentList")
                },
                {
                    path: "/home/info",
                    name: "信息列表",
                    iconClass: "fa fa-list-alt",
                    component: () => import("@/components/students/InfoList")
                },
                {
                    path: "/home/work",
                    name: "作业列表",
                    iconClass: "fa fa-list-ul",
                    component: () => import("@/components/students/WorkList")
                },
                {
                    path: "/home/works",
                    name: "作业管理",
                    iconClass: "fa fa-th-list",
                    component: () => import("@/components/students/WorkMent")
                }
            ]
        },
        {
            path: "/home",
            name: "数据分析",
            iconClass:"fa fa-bar-chart",
            component: () => import("@/components/Home"), // 路由懒加载
            children: [
                {
                    path: "/home/dataview",
                    name: "数据概览",
                    iconClass: "fa fa-line-chart",
                    component: () => import("@/components/dataAnalysis/DataView")
                },
                {
                    path: "/home/mapview",
                    name: "地图概览",
                    iconClass: "fa fa-line-chart",
                    component: () => import("@/components/dataAnalysis/MapView")
                },
                {
                    path: "/home/travel",
                    name: "旅游地图",
                    iconClass: "fa fa-line-chart",
                    component: () => import("@/components/dataAnalysis/TravelMap")
                },
                {
                    path: "/home/score",
                    name: "分数地图",
                    iconClass: "fa fa-line-chart",
                    component: () => import("@/components/dataAnalysis/ScoreMap")
                }
            ]
        },
        {
            path: "/users",
            name: "用户中心",
            iconClass: "fa fa-user",
            component: resolve => require(["@/components/Login"],resolve),
            children: [
                {
                    path: "/users/user",
                    name: "权限管理",
                    iconClass: "fa fa-user",
                    component: () => import("@/components/users/User")
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            hidden: true,
            component: resolve => require(["@/components/Login"],resolve)
        },
        {
            path: "/404",
            hidden: true,
            component: resolve => require(["@/components/NotFound"], resolve)
        }
    ],
    mode: "history"
})