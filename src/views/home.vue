<template>
  <div>
    <Head :show="!!0" :sshow="!!1"></Head>
    <Swipe></Swipe>

    <ul class="h-menu">
      <li v-for="(menu,i) in menus" :key="i" class="clearfix" @click="to(menu.name,menu.data)">
        <div class="li-left">
          <router-link to>
            <img :src="menu.src" alt>
          </router-link>
        </div>
        <div class="li-rigth">
          <router-link to>
            <h2>{{menu.text1}}</h2>
            <span>{{menu.text2}}</span>
            <p>{{menu.text3}}</p>
          </router-link>
        </div>
      </li>
    </ul>

    <ul class="h-series clearfix">
      <li v-for="(serie,i) in series" :key="i">
        <a @click="to(serie.name,serie.data)">
          <img :src="serie.src" alt>
          <p>{{serie.text}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        {
          src: require("../assets/images/menu1.jpg"),
          text1: "挑选礼物",
          text2: "LOVE GIFTS",
          text3: "挑选您的礼物",
          name: "classify",
          data: "bracelet"
        },
        {
          src: require("../assets/images/menu2.jpg"),
          text1: "求婚钻戒",
          text2: "MARRIAGE DIAMOND RING",
          text3: "签署真爱承诺，锁定一生挚爱",
          name: "classify",
          data: "bracelet"
        },
        {
          src: require("../assets/images/menu3.jpg"),
          text1: "签署证书",
          text2: "LOVE CUSTOM",
          text3: "挑选您的礼物",
          name: "classify",
          data: "bracelet"
        }
      ],
      series: [
        {
          src: require("../assets/images/h-series1.jpg"),
          text: "项链",
          name: "classify",
          data: "necklace"
        },
        {
          src: require("../assets/images/h-series2.jpg"),
          text: "手链/手镯",
          name: "classify",
          data: "bracelet"
        },
        {
          src: require("../assets/images/h-series3.jpg"),
          text: "耳坠",
          name: "classify",
          data: "eardrop"
        },
        {
          src: require("../assets/images/h-series4.jpg"),
          text: "戒指",
          name: "classify",
          data: "ring"
        }
      ]
    };
  },
  methods: {
    to(name, data) {
      this.$store.state.selected = data;
      this.$router.push({ name });
    }
  },
  mounted() {
    this.title = "<img src=" + this.img + " class='h-logo'>";
  }
};
</script>

<style lang="scss" scoped>
.h-menu {
  background-color: #fff;
  padding-bottom: 0.2rem;
  li {
    background-color: #f5f5f5;
    margin-bottom: 0.2rem;
    .li-left {
      width: 4.4rem;
      height: 2.4rem;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .li-rigth {
      float: right;
      width: 3.1rem;
      height: 2.4rem;
      h2 {
        font-size: 0.18rem;
        font-weight: 600;
        color: #000;
        margin-top: 0.8rem;
      }
      span {
        font-size: 0.08rem;
        color: #999;
      }
      p {
        font-size: 0.1rem;
        color: #000;
      }
    }
  }
}

.h-series {
  width: 7.5rem;
  background-color: #fff;
  padding: 0.2rem;
  margin-bottom: 1rem;
  li {
    float: left;
    width: 47%;
    background-color: #f5f5f5;
    margin: 0.1rem;
    img {
      width: 100%;
    }
    p {
      font-size: 0.14rem;
      height: 0.5rem;
      line-height: 0.5rem;
    }
  }
}
</style>
