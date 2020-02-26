<template>
  <div class="warning">
    <div class="select">
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="defaultTimeFrame"
          :options="timeFrameOptions"
          :title="title"
          @change="changeTimeFrame"
        >
          <van-cell title="自定义" @click="selectFreeTime()">
            <van-icon name="success" v-if="showIcon" class="icon_color"/>
          </van-cell>
        </van-dropdown-item>
        <van-dropdown-item
          v-model="defaultStatus"
          :options="orderStatusOptions"
          @change="changeStatus"
        />
      </van-dropdown-menu>
    </div>
    <div class="total_number dark_color fz14">
      单据数
      <span class="mr30">{{orderNumber}}</span>
      金额
      <span>{{orderMoney?orderMoney.toFixed(2):'0'}}</span>
    </div>
    <div class="goods_list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in orderList" :key="index" @click="toDetails(item)" class="order_item">
          <div class="up flex">
            <span class="fz16 dark_color name">{{item.partnerName}}</span>
            <span
              class="status_icon"
              :class="getClassName(item.offsetTime)"
            >{{showIconText(item.offsetTime)}} {{getOverdueDays(item.offsetTime)}}</span>
          </div>
          <div class="down flex light_color">
            <div>
              <div class="mb8">
                <span class="mr8">单据日期</span>
                <span class="dark_color">{{item.madedate.substr(0,10)}}</span>
              </div>
              <div class="mb8">
                <span class="mr8">单据类型</span>
                <span class="dark_color">销货单</span>
              </div>
              <div class="mb8">
                <span class="mr8">金额</span>
                <span class="dark_color">{{item.taxAmount}}</span>
              </div>
            </div>
            <div class="middle">
              <div class="mb8">
                <span class="mr8">到期日期</span>
                <span class="dark_color">{{item.auditeddate.substr(0,10)}}</span>
              </div>
              <div class="mb8">
                <span class="mr8">业务员</span>
                <span class="dark_color">{{item.linkMan}}</span>
              </div>
              <div class="mb8">
                <span class="mr8">余额</span>
                <span class="dark_color">{{item.surAmount}}</span>
              </div>
            </div>
            <div class="mt10">
              <img src="../../assets/arrow.png" class="arrow_img" />
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <!-- 时间范围选择器 -->
    <van-calendar
      v-model="showCalendar"
      type="range"
      color="#288ef8"
      close-on-popstate
      title="以到期日期选择范围"
      :min-date="getMinDate()"
      @confirm="confirmDate"
    />
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      defaultTimeFrame: 0,
      title: "全部时间",
      defaultStatus: "0",
      timeFrameOptions: [
        { text: "全部时间", value: 0 },
        { text: "本周", value: 1 },
        { text: "本月", value: 2 },
        { text: "本季度", value: 3 }
      ],
      orderStatusOptions: [
        { text: "全部状态", value: "0" },
        { text: "临近", value: "1" },
        { text: "到期", value: "2" },
        { text: "逾期", value: "3" }
      ],
      loading: false,
      finished: false,
      // 请求参数
      partnerId: null,
      orderState: 0,
      pageSize: 10,
      pageIndex: 0,
      startTime: null,
      endTime: null,
      // 获取到的数据
      orderList: [],
      orderNumber: 0,
      orderMoney: 0,
      showCalendar: false,
      showIcon: false
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      this.getDeliveryList();
    },
    async getDeliveryList() {
      const { data } = await this.$Parse.Cloud.run("deliveryList", {
        partnerId: this.partnerId, // partnerId 客户ID 单独查询一个客户时才需要
        state: this.orderState, // orderState: 0 全部 1临近，2，到期 3 逾期
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        startTime: this.startTime,
        endTime: this.endTime
      });
      console.log(data, "================");
      let newData = data.data.filter(v => v.surAmount > 0); // 过滤掉尾款小于等于0的
      if (data) {
        this.orderNumber = data.count;
        this.orderMoney = data.total;
      }
      this.orderList.push(...newData);
      this.loading = false;
      if (data.data.length) {
        this.pageIndex++;
        this.finished = false;
      }
      if (!data.data.length || data.data.length < this.pageSize) {
        this.finished = true;
      }
    },
    toDetails(item) {
      this.$store.commit("saveGoodsDetails");
      console.log(this.$store.state)
      // this.$router.push("/warninginfo");
    },
    // 逾期天数
    getOverdueDays(offsetTime) {
      if (offsetTime < 0) {
        return Math.abs(offsetTime) > 99 ? "99+" : Math.abs(offsetTime);
      } else {
        return "";
      }
    },
    showIconText(offsetTime) {
      return offsetTime == 0 ? "到期" : offsetTime > 0 ? "临近" : "逾期";
    },
    getClassName(offsetTime) {
      return offsetTime == 0 ? "expire" : offsetTime > 0 ? "near" : "expect";
    },
    changeStatus(value) {
      this.orderState = Number(value);
      this.pageIndex = 0;
      this.orderList = [];
      this.getDeliveryList();
    },
    changeTimeFrame(value) {
      this.showIcon = false
      var now = new Date(); //当前日期
      var nowDayOfWeek = now.getDay(); //今天本周的第几天
      var nowDay = now.getDate(); //当前日
      var nowMonth = now.getMonth(); //当前月
      var nowYear = now.getFullYear(); //当前年
      var startTime, endTime;
      if (value == 1) {
        this.title = "本周";
        //获得本周的开始日期
        startTime = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
        //获得本周的结束日期
        endTime = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
      } else if (value == 2) {
        this.title = "本月";
        startTime = new Date(nowYear, nowMonth, 1);
        endTime = new Date(
          nowYear,
          nowMonth,
          this.getMonthDays(nowYear, nowMonth)
        );
      } else if (value == 3) {
        this.title = "本季度";
        startTime = new Date(nowYear, this.getQuarterStartMonth(nowMonth), 1);
        var quarterEndMonth = this.getQuarterStartMonth() + 2;
        endTime = new Date(
          nowYear,
          quarterEndMonth,
          this.getMonthDays(nowYear, quarterEndMonth)
        );
      } else {
        startTime = new Date("1900-01-01");
        endTime = new Date("2100-01-01");
      }

      this.startTime = dayjs(new Date(startTime)).format("YYYY-MM-DD");
      this.endTime = dayjs(new Date(endTime)).format("YYYY-MM-DD");
      this.pageIndex = 0;
      this.orderList = [];
      this.getDeliveryList();
      console.log(this.startTime, this.endTime);
    },
    //获得本季度的开始月份
    getQuarterStartMonth(nowMonth) {
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
    // 获取每个月的天数
    getMonthDays(nowYear, month) {
      var monthStartDate = new Date(nowYear, month, 1);
      var monthEndDate = new Date(nowYear, month + 1, 1);
      return (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    },
    getMinDate() {
      var currentTime = new Date(); //当前日期
      var currenDay = currentTime.getDate(); //当前日
      var currenMonth = currentTime.getMonth(); //当前月
      var currenYear = currentTime.getFullYear(); //当前年
      return new Date(currenYear - 2, currenMonth, 1);
    },
    confirmDate(date) {
      this.showCalendar = false;
      this.startTime = dayjs(new Date(date[0])).format("YYYY-MM-DD");
      this.endTime = dayjs(new Date(date[1])).format("YYYY-MM-DD");
      this.pageIndex = 0;
      this.orderList = [];
      this.getDeliveryList();
      console.log(this.startTime, this.endTime);
    },
    selectFreeTime() {
      this.title = "自定义";
      this.showIcon = true
      this.showCalendar = true;
      this.defaultTimeFrame = ''
    }
  }
};
</script>

