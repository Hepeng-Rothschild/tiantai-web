<template>
  <div>
    <van-cell-group>
      <div class="spacing-two">
        <van-cell title="客户名称"
                  value="请输入"
                  class="moveleft">

        </van-cell>
        <van-cell title="客户性质"
                  value="请选择"
                  is-link>
        </van-cell>
        <van-cell title="所属类别"
                  value="请选择"
                  is-link>
        </van-cell>
      </div>

      <div class="spacing-two">
        <van-cell title="分管部门 选填"
                  value="请选择"
                  is-link>
        </van-cell>
        <van-cell title="分管人员"
                  value="请选择"
                  is-link>
        </van-cell>
      </div>
      <div class="spacing">
        <van-cell title="默认收款方式"
                  value="请选择"
                  is-link to="/defaultPay">
        </van-cell>
      </div>

      <div class="spacing-two moveleft">
        <van-cell title="联系人"
                  value="请输入">
        </van-cell>
        <van-cell title="联系电话"
                  value="请输入">
        </van-cell>
        <van-cell title="到货地址"
                  value="请输入">
        </van-cell>
      </div>
      <div class="spacing-two moveleft">
        <van-cell title="发货要求"
                  value="请输入">
        </van-cell>
        <van-cell title="到货要求"
                  value="请输入">
        </van-cell>
      </div>

    </van-cell-group>
    <van-button type="info">保存</van-button>

  </div>
</template>

<script>

export default {
  data () {
    return {


    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.van-cell-group {
  margin-top: 59px;
  border-top: 1px solid #c0c4cc;
  margin-bottom: 16px;
  .van-cell {
    padding: 10px 15px 10px 15px;
    border-bottom: 1px solid #c0c4cc;
    .van-cell__title {
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
    .van-cell__value {
      color: #888888;
      font-size: 17px;
      text-align: right;
      font-family: "PingFangSC-regular";
    }
  }
  // 左移不带箭头的文字
  .moveleft .van-cell__value {
    margin-right: 20px;
  }
  .van-overlay {
    .van-picker {
      width: 100%;
      position: fixed;
      bottom: 0;
    }
  }
  // 带间距的单元格样式
  .spacing {
    margin: 0px 0px 17px 0px;
    border-top: 1px solid #c0c4cc;
  }
  .spacing-two {
    border-top: 1px solid #c0c4cc;
    margin-bottom: 17px;
  }
  .filed {
    border-top: 1px solid #c0c4cc;
  }
}
// 按钮样式
.van-button {
  margin: 10px 20px 53px 20px;
  width: 87%;
  border-radius: 5px 5px 5px 5px;
  text-align: center;
}
</style>
