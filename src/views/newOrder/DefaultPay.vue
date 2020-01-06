<template>
  <div>
    <van-radio-group v-model="radio">
      <van-radio name="全额订金">全额订金</van-radio>
      <van-radio name="全额现结">全额现结</van-radio>
      <van-radio name="限期收款">限期收款</van-radio>
      <van-radio name="月结">月结</van-radio>
      <van-radio name="其它">其它</van-radio>
    </van-radio-group>
    <van-button type="info"
                @click="selectPay(radio)">保存</van-button>
  </div>
</template>

<script>
import { setItem } from "../../utils/Storage.js";

export default {
  data () {
    return {
      radio: '其它'
    }
  },
  methods: {
    selectPay (radio) {
      this.$router.push({ name: "newly" });
      setItem("selectPay", radio);
    }
  }
}
</script>

<style lang = "less" scoped>
.van-radio-group {
  margin-top: 59px;
  border-bottom: 1px solid #c0c4cc;
  padding-left: 16px;
  .van-radio {
    padding-bottom: 20px;
    .van-radio__label {
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
      text-align: left;
    }
  }
}
/* // 按钮样式 */
.van-button {
  position: fixed;
  left: 20px;
  bottom: 53px;
  width: 87%;
  border-radius: 5px 5px 5px 5px;
  text-align: center;
}
</style>
