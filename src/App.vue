<template>
  <div id="app">
    <router-view class="childview"></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .h-logo {
    width: 2rem;
    height: 0.6rem;
  }
  .mint-button {
    .mint-button-icon {
      .mintui {
        font-size: 0.25rem;
      }
    }
  }
  .mint-cell-text {
    font-size: 0.16rem;
  }
  .mint-field-core {
    font-size: 0.16rem;
  }
  .mint-cell-title {
    text-align: center;
    width: 1.5rem;
  }
  .classify {
    .mint-tab-item-label {
      font-size: 0.18rem;
    }
  }
  .select-address {
    .mint-cell-title {
      text-align: left;
    }
  }
}
</style>
