<template>
  <div class="warning_details fz13">
    <div class="header">
      <div class="dark_color fz16">惠州市塑化科技公司</div>
      <div class="dark_color mt10 mb8">
        <span class="mr8">联系人</span>高盛
      </div>
      <div class="dark_color">13738200283</div>
    </div>
    <div class="main flex mt10">
      <div class="left">
        <div class="mb8">
          <span class="light_color mr8">状态</span>
          <span class="dark_color">逾期</span>
        </div>
        <div class="mb8">
          <span class="light_color mr8">单据日期</span>
          <span class="dark_color">2019-12-30</span>
        </div>
        <div class="mb8">
          <span class="light_color mr8">单据类型</span>
          <span class="dark_color">销货单</span>
        </div>
        <div>
          <span class="light_color mr8">金额</span>
          <span class="dark_color">23400.00</span>
        </div>
      </div>
      <div class="right">
        <div class="mb8">
          <span class="light_color mr8">天数</span>
          <span class="dark_color">99+</span>
        </div>
        <div class="mb8">
          <span class="light_color mr8">到期日期</span>
          <span class="dark_color">2019-12-30</span>
        </div>
        <div class="mb8">
          <span class="light_color mr8">业务员</span>
          <span class="dark_color">张华</span>
        </div>
        <div>
          <span class="light_color mr8">余额</span>
          <span class="dark_color">23400.00</span>
        </div>
      </div>
    </div>

    <div class="title">
      <div class="mb8">
        <span>该客户全部应收</span>(2)
      </div>
      <div>
        <span class="mr8">金额</span>
        <span class="mr30">100,000.00</span>
        <span class="mr8">余额</span>12,345.00
      </div>
    </div>
    <div class="my_list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in orderList" :key="index">
          <div class="up flex">
            <span class="fz16 dark_color">惠州市塑化科技公司</span>
            <span
              class="status_icon"
              :class="{ 'expect': true, 'expire':false,'near': false }"
            >逾期 99+</span>
          </div>
          <div class="down flex light_color">
            <div class="left">
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
            <div>
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
        for (let i = 0; i < 2; i++) {
          this.orderList.push(this.orderList.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.orderList.length >= 2) {
          this.finished = true;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.warning_details {
  height: 100%;
  background-color: @bgColor_gray;
  .header {
    padding: 20px 18px 12px;
    background-color: #fff;
  }
  .main {
    padding: 12px 18px;
    background-color: #fff;
  }
  .title {
    padding: 22px 18px 10px 18px;
  }
  .my_list {
    background-color: #fff;
    border-bottom: 1px solid @borderColor_gray;
    .up {
      padding: 12px 0 12px 18px;
    }
    .down {
      padding: 0px 8px 6px 18px;
    }
  }
}

// 逾期 到期 临近 的基本样式
.status_icon {
  border-radius: 22px 0px 0px 22px;
  text-align: center;
  padding-left: 8px;
  line-height: 24px;
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