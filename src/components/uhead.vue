<template>
  <header class="p-header">
    <mt-button @click="goback" icon="back" class="h-left">返回</mt-button>
    <p class="h-title">{{utitle}}</p>
    <mt-button @click="showMenu" class="h-right iconfont">&#xe60d;</mt-button>

    <ul class="u-menu clearfix" :class="{show:menuFlag}">
      <li v-for="(foot,i) in foots" :key="i">
        <router-link :to="{name:foot.name}">
          <i class="iconfont f-icon" v-html="foot.icon"></i>
          <span>{{foot.txt}}</span>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import store from "../store.js";
export default {
  data() {
    return {
      foots: this.$store.state.foots,
      logo: this.$store.state.logo,
      menuFlag: false
    };
  },
  computed: {
    flag() {
      return localStorage.toRouterName === "search";
    }
  },
  props: ["utitle"],
  methods: {
    goback() {
      this.$router.go(-1);
    },
    showMenu() {
      if (this.menuFlag) {
        this.menuFlag = false;
      } else {
        this.menuFlag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.p-header {
  width: 100%;
  height: 0.8rem;
  background-color: #000;
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .h-title {
    width: 2.08rem;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.16rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  .h-left {
    float: left;
  }
  .h-right {
    float: right;
  }
  .h-left,
  .h-right {
    background-color: #000;
    color: #fff;
    width: 1.5rem;
    height: 0.5rem;
    margin-top: 0.15rem;
    font-size: 0.18rem;
    border: 0;
    box-shadow: none;
  }
  .u-menu {
    position: absolute;
    left: 0;
    top: 0.8rem;
    width: 100%;
    height: 0rem;
    overflow: hidden;
    background-color: #fff;
    transition: all 1s;
    a {
      color: #000;
    }
    li {
      float: left;
      width: 25%;
      padding-top: 0.1rem;
      i {
        display: block;
        width: 0.3rem;
        height: 0.3rem;
        font-size: 0.3rem;
        margin: auto;
      }
      span {
        display: inline-block;
        font-size: 0.14rem;
        line-height: 0.35rem;
      }
    }
  }
  .show {
    height: 0.86rem;
    transition: all 1s;
  }
}
</style>
