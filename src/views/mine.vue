<template>
  <div class="mine-box">
    <Head :show="!!0" :sshow="!!1"></Head>
    <div class="personal">
      <div class="top">
        <img src="../assets/images/user_ico.png" alt>
        <h3>尊贵用户</h3>
        <p>{{username}}</p>
      </div>
      <ul class="m-menu clearfix">
        <li v-for="(menu,i) in menus" :key="i">
          <router-link :to="{name:menu.name}">{{ menu.text }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { aesDecrypt } from "../utils/index.js";
export default {
  data() {
    return {
      username: localStorage.username
        ? aesDecrypt(localStorage.username, "fengyu")
        : "",
      menus: [
        {
          text: "返回首页",
          name: "home"
        },
        {
          text: "订单列表",
          name: "order"
        },
        {
          text: "个人资料",
          name: "mydata"
        },
        {
          text: "修改密码",
          name: "editpwd"
        },
        {
          text: "承诺证书",
          name: "cert"
        },
        {
          text: "退出登录",
          name: "login"
        }
      ]
    };
  },
  computed: {},
  mounted() {
    if (!localStorage.username) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
.mine-box {
  text-align: center;
  .mint-field {
    margin: 0.2rem 0.2rem;
  }

  .mint-button--danger,
  .mint-button--default {
    border: 1px solid #000;
    margin: 0.2rem auto;
    width: 80%;
    border-radius: 0.4rem;
  }
  .mint-button--danger {
    border: 0px;
  }
}

.personal {
  padding-top: 1.35rem;
  text-align: center;
  width: 100%;
  background-color: #fff;
  .top {
    img {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 0.1rem solid #ccc;
      animation: zoomIn 1s;
    }
    h3 {
      font-weight: 600;
      height: 0.44rem;
      line-height: 0.44rem;
      font-size: 0.14rem;
      animation: slideInLeft 1s;
    }
    p {
      font-size: 0.14rem;
      animation: slideInUp 1s;
    }
  }
  .m-menu {
    margin-top: 0.55rem;
    border-top: 1px solid #cccccc;
    margin-bottom: 1.1rem;
    li {
      float: left;
      width: 50%;
      border-bottom: 1px solid #cccccc;
      height: 0.75rem;
      line-height: 0.75rem;
      a{
        font-size: .16rem;
        color:#000;
      }
    }
    li:nth-of-type(odd) {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
