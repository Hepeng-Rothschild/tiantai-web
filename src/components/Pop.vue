<template>
  <div class="pop">
    <div v-if="Object.keys(popData).length">
      <van-popup
        v-model="show"
        close-on-popstate
        :overlay="false"
        :style="{ width:'85%' }"
        class="pop"
      >
        <div class="name">
          <span>{{popData?popData.Inventory.Code:''}}</span>
          <span class="padding_left">{{popData?popData.name:''}}</span>
          <img src="../assets/close.png" @click="$emit('changeShow',false)" />
        </div>
        <div class="border_top">
          <van-field v-model="popData.Quantity" label="数量" input-align="right" placeholder="请输入" />
        </div>
        <div class="border_top">
          <van-cell title="单位" class="unit_color">{{popData.currentStock.unit?popData.currentStock.unit:'KG'}}</van-cell>
        </div>
        <div class="pop_cell border_top">
          <span>含税单价</span>
          <input type="text" v-model="popData.OrigTaxPrice" placeholder="请输入" class="my_input" />
        </div>
        <div class="pop_cell border_top">
          <span>税率</span>
          <span class="gray">{{popData?popData.rate:'0.0'}}%</span>
        </div>
        <div class="pop_cell border_top">
          <span>本币金额</span>
          <span
            class="gray"
          >￥{{popData?(popData.OrigTaxPrice * popData.Quantity*(1-popData.rate/100)).toFixed(2):0.00}}</span>
        </div>
        <div class="pop_cell border_top">
          <span>含税金额</span>
          <span class="gray">￥{{popData?(popData.OrigTaxPrice * popData.Quantity).toFixed(2):0.00}}</span>
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
export default {
  data() {
    return {
      singlePrice: null
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    popData: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    del() {
      this.$emit("delete");
    },
    confirm() {
      if (this.popData.Quantity == 0) {
        this.$toast({
          message: "数量不能为空"
        });
        return;
      }
      if (this.popData.Quantity < 0) {
        this.$toast({
          message: "数量不能为负"
        });
        return;
      }
      if (!Number.isInteger(this.popData.Quantity - 0)) {
        this.$toast({
          message: "数量不能为小数"
        });
        return;
      }

      this.$emit("changeShow", false);
      this.$emit("changePopData");
    }
  }
};
</script>
<style lang="less" scoped>
.pop {
  border: 1px solid rgba(187, 187, 187, 1);
  color: rgba(0, 0, 0, 1);
  font-size: 17px;
  box-sizing: border-box;
  .name {
    position: relative;
    padding: 15px;
    img {
      position: absolute;
      right: 10px;
      top: 16px;
      width: 24px;
      height: 24px;
    }
  }
  .gray {
    // color: #969799;
    color: #000;
  }
  .padding_left {
    padding-left: 8px;
  }
  /deep/ .van-field__control {
    // color: #969799;
    color: #000;
  }
  .pop_cell {
    display: flex;
    justify-content: space-between;
    padding: 9px 13px;
  }
  .border_top {
    border-top: 1px solid rgba(229, 229, 229, 1);
    .unit_color {
      .van-cell__value {
        color:#000;
      }
    }
  }
  .van-cell {
    padding: 9px 13px;
    color: rgba(0, 0, 0, 1);
    font-size: 17px;
  }
  .my_input {
    width: 150px;
    border: none;
    // color: #888;
    color: #000;
    text-align: right;
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