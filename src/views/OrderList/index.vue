<template>
  <van-list>
    <!-- 搜索栏 -->
    <div class="my_search">
      <my-search v-model="searchValue" placeholder="输入客户名称"></my-search>
    </div>
    <van-dropdown-menu>
      <van-dropdown-item
        v-model="dateIndex"
        :options="dateStatus"
        @change="changeDate"
        ref="item"
        :title="titleitem"
      >
        <van-cell
          title="自定义"
          @click="onConfirm"
          :class="titleitem != null ?'dropMyself_true':'dropMyself'"
        >
          <van-icon name="success" v-if="titleitem != null" />
        </van-cell>
      </van-dropdown-item>
      <van-popup v-model="overlayShow" position="bottom">
        <div class="date_title">
          <div class="box1"></div>
        </div>
        <div class="dete_middle">
          <div @click="isActiveTrue">
            <div class="span">开始日期</div>
            <div class="date_change" :class="isActive1?'border':''">{{this.startDate}}</div>
          </div>
          <div @click="isActiveFalse">
            <div class="span">结束日期</div>
            <div class="date_change" :class="isActive2?'border':''">{{this.endDate}}</div>
          </div>
        </div>
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :item-height="44"
          :formatter="formatter"
          @confirm="confirmPicker2"
          @cancel="overlayShow = false"
        ></van-datetime-picker>
      </van-popup>
      <van-dropdown-item v-model="orderIndex" :options="orderStatus" @change="changeState" />
    </van-dropdown-menu>
    <!-- 筛选列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="(indent,i) in orderList" :key="i">
        <div class="date">{{formatDate(orderList[i][0].madedate)}}</div>
        <van-cell
          v-for="(item,index) in orderList[i]"
          :key="index"
          :title="item.name"
          :label="item.code"
          is-link
          @click="toDetails(item.id)"
        >
          ￥{{item.taxAmount.toFixed(2)}}
          <div>
            <van-tag type="primary">{{item.voucherState == 181 ? '未审':'已审'}}</van-tag>
          </div>
        </van-cell>
      </div>
    </van-list>
    <!-- 添加订单按钮 -->
    <div @click="selectEnter = true" class="my_button">
      <span>+</span>
    </div>
    <van-action-sheet
      v-model="selectEnter"
      :actions="actions"
      cancel-text="取消"
      @cancel="selectEnter = false"
      @select="onSelect"
    />
  </van-list>
</template>

<script>
import dayjs from "dayjs";
import MySearch from "../../components/Search.vue";
import { debounce } from "loadsh";

