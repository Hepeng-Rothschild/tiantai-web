<template>
  <div class="neworder fz17">
    <van-cell-group>
      <van-cell
        title="单据日期*"
        :value="orderMessage.voucherDate?orderMessage.voucherDate:'请选择'"
        is-link
        @click="showDate1 = true"
      ></van-cell>
      <van-cell
        title="预计交货日期*"
        :value="orderMessage.deliveryDate?orderMessage.deliveryDate:'请选择'"
        is-link
        @click="showDate2=true"
      ></van-cell>
      <!-- 选择客户 -->
      <van-cell
        title="客户*"
        is-link
        style="margin-top: 17px;border-top: 1px solid #c0c4cc;"
        to="/partnerList"
      >{{ partner?partner.AA_Partner_name:'请选择客户' }}</van-cell>
      <!-- 选择业务员 -->
      <van-cell
        title="业务员"
        is-link
        style="margin-top: 17px;border-top: 1px solid #c0c4cc;"
        to="/salemanList"
      >{{saleMan?saleMan.name:'请选择'}}</van-cell>
      <!-- 选择商品 -->
      <van-cell
        title="选择商品"
        value="请选择"
        is-link
        style="margin-top: 17px;border-top: 1px solid #c0c4cc;"
        to="/choose"
      ></van-cell>
      <div v-if="SaleOrderDetails">
        <div v-for="item in SaleOrderDetails" :key="item.code" class="goods flex fz15">
          <div class="left">
            <div class="fz17 dark_color">{{item.code}}</div>
            <div class="light_color">{{item.name}}</div>
            <div class="light_color">￥{{item.OrigTaxPrice}}*{{item.Quantity}}</div>
          </div>
          <div class="right flex">
            <div class="edit fz16" @click="showPopData(item)">编辑</div>
            <div class="dark_color">￥{{item.OrigTaxAmount.toFixed(2)}}</div>
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
          <van-field v-model="orderMessage.exchangeRate" placeholder="请输入" input-align="right" />
        </van-cell>
      </div>
      <div class="spacing">
        <div class="my_cell flex">
          <span class>发货要求</span>
          <input
            type="text"
            v-model="orderMessage.deliveryRequire1"
            class="my_input light_color"
            placeholder="请输入"
          />
        </div>
        <div class="my_cell flex">
          <span class>送货要求</span>
          <input
            type="text"
            v-model="orderMessage.deliveryRequire2"
            class="my_input light_color"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="remark spacing">
        <div class="remark-name">备注</div>
        <van-field v-model="orderMessage.memo" placeholder="添加备注" style="border:0px;" />
      </div>
    </van-cell-group>
    <div class="buttonBox">
      <van-button plain type="primary" @click="createDraft()">存入草稿</van-button>
      <van-button type="info" @click="createOrder()">提交订单</van-button>
    </div>
    <!-- 日期弹窗 -->
    <van-popup v-model="showDate2" position="bottom" :style="{ height: '45%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirmPicker2"
        @cancel="showDate2=false"
      />
    </van-popup>
    <!-- 日期弹窗 -->
    <van-popup v-model="showDate1" position="bottom" :style="{ height: '45%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="confirmPicker1"
        @cancel="showDate1=false"
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
    <!-- 商品信息弹窗 -->
    <my-pop
      :show="showPop"
      :popData="popData"
      @changeShow="changeShow"
      @changePopData="changePopData"
      @delete="deleteGoods"
    ></my-pop>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
