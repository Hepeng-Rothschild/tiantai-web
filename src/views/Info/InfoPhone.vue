<template>
  <div class="phone">
    <div class="phone_top">
      <van-cell-group>
        <van-cell title="联系人*" value="请输入" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="职位" value="请输入" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="手机*" value="请输入" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="送货地址*" value="请输入" />
      </van-cell-group>
    </div>
    <div class="phone_bottom">
      <van-button type="info" @click="saveInfo()">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    saveInfo() {}
  }
};
</script>

<style lang="less" scoped>
.phone {
  .phone_top {
    padding-top: 65px;
    height: 690px;
    background-color: #f8f8f8;
    .van-cell-group {
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .phone_bottom {
    padding: 0 20px;
    padding-bottom: 20px;
    .van-button {
      width: 100%;
    }
  }
}
</style>