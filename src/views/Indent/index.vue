<template>
  <div>
    <!-- 搜索栏 -->
    <my-search v-model="searchValue"
               placeholder="输入客户、编号进行查找"></my-search>
    <!-- 下拉菜单 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="dateIndex"
                         :options="dateStatus"
                         @change="changeDate">
      </van-dropdown-item>
      <!-- <van-popup v-model="overlay_show"
                 position="bottom">
        <van-datetime-picker v-model="currentDate"
                             type="date"
                             @confirm="confirmPicker1"
                             @cancel="overlay_show=false" />
      </van-popup> -->
      <van-dropdown-item v-model="orderIndex"
                         :options="orderStatus"
                         @change="changeState" />
    </van-dropdown-menu>

    <!-- 筛选列表 -->
    <van-list>
      <span class="date">{{this.endTime}}</span>
      <van-cell v-for="(indent,index) in allIndent"
                :key="index"
                :title="indent.partnerInfo.AA_Partner_name"
                :label="indent.SA_SaleOrder_code"
                is-link
                @click="toDetails(indent)"
                :class="draft?'draft':''">
        ￥{{indent.SA_SaleOrder_origTaxAmount}}
        <div>
          <van-tag type="primary">{{indent.SA_SaleOrder_voucherState == 181 ? '未审':'已审'}}</van-tag>
        </div>
      </van-cell>
      <span class="date">{{this.startTime}}</span>
    </van-list>
    <!-- 添加订单按钮 -->
    <van-button round
                type="default"
                class="add"
                @click="$router.push('/neworder')">+</van-button>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { setItem } from "../../utils/Storage.js";
import MySearch from "../../components/Search.vue"
export default {
  name: 'IndentIndex',
  components: {
    MySearch: MySearch
  },
  data () {
    return {
      // 日期
      currentDate: new Date(),
      // 自定义日期遮罩层
      overlay_show: false,
      loading: false,
      finished: false,
      searchValue: null,
      // 是否有草稿
      draft: null,
      // 下拉框信息
      dateIndex: 1,
      dateStatus: [
        { text: '近7天', value: 0 },
        { text: '本月', value: 1 },
        { text: '上月', value: 2 },
        { text: '本季度', value: 3 },
        { text: '本年', value: 4 },
        { text: '自定义', value: 5 },
      ],
      orderIndex: null,
      orderStatus: [
        { text: '全部', value: null },
        { text: '未审', value: 181 },
        { text: '已审', value: 189 }
      ],
      // 所有订单
      allIndent: [],
      // 开始时间
      startTime: '',
      // 结束时间
      endTime: '',
      // 订单编号
      code: null,
      // 当前状态
      state: null
    }
  },
  created () {
    this.initDate()
  },
  methods: {

    // 跳转到详情页面
    toDetails (indent) {
      this.$router.push({ name: 'details' })
      setItem("allIndent", indent)
    },
    // 初始化日期
    initDate () {
      const nowMonth = new Date().setDate(1)
      this.startTime = dayjs(new Date(nowMonth)).format('YYYY-MM-DD')
      this.endTime = dayjs(new Date()).format('YYYY-MM-DD')
      this.getData()
    },
    // 调取订单查询接口
    async getData () {
      const { data } = await this.$Parse.Cloud.run("getOrder", {
        startTime: this.startTime, endTime: this.endTime, code: this.code, state: this.state
      })
      console.log(data[0]);
      this.allIndent = data[0]
    },
    // 获取本季度开端月份
    getQuarterStartMonth () {
      let nowMonth = new Date().getMonth();
      var quarterStartMonth = 0;
      if (nowMonth < 3) {
        quarterStartMonth = 0;
      }
      if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3;
      }
      if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6;
      }
      if (nowMonth > 8) {
        quarterStartMonth = 9;
      }
      return quarterStartMonth;
    },
    // 获取本年度第一天的日期
    getCurrentYear () {
      //获取当前时间  
      let currentDate = new Date();
      //获得当前年份4位年  
      let currentYear = currentDate.getFullYear();
      //本年第一天  
      let currentYearFirstDate = new Date(currentYear, 0, 1);
      return currentYearFirstDate
    },
    // 改变时间进行筛选
    async changeDate (orderDate) {
      // 近7天
      let startTimeTmp = new Date();;
      let endTimeTmp = new Date();
      switch (orderDate) {
        case 0:
          startTimeTmp = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 1:
          startTimeTmp = new Date(new Date().setDate(1));
          break;
        case 2:
          startTimeTmp = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
          const day = new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate();
          endTimeTmp = new Date(new Date().getFullYear(), new Date().getMonth() - 1, day);
          break;
        case 3:
          startTimeTmp = new Date(new Date().getFullYear(), this.getQuarterStartMonth(), 1);
          break;
        case 4:
          startTimeTmp = this.getCurrentYear()
          break;
        default:
          this.overlay_show = true
          // this.confirmPicker1()
          break;
      }

      this.startTime = dayjs(startTimeTmp).format('YYYY-MM-DD')
      this.endTime = dayjs(endTimeTmp).format('YYYY-MM-DD')
      console.log(this.startTime, this.endTime);
      await this.getData()
      console.log(this.allIndent);
    },
    // 选择自定义的日期
    // confirmPicker1 (value) {
    //   this.overlay_show = false;
    //   this.date_1 = dayjs(value).format("YYYY-MM-DD");

    // },
    // 改变订单状态值进行筛选
    async changeState (orderState) {
      this.state = orderState
      await this.getData()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  margin: 59px 10px 10px 10px;
  width: 94%;
}
.customize {
  display: flex;
  font-size: 15px;
  input {
    width: 100%;
    height: 100%;
    font-size: 15px;
    text-align: center;
    border: 0px;
  }
}
.van-list {
  .date {
    margin-left: 14px;
    margin-top: 12px;
    color: rgba(144, 147, 153, 1);
    font-size: 13px;
    font-family: "PingFangSC-regular";
  }
  // 设置常规状态下单元格内容样式
  .van-cell--clickable:nth-of-type(1) {
    border-top: 1px solid #c0c4cc;
  }
  .van-cell {
    border-bottom: 1px solid #c0c4cc;
    .van-cell__title {
      color: #000000;
      font-size: 17px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
    .van-cell__value {
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
      text-align: right;
      font-family: "PingFangSC-regular";
      .van-tag {
        border-radius: 4px;
        color: #388ded;
        background-color: rgba(230, 247, 255, 1);
        text-align: center;
      }
    }
    .van-icon {
      margin-top: 14px;
    }
  }
}

// 此处为动态绑定class时，草稿（cell）需要绑定的样式
.draft {
  .van-cell__title {
    color: rgba(144, 147, 153, 1);
    font-size: 17px;
    text-align: left;
    font-family: "PingFangSC-regular";
  }
  .van-cell__value {
    color: rgba(144, 147, 153, 1);
    font-size: 17px;
    text-align: right;
    font-family: "PingFangSC-regular";
    .van-tag {
      border-radius: 4px;
      color: #606266;
      background-color: #c0c4cc;
      text-align: center;
    }
  }
}

.add {
  position: fixed;
  width: 57px;
  height: 50px;
  right: 26px;
  bottom: 75px;
  text-align: center;
  border-radius: 50%;
  box-shadow: 0px 3px 10px -2px rgba(170, 170, 170, 1);
  .van-button__text {
    font-size: 35px;
    color: rgba(1, 113, 240, 1);
  }
}
</style>
