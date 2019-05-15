import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { http } from "./utils/index";
import { aesEncrypt, aesDecrypt } from "./utils/index.js";



export default new Vuex.Store({
  state: {
    username: "",
    userpwd: "",
    userpwd1: "",
    email: "",
    usertel: "",
    oldpwd: "",
    logo: require("./assets/images/logo.png"),
    carNum: "",
    foots: [
      {
        txt: "首页",
        path: "/index/home",
        name: "home",
        icon: "&#xe6bc;"
      },
      {
        txt: "分类",
        path: "/index/classify",
        name: "classify",
        icon: "&#xe60d;"
      },
      {
        txt: "购物车",
        path: "/index/car",
        name: "car",
        icon: "&#xe621;"
      },
      {
        txt: "我",
        path: "/index/mine",
        name: "mine",
        icon: "&#xe763;"
      }
    ],
    rsuccess: "",
    goodlist: [],
    addressname: "",
    addresstel: "",
    selected: "bracelet",
    buyId:[]
  },

  actions: {
    addUser({ commit }, { cb }) {
      http.post("/vue/register", {
        params: {
          username: this.state.username,
          userpwd: this.state.userpwd,
          email: this.state.email,
          usertel: this.state.usertel
        }
      }).then(res => {
        cb(res.data);
        commit("addUser", res.data)
      })
    },
    login({ commit }, { cb }) {
      http.post("/vue/login", {
        params: {
          username: this.state.username,
          userpwd: this.state.userpwd
        }
      }).then(res => {
        cb(res.data);
        commit("login", res.data);
      });
    },
    eidtpwd({ commit }, { cb }) {
      http.post("/vue/editpwd", {
        params: {
          username: aesDecrypt(localStorage.username, "fengyu"),
          userpwd: this.state.userpwd,
          oldpwd: this.state.oldpwd
        }
      }).then(res => {
        cb(res.data);
        commit("editpwd", res.data);
      })
    },
    getGoodslist({ commit }, { url, cb }) {
      http.get(url, {}).then(res => {
        commit("getGoodslist", res.data.result);
        cb();
      })
    },
    addressok({ commit }, { _id, cb }) {
      http.post("/vue/updategoodstype", { params: { _id } }).then(res => {
        commit("addressok", res.data);
        cb(res);
      })
    }
  },
  mutations: {
    addUser(state, result) {
      state.rsuccess = result;
    },
    login(state, result) {
      if (result.type == "1") {
        localStorage.username = aesEncrypt(
          state.username,
          "fengyu"
        );
      }
    },
    editpwd(state, result) {
      state.rsuccess = result;
    },
    getGoodslist(state, result) {
      state.goodlist = result;
    },
    addressok(state, result) {
      state.rsuccess = result;
    }
  }
})

