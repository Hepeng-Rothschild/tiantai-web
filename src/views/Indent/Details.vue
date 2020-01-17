<template>
  <div>
    <div class="content">
      <div class="order-information">
        <span class="title">单据编号</span>
        <span class="information">{{content.SA_SaleOrder_code}}</span>
      </div>
      <div class="order-information">
        <span class="title">客户</span>
        <span class="information">{{content.AA_Partner_name}}</span>
      </div>
      <div class="order-information">
        <span class="title">业务员</span>
        <span class="information">{{content.AA_Partner_Creater}}</span>
      </div>
      <div class="order-information">
        <span class="title">预计交货</span>
        <span class="information">{{format(content.SA_SaleOrder_deliveryDate)}}</span>
      </div>
      <van-cell title="待审核"
                is-link
                to="records"
                value="状态记录" />
      <div class="order-information">
        <span class="title">联系人</span>
        <span class="information">{{content.SA_SaleOrder_linkMan}}</span>
      </div>
      <div class="order-information">
        <span class="title">电话</span>
        <span class="information">{{content.SA_SaleOrder_contactPhone}}</span>
      </div>
      <div class="order-information">
        <span class="title">送货地址</span>
        <span class="information">{{content.SA_SaleOrder_address}}</span>
      </div>
    </div>
    <div class="price">
      <span>{{content.AA_Inventory_code}}</span>
      <div class="order-information">
        <div class="product-name">
          <span class="name-left">名称</span>
          <span class="name-right">{{content.AA_Inventory_name}}</span>
        </div>
        <div class="product-price">
          <span class="name-left">含税单价</span>
          <span class="name-right">￥{{content.SA_SaleOrder_b_taxPrice}}</span>
        </div>
      </div>
      <div class="order-information">
        <div class="product-name">
          <span class="name-left">数量</span>
          <span class="name-right">{{content.SA_SaleOrder_b_compositionQuantity}}</span>
        </div>
        <div class="product-price">
          <span class="name-left">含税金额</span>
          <span class="name-right">￥{{content.SA_SaleOrder_taxAmount}}</span>
        </div>
      </div>
      <van-cell title="本币金额"
                class="cell-first">￥{{content.SA_SaleOrder_origAmount}}</van-cell>
      <van-cell title="含税金额"
                class="cell-second">￥{{content.SA_SaleOrder_origTaxAmount}}</van-cell>
      <div class="parities">
        <span class="title">币种</span>
        <span class="information">{{content.AA_Currency_name}}</span>
      </div>
      <div class="parities">
        <span class="title">汇率</span>
        <span class="information">{{content.SA_SaleOrder_exchangeRate}}</span>
      </div>
      <div class="parities claim">
        <span class="title">送货要求</span>
        <!-- <van-field v-model="value" placeholder="送货要求" /> -->
        <input type="text"
               class="input"
               placeholder="送货要求">
      </div>
      <div class="parities">
        <span class="title">备注</span>
        <!-- <van-field v-model="value" placeholder="备注" /> -->
        <input type="text"
               class="input"
               placeholder="备注">
      </div>
    </div>
    <div class="menu">
      <van-button type="info">修改订单</van-button>
    </div>
  </div>
</template>

<script>
import { getItem } from "../../utils/Storage.js";
export default {
  name: 'detailsIndex',
  data () {
    return {
      // 订单详情信息
      content: getItem("allIndent"),
    }
  },
  methods: {
    format (time) {
      const dateTime = new Date(time)
      const year = dateTime.getFullYear()
      const month = dateTime.getMonth() + 1
      const date = dateTime.getDate()
      return `${year}-${this.addZero(month)}-${this.addZero(date)} `

    },
    addZero (v) {
      return v < 10 ? '0' + v : v
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  border-bottom: 1px solid rgba(153, 153, 153, 1);
  padding-bottom: 7px;
  .order-information {
    display: flex;
    margin-left: 16px;
    .title {
      flex: 1;
      font-size: 15px;
      margin-right: 30px;
      margin-bottom: 10px;
      color: rgba(153, 153, 153, 1);
    }
    .information {
      display: inline-block;
      flex: 3;
      font-size: 15px;
      // margin-bottom: 5px;
      color: #101010;
    }
  }
  .van-cell {
    padding: 0px;
    margin-bottom: 30px;
    margin-top: 14px;
    .van-cell__title {
      margin-left: 16px;
      color: rgba(1, 113, 240, 1);
      font-size: 15px;
    }
    .van-cell__value {
      color: rgba(153, 153, 153, 1);
      font-size: 15px;
      text-align: right;
    }
  }
}
.price {
  border-bottom: 1px solid rgba(153, 153, 153, 1);
  margin-top: 11px;
  padding: 16px;
  span {
    color: rgba(16, 16, 16, 1);
    font-size: 17px;
  }
  .order-information {
    display: flex;
    margin-top: 11px;
    height: 100%;
    .product-name {
      flex: 1;
      display: flex;

      .name-left {
        flex: 1;
        color: rgba(153, 153, 153, 1);
        font-size: 15px;
      }
      .name-right {
        flex: 2;
        font-size: 15px;
        color: #101010;
      }
    }
    .product-price {
      flex: 1;
      display: flex;
      .name-left {
        flex: 1;
        color: rgba(153, 153, 153, 1);
        font-size: 15px;
      }
      .name-right {
        flex: 1;
        font-size: 15px;
        color: #101010;
      }
    }
  }
  .cell-first {
    margin-top: 35px;
    margin-bottom: 10px;
  }
  .cell-second {
    margin-bottom: 40px;
  }
  .van-cell {
    padding: 0px;
    .van-cell__title span {
      font-size: 15px;
      color: rgba(153, 153, 153, 1);
    }
    .van-cell__value {
      font-size: 15px;
      color: #101010;
    }
  }
  .claim {
    margin-top: 30px;
  }
  .parities {
    display: flex;
    .title {
      flex: 1;
      font-size: 15px;
      margin-right: 30px;
      margin-bottom: 10px;
      color: rgba(153, 153, 153, 1);
    }

    .information {
      display: inline-block;
      flex: 3;
      font-size: 15px;
      // margin-bottom: 5px;
      color: #101010;
    }
    input {
      flex: 3;
      font-size: 15px;
      // margin-bottom: 5px;
      color: #101010;
      border: 0px;
      margin-bottom: 10px;
    }
  }
}
//修改按钮
.menu {
  padding: 34px 20px 53px 20px;
  .van-button {
    width: 100%;
    border-radius: 5px 5px 5px 5px;
    text-align: center;
    background-color: #0171f0;
  }
}
</style>

