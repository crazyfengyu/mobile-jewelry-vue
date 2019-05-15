<template>
  <div>
    <Uhead utitle="选择地址"></Uhead>
    <div class="select-address" v-if="flag">
      <h3 class="s-title">
        <span>请选择地址</span>
        <button @click="addaddress">添加新地址</button>
      </h3>
      <mt-radio v-model="value" :options="address"></mt-radio>
      <button class="addressok" @click="addressok">配送至该地址</button>
    </div>
    <div class="add-address" v-else>
      <button @click="replace" class="replace">使用原地址</button>
      <mt-field label="收件人" placeholder="请输入收件人姓名" v-model="addressname"></mt-field>
      <mt-field label="手机" placeholder="请输入收件人手机号" type="tel" v-model="addresstel"></mt-field>

      <div class="three-level-address" id="three_level_address">
        <div class="region-div">
          <span class="input-icon">
            <i class="iconfont icon-dizhi"></i>
          </span>
          <input
            type="text"
            placeholder="点击选择地址"
            v-model="region"
            maxlength="80"
            readonly="readonly"
            @click="showAddressPicker"
            class="address"
          >
          <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
            <mt-picker
              :slots="myAddressSlots"
              valueKey="name"
              :visibleItemCount="5"
              @change="addressChange"
              :itemHeight="40"
            ></mt-picker>
          </mt-popup>

          <div class="data-show-div">
            <p>请输入详细地址:</p>
            <textarea name id cols="30" rows="10" class="showaddress" v-model="region"></textarea>
          </div>
          <button class="sub" @click="save">添加改地址</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { http, aesDecrypt, tip } from "../utils/index.js";
