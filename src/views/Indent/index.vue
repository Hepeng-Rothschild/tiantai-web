<template>
  <div>
    <!-- 搜索栏 -->
    <my-search v-model="searchValue"
               placeholder="输入客户、编号进行查找"></my-search>

    <!-- 下拉菜单 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="dateIndex"
                         :options="dateStatus"
                         @change="changeDate(dateIndex)" />
      <van-dropdown-item v-model="orderIndex"
                         :options="orderStatus"
                         @change="changeState(orderIndex)" />
    </van-dropdown-menu>
    <!-- 筛选列表 -->
    <van-list>
      <span class="date">{{this.indentDate}}</span>
      <van-cell v-for="indent in allIndent"
                :key="indent.id"
                :title="indent.title"
                :label="indent.label"
                is-link
                to="/details"
                :class="draft?'draft':''">
        {{indent.value}}
        <div>
          <van-tag type="primary">{{statusList[indent.state]}}</van-tag>
        </div>
      </van-cell>
      <span class="date">{{this.indentDate}}</span>
    </van-list>
    <!-- 添加订单按钮 -->
    <van-button round
                type="default"
                class="add"
                @click="$router.push('/neworder')">+</van-button>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue"
export default {
  name: 'IndentIndex',
  components: {
    MySearch: MySearch
  },
  data () {
    return {
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
        { text: '自定义', value: 5 }
      ],
      orderIndex: 'g',
      statusList: ['未审',
        '生效',
        '中止',
        '未执行',
        '执行中',
        '执行完',],
      orderStatus: [
        { text: '订单状态', value: 'g' },
        { text: '未审', value: 'a' },
        { text: '生效', value: 'b' },
        { text: '中止', value: 'c' },
        { text: '未执行', value: 'd' },
        { text: '执行中', value: 'e' },
        { text: '执行完', value: 'f' }
      ],
      // 所有订单
      allIndent: [
        { title: 'xxx公司', label: '6251521', id: 1, value: '$255455', date: '2019-12-28', state: 1 },
        { title: 'xxx公司', label: '6251521', id: 2, value: '$255455', date: '2019-12-28', state: 0 },
        { title: 'xxx公司', label: '6251521', id: 3, value: '$255455', date: '2019-12-28', state: 2 },
        { title: 'xxx公司', label: '6251521', id: 4, value: '$255455', date: '2019-12-28', state: 3 },
        { title: 'xxx公司', label: '6251521', id: 4, value: '$255455', date: '2019-12-28', state: 0 },
        { title: 'xxx公司', label: '6251521', id: 4, value: '$255455', date: '2019-12-27', state: 4 }
      ],
      // 订单日期
      indentDate: '2019-12-22'
    }
  },
  methods: {
    changeState (value) {
      console.log('111')
    },
    changeDate (value) {
      console.log('222');

    }
  }
}
</script>

<style lang="less" scoped>
.search {
  margin: 59px 10px 10px 10px;
  width: 94%;
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
