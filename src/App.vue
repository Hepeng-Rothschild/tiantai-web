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
    <div class="footBox"></div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
html,body {
  height: 100%;
}
#app {
  height: 100%;
  & /deep/ .van-nav-bar__text {
        color: #000;
    }
}
</style>
