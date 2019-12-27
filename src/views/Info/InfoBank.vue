<template>
  <div class="bank">
    <div class="top">
      <span class="anth">作者</span>
      <span class="date">2019-12-26</span>
    </div>
    <div class="bottom">
      <div class="line">正文正文</div>
      <div class="line">公司账号</div>
      <div class="line">招商银行广州支行</div>
      <div class="line">6217000130002222666</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.bank {
  padding: 0 26px;
  padding-top: 78px;
  .top {
    color: rgba(170, 170, 170, 1);
    font-size: 14px;
    margin-bottom: 24px;
    .date {
      padding-left: 88px;
    }
  }
  .bottom {
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
  }
  .line {
    height: 30px;
  }
}
</style>