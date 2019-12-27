<template>
  <div class="notice">
    <div class="select">
      <span class="text">筛选时间</span>
      <span class="text">筛选种类</span>
    </div>
    <div class="tip" v-for="item in 4" :key="item">
      <div class="title">
        <span class="CG">采购提醒</span>
        <span class="DY">订阅</span>
      </div>
      <div class="text">滑石粉</div>
      <div class="text">
        <span>型号</span>
        <span class="margin_left">H27</span>
      </div>
      <div class="text">
        <span>数量</span>
        <span class="margin_left">4000KG</span>
      </div>
      <div class="text">
        <span>到货时间</span>
        <span class="margin_left">2019-12-26</span>
      </div>
      <div class="author">
        <span>发布者</span>
        <span class="margin_left">2019-12-26</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.notice {
  padding: 60px 14px;
  height: 100%;
  background-color: #f8f8f8;
  overflow: auto;
}

.select {
  .text {
    width: 126px;
    line-height: 20px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    &:last-child {
      padding-left: 20px;
    }
  }
}
.tip {
  line-height: 20px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(16, 16, 16, 1);
  font-size: 14px;
  margin-top: 12px;
  padding: 13px 0px 10px 15px;
  .CG {
    color: rgba(34, 34, 34, 1);
    font-size: 17px;
  }
  .DY {
    display: inline-block;
    margin-left: 145px;
    width: 54px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    color: rgba(16, 16, 16, 1);
    font-size: 13px;
    text-align: center;
    border: 1px solid rgba(187, 187, 187, 1);
  }
  .text {
    color: rgba(16, 16, 16, 1);
    font-size: 13px;
    .margin_left {
      margin-left: 10px;
    }
  }
  .author {
    height: 18px;
    color: rgba(136, 136, 136, 1);
    font-size: 13px;
    .margin_left {
      margin-left: 15px;
    }
  }
}
</style>