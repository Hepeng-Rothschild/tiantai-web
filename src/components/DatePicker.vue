
<template>
  <div class="calendar">
    <!-- 选择日历的弹出层 -->
    <div class="model_mask"
         v-show="showtimemask"
         @click="showmask1()">
    </div>
    <div class="bouncedBox"
         v-show="showtimemask">
      <div class="bottombtn">
        <div class="cancle-btn"
             @click.stop='cancle()'>
          取消
        </div>
        <div class="sure-btn"
             @click.stop='firm()'>
          确定
        </div>
      </div>
      <div class="mobile-top">
        <div class="sel-time">
          <p>开始时间</p>
          <p class="start-date">{{starttime.substring(0,4)+'-'+starttime.substring(4,6)+'-'+starttime.substring(6,8)}}
          </p>
        </div>
        <div class="unsel-time">
          <p>结束时间</p>
          <p class="end-date">
            {{endtime==''?'请选择结束日期':endtime.substring(0,4)+'-'+endtime.substring(4,6)+'-'+endtime.substring(6,8)}}</p>
        </div>
      </div>

      <div class="title">
        <div class="btn"
             @click.stop="last()">上月</div>
        <!-- :class="(month<=nowmonth)&&(Year<=nowYear)?'noclick':'' " -->
        <div class="text">{{Year}}年{{month}}月</div>
        <div class="btn"
             @click.stop="next()"
             :class="(month===nowmonth)&&(Year===nowYear)?'noclick':'' ">下月</div>
      </div>

      <div class="head">
        <div class="days"
             v-for="(item,index) in ['日','一','二','三','四','五','六']"
             :key="index">
          {{item}}
        </div>
      </div>

      <div class="wrap">
        <div class="span"
             v-for="(item,index) in calendarList"
             :key="index"
             @click.stop="click(item.count)"
             :class="item==''?'kong'
      :item.count>nowtime?'noclick'
      :(item.count>=starttime&&item.count<=endtime)||item.count==starttime?'active':''">
          {{item.value}}
        </div>
      </div>

    </div>
  </div>
</template>
 
<script>
export default {
  name: "Calendar",
  data () {
    return {
      showtimemask: false,
      Puton_time: '', //投放日期  默认今日 展示
      Puton_Start: '',  //为了保存投放开始结束的日期  用来点击取消按钮时初始化选中的值
      Puton_End: '',
      nowtime: '', //当前日期的时间-----20190203格式  用于比较
      clickitem: '', //保存每次点击的时间-----20190203格式  用于比较
      clickcount: 0, //点击次数-------判断开始时间还是结束时间
      starttime: '', //开始时间  数字   默认当天日期
      endtime: '', //结束时间  数字   默认当天日期
      Year: new Date().getFullYear(), //日历上的年份   ----动态改变的
      month: new Date().getMonth() + 1, //日历上的月份 ----  动态改变的
      Day: new Date().getDate(), //日历上的天份         ----- 动态改变的

      nowYear: new Date().getFullYear(),
      nowmonth: new Date().getMonth() + 1,
      nowDay: new Date().getDate(),
      calendarList: [],
    };
  },

  created () {
    //关于日历的操作开始
    this.Draw(this.nowYear, this.nowmonth);

    let time_month = this.nowmonth; //现在的月份
    let time_day = this.nowDay; //现在的天数
    if (this.nowmonth < 10) {
      time_month = 0 + '' + this.nowmonth;
    }
    if (this.nowDay < 10) {
      time_day = 0 + '' + this.nowDay;
    }

    this.nowtime = this.nowYear + '' + time_month + '' + time_day;
    this.starttime = this.nowtime;
    this.endtime = this.nowtime;

    this.Puton_time = this.starttime.substring(0, 4) + '-' + this.starttime.substring(4, 6) + '-' + this.starttime
      .substring(6, 8) + '至今';

    this.Puton_Start = this.nowtime,
      this.Puton_End = this.nowtime,


      this.$emit('str', this.Puton_time)

    //关于日历的操作结束
  },
  mounted () {

  },
  methods: {
    showmask1 () {
      if (this.showtimemask == true) {
        // this.showtimemask=false;   //隐藏弹框
        this.cancle();
      } else {
        this.showtimemask = true;  //显示弹框
      }
    },

    Draw: function (Year, Month) {
      //日期列表
      var calendar = [];

      //用当月第一天在一周中的日期值作为当月离第一天的天数(获取当月第一天是周几)
      for (var i = 1, firstDay = new Date(Year, Month - 1, 1).getDay(); i <= firstDay; i++) {
        calendar.push("");
      }

      //用当月最后一天在一个月中的日期值作为当月的天数
      for (var i = 1, monthDay = new Date(Year, Month, 0).getDate(); i <= monthDay; i++) {

        let time_month = Month;
        let time_day = i;
        if (Month < 10) {
          time_month = 0 + '' + Month;
        }
        if (i < 10) {
          time_day = 0 + '' + i;
        }

        calendar.push({
          value: i,
          count: Year + '' + time_month + '' + time_day
        })
      }
      this.calendarList = calendar;
      console.log(calendar)
    },

    last () {
      this.month--;
      if (this.month == 0) {
        this.month = 12;
        this.Year--;
      }

      this.Draw(this.Year, this.month);
    },

    next () {
      this.month++;
      if (this.month == 13) {
        this.month = 1;
        this.Year++;
      }

      this.Draw(this.Year, this.month);
    },

    click (item) {
      this.clickcount++;
      this.clickitem = item;
      //开始日期
      if (this.clickcount % 2 == 1) {
        this.starttime = this.clickitem;
        this.endtime = ''
      } else {
        this.endtime = this.clickitem;
        if (this.starttime > this.endtime) {
          this.endtime = this.starttime;
          this.starttime = this.clickitem;
        }
      }
    },

    firm () {
      this.showtimemask = false;
      //当选择的开始时间与结束时间相同时   显示为2019-07-19当天
      if (this.starttime == this.endtime) {
        this.Puton_Start = this.starttime,
          this.Puton_End = this.endtime,

          this.Puton_time = this.starttime.substring(0, 4) + '-' + this.starttime.substring(4, 6) + '-' + this.starttime
            .substring(6, 8) + '当天';

        this.$emit('str', this.Puton_time);

        //否则显示xxx 至   xxx
      } else {

        this.Puton_Start = this.starttime,
          this.Puton_End = this.endtime,
          this.Puton_time =
          this.starttime.substring(0, 4) + '-' + this.starttime.substring(4, 6) + '-' + this.starttime.substring(6,
            8) +
          '至' + this.endtime.substring(0, 4) + '-' + this.endtime.substring(4, 6) + '-' + this.endtime.substring(6, 8);



        this.$emit('str', this.Puton_time)
      }

    },
    // 取消按钮
    cancle () {
      this.showtimemask = false;
      //当按取消按钮时   弹框中选中的区域等于上一次选中的区域
      this.starttime = this.Puton_Start;
      this.endtime = this.Puton_End;
      // this.Puton_time = this.starttime.substring(0, 4) + '-' + this.starttime.substring(4, 6) + '-' + this.starttime
      //   .substring(6, 8) + '至今';

      //   this.$emit('str',this.Puton_time)
    }
  }
};

