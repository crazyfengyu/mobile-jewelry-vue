<template>
  <div>
    <Uhead utitle="修改密码"></Uhead>

    <div class="editpwd">
      <mt-field label="请输入原密码" placeholder="请输入密码" type="password" v-model="oldpwd"></mt-field>
      <mt-field label="请输入新密码" placeholder="请输入密码(由数字字母组成4-12位)" type="password" v-model="userpwd"></mt-field>
      <mt-field
        label="请再次输入新密码"
        placeholder="请输入密码(由数字字母组成4-12位)"
        type="password"
        v-model="userpwd1"
      ></mt-field>

      <button @click="editpwd" class="user-edit">确认修改</button>
    </div>
  </div>
</template>


<script>
import { tip } from "../utils/index.js";
export default {
  computed: {
    oldpwd: {
      get() {
        return this.$store.state.oldpwd;
      },
      set(val) {
        this.$store.state.oldpwd = val;
      }
    },
    userpwd: {
      get() {
        return this.$store.state.userpwd;
      },
      set(val) {
        this.$store.state.userpwd = val;
      }
    },
    userpwd1: {
      get() {
        return this.$store.state.userpwd1;
      },
      set(val) {
        this.$store.state.userpwd1 = val;
      }
    }
  },
  methods: {
    editpwd() {
      var userpwdReg = /^[a-z0-9]{4,12}$/i;
      var obj = this.$store.state;

      if (userpwdReg.test(obj.oldpwd)) {
        if (obj.oldpwd != obj.userpwd) {
          if (obj.userpwd == obj.userpwd1) {
            if (userpwdReg.test(obj.userpwd)) {
              this.$store.dispatch("eidtpwd", {
                cb: result => {
                  if (result.type == "1") {
                    tip(result.msg);
                    localStorage.removeItem("username");
                    this.$store.state.username = "";
                    this.$store.state.userpwd1 = "";
                    this.$store.state.userpwd = "";
                    this.$store.state.oldpwd = "";
                    this.$router.push({ name: "login" });
                  } else {
                    tip(result.msg);
                  }
                }
              });
            } else {
              tip("新密码格式不正确");
            }
          } else {
            tip("两次密码不一致");
          }
        } else {
          tip("新密码不可以和原密码相同");
        }
      } else {
        tip("原密码不正确");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.editpwd {
  background-color: #fff;
  padding: 0.2rem;
  padding-top: 1.2rem;
  .mint-cell {
    margin-bottom: 0.3rem;
    width: 7.1rem;
    height: 0.6rem;
    font-size: 0.16rem;
    border: 1px solid #000;
    input {
      border: 0;
    }
  }
  .user-edit {
    width: 7.1rem;
    height: 0.6rem;
    line-height: 0.6rem;
    border: 0;
    background-color: #000;
    color: #fff;
    font-size: 0.14rem;
    margin-top: 0.2rem;
    outline: none;
  }
}
</style>
