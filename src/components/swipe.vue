<template>
  <mt-swipe class="guide">
    <mt-swipe-item v-for="(img,i) in banner" :key="i">
      <img @click="godetails(img.goodsid)" :src="img.url" alt class="g-img">
    </mt-swipe-item>
  </mt-swipe>
</template>


<script>
export default {
  data() {
    return {
      banner: [
        {
          url: require("../assets/images/banner1.jpg"),
          goodsid: "5cb97499d836c1fca88643dc"
        },
        {
          url: require("../assets/images/banner2.jpg"),
          goodsid: "5cb98aa4d836c1fca88643f0"
        },
        {
          url: require("../assets/images/banner3.jpg"),
          goodsid: "5cb98d22d836c1fca886441e"
        },
        {
          url: require("../assets/images/banner4.jpg"),
          goodsid: "5cb97499d836c1fca88643e5"
        }
      ]
    };
  },
  methods: {
    godetails(id) {
      this.$router.push({ name: "detail", params: { goodsid: id } });
    }
  },
  mounted() {}
};
</script>


<style lang="scss" scoped>
.mint-swipe {
  width: 100%;
  height: 7.5rem;
  margin-top: 0.8rem;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
