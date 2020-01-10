<template>
  <div class="neworder">
    <van-cell-group>
      <van-cell title="单据日期*" :value="orderMessage.voucherDate" is-link @click="show_1 = true"></van-cell>
      <van-cell title="预计交货日期*" :value="orderMessage.deliveryDate" is-link @click="show_2=true"></van-cell>
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
      <div v-if="SaleOrderDetails">
        <div v-for="item in SaleOrderDetails" :key="item.code" class="goods">
          <div class="left">
            <div class="code">{{item.code}}</div>
            <div class="gray">{{item.name}}</div>
            <div class="gray">￥{{item.OrigTaxPrice}}*{{item.Quantity}}</div>
          </div>
          <div class="right">
            <div class="edit">编辑</div>
            <div class="money">￥{{item.OrigTaxAmount}}</div>
          </div>
        </div>
      </div>
      <div class="spacing">
        <van-cell
          title="币种"
          :value="orderMessage.moneyType.name"
          is-link
          @click="popupShowCoin = true"
        ></van-cell>

        <van-cell title="汇率">
          <van-field
            v-model="orderMessage.exchangeRate"
            placeholder="请输入"
            input-align="right"
            style="border:0px;color:#888888;"
          />
        </van-cell>
      </div>
      <div class="remark spacing">
        <div class="remark-name">送货要求</div>
        <van-field v-model="deliveryRequire" placeholder="添加" style="border:0px;" />
      </div>
    </van-cell-group>
    <!-- 日期弹窗 -->
    <van-popup v-model="show_2" position="bottom" :style="{ height: '45%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirmPicker2"
        @cancel="show_2=false"
      />
    </van-popup>
    <!-- 日期弹窗 -->
    <van-popup v-model="show_1" position="bottom" :style="{ height: '45%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirmPicker1"
        @cancel="show_1=false"
      />
    </van-popup>
    <!-- 币种弹窗 -->
    <van-popup v-model="popupShowCoin" position="bottom" :style="{ height: '40%' }">
      <div
        v-for="item in currency"
        :key="item.id"
        class
        @click="changeMoneyType(item)"
      >{{item.name}}</div>
    </van-popup>
    <div class="buttonBox">
      <van-button plain type="primary">存入草稿</van-button>
      <van-button type="info" @click="createOrder()">提交订单</van-button>
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
      // 币种
      currency: null,
      // 控制单元格内的输入框
      deliveryRequire: "", // 送货要求
      popupShowCoin: false,
      // 日期
      currentDate: new Date(),
      // 单据日期遮罩层
      show_1: false,
      show_2: false,

      partner: this.$store.state.SelectedPartner,
      saleMan: this.$store.state.SelectedSaleMan,
      orderMessage: this.$store.state.OrderMessage || {
        voucherDate: "请选择", // 单据日期
        deliveryDate: "请选择", // 交货日期
        moneyType: { code: "RMB", name: "人民币" },
        exchangeRate: '1.0' // 汇率
      }
    };
  },
  watch: {
    orderMessage: {
      handler() {
        this.$store.commit("saveOrderMessage", this.orderMessage);
      },
      deep: true
    }
  },
  computed: {
    ...mapState(["SaleOrderDetails"])
  },
  mounted() {
    this.$store.state.SelectedPartner &&
      !this.$store.state.SelectedSaleMan &&
      this.selectPartner();
    this.getCurrency();
  },
  methods: {
    changeMoneyType(type) {
      this.orderMessage.moneyType = type;
      this.popupShowCoin = false;
    },
    confirmPicker1(value) {
      this.show_1 = false;
      this.orderMessage.voucherDate = dayjs(value).format("YYYY-MM-DD");
    },
    confirmPicker2(value) {
      this.show_2 = false;
      this.orderMessage.deliveryDate = dayjs(value).format("YYYY-MM-DD");
    },
    // 提交订单
    async createOrder() {
      // const data = await this.$Parse.Cloud.run("createOrder", {
      //   VoucherDate: this.VoucherDate, //1、单据日期。 2、此参数可不传，默认系统日期。
      //   DeliveryDate: this.DeliveryDate, // 预计交货日期
      //   Customer: { Code: this.partner.AA_Partner_code }, // AA_Partner_code
      //   Clerk: { Code: this.saleMan.code }, // 业务员
      //   Currency: { Code: this.moneyType.code }, // 币种
      //   // ExchangeRate // 汇率，decimal类型
      //   Memo: this.deliveryRequire,
      //   SaleOrderDetails: this.SaleOrderDetails
      // });
      this.$store.state.OrderMessage = null
      this.$store.state.SaleOrderDetails = null
    },
    // 获取币种
    async getCurrency() {
      const { data } = await this.$Parse.Cloud.run("getCurrency");
      this.currency = data[0];
    },
    // 选择客户
    async selectPartner() {
      const { data } = await this.$Parse.Cloud.run("getAllSaleMan");
      const saleMan = data.filter(item => {
        return item.id == this.partner.AA_Partner_idsaleman;
      });
      this.saleMan = saleMan[0];
      console.log(this.saleMan)
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
  background-color: #fff;

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
