<template>
  <div class="warning">
    <div class="select">
      <van-dropdown-menu>
        <van-dropdown-item v-model="timeFrame" :options="timeFrameOptions" />
        <van-dropdown-item v-model="orderStatus" :options="orderStatusOptions" />
      </van-dropdown-menu>
    </div>
    <div class="total_number dark_color">
      单据数
      <span class="margin_right">142</span>
      金额
      <span>2132142142</span>
    </div>
    <div class="order_list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in orderList" :key="index" class="order_item">
          <div class="up flex">
            <span class="fz16 dark_color">惠州市塑化科技公司</span>
            <span
              class="status_icon"
              :class="{ 'expect': true, 'expire':false,'near': false }"
            >逾期 99+</span>
          </div>
          <div class="down flex">
            <div class="left">
              <div class="margin_bottom">
                <span class="light_color">单据日期</span>
                <span class="dark_color">2019-12-30</span>
              </div>
              <div class="margin_bottom">
                <span class="light_color">单据类型</span>
                <span class="dark_color">销货单</span>
              </div>
              <div class="margin_bottom">
                <span class="light_color">金额</span>
                <span class="dark_color">123456</span>
              </div>
            </div>
            <div class="middle">
              <div class="margin_bottom">
                <span class="light_color">到期日期</span>
                <span class="dark_color">2019-12-30</span>
              </div>
              <div class="margin_bottom">
                <span class="light_color">业务员</span>
                <span class="dark_color">张华</span>
              </div>
              <div class="margin_bottom">
                <span class="light_color">余额</span>
                <span class="dark_color">123456</span>
              </div>
            </div>
            <div class="margin_top">
              <img src="../../assets/arrow.png" class="image" />
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
  background-color: rgba(244, 244, 244, 1);
  .select {
    padding-top: 12px;
  }
  .total_number {
    font-size: 14px;
    padding: 12px 18px;
  }
  .order_list {
    background-color: #fff;
  }
}
.order_item {
  font-size: 13px;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  .up {
    padding: 12px 0 12px 18px;
  }
  .down {
    padding: 0px 8px 6px 18px;
  }
}
.image {
  width: 10px;
  height: 15px;
}
.fz16 {
  font-size: 16px;
}
.margin_bottom {
  margin-bottom: 8px;
}
.margin_right {
  margin-right: 30px;
}
.margin_top {
  margin-top: 10px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.light_color {
  color: rgba(144, 147, 153, 1);
  margin-right: 5px;
}
.dark_color {
  color: rgba(48, 49, 51, 1);
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
  color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 104, 0, 1);
}
</style>