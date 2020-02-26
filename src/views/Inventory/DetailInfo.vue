<template>
  <div class="detail">
    <div class="info">
      <div class="fz18 dark_color">{{detail.name}}</div>
      <div class="light_color fz14 mt8">
        <span>编码</span>
        <span>{{detail.code}}</span>
      </div>

      <div class="mt12">
        <span class="light_color mr30">可用量</span>
        <span class="dark_color">
          {{getArraytotal(detail.baseQuantity,detail.OtherForDispatch).toFixed(2)}}
          {{detail.currentStock.length?detail.currentStock[0].unit:''}}
        </span>
      </div>
      <div class="mt8">
        <span class="light_color mr30">现存量</span>
        <span class="dark_color">
          {{getArraytotal(detail.baseQuantity).toFixed(2)}}
          {{detail.currentStock.length?detail.currentStock[0].unit:''}}
        </span>
      </div>
    </div>

    <div class="list">
      <div class="flex">
        <span class="light_color">{{detail.currentStock.length?'库房名称':'库房名称(无)'}}</span>
        <span
          class="light_color"
        >可用量({{detail.currentStock.length?detail.currentStock[0].unit:'无'}})</span>
        <span
          class="light_color"
        >现存量({{detail.currentStock.length?detail.currentStock[0].unit:'无'}})</span>
      </div>
      <div v-for="(item,index) in detail.currentStock" :key="index" class="flex">
        <div class="dark_color mt8 flex_ave">{{item.warehouse_name}}</div>
        <div
          class="dark_color mt8 flex_ave mr10"
        >{{item.OtherForDispatch?(item.baseQuantity-item.OtherForDispatch).toFixed(2):item.baseQuantity.toFixed(2)}}</div>
        <div class="dark_color mt8 mr10">{{item.baseQuantity.toFixed(2)}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import { setItem, getItem } from "../../utils/Storage.js";

export default {
  data() {
    return {
      detail: getItem("inventory")
    };
  },
  mounted() {
    // console.log(this.detail);
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/inventory") {
      to.meta.keepAlive = true;
    } else {
      to.meta.keepAlive = false;
    }
    next();
  },
  methods: {
    // 可用量 现存量 数组求和
    getArraytotal(baseQuantity, OtherForDispatch = []) {
      let baseTotal = 0;
      let otherTotal = 0;
      for (let i = 0; i < baseQuantity.length; i++) {
        baseTotal += baseQuantity[i];
      }
      for (let i = 0; i < OtherForDispatch.length; i++) {
        otherTotal += OtherForDispatch[i];
      }
      return baseTotal - otherTotal;
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  font-size: 15px;
  .info {
    padding: 30px 17px 15px 17px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .list {
    padding: 15px 17px 30px 17px;
  }
  .flex_ave {
    flex:0.3333;
  }
  .text-detail {
    display: flex;
    margin-top: 33px;
    .text-middle {
      color: rgba(153, 153, 153, 1);
      font-size: 15px;
      height: 25px;
      flex: 1;
      div {
        padding-top:10px;
        color:rgba(16, 16, 16, 1);
      }
    }
  }
}
</style>