<template>
  <div class="orderTips">
    <div class="top">
      <div class="switch">
        <span>开启</span>
        <van-switch v-model="checked" active-color="#07c160" inactive-color="#ee0a24" size="30px" />
      </div>
      <div class="care">
        <span>请添加关注商品</span>
        <span>已关注 5</span>
      </div>
      <div class="search">
        <input type="search" />
      </div>
    </div>
    <div class="list">
      <div class="list_line" v-for="item in 10" :key="item">
        <van-checkbox v-model="checked" checked-color="#07c160">商品001</van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true,
      value: null
    };
  }
};
</script>

<style lang="less" scoped>

.orderTips {
  overflow: auto;
  height: 100%;
  background-color: #f8f8f8;
  .top {
    padding: 60px 8px 8px 10px;
    border-bottom: 1px solid #e5e5e5;
    .switch {
      display: flex;
      justify-content: space-between;
      padding-left: 5px;
      span {
        vertical-align: middle;
        font-size: 17px;
      }
      .van-switch {
        vertical-align: middle;
      }
    }
  }

  .care {
    height: 20px;
    color: rgba(16, 16, 16, 1);
    font-size: 14px;
    padding: 35px 0 11px 0;

    span {
      padding-left: 5px;
    }
  }

  .search {
    input {
      width: 300px;
      height: 36px;
      border-radius: 6px;
      text-align: left;
      border: 1px solid rgba(187, 187, 187, 1);
      outline: none;
      background: #fff url(../../assets/search.png) no-repeat 10px;
      background-size: 24px;
      padding-left: 42px;
    }
  }

  .list {
    padding-left: 15px;
    background-color: #fff;

    .list_line {
      padding: 12px 0;
      border-bottom: 1px solid rgba(187, 187, 187, 1);

      & /deep/ .van-checkbox__label {
        color: #000;
        font-size: 17px;
      }
      &:last-child {
        border: none;
      }
    }
  }
}
</style>