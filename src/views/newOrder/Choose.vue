<template>
  <div>
    <div class="header">

      <!-- 搜索栏 -->
      <van-search input-align="center"
                  v-model="serarchText" />
      <!-- 交易历史记录 -->
      <span class="history">{{company.name}}的历史购买</span>
      <!-- 单元格大盒子 -->
      <van-cell-group v-for="(information,index) in informations"
                      :key="index">
        <van-cell :title="information.code"
                  :label="information.codeName">
          现存量 {{information.quantity}}
          <!-- 单元格+号图表 -->
          <van-icon slot="right-icon"
                    name="add-o"
                    @click="show == true" />
          <!-- 单元格弹框 -->
          <van-dialog v-model="show"
                      title="标题"
                      show-cancel-button></van-dialog>
        </van-cell>
      </van-cell-group>
      <van-cell-group v-for="(remain,index) in remains"
                      :key="index"
                      title="所有存货">
        <van-cell :title="remain.code"
                  :label="remain.codeName">
          现存量 {{remain.quantity}}
          <van-icon slot="right-icon"
                    name="add-o" />
          <van-dialog v-model="show"
                      show-cancel-button>
          </van-dialog>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 底部的确认按钮 -->
    <div class="footer">
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

  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data () {
    return {
      // 控制弹框显示隐藏
      show: false,
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

  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
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
        padding-right: 45px;
        text-align: left;
      }
    }
  }
}

// 底部完成按钮
.submit {
  position: fixed;
  bottom: 0px;
  width: 95%;
  height: 95px;
  padding-left: 16px;
  border-top: 1px solid #c0c4cc;
  display: flex;
  background-color: #fff;
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
</style>
