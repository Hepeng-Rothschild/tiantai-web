<template>
  <div>
    <van-nav-bar title="订单详情"
                 left-arrow
                 fixed
                 @click-left="back" />
    <div class="content">
      <form>
        <div>
          <label>单据编号</label>
          <span>{{contents.number}}</span>
        </div>
        <div>
          <label>客户</label>
          <span>{{contents.client}}</span>
        </div>
        <div>
          <label>业务员</label>
          <span>{{contents.sales}}</span>
        </div>
        <div>
          <label>预计交货时间</label>
          <span>{{contents.predict}}</span></div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailsIndex',
  data () {
    return {
      // 订单详情信息
      contents:
        { number: 525545454, client: 'xxx公司', sales: '张强', predict: '2019-12-12', phone: '1545565656', address: 'xx省xx市' },
      // 订单修改信息
      revise: {
        title: '19D'
      }
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'indent' })
    }
  }
}
</script>

<style lang = "less" scoped>
.content {
  margin-top: 59px;
  width: 100%;
  border-bottom: 1px solid rgba(153, 153, 153, 1);
  form {
    margin-left: 16px;
    label {
      /* width: 100%; */
      margin-right: 32px;
      color: rgba(153, 153, 153, 1);
      font-size: 15px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
    span {
      color: #101010;
      font-size: 15px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
  }
}
</style>
