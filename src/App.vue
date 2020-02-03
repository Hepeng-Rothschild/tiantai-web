<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { getItem, setItem } from "./utils/Storage.js";
export default {
  created() {
    this.listenBeforeUnload();
  },
  mounted() {
    // this.$Parse.Cloud.run('checkUser').then(result =>{
    //     if(result.code == 404){
    //       window.location.href = process.env.VUE_APP_LOGIN_URL
    //     }
    // })
    // if(!this.$Parse.User.current()){
    //   window.location.href = process.env.loginURl
    // }
    // this.$store.dispatch("logout");
    this.$store.dispatch("login");
  },
  methods: {
    // 监听浏览器关闭 保存 vuex 的数据
    listenBeforeUnload() {
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(
          Object.assign({}, this.$store.state, getItem("store"))
        );
      }
      window.addEventListener("beforeunload", () => {
        setItem("store", this.$store.state);
      });
    },
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  & /deep/ .van-nav-bar__text {
    color: #000;
  }
  & /deep/ .van-nav-bar {
    z-index: 4;
  }

  .icon {
    font-size: 20px;
  }
}
</style>
