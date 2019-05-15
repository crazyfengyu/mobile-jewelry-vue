<template>
  <footer>
    <mt-tabbar v-model="selected">
      <mt-tab-item v-for="(foot,i) in foots" :key="i" :id="foot.name" class="f-box">
        <router-link :to="{name:foot.name}">
          <mt-badge v-if="i==2" size="small" type="error" class="hot" v-html="carNum"></mt-badge>
          <i class="iconfont f-icon" v-html="foot.icon"></i>
          <span>{{foot.txt}}</span>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>


<script>
import store from "../store.js";
import { aesDecrypt, http } from "../utils/index.js";
export default {
  data() {
    return {
      foots: this.$store.state.foots,
      selected: localStorage.toRouterName
    };
  },
  mounted() {
    if (localStorage.username) {
      this.foots[this.foots.length - 1].path = "/mine";
      this.foots[this.foots.length - 1].name = "mine";
      this.foots[this.foots.length - 1].txt = "我";
      var type = "1";
      var username = aesDecrypt(localStorage.username, "fengyu");
      http.get("/vue/getmycar", { params: { username, type } }).then(res => {
        if (res.data.length > 0) {
          var num = 0;
          res.data.forEach(item => {
            num += item.num;
          });
          if (num > 99) {
            this.carNum = 99;
          } else {
            this.carNum = num;
          }
          this.$store.state.carNum = num;
        } else {
          this.$store.state.carNum = 0;
        }
      });
    } else {
      this.foots[this.foots.length - 1].path = "/login";
      this.foots[this.foots.length - 1].name = "login";
      this.foots[this.foots.length - 1].txt = "未登录";
    }
  },
  computed: {
    carNum: {
      get() {
        return this.$store.state.carNum;
      },
      set() {}
    }
  },
  updated() {},
  watch: {}
};
</script>   


<style lang="scss" scoped>
.f-box {
  height: 1rem;
  position: relative;
  z-index: 99;
  .f-icon {
    display: block;
    width: 0.45rem;
    height: 0.45rem;
    font-size: 0.45rem;
    margin: auto;
  }
  span {
    display: inline-block;
    font-size: 0.18rem;
    line-height: 0.55rem;
    padding: 0;
  }
  .hot {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    font-size: 0.16rem;
    text-align: center;
    font-weight: 600;
    line-height: 0.25rem;
    color: #fff;
    position: absolute;
    right: 0.4rem;
    top: 0;
  }

  a {
    color: #000;
  }
}
.router-link-exact-active {
  color: red;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1rem;
}
</style>
