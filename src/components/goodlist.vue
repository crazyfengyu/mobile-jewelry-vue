<template>
  <div>
    <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul class="goodslist clearfix">
        <li v-for="(good,i) in goods" :key="i">
          <router-link :to="{name:'detail',params:{goodsid:good._id}}">
            <img :src="good.img" alt>
            <p>{{good.title}} - ￥{{good.price}}</p>
          </router-link>
        </li>
      </ul>
    </mt-loadmore>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
export default {
  props: ["type", "goodlist"],
  data() {
    return {
      goods: []
    };
  },
  methods: {
    loadTop() {
      setTimeout(() => {
        this.goods = this.goods.sort(function() {
          return 0.5 - Math.random();
        });
        this.$refs.loadmore.onTopLoaded();
      }, 2000);
    }
  },
  mounted() {
    this.goods = this.goodlist.filter(
      good => good.types.class == this.type.class
    );
  }
};
</script>


<style lang="scss" scoped>
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
</style>
