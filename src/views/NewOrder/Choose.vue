<template>
  <div class="choose">
    <div class="header">
      <!-- 搜索栏 -->
      <my-search v-model="searchValue" placeholder="请输入商品名称"></my-search>
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
          <div class="left">
            <div class="fontSize_18">{{item?item.code:''}}</div>
            <div class="fontSize_14">{{item?item.name:''}}</div>
          </div>
          <div
            class="fontSize_14 align_self_end right"
          >现存量：{{item.currentStock.baseQuantity?item.currentStock.baseQuantity :'无'}}{{item.currentStock.unit}}</div>
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
    <my-pop
      :show="show"
      :popData="popData"
      @changeShow="changeShow"
      @changePopData="changePopData"
      @delete="deleteGoods"
    ></my-pop>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";
import MyPop from "../../components/Pop.vue";
import { debounce } from "loadsh";

export default {
  components: {
    MySearch: MySearch,
    MyPop: MyPop
  },
  data() {
    return {
      searchValue: null,
      inventory: [],
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      show: false, // 中间弹框显示隐藏
      popData: {},
      number: null, // 数量
      totalPrice: this.$store.state.TotalPrice || 0,
      SaleOrderDetails: this.$store.state.SaleOrderDetails || []
    };
  },
  watch: {
    searchValue: debounce(async function(newValue, oldValue) {
      this.pageIndex = 1;
      this.inventory = [];
      this.getGoods();
    }, 500)
  },
  methods: {
    onLoad() {
      this.getGoods();
    },
    async getGoods() {
      var _this = this;
      let { data } = await this.$Parse.Cloud.run("getInventory", {
        // inventoryCode:_this.searchValue,
        inventoryName: _this.searchValue,
        pageSize: _this.pageSize,
        pageIndex: _this.pageIndex
      });     
      // console.log(data);
       
      let listData = data.map(item => {
        return {
          id: item.id,
          code: item.code,
          name: item.name,
          rate: Number(item.rate),
          Unit: { Name: item.currentStock.unit },
          currentStock: item.currentStock,
          Quantity: null,
          DiscountRate: 1, // 折扣率
          IsPresent: false, // 是否赠品
          Inventory: { Code: item.code }, // 系统存货编码Code
          OrigDiscountPrice: null, // 单价
          OrigTaxPrice: null // 含税单价
        };
      });
      this.inventory.push(...listData);
      this.loading = false;
      if (data.length) {
        this.pageIndex++;
        this.finished = false;
      }
      if (!data.length || data.length < this.pageSize) {
        this.finished = true;
      }
    },
    // 显示弹窗
    showPopup(item) {
      this.show = true;
      item = JSON.parse(JSON.stringify(item));
      item.Quantity = null;
      item.OrigDiscountAmount = 0; // 总价
      item.OrigTaxAmount = 0; // 含税总价
      item.OrigTax = 0; // 税额
      item.DiscountRate = 1;
      item.IsPresent = false;
      let itemInfo = this.SaleOrderDetails.filter(v => v.code == item.code)[0];
      this.popData = itemInfo ? itemInfo : item;
      this.getInventorySaleDelList(this.popData); // 获取单价
    },
    async getInventorySaleDelList(popData) {
      const { data } = await this.$Parse.Cloud.run("getInventorySaleDelList", {
        id: popData.id
        // id: 331
      });
      if (data[0].length) {
        // SA_SaleDelivery_b_origTaxPrice  含税单价
        this.popData.OrigTaxPrice = data[0][0].SA_SaleDelivery_b_origTaxPrice;
      }
    },
    deleteGoods() {
      let index = this.SaleOrderDetails.findIndex(
        v => v.code == this.popData.code
      );
      let popData = JSON.parse(JSON.stringify(this.popData));
      // 判断B数组里有没有点击的那个商品  没有就加进去  否则就替换掉B数组里原来的商品信息
      if (index == -1) {
        this.$toast({
          message: "您还未选择该商品，无法删除"
        });
      } else {
        this.show = false;
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
      }
    },
    changeShow(show) {
      this.show = show;
    },
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

    finish() {
      this.$store.commit("saveSelectGoods", this.SaleOrderDetails);
      this.$router.push("/neworder");
    }
  }
};
</script>

<style lang="less" scoped>
.choose {
  height: 100%;
  .header {
    padding: 10px 10px 12px 10px;
  }
}
.pop {
  border: none;
  height: 1px;
  background-color: #bbb;
  margin-bottom: 80px;
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
    .left {
      width: 40%;
    }
    .right {
      width: 45%;
    }
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
  .footer {
    display: flex;
    justify-content: space-between;
    height: 100%;
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
  height: 100%;
  line-height: 56px;
  font-size: 18px;
  border-radius: 5px;
  background-color: rgba(1, 113, 240, 1);
}
</style>
