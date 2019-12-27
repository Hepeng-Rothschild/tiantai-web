<template>
  <div class="publish">
    <div class="main">
      <div class="border type">
        <van-cell title="公告类型" value="采购到货提醒" is-link />
      </div>
      <div class="border">
        <van-cell title="选择商品" value="请选择" is-link />
      </div>
      <div class="border">
        <van-cell title="到货时间" value="请选择" is-link />
      </div>
      <div class="border">
        <van-cell title="单位" value="请选择" is-link />
      </div>
      <div class="border">
        <van-cell title="数量">
          <input type="text" placeholder="请输入" class="input_number"/>
        </van-cell>
      </div>
    </div>
    <div class="footer">
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
.publish {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  background-color: #f8f8f8;
  padding-top: 70px;
  .main {
    .van-cell__title {
      height: 24px;
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
    }
    .van-cell__value {
      height: 24px;
      color: rgba(136, 136, 136, 1);
      font-size: 17px;
    }
    .van-cell__right-icon {
      font-size: 17px;
    }
    .border {
      border-top: 1.5px solid #e5e5e5;
      border-bottom: 1.5px solid #e5e5e5;
    }
    .type {
      margin-bottom: 25px;
    }
  }
  .footer {
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
      width: 72px;
  }
}
</style>