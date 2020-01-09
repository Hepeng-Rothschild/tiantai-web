<template>
  <div class="choose">
    <div class="header">
      <!-- 搜索栏 -->
      <my-search v-model="searchValue"></my-search>
    </div>
    <!-- 交易历史记录 -->
    <!-- <div class="title">{{}}的历史购买</div>
    <div class="history">
      <div v-for="(item,index) in 3" :key="index" class="cell">
        <div>
          <div class="fontSize_18">19D</div>
          <div class="fontSize_14">滑石粉</div>
        </div>
        <div class="fontSize_14 align_self_end">现存量 847.00</div>
        <van-icon
          name="add-o"
          color="#0071f0"
          size="0.8rem"
          class="align_self_center"
          @click="showPopup()"
        />
    </div>-->
    <!-- </div> -->
    <!-- 所有存货 -->
    <div class="title">所有存货</div>
    <div class="all">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="200"
      >
        <div v-for="(item,index) in inventory" :key="index" class="cell">
          <div>
            <div class="fontSize_18">{{item?item.code:''}}</div>
            <div class="fontSize_14">{{item?item.name:''}}</div>
          </div>
          <div
            class="fontSize_14 align_self_end"
          >现存量 {{item.currentStock?item.currentStock.baseQuantity:''}}</div>
          <van-icon
            name="add-o"
            color="#0071f0"
            size="0.8rem"
            class="align_self_center"
            @click="showPopup(item)"
          />
        </div>
      </van-list>
    </div>
    <!-- 底部按钮 -->
    <div class="fixed">
      <div class="footer">
        <div class="left">
          <div>已选{{SaleOrderDetails.length}}种</div>
          <div>￥{{totalPrice.toFixed(2)}}</div>
        </div>
        <div class="right">
          <van-button type="info" @click="finish()">完成</van-button>
        </div>
      </div>
    </div>

    <!-- 弹出框 -->
    <div v-if="Object.keys(popData).length">
      <van-popup
        v-model="show"
        closeable
        close-on-popstate
        :overlay="false"
        :style="{ width:'85%' }"
        class="pop"
      >
        <div class="name">
          <span>{{popData?popData.Inventory.Code:''}}</span>
          <span class="padding_left">{{popData?popData.name:''}}</span>
        </div>
        <div class="border_top">
          <van-field v-model="popData.Quantity" label="数量" input-align="right" placeholder="请输入" />
        </div>
        <div class="border_top">
          <!-- <van-cell title="单位" is-link >{{popValue?popValue.currentStock.unit:''}}</van-cell> -->
          <van-cell title="单位">KG</van-cell>
        </div>
        <div class="pop_cell border_top">
          <span>含税单价</span>
          <span class="gray">￥{{popData?popData.OrigTaxPrice:''}}</span>
        </div>
        <div class="pop_cell border_top">
          <span>税率</span>
          <span class="gray">{{popData?popData.rate:'0.0'}}%</span>
        </div>
        <div class="pop_cell border_top">
          <span>本币金额</span>
          <span class="gray">￥{{popData?popData.OrigDiscountPrice * popData.Quantity:0.00}}</span>
        </div>
        <div class="pop_cell border_top">
          <span>含税金额</span>
          <span class="gray">￥{{popData?popData.OrigTaxPrice * popData.Quantity:0.00}}</span>
        </div>
        <div class="border_top">
          <button class="button" @click="del()">删除</button>
          <button class="button" @click="confirm()">确定</button>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";

