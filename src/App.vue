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
      />-->
    </van-nav-bar>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.state.user) {
      this.$store.dispatch("logout");
      this.$store.dispatch("login");
    }else {

      this.$store.dispatch("keepLogin");
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    doSomething() {
      console.log("666");
    },
    toDoSomething() {
      if (this.$route.meta.url) {
        this.$router.push(this.$route.meta.url);
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
