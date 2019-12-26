<template>
  <div class="setting">
    <div class="setting_box">
      <van-cell title="采购到货提醒" is-link to="bank">已订阅 5</van-cell>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.setting {
  padding-top: 59px;

  .setting_box {
    height: 46px;
    border-top: 1.5px solid #e5e5e5;
    border-bottom: 1.5px solid #e5e5e5;

    .van-cell {
      color: #000;
      font-size: 17px;
      
      .van-cell__value {
        width: 68px;
        height: 24px;
        color: #888888;
        font-size: 17px;
      }
    }
  }
}
</style>