</script>
 
<style scoped lang="less">
// 日历的样式
.model_mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}

.bouncedBox {
  position: fixed;
  background: #fff;
  bottom: 0;
  left: 0;
  right: 0;

  //开始结束日期的显示
  .mobile-top {
    display: flex;
    flex-wrap: nowrap;
    background: #fff;
    font-size: 15px;
    .sel-time {
      text-align: center;
      width: 50%;
      // border-bottom: solid 2px #2a81e8;
      .start-date {
        color: #b1b1b1;
        margin-top: 1.6px;
        color: #037ef5;
      }
    }

    .unsel-time {
      text-align: center;
      width: 50%;
      .end-date {
        color: #b1b1b1;
        margin-top: 1.6px;
        color: #037ef5;
      }
    }
  }

  // 左右选择月份  显示当前年月
  .title {
    width: 100%;
    height: 40px;
    background-color: #60a7e8;
    display: flex;
    flex-wrap: nowrap;
    text-align: center;
    color: #fff;
    font-weight: bold;
    line-height: 40px;

    .btn {
      // width: 40px;
      flex: 1;
      &.noclick {
        pointer-events: none;
        background: #ccc;
        // color: #b1b1b1;
      }
    }

    .text {
      font-size: 17px;
      background: #ccc;
      color: black;
      flex: 3;
    }
  }

  //表头  周1到周天的显示
  .head {
    display: flex;
    flex-wrap: nowrap;
    text-align: center;
    height: 40px;
    line-height: 40px;

    .days {
      flex: 1;
    }
  }

  //日历表区域
  .wrap {
    width: 100%;
    height: auto;
    overflow: hidden;
    padding-bottom: 5px;
    font-size: 15px;

    .span {
      width: 35px;
      height: 35px;
      line-height: 35px;
      background: #fff;
      color: black;
      float: left;
      text-align: center;
      &.active {
        background: #037ef5;
        color: #fff;
        border-radius: 5px;
      }

      &.noclick {
        pointer-events: none;
        background: #fff;
        color: #b1b1b1;
      }

      &.kong {
        background: #fff;
        pointer-events: none;
      }
    }
  }

  //底部按钮区域
  .bottombtn {
    // height: 40px;
    // width: 100%;
    // line-height: 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    font-size: 15px;
    padding: 10px;
    .sure-btn {
      // background: #037ef5;
      color: #037ef5;
    }
  }
}
</style>
