<template>
  <div>
    <Uhead utitle="用户登录"></Uhead>
    <div class="login">
      <mt-field label="用户名" placeholder="请输入用户名/邮箱/手机号" v-model="username"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userpwd"></mt-field>

      <a href="#">忘记密码?</a>

      <button @click="login" class="user-login">立即登录</button>

      <p class="go-register">
        还没有账户?
        <router-link :to="{name:'register'}">现在注册</router-link>
      </p>
    </div>
  </div>
</template>


<script>
// import store from "../store.js";
// import { mapMutations, mapState } from "vuex";
import { tip } from "../utils/index.js";
export default {
  data() {
    return {};
  },
  mounted() {
    this.$store.state.uTitle = "用户注册";
    if (localStorage.fromRouterName == "mine") {
      localStorage.removeItem("username");
    }
  },
  computed: {
    username: {
      get() {
        return this.$store.state.username;
      },
      set(val) {
        this.$store.state.username = val;
      }
    },
    userpwd: {
      get() {
        return this.$store.state.userpwd;
      },
      set(val) {
        this.$store.state.userpwd = val;
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        cb: result => {
          tip(result.msg);
          if (result.type == "1") {
            this.$store.state.userpwd = "";
            this.$store.state.userpwd1 = "";
            this.$router.push({ name: "home" });
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  margin-top: 1.2rem;
  text-align: left;
  padding: 0.2rem;
  .mint-cell {
    margin-bottom: 0.3rem;
    width: 7.1rem;
    height: 0.6rem;
    font-size: 0.16rem;
    border: 1px solid #000;
    input {
      border: 0;
    }
  }
  .user-login {
    width: 7.1rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border: 0;
    background-color: #000;
    color: #fff;
    font-size: 0.14rem;
    margin-top: 0.2rem;
    outline: none;
  }
  a {
    font-size: 0.12rem;
    color: #666;
  }
  .go-register {
    font-size: 0.12rem;
    margin-top: 0.4rem;
    a {
      text-decoration: underline;
      margin-left: 0.2rem;
    }
  }
}
</style>
