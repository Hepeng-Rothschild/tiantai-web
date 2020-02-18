<template>
  <div class="neworder">
    <van-cell-group>
      <van-cell title="单据日期*"
                :value="orderMessage.voucherDate"
                is-link
                :class="orderMessage.voucherDate?'van-cell_true':'van-cell'"
                @click="showDate1 = true"></van-cell>
      <van-cell title="预计交货日期*"
                :value="orderMessage.deliveryDate"
                :class="orderMessage.deliveryDate?'van-cell_true':'van-cell'"
                is-link
                @click="showDate2=true"></van-cell>
      <!-- 选择客户 -->
      <van-cell title="客户*"
                is-link
                style="margin-top: 17px;border-top: 1px solid #c0c4cc;"
                :class="partner?'van-cell_true':'van-cell'"
                to="/partnerList">{{ partner?partner.AA_Partner_name:'请选择客户' }}</van-cell>
      <!-- 选择业务员 -->
      <van-cell title="业务员"
                is-link
                 style="margin-top: 17px;border-top: 1px solid #c0c4cc;"
                 :class="saleMan?'van-cell_true':'van-cell'"
                to="/salemanList">{{saleMan?saleMan.name:'请选择'}}</van-cell>
      <!-- 选择商品 -->
      <van-cell title="选择商品"
                value="请选择"
                is-link
                style="margin-top: 17px;border-top: 1px solid #c0c4cc;"
                to="/choose"></van-cell>
      <div v-if="SaleOrderDetails">
        <div v-for="item in SaleOrderDetails"
             :key="item.code"
             class="goods">
          <div class="left">
            <div class="code">{{item.code}}</div>
            <div class="gray">{{item.name}}</div>
            <div class="gray">￥{{item.OrigTaxPrice}}*{{item.Quantity}}</div>
          </div>
          <div class="right">
            <div class="edit"
                 @click="showPopData(item)">编辑</div>
            <div class="money">￥{{item.OrigTaxAmount.toFixed(2)}}</div>
          </div>
        </div>
      </div>
      <div class="spacing">
        <van-cell title="币种"
                  :value="orderMessage.moneyType.name"
                  :class="orderMessage.moneyType.name?'van-cell_true':'van-cell'"
                  is-link
                  @click="popupShowCoin = true"></van-cell>

        <van-cell title="汇率">
          <van-field v-model="orderMessage.exchangeRate"
                     placeholder="请输入"
                     input-align="right" />
        </van-cell>
      </div>
      <div class="spacing">
        <div class="my_cell">
          <span class>发货要求</span>
          <input type="text"
                 v-model="orderMessage.deliveryRequire1"
                 class="my_input"
                 placeholder="请输入" />
        </div>
        <div class="my_cell">
          <span class>送货要求</span>
          <input type="text"
                 v-model="orderMessage.deliveryRequire2"
                 class="my_input"
                 placeholder="请输入" />
        </div>
      </div>
      <div class="remark spacing">
        <div class="remark-name">备注</div>
        <van-field v-model="orderMessage.memo"
                   placeholder="添加备注"
                   style="border:0px;" />
      </div>
    </van-cell-group>
    <div class="buttonBox">
      <van-button plain
                  type="primary"
                  @click="editDraft()">修改草稿</van-button>
      <van-button type="info"
                  @click="createOrder()">提交订单</van-button>
    </div>
    <!-- 日期弹窗 -->
    <van-popup v-model="showDate2"
               position="bottom"
               :style="{ height: '45%' }">
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           @confirm="confirmPicker2"
                           @cancel="showDate2=false" />
    </van-popup>
    <!-- 日期弹窗 -->
    <van-popup v-model="showDate1"
               position="bottom"
               :style="{ height: '45%' }">
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           @confirm="confirmPicker1"
                           @cancel="showDate1=false" />
    </van-popup>
    <!-- 币种弹窗 -->
    <van-popup v-model="popupShowCoin"
               position="bottom"
               :style="{ height: '40%' }">
      <div v-for="item in currency"
           :key="item.id"
           class
           @click="changeMoneyType(item)">{{item.name}}</div>
    </van-popup>
    <!-- 商品信息弹窗 -->
    <my-pop :show="showPop"
            :popData="popData"
            @changeShow="changeShow"
            @changePopData="changePopData"
            @delete="deleteGoods"></my-pop>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
