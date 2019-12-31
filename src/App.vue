<template>
  <div id="app">
    <van-nav-bar
      :title="$route.meta.title"
      :right-text="$route.meta.right"
      left-arrow
      fixed
      @click-left="back"
      @click-right="$router.push($route.meta.url)"
    />
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    this.login();
    // this.logout()
  },
  methods: {
    async logout() {
      const data = await this.$Parse.User.logOut()
      console.log('退出登录',data)
    },
    async login() {
      // const {data} = await this.$Parse.Cloud.run("login");
       console.log('====');
      const user = await this.$Parse.User.become('r:d2a41743323e79090238c5bf1a6018a1')
     
      
      console.log('我带着token又登录啦',user);
    },
    back() {
      this.$router.go(-1);
    }
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
}
</style>
