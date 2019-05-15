<template>
  <div>
    <Uhead utitle="用户注册"></Uhead>
    <div class="login">
      <mt-field label="用户名" placeholder="请输入用户名(字母数字组成4-10位，且字母开头)" v-model="username"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="email"></mt-field>
      <mt-field label="手机号" placeholder="请输入常用手机号" type="tel" v-model="usertel"></mt-field>
      <mt-field label="密码" placeholder="请输入密码(由数字字母组成4-12位)" type="password" v-model="userpwd"></mt-field>
      <mt-field label="确认密码" placeholder="请输入密码" type="password" v-model="userpwd1"></mt-field>
      <div class="xy">
        <input type="checkbox" :checked="check" @click="editCheck">
        <span>已阅读,同意CRAZYFENGYU用户协议</span>
      </div>
      <button @click="register" class="user-login">立即注册</button>

      <p class="go-register">
        已拥有账号?
        <router-link :to="{name:'login'}">现在登录</router-link>
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
    return {
      check: false
    };
  },
  mounted() {
    this.$store.state.uTitle = "用户注册";
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
    email: {
      get() {
        return this.$store.state.email;
      },
      set(val) {
        this.$store.state.email = val;
      }
    },
    userpwd: {
      get() {
        return this.$store.state.userpwd;
      },
      set(val) {
        this.$store.state.userpwd = val;
      }
    },
    userpwd1: {
      get() {
        return this.$store.state.userpwd1;
      },
      set(val) {
        this.$store.state.userpwd1 = val;
      }
    },
    usertel: {
      get() {
        return this.$store.state.usertel;
      },
      set(val) {
        this.$store.state.usertel = val;
      }
    }
  },
  methods: {
    register() {
      var usernameReg = /^[a-z]{1}[a-z0-9]{3,9}$/gi;
      var userpwdReg = /^[a-z0-9]{4,12}$/gi;
      var usertelReg = /^1(3|4|5|7|8)\d{9}$/gi;
      var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/gi;
      var obj = this.$store.state;

      if (usernameReg.test(obj.username)) {
        if (emailReg.test(obj.email)) {
          if (usertelReg.test(obj.usertel)) {
            if (obj.userpwd == obj.userpwd1) {
              if (userpwdReg.test(obj.userpwd)) {
                if (this.check) {
                  this.$store.dispatch("addUser", {
                    cb: result => {
                      tip(result.msg);
                      if (result.type == "1") {
                        this.$router.push({ name: "login" });
                      }
                    }
                  });
                } else {
                  tip("请同意协议");
                }
              } else {
                tip("密码格式不正确");
              }
            } else {
              tip("两次密码不一致");
            }
          } else {
            tip("手机号格式不正确");
          }
        } else {
          tip("邮箱格式错误");
        }
      } else {
        tip("用户名格式错误");
      }
    },
    editCheck() {
      if (this.check) {
        this.check = false;
      } else {
        this.check = true;
      }
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
  .xy {
    font-size: 0.14rem;
    input {
      margin-right: 0.1rem;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
  }
}
</style>