import { getItem, setItem } from "../../utils/Storage.js";
import MyPop from "../../components/Pop.vue";
export default {
  data () {
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

      partner: this.SelectedPartner,
      saleMan: this.SelectedSaleMan,
      orderMessage: this.$store.state.OrderMessage || {
        voucherDate: "请选择", // 单据日期
        deliveryDate: "请选择", // 交货日期
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
      handler () {
        this.$store.commit("saveOrderMessage", this.orderMessage);
      },
      deep: true
    }
  },
  computed: {
    ...mapState([
      "SaleOrderDetails",
      "Draft",
      "SelectedPartner",
      "SelectedSaleMan"
    ])
  },
  mounted () {
    if (this.Draft) {
      this.getDraft();
    }
    if (this.$store.state.SelectedPartner &&!this.$store.state.SelectedSaleMan) {
      this.selectPartner();
    }
    this.getCurrency();
  },
  methods: {
    getDraft () {
      this.partner = this.SelectedPartner || this.Draft.Customer;
      this.saleMan = this.SelectedSaleMan || this.Draft.Clerk;
      this.orderMessage.voucherDate = this.Draft.VoucherDate;
      this.orderMessage.deliveryDate = this.Draft.DeliveryDate;
      this.orderMessage.moneyType = this.Draft.Currency;
      this.orderMessage.exchangeRate = this.Draft.ExchangeRate;
      this.orderMessage.memo = this.Draft.Memo;
      this.orderMessage.deliveryRequire1 = this.Draft.Pubuserdefnvc1;
      this.orderMessage.deliveryRequire2 = this.Draft.priuserdefnvc3;
      this.$store.commit("saveSelectGoods", this.Draft.SaleOrderDetails);
    },
    changeMoneyType (type) {
      this.orderMessage.moneyType = type;
      this.popupShowCoin = false;
    },
    confirmPicker1 (value) {
      this.showDate1 = false;
      this.orderMessage.voucherDate = dayjs(value).format("YYYY-MM-DD");
    },
    confirmPicker2 (value) {
      this.showDate2 = false;
      this.orderMessage.deliveryDate = dayjs(value).format("YYYY-MM-DD");
    },
    // 子传父
    changeShow (show) {
      this.showPop = show;
    },
    deleteGoods () {
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
    changePopData () {
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
    showPopData (item) {
      this.showPop = true;
      this.popData = item;
    },
    validate () {
      if (
        this.orderMessage.voucherDate == "请选择" ||
        this.orderMessage.deliveryDate == "请选择"
      ) {
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
    clearStore () {
      this.$store.state.OrderMessage = null;
      this.$store.state.SaleOrderDetails = null;
      this.$store.state.TotalPrice = null;
      this.$store.state.SelectedPartner = null;
      this.$store.state.SelectedSaleMan = null;
    },
    // 提交订单
    async createOrder () {
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
      // console.log(data);
      if (data.code === 200) {
        this.$toast.success({
          message: "创建订单成功",
          onClose: async () => {
            this.$router.push("/orderlist");
            let OrderDraft = this.$Parse.Object.extend("OrderDraft");
            let query = new this.$Parse.Query(OrderDraft);
            let draft = await query.get(this.Draft.objectId);
            draft.destroy()
          }
        });
      } else {
        this.$toast.fail({
          message: "创建订单失败"
        });
      }
      this.clearStore();
    },
    // 修改草稿
    async editDraft () {
      if (!this.validate()) return;
      let OrderDraft = this.$Parse.Object.extend("OrderDraft");
      let query = new this.$Parse.Query(OrderDraft);
      let draft = await query.get(this.Draft.objectId);
      draft.set("VoucherDate", this.orderMessage.voucherDate);
      draft.set("DeliveryDate", this.orderMessage.deliveryDate);
      draft.set("Customer", this.partner);
      draft.set("Clerk", this.saleMan);
      draft.set("SaleOrderDetails", this.SaleOrderDetails);
      draft.set("Currency", this.orderMessage.moneyType);
      draft.set("ExchangeRate", this.orderMessage.exchangeRate);
      draft.set("Pubuserdefnvc1", this.orderMessage.deliveryRequire1);
      draft.set("priuserdefnvc3", this.orderMessage.deliveryRequire2);
      draft.set("Memo", this.orderMessage.memo);
      draft.set("Name", this.partner.AA_Partner_name);
      const data = await draft.save();
      // console.log("修改草稿", data.attributes);
      if (data.attributes) {
        this.$toast.success({
          message: "修改草稿成功",
          onClose: () => {
            this.clearStore();
            this.$router.push("/draft");
          }
        });
      } else {
        this.$toast.fail({
          message: "修改草稿失败"
        });
      }
    },
    // 获取币种
    async getCurrency () {
      const { data } = await this.$Parse.Cloud.run("getCurrency");
      this.currency = data[0];
    },
    // 选择客户
    async selectPartner () {
      const { data } = await this.$Parse.Cloud.run("getPersonById",{id: this.partner.AA_Partner_idsaleman})
      //todo 测试
      this.saleMan = data[0];
    }
  }
};
</script>

<style lang="less" scoped>
.neworder {
  padding-top: 20px;
  background-color: rgba(248, 248, 248, 1);
}
.van-cell-group {
  border-top: 1px solid #c0c4cc;
  background-color: rgba(248, 248, 248, 1);
  margin-bottom: 16px;
      // 常规下单元格内输入框样式
  .van-cell {
    padding: 10px 15px;
    border-bottom: 1px solid #c0c4cc;
    font-size: 17px;
    .van-field {
      border: 0px;
      padding: 0px;
      padding-right: 20px;
    }
    .van-cell__title {
      color: rgba(0, 0, 0, 1);
    }
    /deep/ .van-cell__value {
      color: #888888;
      input {
        color: #000;
      }
    }
  }
 //   输入值时单元格样式
   .van-cell_true {
    padding: 10px 15px;
    border-bottom: 1px solid #c0c4cc;
    font-size: 17px;
    .van-field {
      border: 0px;
      padding: 0px;
      padding-right: 20px;
    }
    .van-cell__title {
      color: rgba(0, 0, 0, 1);
    }
    /deep/ .van-cell__value {
      color: #000;
      input {
        color: #000;
      }
    }
  }
  // 带间距的单元格样式
  .spacing {
    margin-top: 17px;
    border-top: 1px solid #c0c4cc;
  }
  .my_cell {
    display: flex;
    justify-content: space-between;
    padding: 10px 35px 10px 15px;
    font-size: 17px;
    background-color: #fff;
    &:last-child {
      border-top: 1px solid #c0c4cc;
      border-bottom: 1px solid #c0c4cc;
    }
    .my_input {
      width: 180px;
      text-align: right;
      color: #000;
      border: none;
    }
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

    .edit {
      color: rgba(40, 142, 248, 1);
      font-size: 16px;
      text-align: right;
    }
    .money {
      color: rgba(51, 51, 51, 1);
      font-size: 15px;
    }
  }
}
</style>
