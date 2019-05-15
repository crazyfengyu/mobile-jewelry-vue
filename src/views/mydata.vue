<template>
  <div>
    <Uhead utitle="个人信息"></Uhead>

    <table class="m-data">
      <tr>
        <td>用户名</td>
        <td>{{ data.username }}</td>
      </tr>

      <tr>
        <td>邮箱</td>
        <td>{{ data.email }}</td>
      </tr>

      <tr>
        <td>手机号</td>
        <td>{{ data.usertel }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { http, aesDecrypt } from "../utils/index.js";
export default {
  data() {
    return {
      data: {}
    };
  },
  mounted() {
    http
      .get("/vue/getmydata", {
        params: {
          username: aesDecrypt(localStorage.username, "fengyu")
        }
      })
      .then(res => {
        this.data = res.data;
      });
  }
};
</script>

<style lang="scss" scoped>
.m-data {
  width: 100%;
  margin-top: 0.8rem;
  background-color: #fff;
  border-collapse: collapse;
  tr {
    height: 0.6rem;
    line-height: 0.6rem;
    td {
      border: 1px solid #cccccc;
    }
  }
}
</style>
