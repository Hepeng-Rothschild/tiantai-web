<template>
  <div class="warning_details">
    <div class="header">
      <div class="dark_color fz16">惠州市塑化科技公司</div>
      <div class="dark_color margin_top margin_bottom">
        <span class="margin_right">联系人</span>高盛
      </div>
      <div class="dark_color">13738200283</div>
    </div>
    <div class="main margin_top">
      <div class="left">
        <div class="margin_bottom">
          <span class="light_color margin_right">状态</span>
          <span class="dark_color">逾期</span>
        </div>
        <div class="margin_bottom">
          <span class="light_color margin_right">单据日期</span>
          <span class="dark_color">2019-12-30</span>
        </div>
        <div class="margin_bottom">
          <span class="light_color margin_right">单据类型</span>
          <span class="dark_color">销货单</span>
        </div>
        <div>
          <span class="light_color margin_right">金额</span>
          <span class="dark_color">23400.00</span>
        </div>
      </div>
      <div class="right">
        <div class="margin_bottom">
          <span class="light_color margin_right">天数</span>
          <span class="dark_color">99+</span>
        </div>
        <div class="margin_bottom">
          <span class="light_color margin_right">到期日期</span>
          <span class="dark_color">2019-12-30</span>
        </div>
        <div class="margin_bottom">
          <span class="light_color margin_right">业务员</span>
          <span class="dark_color">张华</span>
        </div>
        <div>
          <span class="light_color margin_right">余额</span>
          <span class="dark_color">23400.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.warning_details {
  height: 100%;
  font-size: 13px;
  background-color: rgba(244, 244, 244, 1);
  .header {
    padding: 20px 18px 12px;
    background-color: #fff;
  }
  .main {
    display: flex;
    justify-content: space-between;
    padding: 12px 18px;
    background-color: #fff;
  }
}
.fz16 {
  font-size: 16px;
}
.light_color {
  color: rgba(144, 147, 153, 1);
}
.dark_color {
  color: rgba(48, 49, 51, 1);
}
.margin_top {
  margin-top: 10px;
}
.margin_right {
  margin-right: 8px;
}
.margin_bottom {
  margin-bottom: 8px;
}
</style>