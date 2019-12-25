<template>
  <div id="app">
    <van-nav-bar :title="$route.meta.title"
                 left-arrow
                 fixed
                 @click-left="back" />
    <router-view />
  </div>

</template>

<script>
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
