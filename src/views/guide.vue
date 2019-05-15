<template>
  <div>
    <mt-swipe :show-indicators="false" :auto="0" class="guide">
      <mt-swipe-item v-for="(img,i) in imgs" :key="i">
        <img @touchend="gotoApp(i)" :src="img" alt class="g-img">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>


<script>
export default {
  data() {
    return {
      imgs: [
        require("../assets/images/banner1.jpg"),
        require("../assets/images/banner2.jpg"),
        require("../assets/images/banner3.jpg"),
        require("../assets/images/banner4.jpg")
      ]
    };
  },
  methods: {
    gotoApp(index) {
      if (index == this.imgs.length - 1) {
        this.$router.push({ name: "home" });
      }
    }
  },
  mounted() {
    if (localStorage.guide) {
      this.$router.push({ name: "home" });
    } else {
      localStorage.guide = true;
    }
  }
};
</script>


<style lang="scss" scoped>
.guide {
  width: 100%;
  height: 100%;
  .g-img {
    width: 100%;
    height: 100%;
  }
}
</style>
