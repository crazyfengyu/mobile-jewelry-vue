<template>
  <div>
    <Uhead utitle="商品详情"></Uhead>
    <div class="detail">
      <img :src="data.img" alt>
      <div class="detail-content">
        <div class="top">
          <h3>{{data.title}}</h3>
          <p>
            <span>￥{{data.price}}</span>
            <b>购买指数 {{data.num}}</b>
          </p>
        </div>
        <div class="center">
          <button class="buy" @click="buy">立即购买</button>
          <button class="car" @click="car">加入购物车</button>
        </div>
      </div>
    </div>
    <div class="recommend">
      <h3 class="r-title">推荐喜欢</h3>
      <ul class="goodslist clearfix">
        <li v-for="(good,i) in random" :key="i">
          <router-link :to="{name:'detail',params:{goodsid:good._id}}">
            <img :src="good.img" alt>
            <p>{{good.title}} - ￥{{good.price}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { http, tip, aesDecrypt } from "../utils/index.js";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      data: {},
      random: []
    };
  },
  methods: {
    buy() {
      if (localStorage.username) {
        var obj = {};
        obj.goodsid = this.data._id;
        obj.goodsname = this.data.title;
        obj.goodsprice = this.data.price;
        obj.num = 1;
        obj.username = aesDecrypt(localStorage.username, "fengyu");
        obj.goodsimg = this.data.img;

        http.post("/vue/addgoods", { params: obj }).then(res => {
          if (res.data.type == "1") {
            this.$router.push({ name: "car" });
          } else {
            MessageBox("提示", res.data.msg);
          }
        });
      } else {
        tip("请先登录");
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1000);
      }
    },
    car() {
      if (localStorage.username) {
        var obj = {};
        obj.goodsid = this.data._id;
        obj.goodsname = this.data.title;
        obj.goodsprice = this.data.price;
        obj.num = 1;
        obj.username = aesDecrypt(localStorage.username, "fengyu");
        obj.goodsimg = this.data.img;

        http.post("/vue/addgoods", { params: obj }).then(res => {
          if (res.data.type == "1") {
            MessageBox("提示", res.data.msg);
          } else {
            MessageBox("提示", res.data.msg);
          }
        });
      } else {
        tip("请先登录");
        setTimeout(() => {
          this.$router.push({ name: "login" });
        }, 1000);
      }
    }
  },
  mounted() {
    var _id = this.$route.params.goodsid;
    http.get("/vue/getgoodsone", { params: { _id } }).then(res => {
      this.data = res.data;
      http.get("/vue/ngoodslist", {}).then(result => {
        this.random = result.data.result;
      });
    });
  },
  watch: {
    $route() {
      var _id = this.$route.params.goodsid;
      http.get("/vue/getgoodsone", { params: { _id } }).then(res => {
        this.data = res.data;
        http.get("/vue/ngoodslist", {}).then(result => {
          this.random = result.data.result;
        });
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.detail {
  background-color: #fff;
  width: 100%;
  img {
    width: 100%;
  }
  .detail-content {
    text-align: left;
    padding: 0.2rem;
    .top {
      h3 {
        font-size: 0.22rem;
        font-weight: 600;
        height: 0.5rem;
        line-height: 0.5rem;
      }
      p {
        height: 0.35rem;
        line-height: 0.35rem;
        border-bottom: 1px solid #000;
        span {
          float: left;
          font-size: 0.18rem;
          font-weight: 600;
        }
        b {
          float: right;
          font-size: 0.14rem;
          font-weight: normal;
          color: #999;
        }
      }
    }
    .center {
      text-align: center;
      button {
        width: 99%;
        height: 0.5rem;
        font-size: 0.16rem;
        border: 1px solid #000;
        outline: none;
        margin-top: 0.2rem;
      }
      .buy {
        background-color: #000;
        color: #fff;
      }
      .car {
        background-color: #fff;
        color: #000;
      }
    }
  }
}

.recommend {
  background-color: #fff;
  .r-title {
    font-size: 0.2rem;
    font-weight: 600;
    text-align: left;
    padding-left: 0.2rem;
  }
  .goodslist {
    width: 100%;
    padding: 0.2rem;
    background-color: #fff;
    padding-bottom: 1.2rem;
    li {
      width: 48%;
      float: left;
      background-color: #f5f5f5;
      margin-bottom: 0.25rem;
      img {
        width: 100%;
        animation: flip 1.5s;
      }
      p {
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.14rem;
        color: #000;
      }
    }
    li:nth-of-type(odd) {
      margin-right: 0.2rem;
    }
  }
}
</style>