<style lang="less" scoped>
.warning {
  height: 100%;
  background-color: @bgColor_gray;
  .select {
    padding-top: 12px;
  }
  .total_number {
    padding: 12px 18px;
  }
  .goods_list {
    background-color: #fff;
  }
}
.order_item {
  font-size: 13px;
  border-bottom: 1px solid @borderColor_gray;
  .up {
    padding: 12px 0 12px 18px;
    .name {
      flex: 0.88;
    }
  }
  .down {
    padding: 0px 8px 6px 18px;
  }
}
.icon_color {
  color: #1989fa;
}
// 逾期 到期 临近 的基本样式
.status_icon {
  height: 24px;
  border-radius: 22px 0px 0px 22px;
  padding: 0 6px 0 10px;
  line-height: 24px;
}
// 临近的类名
.near {
  color: rgba(96, 98, 102, 1);
  border: 1px solid #999;
  border-right: none;
}
// 到期的类名
.expire {
  color: rgba(96, 98, 102, 1);
  border: 1px solid rgba(255, 104, 0, 1);
  border-right: none;
}
// 逾期的类名
.expect {
  color: #fff;
  background-color: rgba(255, 104, 0, 1);
}
.settled {
  color: #fff;
  background-color: rgba(96, 98, 102, 1);
}
</style>