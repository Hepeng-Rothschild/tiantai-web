<template>
  <div>
    <van-search placeholder="输入客户名称进行查找"
                input-align="center"
                v-model="serarchText" />
    <van-cell-group v-for="(customer,index) in customers"
                    :key="index">
      <van-cell :title="customer.name"
                :label="customer.money"
                is-link />
    </van-cell-group>
    <!-- 新增客户按钮 -->
    <van-button round
                type="default"
                class="add" @click="$router.push('/newly')">+</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索内容
      serarchText: "",
      //客户信息
      customers: [
        { name: '客户A', money: '应收余额： ￥200.00', from: '' },
        { name: '客户b', money: '应收余额： ￥22.00', from: '' },
        { name: '客户c', money: '', from: '来自CRM' },
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.van-search {
  margin: 59px 10px 10px 10px;
  padding: 0px;
  width: 94%;
  height: 36px;
  font-size: 14px;
  font-family: "Microsoft Yahei";
  border-radius: 6px;
  border: 1px solid rgba(187, 187, 187, 1);
}
.van-cell-group {
  .van-cell:first-child {
    border-top: 1px solid #c0c4cc;
  }
  .van-cell {
    border-bottom: 1px solid #c0c4cc;
    .van-icon {
      margin-top: 14px;
    }
    .van-cell__title {
      color: #000000;
      font-size: 17px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
    .van-cell__value {
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
      text-align: right;
      font-family: "PingFangSC-regular";
    }
  }
}
.add {
  position: fixed;
  width: 57px;
  height: 50px;
  right: 26px;
  bottom: 75px;
   text-align: center;
  border-radius: 50%;
  box-shadow: 0px 3px 10px -2px rgba(170, 170, 170, 1);
  .van-button__text {
    font-size: 35px;
    color: rgba(1, 113, 240, 1);
  }
}
</style>
