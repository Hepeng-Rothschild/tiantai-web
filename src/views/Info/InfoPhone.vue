<template>
  <div class="phone">
    <div class="border_top">
      <van-cell title="联系人*">
        <input type="text" placeholder="请输入" class="input_number" />
      </van-cell>
    </div>
    <div class="border_top">
      <van-cell title="职位">
        <input type="text" placeholder="请输入" class="input_number" />
      </van-cell>
    </div>
    <div class="border_top">
      <van-cell title="手机*">
        <input type="text" placeholder="请输入" class="input_number" />
      </van-cell>
    </div>
    <div class="border_top border_bottom">
      <van-cell title="送货地址*">
        <input type="text" placeholder="请输入" class="input_number" />
      </van-cell>
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
  position: relative;
  box-sizing: border-box;
  height: 100%;
  background-color: #f8f8f8;
  padding-top: 70px;
  .phone_bottom {
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px 20px 20px;
    .van-button {
      width: 100%;
    }
  }
  .input_number {
    outline: none;
    border: none;
    width: 100px;
    text-align: center;
    box-sizing: border-box;
    padding-left: 30px;
  }
  .border_top {
    border-top: 2px solid #e5e5e5;
  }
  .border_bottom {
    border-bottom: 2px solid #e5e5e5;
  }
  .van-cell__title {
    color: rgba(0, 0, 0, 1);
    font-size: 17px;
  }
  .van-cell__value {
    color: rgba(136, 136, 136, 1);
    font-size: 17px;
  }
}
</style>