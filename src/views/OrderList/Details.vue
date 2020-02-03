<template>
  <div v-if="indentDetails" class="details">
    <div class="order border">
      <div>
        <span>单据编号</span>
        <span>{{indentDetails.code}}</span>
      </div>
      <div class="flex">  
        <span>客户</span>
        <span>{{indentDetails.partnerName}}</span>
      </div>
      <div>
        <span>业务员</span>
        <span>{{indentDetails.saleManName}}</span>
      </div>
      <div>
        <span>预计交货</span>
        <span>{{format(indentDetails.deliveryDate)}}</span>
      </div>
    </div>
    <!-- <van-cell title="待审核" is-link value="状态记录" title-class="blue" value-class="light_color" /> -->
    <div class="link border">
      <div>
        <span>联系人</span>
        <span>{{indentDetails.linkMan}}</span>
      </div>
      <div class="flex">
        <span>电话</span>
        <span>{{indentDetails.contactPhone}}</span>
      </div>
      <div class="flex">
        <span>送货地址</span>
        <span>{{indentDetails.address}}</span>
      </div>
    </div>
    <div class="goods" v-for="(item,index) in indentDetails.SaleOrderDetails" :key="index">
      <div class="up border">
        <div class="left">
          <div class="type dark_color">{{item.AA_Inventory_code}}</div>
          <div>
            <span class="light_color margin_right">名称</span>
            <span class="dark_color">{{item.AA_Inventory_name}}</span>
          </div>
          <div>
            <span class="light_color margin_right">数量</span>
            <span class="dark_color">{{item.quantity}}{{item.unit}}</span>
          </div>
        </div>
        <div class="right">
          <div>
            <span class="light_color margin_right">含税单价</span>
            <span class="dark_color">￥{{item.taxPrice}}</span>
          </div>
          <div>
            <span class="light_color margin_right">含税金额</span>
            <span class="dark_color">￥{{item.taxAmount}}</span>
          </div>
        </div>
      </div>
      <div class="down">
        <div class="left">
          <div class="light_color">本币金额</div>
          <div class="light_color">含税金额</div>
        </div>
        <div class="right">
          <div class="dark_color">￥{{item.discountAmount}}</div>
          <div class="dark_color">￥{{item.taxAmount}}</div>
        </div>
      </div>
    </div>
    <div class="money">
      <div class="flex">
        <span>币种</span>
        <span>{{indentDetails.currencyName}}</span>
      </div>
      <div class="flex">
        <span>汇率</span>
        <span>{{indentDetails.exchangeRate.toFixed(1)}}</span>
      </div>
    </div>
    <div class="memo">
      <div class="flex">
        <span>发货要求</span>
        <span>{{indentDetails.priuserdefnvc3?indentDetails.priuserdefnvc3:'无'}}</span>
      </div>
      <div class="flex">
        <span>送货要求</span>
        <span>{{indentDetails.pubuserdefnvc1?indentDetails.pubuserdefnvc1:'无'}}</span>
      </div>
      <div class="flex">
        <span>备注</span>
        <span>{{indentDetails.memo?indentDetails.memo:'无'}}</span>
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
      id: Number(this.$route.query.id),
      indentDetails: null
    };
  },
  mounted() {
    this.getOrderById();
  },
  methods: {
    async getOrderById() {
      const { data } = await this.$Parse.Cloud.run("getOrderById", {
        id: this.id
      });
      this.indentDetails = data;
    },
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
  padding: 15px;
  line-height: 28px;
  background-color: #fff;
  span:first-child {
    display: inline-block;
    width: 90px;
    color: rgba(153, 153, 153, 1);
  }
  span:last-child {
    display: inline-block;
    width: 200px;
    color: rgba(16, 16, 16, 1);
  }
}
.link {
  padding: 15px;
  line-height: 28px;
  margin-top: 16px;
  background-color: #fff;
  span:first-child {
    display: inline-block;
    width: 90px;
    color: rgba(153, 153, 153, 1);
  }
  span:last-child {
    display: inline-block;
    width: 200px;
    color: rgba(16, 16, 16, 1);
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
  padding: 15px 15px 10px 15px;
  line-height: 28px;
  margin-top: 16px;
  background-color: #fff;
  span:first-child {
    display: inline-block;
    width: 90px;
    color: rgba(153, 153, 153, 1);
  }
  span:last-child {
    display: inline-block;
    width: 200px;
    color: rgba(16, 16, 16, 1);
  }
}
.memo {
  padding: 5px 15px 15px 15px;
  line-height: 28px;
  background-color: #fff;
  span:first-child {
    display: inline-block;
    width: 90px;
    color: rgba(153, 153, 153, 1);
  }
  span:last-child {
    display: inline-block;
    width: 200px;
    color: rgba(16, 16, 16, 1);
  }
}
.flex {
  display: flex;
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

