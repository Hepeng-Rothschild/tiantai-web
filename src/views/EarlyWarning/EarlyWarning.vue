<template>
  <div class="warning">
    <div class="select">
      <van-dropdown-menu>
        <van-dropdown-item v-model="timeFrame" :options="timeFrameOptions" />
        <van-dropdown-item v-model="orderStatus" :options="orderStatusOptions" />
      </van-dropdown-menu>
    </div>
    <div class="total_number dark_color fz14">
      单据数
      <span class="mr30">142</span>
      金额
      <span>2132142142</span>
    </div>
    <div class="goods_list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in orderList" :key="index" class="order_item">
          <div class="up flex">
            <span class="fz16 dark_color">惠州市塑化科技公司</span>
            <span
              class="status_icon"
              :class="{ 'expect': true, 'expire':false,'near': false }"
            >逾期 99+</span>
          </div>
          <div class="down flex light_color">
            <div>
              <div class="mb8">
                <span class="mr8">单据日期</span>
                <span class="dark_color">2019-12-30</span>
              </div>
              <div class="mb8">
                <span class="mr8">单据类型</span>
                <span class="dark_color">销货单</span>
              </div>
              <div class="mb8">
                <span class="mr8">金额</span>
                <span class="dark_color">123456</span>
              </div>
            </div>
            <div class="middle">
              <div class="mb8">
                <span class="mr8">到期日期</span>
                <span class="dark_color">2019-12-30</span>
              </div>
              <div class="mb8">
                <span class="mr8">业务员</span>
                <span class="dark_color">张华</span>
              </div>
              <div class="mb8">
                <span class="mr8">余额</span>
                <span class="dark_color">123456</span>
              </div>
            </div>
            <div class="mt10">
              <img src="../../assets/arrow.png" class="arrow_img" />
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeFrame: 0,
      orderStatus: "a",
      timeFrameOptions: [
        { text: "选择时间", value: 0 },
        { text: "本周", value: 1 },
        { text: "本月", value: 2 },
        { text: "本季度", value: 3 },
        { text: "自定义", value: 4 }
      ],
      orderStatusOptions: [
        { text: "全部", value: "a" },
        { text: "临近", value: "b" },
        { text: "到期", value: "c" },
        { text: "逾期", value: "d" }
      ],
      orderList: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.orderList.push(this.orderList.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.orderList.length >= 10) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.warning {
  height: 100%;
  background-color: @bgColor_gray;
  .select {
    padding-top: 12px;
  }
  .total_number {
    padding: 12px 18px;
  }
  .goods_list {
    background-color: #fff;
  }
}
.order_item {
  font-size: 13px;
  border-bottom: 1px solid @borderColor_gray;
  .up {
    padding: 12px 0 12px 18px;
  }
  .down {
    padding: 0px 8px 6px 18px;
  }
}
// 逾期 到期 临近 的基本样式
.status_icon {
  border-radius: 22px 0px 0px 22px;
  text-align: center;
  padding-left: 8px;
  line-height: 20px;
}
// 临近的类名
.near {
  color: rgba(96, 98, 102, 1);
  border: 1px solid #999;
  border-right: none;
}
// 到期的类名
.expire {
  color: rgba(96, 98, 102, 1);
  border: 1px solid rgba(255, 104, 0, 1);
  border-right: none;
}
// 逾期的类名
.expect {
  color: #fff;
  background-color: rgba(255, 104, 0, 1);
}
</style>