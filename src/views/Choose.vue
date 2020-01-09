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
          <div class="fontSize_14 align_self_end">现存量 {{item?item.currentStock.baseQuantity:''}}</div>
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
        <van-field v-model="number" label="数量" input-align="right" placeholder="请输入" />
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
        <span
          class="gray"
        >￥{{popData?popData.OrigDiscountAmount:0.00}}</span>
      </div>
      <div class="pop_cell border_top">
        <span>含税金额</span>
        <span class="gray">￥{{popData?popData.OrigTaxAmount:0.00}}</span>
      </div>
      <div class="border_top">
        <button class="button" @click="del()">删除</button>
        <button class="button" @click="confirm()">确定</button>
      </div>
    </van-popup>
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
      popData: null,
      number: null, // 数量
      totalPrice: 0,
      SaleOrderDetails:[],
    };
  },
  watch: {
    searchValue(newValue, oldValue) {
      this.inventory = [];
      this.pageIndex = 1;
      this.finished = false;
      this.getGoods();
    },
    number(newVal,oldVal) {
      const number = Number(newVal)
      this.popData.Quantity = newVal
      this.popData.OrigDiscountAmount = (number*this.popData.OrigTaxPrice*(100-this.popData.rate)/100).toFixed(2)
      this.popData.OrigTaxAmount = (number*this.popData.OrigTaxPrice).toFixed(2)
      console.log(this.popData)
    }
  },
  methods: {
    async onLoad() {
      // console.log('===============')
      await this.getGoods();
    },
    async getGoods() {
      
      var _this = this;
    

      const { data } = await this.$Parse.Cloud.run("getInventory", {
        inventoryName: _this.searchValue,
        pageSize: _this.pageSize,
        pageIndex: _this.pageIndex
      });
      // console.log(data)
      let listData = this.inventory || [];
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
    // 显示弹窗
    showPopup(item) {
      
        this.popData =  {
        name:item.name,
        rate:Number(item.rate),
        Unit: { Name: item.currentStock.unit },
        Quantity: null,
        DiscountRate: 1, // 折扣率
        IsPresent: false, // 是否赠品
        Inventory: { Code: item.code }, // 系统存货编码Code
        OrigDiscountPrice: (item.retailPrice*((100-item.rate)/100)), // 单价
        OrigTaxPrice: Number(item.retailPrice).toFixed(2), // 含税单价
        OrigDiscountAmount: (0).toFixed(2), // 原币金额
        OrigTaxAmount: (0).toFixed(2), // 原币含税金额
      };
      
      this.number = null;
      this.totalPrice = 0
      this.show = true;
    },
    onCancel() {
      this.showSelect = false;
    },
    confirm() {
      if (!this.number || this.number == 0) {
        this.$toast({
          message: "数量不能为空"
        });
        return;
      }
      this.show = false;
      // 选择了几种
      // for (let i = 0; i <= this.SaleOrderDetails.length; i++) {
        
      //     this.SaleOrderDetails.push(this.popData);
        
      // }

      // const totalPrice = Number(number) * Number(popData.retailPrice);
      // console.log('总价',totalPrice);
      // this.totalPrice += totalPrice;

      

      // this.SaleOrderDetails.push(obj)
      console.log(this.SaleOrderDetails)
    },
    del() {
      this.show = false;
    },
    finish() {
      const obj = {
        Unit: { Name: popData.currentStock.unit },
        Quantity: number,
        DiscountRate: 1, // 折扣率
        IsPresent: false, // 是否赠品
        Inventory: { Code: popData.code }, // 系统存货编码Code
        OrigDiscountPrice: (popData.retailPrice*((100-popData.rate)/100)), // 单价
        OrigTaxPrice: popData.retailPrice, // 含税单价
        OrigDiscountAmount: (Number(number)*Number(popData.retailPrice)*(100-popData.rate)/100).toFixed(2), // 原币金额
        OrigTaxAmount: (Number(number)*Number(popData.retailPrice)).toFixed(2), // 原币含税金额
      };
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
