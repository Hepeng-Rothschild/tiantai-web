<template>
  <div class="box">
    <van-nav-bar title="选择商品"
                 left-arrow
                 fixed
                 @click-left="back" />

    <van-search input-align="center" v-model="serarchText" />

    <span class="history">{{company.name}}的历史购买</span>

    <van-cell-group v-for="(information,index) in informations"
                    :key="index">
      <van-cell :title="information.code"
                :value="information.quantity"
                :label="information.codeName">
        <van-icon slot="right-icon"
                  name="add-o" />
      </van-cell>
    </van-cell-group>
    <van-cell-group v-for="(remain,index) in remains"
                    :key="index"
                    title="所有存货">
      <van-cell :title="remain.code"
                :value="remain.quantity"
                :label="remain.codeName">
        <van-icon slot="right-icon"
                  name="add-o" />
      </van-cell>
    </van-cell-group>


    <div class="submit">
      <div class="left">
        <span>已选 {{chooseNum}} 种</span>
        <br />
        <span>￥ {{money}}</span>
      </div>
      <div class="right">
        <van-button type="info">完成</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 选择数量
      chooseNum: 45612,
      // 总计价格
      money: '22120.00',
      // 搜索内容
      serarchText: "",
      // 返回 到的公司名称
      company:
        { name: '山西xxxxx公司' },
      // 返回的历史购买商品信息
      informations: [
        { code: '19D', codeName: '滑石粉', quantity: '847.00' },
        { code: '12D', codeName: '滑石粉', quantity: '847.00' },
        { code: '11D', codeName: '滑石粉', quantity: '847.00' },
        { code: '12D', codeName: '滑石粉', quantity: '847.00' }
      ],
      // 存货信息
      remains: [
        { code: '19D', codeName: '滑石粉', quantity: '847.00' }
      ]
    }
  },
  methods: {
    back () {
      this.$router.push({ name: 'neworder' })
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  margin-bottom: 95px;
  padding-bottom: 95px;
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
.history {
  margin-left: 16px;
  color: rgba(144, 147, 153, 1);
  font-size: 14px;
  text-align: left;
  font-family: "PingFangSC-regular";
}
.van-cell-group {
  .van-cell {
    border-bottom: 1px solid #c0c4cc;
    // 添加图标
    .van-icon {
      font-size: 24px;
      padding-top: 13px;
      color: rgba(111, 155, 232, 1);
      text-align: center;
    }
    .van-cell__value {
      padding-top: 23px;
      padding-right: 6px;
      text-align: left;
    }
  }
}
// 底部完成按钮
.submit {
  position: fixed;
  bottom: 0px;
  width: 95%;
  height: 95px;
  margin-left: 16px;
  display: flex;
  .left {
    flex: 1;
    span {
      font-size: 16px;
      color: rgba(16, 16, 16, 1);
      font-family: "PingFangSC-regular";
    }
  }
  .right {
    flex: 1;
    .van-button {
      float: right;
      width: 104px;
      height: 52px;
      line-height: 20px;
      background-color: #0171f0;
      border-radius: 5px 5px 5px 5px;
      text-align: center;
    }
  }
}
}

</style>
