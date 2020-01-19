<template>
  <div>
    <!-- 搜索栏 -->
    <my-search v-model="searchValue"
               placeholder="输入客户名称进行查找"></my-search>
    <!-- 下拉菜单 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="dateIndex"
                         :options="dateStatus"
                         @change="changeDate">
      </van-dropdown-item>
      <van-popup v-model="overlay_show"
                 position="bottom">
        <div class="date_title">
          <div class="box1"></div>
        </div>
        <div class="dete_middle">
          <div @click="isActiveTrue">
            <div class="span">开始日期</div>
            <!-- <span></span> -->
            <div class="date_change"
                 :class="isActive1?'border':''">{{this.startDate}}</div>
          </div>
          <div @click="isActiveFalse">
            <div class="span">结束日期</div>
            <!-- <span></span> -->
            <div class="date_change"
                 :class="isActive2?'border':''">{{this.endDate}}</div>
          </div>
        </div>
        <van-datetime-picker v-model="currentDate2"
                             type="date"
                             :item-height=44
                             :formatter="formatter"
                             @confirm="confirmPicker2"
                             @cancel="overlay_show = false">
        </van-datetime-picker>
      </van-popup>
      <van-dropdown-item v-model="orderIndex"
                         :options="orderStatus"
                         @change="changeState" />
    </van-dropdown-menu>
    <!-- 筛选列表 -->
    <van-list v-model="loading"
              :finished="finished"
              @load="onLoad">
      <span class="date">{{formatday(allIndent.SA_SaleOrder_deliveryDate)}}</span>
      <van-cell v-for="(indent,index) in allIndent"
                :key="index"
                :title="indent.AA_Partner_name"
                :label="indent.SA_SaleOrder_code"
                is-link
                @click="toDetails(indent)"
                :class="[isActive?'draft':'']">
        <!-- class="draft" -->
        ￥{{indent.SA_SaleOrder_taxAmount}}
        <div>
          <van-tag type="primary" v-if="indent.SA_SaleOrder_voucherState == 190">草稿</van-tag>
          <van-tag type="primary" v-else>{{indent.SA_SaleOrder_voucherState == 181 ? '未审':'已审'}}</van-tag>
        </div>
      </van-cell>
    </van-list>
    <!-- 添加订单按钮 -->
    <div @click="$router.push('/neworder')"
         class="my_button">
      <span>+</span>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { setItem } from "../../utils/Storage.js";
import MySearch from "../../components/Search.vue";
import { debounce } from "loadsh";

