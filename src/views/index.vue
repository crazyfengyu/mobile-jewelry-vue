<template>
  <div>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>


<script>
import Foot from "../components/foot.vue";
import { http, aesDecrypt } from "../utils/index.js";
export default {
  data() {
    return {};
  },
  components: {
    Foot
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>

