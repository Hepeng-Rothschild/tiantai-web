<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import { getItem, setItem } from "./utils/Storage.js";
export default {
  data() {
    return {};
  },
  created() {
    this.listenBeforeUnload();
    this.getCurrentUser();
  },
  mounted() {
    this.$store.dispatch("logout");
    this.$store.dispatch("login");
  },
  methods: {
    async getCurrentUser() {
      const currentUser = this.$Parse.User.current();
      if (!currentUser.attributes.hadAuth) {
        this.$router.push("/staff");
      }
    },
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
    }
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
}
</style>
