<template>
  <div>
    <div class="aide">
      <!-- <ul v-for="state in status"
          :key="state.id" @click="details">
        <li class="state">{{state.title}}</li>
        <li>客户 {{state.client}}</li>
        <li>金额 ￥{{state.money}}</li>
        <li>订单号 {{state.orderNum}}</li>
      </ul> -->
      <div v-for="state in status"
           :key="state.id"
           @click="details" class="aide_top">
        <span class="state">{{state.title}}</span>
        <div><span>客户</span> <span>{{state.client}}</span></div>
        <div><span>金额</span> <span>￥{{state.money}}</span></div>
        <div><span>订单号</span> <span>{{state.orderNum}}</span></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 订单状态
      status: [
        { title: '销售订单已审核通过', client: 'xxx公司', money: '8,000.00', orderNum: 2323232 },
        { title: '销售订单被否决', client: 'xxx公司', money: '8,000.00', orderNum: 2323232 },
        { title: '销售订单已出库', client: 'xxx公司', money: '8,000.00', orderNum: 2323232 },
        { title: '订单应收款 已收款', client: 'xxx公司', money: '8,000.00', orderNum: 2323232 }
      ]
    }
  },
  methods: {

    details () {
      this.$router.push({ name: 'details' })
    }
  }
}
</script>

<style lang="less" scoped>
.aide {
  margin: 59px 14px 0px 14px;
  .aide_top {
    padding: 13px 0px 13px 16px;
    .state {
      margin-bottom: 8px;
      color: rgba(34, 34, 34, 1);
      font-size: 17px;
      text-align: left;
    }
    div {
      height: auto;
      overflow: auto;
  }
    span {
      color: rgba(16, 16, 16, 1);
      font-size: 13px;
      text-align: left;
    }
  }
}
</style>
