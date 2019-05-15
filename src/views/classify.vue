<template>
  <div>
    <Head :show="!!0" :sshow="!!1"></Head>

    <div class="classify">
      <mt-navbar v-model="selected">
        <mt-tab-item v-for="(type,i) in types" :key="i" :id="type.class">{{type.zclass}}</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item v-for="(type,i) in types" :key="i" :id="type.class">
          <Goodlist :type="type" :goodlist="goodlist"></Goodlist>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>


<script>
import { http, tip } from "../utils/index.js";
import { Indicator, Toast } from "mint-ui";
import Goodlist from "../components/goodlist";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      types: [],
      selected: this.$store.state.selected
    };
  },
  components: {
    Goodlist
  },
  methods: {
    ...mapActions(["getGoodslist"])
  },
  computed: {
    ...mapState(["goodlist"])
  },
  mounted() {
    Indicator.open({
      text: "载入中...",
      spinnerType: "double-bounce"
    });

    this.getGoodslist({
      url: "/vue/goodslist",
      cb: () => {
        setTimeout(() => {
          tip("请求成功");
        }, 1000);
      }
    });

    http.get("/vue/goodlisttype", {}).then(res => {
      setTimeout(() => {
        this.types = res.data;
        Indicator.close();
      }, 1500);
    });
  }
};
</script>

<style lang="scss" scoped>
.classify {
  margin-top: 0.8rem;
}
</style>
