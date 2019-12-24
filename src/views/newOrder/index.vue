<template>
  <div>
    <van-nav-bar title="新增销售订单"
                 left-arrow
                 fixed
                 @click-left="back" />
    <van-cell-group>
      <van-cell title="单据日期*"
                :value="myDate"
                is-link
                @click="startTime">

      </van-cell>
      <!-- 开启遮罩层，，给需要点击的单元格设定一个属性，通过这个属性来判断调取那个时间控件 -->
      <van-overlay :show="show"
                   @click="show = false">
        <!-- 单据日期控件 -->
        <van-datetime-picker v-model="currentDate"
                             type="date"
                             @cancel="cancelPicker"
                             @confirm="confirmPicker"
                             v-if="datePicker == 'currentDate'" />
        <!-- 预计日期控件 -->
        <van-datetime-picker v-model="newCurrentDate"
                             type="date"
                             @cancel="cancelPicker1"
                             @confirm="confirmPicker1"
                             v-if="datePicker == 'newCurrentDate'" />
      </van-overlay>
      <van-cell title="预计交货日期*"
                :value="newDate"
                is-link
                @click="endTime">
      </van-cell>
      <van-cell title="客户*"
                value="请选择客户"
                is-link
                class="spacing">
      </van-cell>
      <van-cell title="业务员"
                value="请选择"
                is-link
                class="spacing">
      </van-cell>
      <van-cell title="选择商品"
                value="请选择"
                is-link
                class="spacing">
      </van-cell>
      <div class="spacing-two">
        <van-cell title="币种"
                  value="请选择"
                  is-link>
        </van-cell>
        <van-cell title="汇率"
                  value="请输入"
                  is-link>
        </van-cell>
      </div>

      <van-cell title="发货要求"
                value="请输入"
                is-link>
      </van-cell>
      <van-cell title="送货要求"
                value="请输入"
                is-link>
      </van-cell>
      <van-cell title="备注"
                is-link
                label="添加备注">
      </van-cell>
    </van-cell-group>
    <van-button plain
                type="primary">存草稿</van-button>
    <van-button type="info">提交订单</van-button>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  data () {
    return {
      // 单据日期
      currentDate: new Date(),
      // 预计日期
      newCurrentDate: new Date(),
      // 单据日期遮罩层
      show: false,
      datePicker: '', // 用于判断哪个选择器的显示与隐藏
      myDate: '请选择',
      newDate: '请选择'

    }
  },
  methods: {
    back () {
      console.log('255');

    },
    // 打开开始时间控件
    startTime() {
      this.show = true
      this.datePicker = 'currentDate'
    },
    // 打开结束时间控件
    endTime () {
      this.show = true
      this.datePicker = 'newCurrentDate'
    },
    // 开始选择器取消按钮点击事件
    cancelPicker () {
      this.show = false;
      this.datePicker = ""
      this.myDate = '请选择'
    },
    // 开始确定按钮，时间格式化并显示在页面上
    confirmPicker () {
      this.myDate = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.show = false;
      this.datePicker = "";
    },
        // 结束选择器取消按钮点击事件
    cancelPicker1 () {
      this.show = false;
      this.datePicker = "";
      this.newDate = '请选择'
    },
    // 结束确定按钮，时间格式化并显示在页面上
    confirmPicker1 () {
      this.newDate = dayjs(this.newCurrentDate).format('YYYY-MM-DD')
      this.show = false;
      this.datePicker = "";
    },
  }
}
</script>

<style lang="less" scoped>
.van-cell-group {
  margin-top: 59px;
  border-top: 1px solid #c0c4cc;
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
  .van-overlay {
    .van-picker {
      width: 100%;
      position: fixed;
      bottom: 0;
    }
  }
  // 带间距的单元格样式
  .spacing {
    margin: 17px 0px 17px 0px;
    border-top: 1px solid #c0c4cc;
  }
  .spacing-two {
    border-top: 1px solid #c0c4cc;
    margin-bottom: 17px;
  }
}
</style>
