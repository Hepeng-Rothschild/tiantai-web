<template>
  <div class="neworder">
    <van-cell-group>
      <!-- 第一行 和 第一个日期控件 -->
      <van-cell title="单据日期*" :value="date_1" is-link @click="show_1 = true"></van-cell>

      <!-- 第二行 和 第二个日期控件-->
      <van-cell title="预计交货日期*" :value="date_2" is-link @click="show_2=true"></van-cell>

      <!-- 选择客户 -->

      <van-cell
        title="客户*"
        is-link
        class="spacing"
        to="/selectpartner"
      >{{ partner?partner.AA_Partner_Contact:'请选择客户' }}</van-cell>

      <!-- 选择业务员 -->
      <van-cell
        title="业务员"
        is-link
        class="spacing"
        to="/selectsaleman"
      >{{saleMan?saleMan.name:'请选择'}}</van-cell>
      <!-- 选择商品 -->
      <van-cell title="选择商品" value="请选择" is-link class="spacing" to="/choose"></van-cell>
      <!-- <div class="goods">
        <div class="left">
          <div class="code">19D</div>
          <div class="gray">滑石粉</div>
          <div class="gray">￥3.00*300</div>
        </div>
        <div class="right">
          <div class="edit">编辑</div>
          <div class="money">￥750</div>
        </div>
      </div>-->
      <div class="spacing">
        <van-cell title="币种" :value="moneyType" is-link @click="popupShowCoin = true"></van-cell>

        <van-cell title="汇率">
          <van-field
            v-model="exchangeRate"
            placeholder="请输入"
            input-align="right"
            style="border:0px;"
          />
        </van-cell>
      </div>
      <div class="remark spacing">
        <div class="remark-name">送货要求</div>
        <van-field v-model="deliveryRequire" placeholder="添加" style="border:0px;" />
      </div>
    </van-cell-group>
    <van-overlay :show="show_2">
      <!-- 日期控件 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirmPicker2"
        @cancel="show_2=false"
      />
    </van-overlay>
    <van-overlay :show="show_1">
      <!-- 日期控件 -->
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirmPicker1"
        @cancel="show_1=false"
      />
    </van-overlay>
    <van-popup v-model="popupShowCoin" position="bottom" :style="{ height: '30%' }">
      <!-- <div v-for="coin in coins" :key="coin.id" @click="changeMoneyType(coin.name)">{{coin.name}}</div> -->
      <van-picker
        :columns="coins"
        :default-index="3"
        show-toolbar
        @cancel="popupShowCoin=false"
        @confirm="confirmCoins"
      />
    </van-popup>
    <div class="buttonBox">
      <van-button plain type="primary">存入草稿</van-button>
      <van-button type="info">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
import { getItem, setItem } from "../../utils/Storage.js";
export default {
  data() {
    return {
      moneyType: "人民币",
      // 币种
      coins: null,
      // 控制单元格内的输入框
      exchangeRate: (1.0).toFixed(1), // 汇率
      deliveryRequire: "", // 送货要求
      popupShowCoin: false,
      // 日期
      currentDate: new Date(),
      // 单据日期遮罩层
      show_1: false,
      show_2: false,
      // 开始时间默认值
      date_1: "请选择",
      // 结束时间默认值
      date_2: "请选择",
      saleMan: getItem("selectSaleMan"),
      partner: getItem("selectPartner")
    };
  },
  mounted() {
    !getItem("selectSaleMan") &&
      getItem("selectPartner") &&
      this.selectPartner();
    this.getCurrency();
    // this.createOrder()
  },
  methods: {
    changeMoneyType(type) {
      this.moneyType = type;
      this.popupShowCoin = false;
    },

    changeDate(dateNew) {
      this.datePicker = dateNew;
    },

    confirmPicker1(value) {
      this.show_1 = false;
      this.date_1 = dayjs(value).format("YYYY-MM-DD");
    },
    confirmPicker2(value) {
      this.show_2 = false;
      this.date_2 = dayjs(value).format("YYYY-MM-DD");
    },
    confirmCoins(value) {
      console.log(value);
    },
    async createOrder() {
      const data = await this.$Parse.Cloud.run("createOrder", {
        VoucherDate: "2020-01-06", //1、单据日期。 2、此参数可不传，默认系统日期。
        DeliveryDate: "2020-03-21", // 预计交货日期
        Customer: { Code: "K025588" }, // AA_Partner_code
        Clerk: { Code: "102" }, // 业务员
        Currency: { Code: "RMB" }, // 币种
        // ExchangeRate // 汇率，decimal类型
        // Memo:''
        SaleOrderDetails: [
          {
            Unit: { Name: "KG" },
            Quantity: 7,
            DiscountRate: 1, // 折扣率
            IsPresent: false, // 是否赠品
            Inventory:{Code:'DT18C'}, // T+系统存货编码
            OrigDiscountPrice:15, // 单价
            OrigTaxPrice: 18, // 含税单价
            OrigDiscountAmount:15, // 原币金额
            OrigTaxAmount:18, // 原币含税金额
            OrigTax:3, // 原币税额
          }
        ]
      });
      console.log(data);
    },
    async getCurrency() {
      const { data } = await this.$Parse.Cloud.run("getCurrency");
      let coins = [];
      for (let i = 0; i < data[0].length; i++) {
        coins.push(data[0][i].name);
      }
      this.coins = coins;
      // console.log("---", data);
    },
    async selectPartner() {
      const { data } = await this.$Parse.Cloud.run("getAllSaleMan");
      const saleMan = data.filter((item, index) => {
        return item.id == this.partner.AA_Partner_idsaleman;
      });
      this.saleMan = saleMan[0];
    }
  }
};
</script>

<style lang="less" scoped>
.neworder {
  padding-top: 59px;
  background-color: rgba(248, 248, 248, 1);
}
.van-cell-group {
  border-top: 1px solid #c0c4cc;
  background-color: rgba(248, 248, 248, 1);
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
    font-size: 17px;

    // 单元格内输入框样式
    .van-field {
      padding: 0px;
      padding-right: 20px;
    }
    .van-cell__title {
      color: rgba(0, 0, 0, 1);
    }
    .van-cell__value {
      color: #888888;
    }
  }
  // 带间距的单元格样式
  .spacing {
    margin-top: 17px;
    border-top: 1px solid #c0c4cc;
  }
  .remark {
    border-bottom: 1px solid #c0c4cc;
    .remark-name {
      background-color: #fff;
      padding-left: 16px;
      padding-top: 10px;
      font-size: 17px;
    }
  }
}
.van-overlay {
  .van-picker {
    width: 100%;
    position: fixed;
    bottom: 0;
  }
}
// 底部按钮
.buttonBox {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  .van-button--primary {
    color: #0071f0;
    width: 45%;
    border-radius: 5px;
    border: 1px solid rgba(0, 113, 240, 1);
  }
  .van-button--info {
    width: 45%;
    border-radius: 5px;
    background-color: rgba(1, 113, 240, 1);
    border: 1px solid rgba(5, 5, 5, 0.08);
  }
}
.goods {
  display: flex;
  justify-content: space-between;
  padding: 6px 14px;
  font-size: 15px;
  border-bottom: 1px solid #c0c4cc;

  .code {
    color: rgba(16, 16, 16, 1);
    font-size: 17px;
  }
  .gray {
    color: rgba(153, 153, 153, 1);
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 19%;

    .edit {
      color: rgba(40, 142, 248, 1);
      font-size: 14px;
      margin-left: 20px;
    }
    .money {
      color: rgba(51, 51, 51, 1);
      font-size: 15px;
    }
  }
}
</style>
