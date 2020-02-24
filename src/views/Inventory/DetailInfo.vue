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
        <span
          class="dark_color"
        >{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}} {{detail.currentStock.unit}}</span>
      </div>
      <div class="mt8">
        <span class="light_color mr30">现存量</span>
        <span
          class="dark_color"
        >{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}} {{detail.currentStock.unit}}</span>
      </div>
    </div>

    <div class="list">
      <div class="flex">
        <span class="light_color">库房名称</span>
        <span class="light_color">可用量({{detail.currentStock.unit}})</span>
        <span class="light_color">现存量({{detail.currentStock.unit}})</span>
      </div>
      <div v-for="(item,index) in inventory" :key="index" class="flex">
        <div class="dark_color mt8 mr20">{{detail.currentStock.warehouse_name?detail.currentStock.warehouse_name:'无'}}</div>
        <div class="dark_color mt8 mr20">{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}}</div>
        <div class="dark_color mt8 mr20">{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setItem, getItem } from "../../utils/Storage.js";

export default {
  data() {
    return {
      detail: getItem("inventory"),
      inventory:[1,2,3]
    };
  },
  mounted() {
    // console.log(this.detail)
  },
  beforeRouteLeave(to, from, next) {
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
  font-size: 15px;
  .info {
    padding: 30px 17px 15px 17px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .list {
    padding: 15px 17px 30px 17px;
  }
}
</style>