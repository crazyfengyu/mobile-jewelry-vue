import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


import Home from "./views/home.vue";
import Guide from "./views/guide.vue";
import Index from "./views/index.vue";
import Search from "./views/search.vue";
import Mine from "./views/mine.vue";
import Classify from "./views/classify.vue";
import Car from "./views/car.vue";
import Detail from "./views/goods-details.vue";
import Register from "./views/register.vue";
import Login from "./views/login.vue";
import Cert from "./views/cert.vue";
import Editpwd from "./views/editpwd.vue";
import Mydata from "./views/mydata.vue";
import Order from "./views/order.vue";
import Address from "./views/address.vue";


const routes = [
    {
        path: "",
        redirect: { name: "guide" }
    },
    {
        path: "/index",
        component: Index,
        children: [
            {
                path: "",
                redirect: { name: "home" }
            },
            {
                path: "home",
                component: Home,
                name: "home"
            },
            {
                path: "car",
                component: Car,
                name: "car"
            },
            {
                path: "classify",
                component: Classify,
                name: "classify"
            },
            {
                path: "mine",
                component: Mine,
                name: "mine"
            }
        ]
    },
    {
        path: "/register",
        component: Register,
        name: "register"
    },
    {
        path: "/login",
        component: Login,
        name: "login"
    },
    {
        path: "/order",
        component: Order,
        name: "order"
    },
    {
        path: "/mydata",
        component: Mydata,
        name: "mydata"
    },
    {
        path: "/cert",
        component: Cert,
        name: "cert"
    },
    {
        path: "/editpwd",
        component: Editpwd,
        name: "editpwd"
    },
    {
        path: "/guide",
        component: Guide,
        name: "guide"
    },
    {
        path: "/detail/:goodsid",
        component: Detail,
        name: "detail"
    },
    {
        path: "/search",
        component: Search,
        name: "search"
    },
    {
        path: "/address/:buyId?",
        component: Address,
        name: "address"
    },
    {
        path: "*",
        redirect: { name: "guide" }
    }
];

const router = new VueRouter({
    routes
});

export default router;