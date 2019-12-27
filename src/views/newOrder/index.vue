<template>
  <div>
    <van-cell-group>
      <van-cell title="单据日期*"
                :value="myDate"
                is-link
                @click="changeDate('myDate')">

      </van-cell>
      <!-- 开启遮罩层，，给需要点击的单元格设定一个属性，通过这个属性来判断调取那个时间控件 -->
      <van-overlay :show="show"
                   @click="show = false">
        <!-- 日期控件 -->
        <van-datetime-picker v-model="currentDate"
                             type="date"
                             @confirm="confirmPicker(datePicker)" />
      </van-overlay>
      <van-cell title="预计交货日期*"
                :value="newDate"
                is-link
                @click="changeDate('newDate')">
      </van-cell>
      <van-cell title="客户*"
                value="请选择客户"
                is-link
                class="spacing"
                to="/select">
      </van-cell>
      <van-cell title="业务员"
                :value="salesmanName"
                is-link
                class="spacing"
                @click="popupShow = true">
      </van-cell>
      <van-popup v-model="popupShow"
                 position="bottom"
                 :style="{ height: '30%' }">
        <div v-for="salesman in salesmans"
             :key="salesman.id"
             @click="changeName(salesman.name)">{{salesman.name}}</div>
      </van-popup>
      <van-cell title="选择商品"
                value="请选择"
                is-link
                class="spacing"
                to="/choose">
      </van-cell>
      <div class="spacing-two">
        <van-cell title="币种"
                  :value="coinsName"
                  is-link
                  @click="popupShowCoin = true">
        </van-cell>
        <van-popup v-model="popupShowCoin"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="coin in coins"
               :key="coin.id"
               @click="changeCoin(coin.name)">{{coin.name}}</div>
        </van-popup>
        <van-cell title="汇率">
          <van-field v-model="value.rate"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
      </div>
      <div class="spacing-two">
        <van-cell title="发货要求">
          <van-field v-model="value.send"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="送货要求">
          <van-field v-model="value.delivery"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
      </div>
      <div class="remark">
        <div class="remark-name">备注</div>
        <van-field v-model="value.remark"
                   placeholder="添加备注"
                   style="border:0px;" />
      </div>
    </van-cell-group>
    <div class="buttonBox">
      <van-button plain
                  type="primary">存草稿</van-button>
      <van-button type="info">提交订单</van-button>
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      coinsName: '请选择',
      salesmanName: '请选择',
      // 币种
      coins: [{ id: 1, name: '人民币' }, { id: 2, name: '美元' }, { id: 3, name: '英镑' }],
      // 业务人员
      salesmans: [{ id: 1, name: '罗永浩' }, { id: 2, name: '杰克马' }, { id: 3, name: '罗玉凤' }],
      // 控制单元格内的输入框
      value:
        {
          rate: '',
          send: '',
          delivery: '',
          remark: ''
        },
      popupShowCoin: false,
      // 控制弹出层显示隐藏
      popupShow: false,
      // 日期
      currentDate: new Date(),
      // 单据日期遮罩层
      show: false,
      // 开始时间默认值
      myDate: '请选择',
      // 结束时间默认值
      newDate: '请选择'

    }
  },
  methods: {
    changeCoin (coinNew) {
      this.coinsName = coinNew
      this.popupShowCoin = false
    },
    changeName (nameNew) {
      this.salesmanName = nameNew
      this.popupShow = false
    },
    changeDate (dateNew) {
      this.show = true
      this.datePicker = dateNew
    },
    confirmPicker (value) {
      this[value] = dayjs(this.currentDate).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell-group {
  margin-top: 59px;
  border-top: 1px solid #c0c4cc;
  margin-bottom: 16px;
  // 底部弹框样式
  .van-popup {
    div {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 17px;
      color: rgba(16, 16, 16, 1);
    }
  }
  .van-cell {
    padding: 10px 15px 10px 15px;
    border-bottom: 1px solid #c0c4cc;
    // 单元格内输入框样式
    .van-field {
      padding: 0px;
      font-size: 17px;
      padding-right: 20px;
    }
    .van-cell__title {
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
    .van-cell__value {
      color: #888888;
      font-size: 17px;
      text-align: right;
      font-family: "PingFangSC-regular";
    }
  }
  .van-overlay {
    .van-picker {
      width: 100%;
      position: fixed;
      bottom: 0;
    }
  }
  // 带间距的单元格样式
  .spacing {
    margin: 17px 0px 17px 0px;
    border-top: 1px solid #c0c4cc;
  }
  .spacing-two {
    border-top: 1px solid #c0c4cc;
    margin-bottom: 17px;
  }
  .filed {
    border-top: 1px solid #c0c4cc;
  }
  .remark {
    border-bottom: 1px solid #c0c4cc;
    .remark-name {
      margin-left: 16px;
      font-size: 17px;
    }
  }
}
// 底部两个按钮
.buttonBox {
  margin: 0px 10px 54px 10px;
  .van-button--primary {
    color: #0071f0;
    width: 43%;
    height: 44px;
    line-height: 20px;
    border-radius: 5px 5px 5px 5px;
    text-align: center;
    border: 1px solid rgba(0, 113, 240, 1);
    margin-right: 10px;
  }
  .van-button--info {
    width: 53%;
    height: 44px;
    line-height: 20px;
    border-radius: 5px 5px 5px 5px;
    background-color: rgba(1, 113, 240, 1);
    text-align: center;
    border: 1px solid rgba(5, 5, 5, 0.08);
  }
}
</style>
