<template>
  <div class="orderTips">
    <div class="top">
      <div class="padding_5">
        <span>开启</span>
        <input type="checkbox" />
      </div>
      <div class="care">
        <span class="padding_5">请添加关注商品</span>
        <span class="padding_5">已关注 5</span>
      </div>
      <my-search v-model="searchValue" />
    </div>
    <div class="list">
      <div class="list_line" v-for="item in 10" :key="item">
        <van-checkbox v-model="checked" checked-color="#07c160">商品001</van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";
export default {
  data() {
    return {
      checked: true,
      searchValue: null
    };
  },
  components: {
    MySearch: MySearch
  }
};
</script>

<style lang="less" scoped>
.orderTips {
  // background-color: #02e166;
  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    width: 50px;
    height: 26px;
    border: 1px solid #ccc;
    background-color: #ccc;
    border-radius: 0.7rem;
    outline: none;
  }

  overflow: auto;
  height: 100%;
  background-color: #f8f8f8;
  font-size: 17px;
  .top {
    padding: 60px 8px 8px 10px;
    border-bottom: 1px solid #e5e5e5;
  }
  .care {
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    padding: 35px 0 11px 0;
  }

  .list {
    padding-left: 15px;
    background-color: #fff;
    .list_line {
      padding: 12px 0;
      border-bottom: 1px solid rgba(187, 187, 187, 1);
      & /deep/ .van-checkbox__label {
        color: #000;
      }
      &:last-child {
        border: none;
      }
    }
  }
  .padding_5 {
    padding: 0 5px;
  }
}
</style>