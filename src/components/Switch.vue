<template>
  <div class="switch">
    <span class="box" :class="{'active':value,'right':value}">
      <span class="circle"></span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
.switch {
  .box {
    display: flex;
    align-items: center;
    width: 50px;
    height: 26px;
    border: 1px solid #ccc;
    background-color: #ccc;
    border-radius: 18px;
    outline: none;
  }
  .active {
    background-color: #02e166;
  }
  .circle {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0 0 2px #999;
  }
  .right {
    justify-content: flex-end;
  }
}
</style>