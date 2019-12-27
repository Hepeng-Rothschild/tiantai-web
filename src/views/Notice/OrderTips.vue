<template>
  <div class="orderTips">
    <div class="top">
      <div class="switch padding_5">
        <span class="switch_text">开启</span>
        <my-switch v-model="switchValue" @click.native="changeSwitchValue"/>
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
import MySwitch from "../../components/Switch.vue";
export default {
  data() {
    return {
      switchValue: false,
      checked: true,
      searchValue: null,
    };
  },
  components: {
    MySearch,
    MySwitch
  },
  methods: {
    changeSwitchValue() {
      this.switchValue = !this.switchValue
    }
  },
};
</script>

<style lang="less" scoped>
.orderTips {
  overflow: auto;
  height: 100%;
  background-color: #f8f8f8;
  font-size: 17px;
  .switch {
    display: flex;
    justify-content: space-between;
    .switch_text {
      line-height: 28px;
    }
  }
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