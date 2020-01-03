<template>
  <div id="app">
    <van-nav-bar
      :title="$route.meta.title"
      :right-text="$route.meta.right"
      left-arrow
      fixed
      @click-left="back"
      @click-right="toDoSomething()"
    >
      <!-- <van-icon
        name="notes-o"
        slot="right"
        v-if="$route.meta.icon"
        class="icon"
        @click="doSomething()"
      /> -->
    </van-nav-bar>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    // this.login();
    // this.logout()
  },
  mounted() {
    if(!this.$store.state.user) {
      this.$store.dispatch('getUser')
    }
  },
  methods: {
    async logout() {
      const data = await this.$Parse.User.logOut();
      console.log("退出登录", data);
    },
    async login() {
      const { data } = await this.$Parse.Cloud.run("login");
      const user = await this.$Parse.User.become(data.sessionToken);
      console.log("我带着token又登录啦", user);
    },
    back() {
      this.$router.go(-1);
    },
    doSomething() {
      console.log("666");
    },
    toDoSomething() {
      if (this.$route.meta.url) {
        this.$router.push(this.$route.meta.url)
      }
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

  .icon {
    font-size: 20px;
  }
}
</style>
