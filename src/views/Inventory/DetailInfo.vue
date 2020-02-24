<template>
  <div class="detail">
    <div class="name">{{detail.name}}</div>
    <div class="type">
      <span>编码</span>
      <span> {{detail.code}}</span>
    </div>

    <div class="text">
      <span>可用量</span>
      <span>{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}} {{detail.currentStock.unit}}</span>
    </div>
    <div class="text">
      <span>现存量</span>
      <span>{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}} {{detail.currentStock.unit}}</span>
    </div>

    <div class="text-detail">
      <div class="text-middle">
        库房名称
        <div>{{detail.currentStock.warehouse_name?detail.currentStock.warehouse_name:'无'}}</div>
      </div>

      <div class="text-middle">
        可用量({{detail.currentStock.unit}})
        <div>{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}}</div>

      </div>

      <div class="text-middle">
        现存量({{detail.currentStock.unit}})
        <div>{{parseInt(detail.currentStock.baseQuantity?detail.currentStock.baseQuantity:0).toFixed(2)}}</div>

      </div>
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
  mounted () {
    // console.log(this.detail)
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
    // height: 46px;
    margin-bottom: 12px;
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