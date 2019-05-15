<template>
  <div>
    <Head :show="!!1" :sshow="!!0"></Head>
    <div class="search">
      <mt-search v-model.lazy="value">
        <ul class="goodslist clearfix">
          <li v-for="(good,i) in goods" :key="i">
            <router-link :to="{name:'detail',params:{goodsid:good._id}}">
              <img :src="good.img" alt>
              <p>{{good.title}} - ￥{{good.price}}</p>
            </router-link>
          </li>
        </ul>
      </mt-search>
    </div>
  </div>
</template>


<script>
import { http } from "../utils/index.js";
export default {
  data() {
    return {
      result: [],
      value: "",
      goods: []
    };
  },
  computed: {},
  watch: {
    value(val) {
      http
        .get("/vue/somegoods", {
          params: {
            title: val
          }
        })
        .then(res => {
          this.goods = res.data;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin-top: 0.8rem;
  .goodslist {
    margin-top: 0.8rem;
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