export default {
  name: "indentIndex",
  components: {
    MySearch: MySearch
  },
  data() {
    return {
      titleitem: null,
      actions: [{ name: "继续编辑草稿" }, { name: "新增销售订单" }],
      // 动态绑定自定义开始日期得样式
      isActive1: false,
      // 动态绑定自定义结束日期的样式
      isActive2: false,
      startDate: dayjs(new Date()).format("YYYY/MM/DD"), // 自定义开始日期
      endDate: dayjs(new Date()).format("YYYY/MM/DD"), // 自定义结束日期
      overlayShow: false, //   开关遮罩层
      selectEnter: false,
      // 列表加载
      loading: false,
      // 全部加载完成
      finished: false,
      // 日期
      currentDate: new Date(),
      searchValue: null,
      // 下拉框信息
      dateIndex: 1,
      dateStatus: [
        { text: "近7天", value: 0 },
        { text: "本月", value: 1 },
        { text: "上月", value: 2 },
        { text: "本季度", value: 3 },
        { text: "本年", value: 4 }
      ],
      orderIndex: null,
      orderStatus: [
        { text: "全部", value: null },
        { text: "未审", value: 181 },
        { text: "已审", value: 189 }
      ],
      order: [],
      // 所有订单
      orderList: [],
      // 开始时间
      startTime: null,
      // 结束时间
      endTime: null,
      // 订单状态
      state: null,
      pageSize: 10,
      pageIndex: 0,
      scrollY: 0
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log(to, from);
    if (to.name == "details") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next();
  },
  watch: {
    searchValue: debounce(async function(newVal) {
      this.pageIndex = 0;
      this.order = [];
      await this.getData();
    }, 500)
  },
  created() {
    this.initDate();
  },
  activated() {
    //进入时读取位置
    document.body.scrollTop = this.scrollY;
    document.documentElement.scrollTop = this.scrollY;
    // alert('111')
  },
  deactivated() {
    this.scrollY = document.body.scrollTop;
    // alert('222')
  },
  methods: {
    onConfirm() {
      this.$refs.item.toggle();
      this.overlayShow = true;
      this.titleitem = "自定义";
      this.dateIndex = null;
    },
    async onLoad() {
      await this.getData();
    },
    onSelect (index) {
      this.selectEnter = false
       // 点击完草稿后，去新增订单页面，此时显示的是刚才那个草稿的信息
      this.$store.commit("clearStore");
      setTimeout(()=> {
      if (index.name === '继续编辑草稿') {
        this.$router.push('/draft')
        return
      }
      if (index === 1) {
        this.$router.push("/neworder");
      }
      },40)
      
    },
    // 开关自定义开始时间
    isActiveTrue() {
      this.isActive1 = true;
      this.isActive2 = false;
      this.startDate = null;
    },
    // 开关自定义结束时间
    isActiveFalse() {
      this.isActive2 = true;
      this.isActive1 = false;
      this.endDate = null;
    },
    // 跳转到详情页面
    toDetails(id) {
      this.$router.push({ path: "/details", query: { id } });
    },
    // 初始化日期
    initDate() {
      const nowMonth = new Date().setDate(1);
      this.startTime = dayjs(new Date(nowMonth)).format("YYYY-MM-DD");
      this.endTime = dayjs(new Date()).format("YYYY-MM-DD");
    },
    // 调取订单查询接口
    async getData() {
      const { data } = await this.$Parse.Cloud.run("getOrder", {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        startTime: this.startTime,
        endTime: this.endTime,
        name: this.searchValue,
        state: this.state
      });
      let orderList = JSON.parse(JSON.stringify(data));
      // console.log(orderList,'===')
      this.order.push(...orderList);
      let duration = this.order.map(item => item.madedate); //存放时间段的数组
      let newDuration = Array.from(new Set(duration)) // 对 存放时间字符串的数组 进行去重
        .sort()
        .reverse();
      this.orderList = newDuration.map(duration =>
        this.order.filter(indent => indent.madedate == duration)
      );
      this.loading = false;
      if (orderList.length) {
        this.pageIndex++;
        //为了配合搜索框 finished = false 会继续触发 onLoad 事件
        this.finished = false;
      }
      if (!orderList.length) {
        this.finished = true;
      }
    },
    // 获取本季度开端月份
    getQuarterStartMonth() {
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
    getCurrentYear() {
      //获取当前时间
      let currentDate = new Date();
      //获得当前年份4位年
      let currentYear = currentDate.getFullYear();
      //本年第一天
      let currentYearFirstDate = new Date(currentYear, 0, 1);
      return currentYearFirstDate;
    },
    // 改变时间进行筛选
    async changeDate(orderDate) {
      this.titleitem = null;
      let startTimeTmp = new Date();
      let endTimeTmp = new Date();
      switch (orderDate) {
        case 0:
          startTimeTmp = new Date(
            new Date().getTime() - 7 * 24 * 60 * 60 * 1000
          );
          break;
        case 1:
          startTimeTmp = new Date(new Date().setDate(1));
          break;
        case 2:
          startTimeTmp = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            1
          );
          const day = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            0
          ).getDate();
          endTimeTmp = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            day
          );
          break;
        case 3:
          startTimeTmp = new Date(
            new Date().getFullYear(),
            this.getQuarterStartMonth(),
            1
          );
          break;
        case 4:
          startTimeTmp = this.getCurrentYear();
          break;
      }
      this.startTime = dayjs(startTimeTmp).format("YYYY-MM-DD");
      this.endTime = dayjs(endTimeTmp).format("YYYY-MM-DD");
      this.pageIndex = 0;
      this.order = [];
      await this.getData();
    },
    // 自定义时间的年月日文字
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    formatDate(time) {
      let day = dayjs(time).format("YYYY-MM-DD");
      return day;
    },
    // 自定义时间的确定转换
    async confirmPicker2(value) {
      if (!this.startDate) {
        this.startDate = dayjs(value).format("YYYY/MM/DD");
        return;
      }
      if (!this.endDate) {
        this.endDate = dayjs(value).format("YYYY/MM/DD");
        return;
      }
      if (this.startDate <= this.endDate) {
        //    this.startDate &&
        // this.endDate &&
        // this.startDate != null &&
        // this.endDate != null &&
        this.overlayShow = false;
        this.startTime = this.startDate;
        this.endTime = this.endDate;
        this.pageIndex = 0;
        this.order = [];
        await this.getData();
      } else {
        this.$toast.fail("结束日期不得早于开始日期");
      }
    },
    // 改变订单状态值进行筛选
    async changeState(orderState) {
      this.state = orderState;
      this.pageIndex = 0;
      this.order = [];
      await this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.my_search {
  padding: 13px 10px 10px 10px;
  background-color: rgba(248, 248, 248, 1);
}
.dropMyself_true {
  .van-cell__title span {
    font-size: 14px;
    color: #1989fa;
  }
  .van-cell__value i {
    font-size: 14px;
    color: #1989fa;
  }
}
.dropMyself {
  .van-cell__title span {
    font-size: 14px;
  }
  .van-cell__value i {
    font-size: 14px;
    color: #1989fa;
  }
}
.van-list {
  .date {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    padding-left: 14px;
    color: rgba(144, 147, 153, 1);
    background-color: rgba(248, 248, 248, 1);
  }
  // 设置常规状态下单元格内容样式
  .van-cell--clickable:nth-of-type(1) {
    border-top: 1px solid #c0c4cc;
  }
  // 常规状态下单元格的样式
  .van-cell {
    border-bottom: 1px solid #c0c4cc;
    .van-cell__title {
      color: #000000;
      font-size: 17px;
      text-align: left;
    }
    .van-cell__value {
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
      text-align: right;
      .van-tag {
        border-radius: 4px;
        color: #388ded;
        background-color: rgba(230, 247, 255, 1);
        text-align: center;
      }
    }
    .van-icon {
      align-self: center;
    }
  }
}

// 自定义日期的遮罩层弹出，，，日期格式的样式
.van-popup {
  .date_title {
    display: flex;
    padding: 10px 20px 10px 20px;
    justify-content: space-between;
    .box1 {
      position: relative;
      width: 100%;
      height: 20px;
    }
  }
  .dete_middle {
    display: flex;
    justify-content: space-between;
    padding: 0px 40px 0px 40px;
    div {
      .span {
        text-align: center;
        font-size: 15px;
        color: #606266;
      }

      .date_change {
        height: 25px;
        text-align: center;
        font-size: 17px;
        color: #000000;
      }
    }
  }
  .border {
    border-bottom: 1px solid #388ded;
  }
  /deep/ .van-picker {
    .van-hairline--top-bottom {
      position: absolute;
      top: -90px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.my_button {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  right: 20px;
  width: 57px;
  height: 57px;
  box-shadow: 0px 3px 10px -2px rgba(170, 170, 170, 1);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  span {
    color: rgba(1, 113, 240, 1);
    font-size: 42px;
    height: 57px;
    line-height: 57px;
  }
}
</style>
