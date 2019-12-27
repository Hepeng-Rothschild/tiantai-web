<template>
  <div class="info">
    <div class="info_box">
      <van-cell title="公司银行账号" is-link value="详细信息" to="bank" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.info {
  padding-top: 59px;

  .info_box {
    height: 46px;
    border-top: 1.5px solid #e5e5e5;
    border-bottom: 1.5px solid #e5e5e5;

    .van-cell__title {
      color: #000;
      font-size: 17px;
    }
    .van-cell__value {
      width: 68px;
      height: 24px;
      color: #888888;
      font-size: 17px;
    }
  }
}
</style>