<template>
  <header class="p-header">
    <mt-button @click="goback" icon="back" v-if="show" class="h-left">返回</mt-button>
    <router-link :to="{name:'home'}">
      <img :src="logo" alt class="h-logo">
    </router-link>
    <mt-button @click="goSearch" v-if="sshow" icon="search" class="h-right"></mt-button>
  </header>
</template>

<script>
// import store from "../store.js";
export default {
  data() {
    return {
      logo: this.$store.state.logo
    };
  },
  computed: {
    flag() {
      return localStorage.toRouterName === "search";
    }
  },
  props: ["show", "sshow"],
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goSearch() {
      this.$router.push({ name: "search" });
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
  .h-logo {
    width: 2.08rem;
    height: 0.68rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    animation: wobble 2s 2;
  }
  .h-left {
    float: left;
  }
  .h-right {
    float: right;
    animation: shake 2s 1000;
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
}
</style>
