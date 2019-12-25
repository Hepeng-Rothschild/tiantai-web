<template>
  <div>
    <van-radio-group v-model="radio">
      <van-radio name="1">全额订金</van-radio>
      <van-radio name="2">全额现结</van-radio>
      <van-radio name="3">限期收款</van-radio>
      <van-radio name="4">月结</van-radio>
      <van-radio name="5">其它</van-radio>
    </van-radio-group>
    <van-button type="info">保存</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: ''
    }
  },
  methods: {
  }
}
</script>

<style lang = "less" scoped>
.van-radio-group {
  margin-top: 59px;
  border-bottom: 1px solid #c0c4cc;
  padding-left: 16px;
  .van-radio {
    margin-bottom: 20px;
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
