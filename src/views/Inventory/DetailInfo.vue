<template>
  <div class="detail">
    <div class="name">{{detail.InventoryName}}</div>
    <div class="type">
      <span>型号</span>
      <span>{{detail.Specification}}</span>
    </div>
    <div class="text">
      <span>仓库</span>
      <span>{{detail.WarehouseName}}</span>
    </div>
    <div class="text">
      <span>现存量</span>
      <span>{{parseInt(detail.ExistingQuantity)}} {{detail.UnitName}}</span>
    </div>
    <div class="text">
      <span>可用量</span>
      <span>{{parseInt(detail.AvailableQuantity)}} {{detail.UnitName}}</span>
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