export default {
  name: "IndentIndex",
  components: {
    MySearch: MySearch
  },
  data () {
    return {
      isActive: false,
      isActive1: false,
      isActive2: false,
      startDate: '请选择',
      endDate: '请选择',
      overlay_show: false,
      // 列表加载
      loading: false,
      // 全部加载完成
      finished: false,
      // 日期
      currentDate: new Date(),
      currentDate2: new Date(),
      searchValue: null,
      // 下拉框信息
      dateIndex: 1,
      dateStatus: [
        { text: '近7天', value: 0 },
        { text: '本月', value: 1 },
        { text: '上月', value: 2 },
        { text: '本季度', value: 3 },
        { text: '本年', value: 4 },
        { text: '自定义', value: 5 }
      ],
      orderIndex: null,
      orderStatus: [
        { text: "全部", value: null },
        { text: "未审", value: 181 },
        { text: "已审", value: 189 }
      ],
      // 所有订单
      allIndent: [],
      // 开始时间
      startTime: null,
      // 结束时间
      endTime: null,
      // 当前状态
      state: null,
      pageSize: 10,
      pageIndex: 0,
      name: null
    };
  },
  created () {
    this.initDate();
  },
  watch: {
    searchValue: debounce(async function (newVal) {
      this.pageIndex = 0;
      this.allIndent = [];
      this.name = this.searchValue;
      await this.getData();
    }, 500)
  },
  methods: {
    onLoad () {
      this.getData();
    },
    isActiveTrue () {
      this.isActive1 = true
      this.isActive2 = false
      this.startDate = null
    },
    isActiveFalse () {
      this.isActive2 = true
      this.isActive1 = false
      this.endDate = null
    },
    // 跳转到详情页面
    toDetails (indent) {
      this.$router.push({ name: "details" });
      setItem("allIndent", indent);
    },
    // 初始化日期
    initDate () {
      const nowMonth = new Date().setDate(1);
      this.startTime = dayjs(new Date(nowMonth)).format("YYYY-MM-DD");
      this.endTime = dayjs(new Date()).format("YYYY-MM-DD");
      this.getData();
    },
    // 调取订单查询接口
    async getData () {
      const { data } = await this.$Parse.Cloud.run("getOrder", {
        pageSize: this.pageSize,
        pageIndex: this.pageIndex,
        startTime: this.startTime,
        endTime: this.endTime,
        name: this.name,
        state: this.state
      });
      // console.log(this.allIndent);
      let stateNum = this.allIndent
      for (let i = 0; i < stateNum.length; i++) {
        let draftNum = stateNum[i]
       // 判断是否是草稿状态值，并进行样式动态更换
        if (draftNum.SA_SaleOrder_voucherState === 190){
          this.isActive = true
          return
        }
      }
      this.allIndent.push(...data[0]);
      this.loading = false;
      if (data[0].length) {
        this.pageIndex++;
        //为了配合搜索框 finished = false 会继续触发 onLoad 事件
        this.finished = false;
      }
      if (!data[0].length || data[0].length < this.pageSize) {
        this.finished = true;
      }
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
      return currentYearFirstDate;
    },
    // 改变时间进行筛选
    async changeDate (orderDate) {
      // 近7天
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
        default:
          this.overlay_show = true;
          break;
      }
      this.startTime = dayjs(startTimeTmp).format("YYYY-MM-DD");
      this.endTime = dayjs(endTimeTmp).format("YYYY-MM-DD");
      this.pageIndex = 0;
      this.allIndent = [];
      await this.getData();
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value;
    },
    formatday (time) {
      let day = dayjs(time).format("YYYY-MM-DD");
      return day
    },
    async confirmPicker2 (value) {
      if (!this.startDate) {
        this.startDate = dayjs(value).format("YYYY-MM-DD");
        return
      }
      if (!this.endDate) {
        this.endDate = dayjs(value).format("YYYY-MM-DD");
        return
      }
      if (this.startDate && this.endDate && this.startDate != '请选择' && this.endDate != '请选择') {
        this.overlay_show = false
        this.startTime = this.startDate
        this.endTime = this.endDate
        this.pageIndex = 0
        this.allIndent = []
        await this.getData()
      } else {
        this.$toast.fail("日期填写不完整");
      }
    },
    // 改变订单状态值进行筛选
    async changeState (orderState) {
      this.state = orderState;
      this.pageIndex = 0;
      this.allIndent = [];
      await this.getData();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  margin: 13px 10px 10px 10px;
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
  // 此处为动态绑定class时，草稿（cell）需要绑定的样式
  .draft {
    border-bottom: 1px solid #c0c4cc;
    .van-cell__title {
      color: rgba(144, 147, 153, 1);
      font-size: 17px;
      text-align: left;
    }
    .van-cell__value {
      color: rgba(144, 147, 153, 1);
      font-size: 17px;
      text-align: right;
      .van-tag {
        border-radius: 4px;
        color: #606266;
        background-color: #c0c4cc;
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
    position: relative;
    display: flex;
    padding: 10px 20px 10px 20px;
    justify-content: space-between;
    .box1 {
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
    /deep/ .van-hairline--top-bottom {
      /deep/ .van-picker__cancel {
        position: absolute;
        top: -90px;
        left: 0;
      }
      /deep/ .van-picker__confirm {
        position: absolute;
        top: -90px;
        right: 0;
      }
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
  }
}
</style>
