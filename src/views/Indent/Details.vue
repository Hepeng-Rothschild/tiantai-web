<template>
  <div class="details">
    <div class="order border">
      <div class="left light_color">
        <div>单据编号</div>
        <div>客户</div>
        <div>业务员</div>
        <div>预计交货</div>
      </div>
      <div class="dark_color">
        <div>{{indentDetails.SA_SaleOrder_code}}</div>
        <div>{{indentDetails.AA_Partner_name}}</div>
        <div>{{indentDetails.sale_man_name}}</div>
        <div>{{format(indentDetails.SA_SaleOrder_deliveryDate)}}</div>
      </div>
    </div>
    <!-- <van-cell title="待审核" is-link value="状态记录" title-class="blue" value-class="light_color" /> -->
    <div class="link border">
      <div class="left light_color">
        <div>联系人</div>
        <div>电话</div>
        <div>送货地址</div>
      </div>
      <div class="dark_color">
        <div>{{indentDetails.SA_SaleOrder_linkMan}}</div>
        <div>{{indentDetails.SA_SaleOrder_contactPhone}}</div>
        <div>{{indentDetails.SA_SaleOrder_address}}</div>
      </div>
    </div>
    <div class="goods">
      <div class="up border">
        <div class="left">
          <div class="type dark_color">{{indentDetails.AA_Inventory_code}}</div>
          <div class>
            <span class="light_color margin_right">名称</span>
            <span class="dark_color">{{indentDetails.AA_Inventory_name}}</span>
          </div>
          <div>
            <span class="light_color margin_right">数量</span>
            <span class="dark_color">{{indentDetails.SA_SaleOrder_b_compositionQuantity}}</span>
          </div>
        </div>
        <div class="right">
          <div>
            <span class="light_color margin_right">含税单价</span>
            <span class="dark_color">￥{{indentDetails.SA_SaleOrder_b_taxPrice}}</span>
          </div>
          <div>
            <span class="light_color margin_right">含税金额</span>
            <span class="dark_color">￥{{indentDetails.SA_SaleOrder_taxAmount}}</span>
          </div>
        </div>
      </div>
      <div class="down">
        <div class="left">
          <div class="light_color">本币金额</div>
          <div class="light_color">含税金额</div>
        </div>
        <div class="right">
          <div class="dark_color">￥{{indentDetails.SA_SaleOrder_amount}}</div>
          <div class="dark_color">￥{{indentDetails.SA_SaleOrder_taxAmount}}</div>
        </div>
      </div>
    </div>
    <div class="money">
      <div class="left">
        <div class="light_color">币种</div>
        <div class="light_color">汇率</div>
      </div>
      <div class="right">
        <div class="dark_color">{{indentDetails.AA_Currency_name}}</div>
        <div class="dark_color">{{indentDetails.SA_SaleOrder_exchangeRate.toFixed(1)}}</div>
      </div>
    </div>
    <div class="memo">
      <div class="left">
        <div class="light_color">送货要求</div>
        <div class="light_color">备注</div>
      </div>
      <div class="right">
        <div class="dark_color">{{indentDetails?'有':'无'}}</div>
        <div class="dark_color">{{indentDetails?'有':'无'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItem } from "../../utils/Storage.js";
export default {
  name: "detailsIndex",
  data() {
    return {
      indentDetails: this.$store.state.IndentDetails
    };
  },
  mounted() {
    console.log(this.indentDetails);
  },
  methods: {
    format(time) {
      const dateTime = new Date(time);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const date = dateTime.getDate();
      return `${year}-${this.addZero(month)}-${this.addZero(date)} `;
    },
    addZero(v) {
      return v < 10 ? "0" + v : v;
    }
  }
};
</script>

<style lang="less" scoped>
.details {
  height: 100%;
  padding-top: 20px;
  font-size: 15px;
  background-color: rgba(248, 248, 248, 1);
}
.order {
  display: flex;
  padding: 15px;
  line-height: 28px;
  background-color: #fff;
  .left {
    width: 95px;
  }
}
.link {
  display: flex;
  padding: 15px;
  line-height: 28px;
  margin-top: 16px;
  background-color: #fff;
  .left {
    width: 95px;
  }
}
.goods {
  margin-top: 16px;
  line-height: 28px;
  .up {
    display: flex;
    padding: 15px 15px 10px 15px;
    justify-content: space-between;
    background-color: #fff;
    .left {
      .type {
        font-size: 17px;
      }
    }
    .right {
      align-self: flex-end;
    }
    .margin_right {
      margin-right: 5px;
    }
  }
  .down {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px 15px 15px;

    background-color: #fff;
  }
}
.money {
  display: flex;
  padding: 15px 15px 10px 15px;
  line-height: 28px;
  margin-top: 16px;
  background-color: #fff;
  .left {
    width: 95px;
  }
}
.memo {
  display: flex;
  padding: 5px 15px 15px 15px;
  line-height: 28px;
  background-color: #fff;
  .left {
    width: 95px;
  }
}
.blue {
  color: rgba(1, 113, 240, 1);
}
.light_color {
  color: rgba(153, 153, 153, 1);
}
.dark_color {
  color: rgba(16, 16, 16, 1);
}
.border {
  border-bottom: 1px solid rgba(170, 170, 170, 1);
}
</style>

