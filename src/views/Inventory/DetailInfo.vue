<template>
  <div class="detail">
    <div class="name">{{detail.name}}</div>
    <div class="type">
      <span>型号</span>
      <span>{{detail.specification}}</span>
    </div>
    <div class="text">
      <span>仓库</span>
      <span>{{detail.currentStock.warehouse_name?detail.currentStock.warehouse_name:'无'}}</span>
    </div>
    <div class="text">
      <span>现存量</span>
      <span>{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}} {{detail.unit}}</span>
    </div>
    <div class="text">
      <span>可用量</span>
      <span>{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}} {{detail.unit}}</span>
    </div>
  </div>
</template>

<script>
import { setItem, getItem } from "../../utils/Storage.js";

export default {
  data () {
    return {
      detail: getItem("inventory")
    };
  },
  mounted() {
    console.log(this.detail)
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === "/inventory") {
      to.meta.keepAlive = true;      
    } else {
      to.meta.keepAlive = false;
    }
    next();
  }
};
</script>

<style lang="less" scoped>
.detail {
  padding: 70px 22px;
  .name {
    color: rgba(16, 16, 16, 1);
    font-size: 18px;
    height: 36px;
  }
  .type {
    color: rgba(153, 153, 153, 1);
    font-size: 14px;
    height: 46px;
  }
  .text {
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    height: 25px;
    span:first-child {
      display: inline-block;
      width: 100px;
    }
    span:last-child {
      color: rgba(16, 16, 16, 1);
      font-size: 15px;
    }
  }
}
</style>