export default {
  components: {
    MySearch: MySearch
  },
  data() {
    return {
      searchValue: null,
      inventory: null,
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false,

      show: false, // 中间弹框显示隐藏
      popData: {},
      number: null, // 数量
      totalPrice: 0,
      SaleOrderDetails: []
    };
  },
  watch: {
    searchValue(newValue, oldValue) {
      this.inventory = [];
      this.pageIndex = 1;
      this.finished = false;
      this.getGoods();
    }
  },
  methods: {
    async onLoad() {
      await this.getGoods();
    },
    async getGoods() {
      var _this = this;
      let { data } = await this.$Parse.Cloud.run("getInventory", {
        inventoryName: _this.searchValue,
        pageSize: _this.pageSize,
        pageIndex: _this.pageIndex
      });
      let listData = this.inventory || [];
      data = data.map(item => {
        return {
          code: item.code,
          name: item.name,
          rate: Number(item.rate),
          Unit: { Name: item.currentStock.unit },
          Quantity: null,
          DiscountRate: 1, // 折扣率
          IsPresent: false, // 是否赠品
          Inventory: { Code: item.code }, // 系统存货编码Code
          OrigDiscountPrice: item.retailPrice * ((100 - item.rate) / 100) || 1, // 单价
          OrigTaxPrice: Number(item.retailPrice) || 2 // 含税单价
        };
      });
      for (let i = 0; i < data.length; i++) {
        listData.push(data[i]);
      }

      this.loading = false;
      if (data.length) {
        this.pageIndex++;
      } else {
        this.finished = true;
      }
      this.inventory = listData;
    },
    // 显示弹窗
    showPopup(item) {
      item = JSON.parse(JSON.stringify(item));
      item.Quantity = 0;
      item.OrigDiscountAmount = 0; // 总价
      item.OrigTaxAmount = 0; // 含税总价
      item.OrigTax = 0; // 税额
      item.DiscountRate = 1;
      item.IsPresent = false;
      let itemInfo = this.SaleOrderDetails.filter(v => v.code == item.code)[0];
      let popData = itemInfo ? itemInfo : item;
      this.popData = popData;
      this.show = true;
    },
    onCancel() {
      this.showSelect = false;
    },
    confirm() {
      if (this.popData.Quantity == 0) {
        this.$toast({
          message: "数量不能为空"
        });
        return;
      }
      this.show = false;

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
      
        this.SaleOrderDetails[j].OrigDiscountAmount =  (this.SaleOrderDetails[j].OrigTaxPrice-0)*(100-this.SaleOrderDetails[j].rate)/100*this.SaleOrderDetails[j].Quantity// 总价
        this.SaleOrderDetails[j].OrigTaxAmount = (this.SaleOrderDetails[j].OrigTaxPrice-0)*this.SaleOrderDetails[j].Quantity  // 含税总价
        this.SaleOrderDetails[j].OrigTax =(this.SaleOrderDetails[j].OrigTaxPrice-0)*(this.SaleOrderDetails[j].rate/100) // 税额
        totalPrice += Number(
          this.SaleOrderDetails[j].OrigTaxPrice *
            this.SaleOrderDetails[j].Quantity
        );
      }
      this.totalPrice = totalPrice;
    },
    del() {
      this.show = false;
    },
    finish() {
      // Unit: { Name: "KG" },                                      currentStock.unit
      // Quantity: 7,                                               currentStock.baseQuantity
      // DiscountRate: 1, // 折扣率
      // IsPresent: false, // 是否赠品
      // Inventory: { Code: "DT18C" }, // 系统存货编码 Code          Code
      // OrigDiscountPrice: 15, // 单价                             retailPrice*(1-税率)
      // OrigTaxPrice: 18, // 含税单价                              retailPrice

      // OrigDiscountAmount: 15, // 原币金额                        总价
      // OrigTaxAmount: 18, // 原币含税金额                         含税总价
      // OrigTax: 3, // 原币税额                                    含税总价-总价
      console.log(this.SaleOrderDetails);
      this.$store.commit('selectGoods',this.SaleOrderDetails)
      this.$router.push('neworder')
    }
  }
};
</script>

<style lang="less" scoped>
.choose {
  height: 100%;
  .header {
    padding: 50px 10px 12px 10px;
  }
}
.title {
  color: rgba(144, 147, 153, 1);
  font-size: 14px;
  height: 27px;
  line-height: 27px;
  padding: 0 16px;
  background-color: rgba(244, 244, 244, 1);
}
.history {
  margin-left: 16px;
  .cell {
    display: flex;
    justify-content: space-between;
    padding: 11px 16px 11px 0;
    border-bottom: 1px solid rgba(144, 147, 153, 1);
    &:last-child {
      border-bottom: 0;
    }
  }
}
.all {
  margin-left: 16px;
  .cell {
    display: flex;
    justify-content: space-between;
    padding: 11px 16px 11px 0;
    border-bottom: 1px solid rgba(144, 147, 153, 1);
  }
}
.fontSize_18 {
  height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
}
.fontSize_14 {
  color: rgba(144, 147, 153, 1);
  font-size: 14px;
}
.align_self_end {
  align-self: flex-end;
}
.align_self_center {
  align-self: center;
}

.fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding-bottom: 10px;
  .footer {
    display: flex;
    justify-content: space-between;
    border-top: 1.3px solid rgba(229, 229, 229, 1);
    .left {
      padding: 7px 0 0 12px;
      color: rgba(16, 16, 16, 1);
      font-size: 16px;
    }
  }
}
.van-button {
  width: 104px;
  height: 52px;
  font-size: 18px;
  border-radius: 5px 5px 5px 5px;
  background-color: rgba(1, 113, 240, 1);
}

.pop {
  border: 1px solid rgba(187, 187, 187, 1);
  color: rgba(0, 0, 0, 1);
  font-size: 17px;
  box-sizing: border-box;
  .name {
    padding: 15px;
  }
  .gray {
    color: #969799;
  }
  .padding_left {
    padding-left: 8px;
  }
  /deep/ .van-field__control {
    color: #969799;
  }
  .pop_cell {
    display: flex;
    justify-content: space-between;
    padding: 9px 13px;
  }
  .border_top {
    border-top: 1px solid rgba(229, 229, 229, 1);
  }
  .van-cell {
    padding: 9px 13px;
    color: rgba(0, 0, 0, 1);
    font-size: 17px;
  }
  .button {
    border: none;
    width: 50%;
    cursor: pointer;
    background-color: #fff;
    padding: 12px 13px 17px 13px;
    &:first-child {
      border-right: 1px solid rgba(229, 229, 229, 1);
    }
  }
}
</style>
