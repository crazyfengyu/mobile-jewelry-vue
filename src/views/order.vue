<template>
  <div>
    <Uhead utitle="我的订单"></Uhead>
    <div class="order-body" v-if="type==1">
      <ul>
        <li v-for="(order,i) in orders" :key="i">
          <img @click="todetail(order.goodsid)" :src="order.goodsimg" alt>
          <h3>{{order.goodsname}}</h3>
          <p class="num">
            <span>购买件数:{{order.num}} 件</span>
          </p>
          <p class="price">订单金额:￥ {{order.goodsprice * order.num}}</p>
          <p class="date">付款时间:{{order.date}}</p>
        </li>
      </ul>
    </div>
    <div class="tip" v-else-if="type==2">
      <h2>您还未登录！</h2>
      <button class="tologin" @click="tologin">立即登录</button>
      <button class="toregister" @click="toregister">立即注册</button>
    </div>
    <div class="white" v-else>
      <h2>暂无购买数据---(╯︵╰)</h2>
      <button class="tologin" @click="togoodslist">去选购</button>
    </div>
  </div>
</template>

<script>
import { http, tip, aesDecrypt } from "../utils/index.js";
export default {
  data() {
    return {
      orders: [],
      type: 1
    };
  },
  methods: {
    todetail(id) {
      this.$router.push({ name: "detail", params: { goodsid: id } });
    },
    tologin() {
      this.$router.push({ name: "login" });
    },
    toregister() {
      this.$router.push({ name: "register" });
    },
    togoodslist() {
      this.$router.push({ name: "classify" });
    }
  },
  mounted() {
    if (localStorage.username) {
      var username = aesDecrypt(localStorage.username, "fengyu");
      http.get("/vue/getmyorder", { params: { username } }).then(res => {
        this.orders = res.data;
        if (this.orders.length > 0) {
          this.type = 1;
        } else {
          this.type = 3;
        }
      });
    } else {
      this.type = 2;
    }
  }
};
</script>

<style lang="scss" scoped>
.order-body {
  margin-top: 0.8rem;
  background-color: #fff;
  margin-top: 0.8rem;
  padding: 0.2rem;
  background-color: #fff;
  padding-bottom: 1.2rem;
  li {
    height: 2.3rem;
    border-bottom: 1px solid #000;
    text-align: left;
    padding: 0.3rem;
    position: relative;
    font-size: 0.14rem;
    img {
      float: left;
      width: 1.7rem;
      height: 1.7rem;
      border: 1px solid #000;
      margin-right: 0.2rem;
      animation: rotateIn 2s;
    }
    h3 {
      font-size: 0.18rem;
      font-weight: 600;
      animation: bounceInDown 2s;
    }
    button {
      width: 0.3rem;
      height: 0.3rem;
      border: 1px solid #000;
      vertical-align: middle;
      outline: none;
      background-color: #000;
      color: #fff;
      animation: bounceInRight 2s;
    }
    span {
      display: inline-block;
      line-height: 0.3rem;
      height: 0.3rem;
      outline: none;
      vertical-align: middle;
      animation: bounceInLeft 2s;
    }
    .num {
      margin-top: 0.5rem;
    }
    .price {
      margin-top: 0.15rem;
      font-size: 0.18rem;
      font-weight: 600;
      animation: bounceInUp 2s;
    }
    .date {
      position: absolute;
      right: 0.3rem;
      top: 0.7rem;
      font-size: 0.16rem;
      height: 0.3rem;
      text-align: center;
      line-height: 0.3rem;
      animation: bounceInUp 2s;
    }
  }
}

.tip,
.white {
  margin-top: 2.2rem;
  h2 {
    font-size: 0.3rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }
  button {
    width: 2rem;
    height: 0.5rem;
    border: 1px solid #000;
    outline: none;
    font-size: 0.14rem;
  }
  .tologin {
    background-color: #000;
    color: #fff;
    margin-right: 0.1rem;
  }
  .toregister {
    background-color: #fff;
    color: #000;
  }
}
</style>