import { getItem, setItem } from "../../utils/Storage.js";
import MyPop from "../../components/Pop.vue";
export default {
  data() {
    return {
      // 币种
      currency: null,
      // 控制单元格内的输入框
      popupShowCoin: false,
      // 日期
      currentDate: new Date(),
      // 单据日期遮罩层
      showDate1: false,
      showDate2: false,
      showPop: false,
      popData: {},

      partner: this.$store.state.SelectedPartner,
      saleMan: this.$store.state.SelectedSaleMan,
      orderMessage: this.$store.state.OrderMessage || {
        voucherDate: null, // 单据日期
        deliveryDate: null, // 交货日期
        moneyType: { code: "RMB", name: "人民币" },
        exchangeRate: "1.0", // 汇率
        deliveryRequire1: "", // 发货要求
        deliveryRequire2: "", // 送货要求
        memo: "" // 备注
      }
    };
  },
  components: {
    MyPop: MyPop
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
    if (
      this.$store.state.SelectedPartner &&
      !this.$store.state.SelectedSaleMan
    ) {
      this.selectPartner();
    }
    this.getCurrency();
    // 初始化滚动条置顶
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  },
  methods: {
    changeMoneyType(type) {
      this.orderMessage.moneyType = type;
      this.popupShowCoin = false;
    },
    confirmPicker1(value) {
      this.showDate1 = false;
      this.orderMessage.voucherDate = dayjs(value).format("YYYY-MM-DD");
    },
    confirmPicker2(value) {
      this.showDate2 = false;
      this.orderMessage.deliveryDate = dayjs(value).format("YYYY-MM-DD");
    },
    // 子传父
    changeShow(show) {
      this.showPop = show;
    },
    deleteGoods() {
      this.showPop = false;
      let index = this.SaleOrderDetails.findIndex(
        v => v.code == this.popData.code
      );
      let popData = JSON.parse(JSON.stringify(this.popData));
      this.SaleOrderDetails.splice(index, 1);
      let totalPrice = 0;
      for (let j = 0; j < this.SaleOrderDetails.length; j++) {
        totalPrice += Number(
          this.SaleOrderDetails[j].OrigTaxPrice *
            this.SaleOrderDetails[j].Quantity
        );
      }
      this.totalPrice = totalPrice;
      this.$store.commit("saveTotalPrice", totalPrice);
    },
    // 修改弹窗的商品信息
    changePopData() {
      let index = this.SaleOrderDetails.findIndex(
        v => v.code == this.popData.code
      );
      let popData = JSON.parse(JSON.stringify(this.popData));
      // 判断B数组里有没有点击的那个商品  没有就加进去  否则就替换掉B数组里原来的商品信息
      if (index == -1) {
        this.SaleOrderDetails.push(popData);
      } else {
        this.SaleOrderDetails[index] = popData;
      }
      let totalPrice = 0;
      for (let j = 0; j < this.SaleOrderDetails.length; j++) {
        this.SaleOrderDetails[j].OrigDiscountAmount =
          (((this.SaleOrderDetails[j].OrigTaxPrice - 0) *
            (100 - this.SaleOrderDetails[j].rate)) /
            100) *
          this.SaleOrderDetails[j].Quantity; // 总价
        this.SaleOrderDetails[j].OrigTaxAmount =
          (this.SaleOrderDetails[j].OrigTaxPrice - 0) *
          this.SaleOrderDetails[j].Quantity; // 含税总价
        this.SaleOrderDetails[j].OrigTax =
          (this.SaleOrderDetails[j].OrigTaxPrice - 0) *
          (this.SaleOrderDetails[j].rate / 100); // 税额
        totalPrice += Number(
          this.SaleOrderDetails[j].OrigTaxPrice *
            this.SaleOrderDetails[j].Quantity
        );
      }
      this.totalPrice = totalPrice;
      this.$store.commit("saveTotalPrice", totalPrice);
    },
    showPopData(item) {
      this.showPop = true;
      this.popData = item;
    },
    validate() {
      if (!this.orderMessage.voucherDate || !this.orderMessage.deliveryDate) {
        this.$toast({
          message: "请选择日期"
        });
        return false;
      }
      if (!this.partner) {
        this.$toast({
          message: "请选择客户"
        });
        return false;
      }
      if (!this.SaleOrderDetails) {
        this.$toast({
          message: "请选择商品"
        });
        return false;
      }
      return true;
    },
    // 提交订单
    async createOrder() {
      if (!this.validate()) return;
      const data = await this.$Parse.Cloud.run("createOrder", {
        VoucherDate: this.orderMessage.voucherDate, //1、单据日期。 2、此参数可不传，默认系统日期。
        DeliveryDate: this.orderMessage.deliveryDate, // 预计交货日期
        Customer: { Code: this.partner.AA_Partner_code }, // AA_Partner_code
        Clerk: { Code: this.saleMan.code }, // 业务员
        Currency: { Code: this.orderMessage.moneyType.code }, // 币种
        ExchangeRate: this.orderMessage.exchangeRate, // 汇率，decimal类型
        Memo: this.orderMessage.memo, // 备注
        DynamicPropertyKeys: ["pubuserdefnvc1", "priuserdefnvc3"],
        DynamicPropertyValues: [
          this.orderMessage.deliveryRequire1,
          this.orderMessage.deliveryRequire2
        ],
        SaleOrderDetails: this.SaleOrderDetails
      });
      if (data.code === 200) {
        this.$toast.success({
          message: "创建订单成功",
          onClose: () => {
            this.$store.commit("clearStore");
            this.$router.push("/orderList");
          }
        });
      } else {
        this.$toast.fail({
          message: "创建订单失败"
        });
      }
    },
    // 存入草稿
    async createDraft() {
      if (!this.validate()) return;
      const data = await this.$Parse.Cloud.run("createDraft", {
        VoucherDate: this.orderMessage.voucherDate, //1、单据日期。 2、此参数可不传，默认系统日期。
        DeliveryDate: this.orderMessage.deliveryDate, // 预计交货日期
        Customer: this.partner, // AA_Partner_code
        Clerk: this.saleMan, // 业务员
        Currency: this.orderMessage.moneyType, // 币种
        Pubuserdefnvc1: this.orderMessage.deliveryRequire1,
        priuserdefnvc3: this.orderMessage.deliveryRequire2,
        ExchangeRate: this.orderMessage.exchangeRate, // 汇率，decimal类型
        Memo: this.orderMessage.memo,
        SaleOrderDetails: this.SaleOrderDetails,
        Name: this.partner.AA_Partner_name // 此字段用于草稿页的模糊搜索
      });
      if (data.code === 200) {
        this.$toast.success({
          message: "存入草稿成功",
          onClose: () => {
            this.$store.commit("clearStore");
            this.$router.push("/draft");
          }
        });
      } else {
        this.$toast.fail({
          message: "存入草稿失败"
        });
      }
    },
    // 获取币种
    async getCurrency() {
      const { data } = await this.$Parse.Cloud.run("getCurrency");
      this.currency = data[0];
    },
    // 选择客户
    async selectPartner() {
      const { data } = await this.$Parse.Cloud.run("getPersonById", {
        id: this.partner.AA_Partner_idsaleman
      });
      this.saleMan = data[0];
      this.orderMessage.deliveryRequire1 = this.partner.AA_Partner_priuserdefnvc2;
      this.orderMessage.deliveryRequire2 = this.partner.AA_Partner_priuserdefnvc5;
    }
  }
};
</script>

