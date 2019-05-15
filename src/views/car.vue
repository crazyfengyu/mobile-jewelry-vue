<template>
  <div>
    <Head :show="!!0" :sshow="!!1"></Head>
    <div class="car" v-if="type==1">
      <ul>
        <li v-for="(data,i) in datas" :key="i">
          <img @click="todetail(data.goodsid)" :src="data.goodsimg" alt>
          <h3>{{data.goodsname}}</h3> 
          <p class="num">
            <button @click="reduce(data._id,i)">-</button>
            <span>{{data.num}}</span>
            <button @click="add(data._id,i)">+</button>
          </p>
          <p class="price">￥ {{data.goodsprice * data.num}}</p>
          <span class="del" @click="del(data._id,i)">×</span>
          <h3 class="topay" @click="topay(data._id)">去结算</h3>
          <input type="checkbox" v-model="data.check" class="check">
        </li>
      </ul>
      <div class="checkall">
        <input type="checkbox" v-model="allcheck">
        <label>全选</label>
        <p>总计: ￥ {{ total }}</p>
        <h3 class="topay" @click="gopayall">去结算</h3>
      </div>
    </div>
    <div class="tip" v-else-if="type==2">
      <h2>您还未登录！</h2>
      <button class="tologin" @click="tologin">立即登录</button>
      <button class="toregister" @click="toregister">立即注册</button>
    </div>
    <div class="white" v-else>
      <h2>主人我快饿死了---(╯︵╰)</h2>
      <button class="tologin" @click="togoodslist">去喂养</button>
    </div>
  </div>
</template>

<script>
import { aesDecrypt, http, tip, pHttp } from "../utils/index.js";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      type: 1,
      datas: []
    };
  },
  computed: {
    allcheck: {
      get() {
        var flag = true;
        this.datas.forEach(item => {
          if (!item.check) {
            flag = false;
          }
        });
        return flag;
      },
      set(val) {
        this.datas = this.datas.map(item => {
          item.check = val;
          return item;
        });
      }
    },
    total: {
      get() {
        var total = 0;
        this.datas.forEach(item => {
          if (item.check) {
            total += item.goodsprice * item.num;
          }
        });
        return total;
      },
      set() {}
    }
  },
  methods: {
    tologin() {
      this.$router.push({ name: "login" });
    },
    toregister() {
      this.$router.push({ name: "register" });
    },
    togoodslist() {
      this.$router.push({ name: "classify" });
    },
    todetail(id) {
      this.$router.push({ name: "detail", params: { goodsid: id } });
    },
    topay(id) {
      var list = [];
      list.push(id);
      this.$store.state.buyId = list;
      this.$router.push({ name: "address" });
    },
    gopayall() {
      var list = [];
      this.datas.forEach(item => {
        if (item.check) {
          list.push(item._id);
        }
      });
      this.$store.state.buyId = list;
      this.$router.push({ name: "address" });
    },
    del(id, i) {
      var that = this;
      MessageBox.confirm("确定执行此操作?").then(
        action => {
          http.post("/vue/delcargoods", { params: { _id: id } }).then(res => {
            tip(res.data.msg);
            if (res.data.type == "1") {
              that.datas.splice(i, 1);
              if (that.datas.length == 0) {
                that.type = 3;
              }
            }
          });
        },
        rejected => {
          tip(rejected);
        }
      );
    },
    reduce(id, i) {
      var that = this;
      if (that.datas[i].num > 1) {
        that.datas[i].num--;
        pHttp(id, i, "/vue/caraddgoods", that, () => {
          that.datas[i].num++;
        });
      } else {
        tip("已到达最低选择数量");
      }
    },
    add(id, i) {
      var that = this;
      this.datas[i].num++;
      pHttp(id, i, "/vue/caraddgoods", that, () => {
        that.datas[i].num--;
      });
    }
  },
  mounted() {
    if (localStorage.username) {
      var username = aesDecrypt(localStorage.username, "fengyu");
      var type = "1";
      http.get("/vue/getmycar", { params: { username, type } }).then(res => {
        this.datas = res.data.map(item => {
          item.check = false;
          return item;
        });
        if (this.datas.length > 0) {
          this.type = 1;
        } else {
          this.type = 3;
        }
      });
    } else {
      this.type = 2;
    }
  },
  updated() {
    var num = 0;
    this.datas.forEach(item => {
      num += item.num;
    });
    this.$store.state.carNum = num;
  },
  watch: {}
};
</script>


<style lang="scss" scoped>
.car {
  margin-top: 0.8rem;
  padding: 0.2rem;
  background-color: #fff;
  padding-bottom: 2.2rem;
  li {
    height: 2.3rem;
    border-bottom: 1px solid #000;
    text-align: left;
    padding: 0.3rem;
    position: relative;
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
      font-size: 0.14rem;
      padding: 0;
    }
    span {
      display: inline-block;
      line-height: 0.3rem;
      width: 0.5rem;
      height: 0.3rem;
      border: 1px solid #000;
      outline: none;
      text-align: center;
      vertical-align: middle;
      animation: bounceInLeft 2s;
      font-size: 0.14rem;
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
    .del {
      position: absolute;
      right: 0.3rem;
      top: 0.3rem;
      border: 1px solid #000;
      font-size: 0.22rem;
      width: 0.3rem;
      height: 0.3rem;
      text-align: center;
      line-height: 0.3rem;
      background-color: #000;
      color: #fff;
    }
    .topay {
      position: absolute;
      bottom: 0.3rem;
      right: 0.3rem;
      width: 1rem;
      height: 0.45rem;
      font-weight: normal;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.45rem;
      background-color: #000;
      color: #fff;
    }
    .check {
      position: absolute;
      width: 0.2rem;
      height: 0.2rem;
      right: 0.3rem;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
  .checkall {
    position: fixed;
    left: 0;
    bottom: 1rem;
    right: 0;
    margin: auto;
    width: 7.1rem;
    height: 0.6rem;
    background-color: #fff;
    border: 1px solid #000;
    text-align: left;
    input {
      width: 0.2rem;
      height: 0.2rem;
      vertical-align: middle;
      margin-top: 0.2rem;
      margin-left: 0.3rem;
    }
    label {
      font-size: 0.16rem;
      color: #000;
      display: inline-block;
      vertical-align: middle;
      margin-top: 0.2rem;
      margin-left: 0.1rem;
    }
    p {
      display: inline-block;
      margin-top: 0.2rem;
      vertical-align: middle;
      margin-left: 0.3rem;
      font-size: 0.16rem;
      color: #000;
    }
    .topay {
      width: 0.3rem;
      height: 0.3rem;
      border: 1px solid #000;
      vertical-align: middle;
      outline: none;
      background-color: #000;
      color: #fff;
      animation: bounceInRight 2s;
      font-size: 0.14rem;
      padding: 0;
      position: absolute;
      bottom: 0.05rem;
      right: 0.3rem;
      width: 1rem;
      height: 0.45rem;
      font-weight: normal;
      font-size: 0.16rem;
      text-align: center;
      line-height: 0.45rem;
      background-color: #000;
      color: #fff;
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
