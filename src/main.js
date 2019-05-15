import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false;

import VueResource from "vue-resource";
Vue.use(VueResource);




import router from "./router.js"

import MintUI from "mint-ui";
Vue.use(MintUI);




import "./style/index.scss";

import Head from "./components/head.vue";
import Swipe from "./components/swipe.vue";
import Uhead from "./components/uhead.vue";
Vue.component("Head", Head);
Vue.component("Swipe", Swipe);
Vue.component("Uhead", Uhead);


import store from "./store.js";

new Vue({
  router,
  render: h => h(App),
  watch: {
    "$route": (to, from) => {
      localStorage.toRouterName = to.name;
      localStorage.fromRouterName = from.name;
    }
  },
  store
}).$mount('#app')