<style lang="less" scoped>
.neworder {
  padding-top: 20px;
  background-color: @bgColor_gray;
}
.van-cell-group {
  border-top: 1px solid @borderColor_gray;
  background-color: @bgColor_gray;
  margin-bottom: 16px;
  // 常规状态下单元格样式
  .van-cell {
    padding: 10px 15px;
    border-bottom: 1px solid @borderColor_gray;
    font-size: 17px;
    // 单元格内输入框样式
    .van-field {
      border: 0px;
      padding: 0px;
      padding-right: 20px;
    }
  }

  // 带间距的单元格样式
  .spacing {
    margin-top: 17px;
    border-top: 1px solid @borderColor_gray;
  }
  .my_cell {
    padding: 10px 35px 10px 15px;
    background-color: #fff;
    &:last-child {
      border-top: 1px solid @borderColor_gray;
      border-bottom: 1px solid @borderColor_gray;
    }
    .my_input {
      width: 180px;
      text-align: right;
      border: none;
    }
  }
  .remark {
    border-bottom: 1px solid @borderColor_gray;
    background-color: #fff;
    .remark-name {
      padding: 10px 0 0 16px;
    }
  }
}
/deep/ .van-field__control {
  color:@fontColor_gray;
}
// 底部弹框样式
.van-popup {
  div {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
// 底部按钮
.buttonBox {
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 20px;
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
  padding: 6px 14px;
  border-bottom: 1px solid @borderColor_gray;
  background-color: #fff;
  .right {
    flex-direction: column;
    .edit {
      color: rgba(40, 142, 248, 1);
      text-align: right;
    }
  }
}
</style>