import { Picker, Popup } from "mint-ui";
import threeLevelAddress from "../assets/address3.json";
export default {
  data() {
    return {
      flag: false,
      address: [],
      region: "", //三级地址
      province: "", //省
      city: "", //市
      county: "", //县
      provinceCode: "", //省级代码
      cityCode: "", //市级代码
      countyCode: "", //县级代
      regionVisible: false,
      regionInit: false,
      myAddressSlots: [
        {
          flex: 1,
          values: this.getProvinceArr(),
          className: "slot1",
          textAlign: "center"
        }, //分隔符
        {
          divider: true,
          content: "",
          className: "slot2"
        },
        {
          flex: 1,
          values: this.getCityArr("北京市"),
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "",
          className: "slot4"
        },
        {
          flex: 1,
          values: this.getCountyArr("北京市", "北京市"),
          className: "slot5",
          textAlign: "center"
        }
      ],
      value: "",
      buyId: this.$store.state.buyId
    };
  },
  computed: {
    addressname: {
      get() {
        return this.$store.state.addressname;
      },
      set(val) {
        this.$store.state.addressname = val;
      }
    },
    addresstel: {
      get() {
        return this.$store.state.addresstel;
      },
      set(val) {
        this.$store.state.addresstel = val;
      }
    }
  },
  mounted() {
    if (localStorage.username) {
      var username = aesDecrypt(localStorage.username, "fengyu");
      http.get("/vue/getaddress", { params: { username } }).then(res => {
        if (res.data.length > 0) {
          this.flag = true;
          res.data.forEach(item => {
            this.address.push(
              "收件人：" +
                item.addressname +
                " " +
                "电话：" +
                item.addresstel +
                " " +
                "收货地址：" +
                item.address
            );
          });
        } else {
          this.flag = false;
        }
      });
    } else {
      this.$router.push({ name: "login" });
    }

    let orderHeight = window.innerHeight;
    document.getElementById("three_level_address").style.height =
      orderHeight + "px";
  },
  methods: {
    showAddressPicker() {
      this.regionVisible = true;
    },
    addressChange(picker, values) {
      if (this.regionInit) {
        this.region = values[0]["name"] + values[1]["name"] + values[2]["name"];
        this.province = values[0]["name"];
        this.city = values[1]["name"];
        this.county = values[2]["name"];
        this.provinceCode = values[0]["code"];
        this.cityCode = values[1]["code"];
        this.countyCode = values[2]["code"];
        picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
        picker.setSlotValues(
          2,
          this.getCountyArr(values[0]["name"], values[1]["name"])
        );
      } else {
        this.regionInit = true;
      }
    }, //遍历json，返回省级对象数组
    getProvinceArr() {
      let provinceArr = [];
      threeLevelAddress.forEach(function(item) {
        let obj = {};
        obj.name = item.name;
        obj.code = item.code;
        provinceArr.push(obj);
      });
      return provinceArr;
    }, //遍历json，返回市级对象数组
    getCityArr(province) {
      // console.log("省：" + province);
      let cityArr = [];
      threeLevelAddress.forEach(function(item) {
        if (item.name === province) {
          item.children.forEach(function(args) {
            let obj = {};
            obj.name = args.name;
            obj.code = args.code;
            cityArr.push(obj);
          });
        }
      });
      return cityArr;
    }, //遍历json，返回县级对象数组
    getCountyArr(province, city) {
      let countyArr = [];
      threeLevelAddress.forEach(function(item) {
        if (item.name === province) {
          item.children.forEach(function(args) {
            if (args.name === city) {
              args.children.forEach(function(param) {
                let obj = {};
                obj.name = param.name;
                obj.code = param.code;
                countyArr.push(obj);
              });
            }
          });
        }
      });
      return countyArr;
    },
    save() {
      var usertelReg = /^1(3|4|5|7|8)\d{9}$/gi;
      var obj = this.$store.state;
      var username = aesDecrypt(localStorage.username, "fengyu");
      if (usertelReg.test(obj.addresstel)) {
        http
          .get("/vue/saveaddress", {
            params: {
              addressname: obj.addressname,
              addresstel: obj.addresstel,
              address: this.region,
              username
            }
          })
          .then(res => {
            this.region = "";
            tip("地址添加成功");
            setTimeout(() => {
              var username = aesDecrypt(localStorage.username, "fengyu");
              http
                .get("/vue/getaddress", { params: { username } })
                .then(res => {
                  res.data.forEach(item => {
                    this.address.push(
                      "收件人：" +
                        item.addressname +
                        " " +
                        "电话：" +
                        item.addresstel +
                        " " +
                        "收货地址：" +
                        item.address
                    );
                  });
                });
              this.flag = true;
            }, 1000);
          });
      } else {
        tip("手机号错误，请输入正确的手机号");
      }
    },
    addaddress() {
      this.flag = false;
    },
    replace() {
      this.flag = true;
    },
    addressok() {
      this.$store.dispatch("addressok", {
        _id: this.buyId,
        cb: result => {
          tip(result.data.msg);
          if (result.data.type == "1") {
            this.$router.push({ name: "order" });
          } else {
            this.$router.push({ name: "car" });
          }
        }
      });
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.select-address {
  margin-top: 0.8rem;
  padding: 0.2rem;
  .s-title {
    text-align: left;
    height: 0.4rem;
    line-height: 0.4rem;
    span {
      font-size: 0.2rem;
      font-weight: 600;
      display: inline-block;
      vertical-align: middle;
    }
    button {
      float: right;
      width: 1rem;
      vertical-align: middle;
      height: 0.4rem;
      outline: none;
      background-color: #000;
      color: #fff;
      border: 1px solid #000;
      font-size: 0.16rem;
    }
  }
  .addressok {
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

.add-address {
  margin-top: 0.8rem;
  text-align: left;
  padding: 0.2rem;
  .mint-cell {
    margin-bottom: 0.3rem;
    width: 7.1rem;
    height: 0.6rem;
    font-size: 0.16rem;
    border: 0.02px solid #000;
    input {
      border: 0;
    }
  }
  .address {
    width: 50%;
    height: 0.6rem;
    font-size: 0.16rem;
    border: 0.02px solid #000;
    padding-left: 0.2rem;
  }
  .mint-popup {
    width: 100%;
  }
  .data-show-div {
    p {
      line-height: 0.6rem;
      height: 0.6rem;
    }
    .showaddress {
      width: 100%;
      height: 1rem;
      font-size: 0.18rem;
      padding: 0.1rem;
    }
  }
  .sub {
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
  .replace {
    width: 1rem;
    vertical-align: middle;
    height: 0.4rem;
    outline: none;
    background-color: #000;
    color: #fff;
    border: 1px solid #000;
    font-size: 0.16rem;
    margin-bottom: 0.2rem;
  }
}
</style>
