<template>
  <div class="choose">
    <div class="header">
      <!-- 搜索栏 -->
      <my-search v-model="searchValue"></my-search>
    </div>
    <!-- 交易历史记录 -->
    <!-- <div class="title">{{}}的历史购买</div>
    <div class="history">
      <div v-for="(item,index) in 3" :key="index" class="cell">
        <div>
          <div class="fontSize_18">19D</div>
          <div class="fontSize_14">滑石粉</div>
        </div>
        <div class="fontSize_14 align_self_end">现存量 847.00</div>
        <van-icon
          name="add-o"
          color="#0071f0"
          size="0.8rem"
          class="align_self_center"
          @click="showPopup()"
        />
    </div>-->
    <!-- </div> -->
    <!-- 所有存货 -->
    <div class="title">所有存货</div>
    <div class="all">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :offset="200"
      >
        <div v-for="(item,index) in inventory" :key="index" class="cell">
          <div>
            <div class="fontSize_18">{{item?item.code:''}}</div>
            <div class="fontSize_14">{{item?item.name:''}}</div>
          </div>
          <div class="fontSize_14 align_self_end">现存量 {{item?Number(item.ExistingQuantity).toFixed(2):''}}</div>
          <van-icon
            name="add-o"
            color="#0071f0"
            size="0.8rem"
            class="align_self_center"
            @click="showPopup(item)"
          />
        </div>
      </van-list>
    </div>
    <!-- 底部按钮 -->
    <div class="fixed">
      <div class="footer">
        <div class="left">
          <div>已选0种</div>
          <div>￥0.00</div>
        </div>
        <div class="right">
          <van-button type="info">完成</van-button>
        </div>
      </div>
    </div>
    <!-- 单位选择底部弹窗 -->
    <van-popup v-model="showSelect" position="bottom" :style="{ height: '30%' }">
      <van-picker
        show-toolbar
        title="标题"
        :columns="columns"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 弹出框 -->
    <van-popup
      v-model="show"
      closeable
      close-on-popstate
      :overlay="false"
      :style="{ width:'85%' }"
      class="pop"
    >
      <div class="name">
        <span>{{popData?popData.code:''}}</span>
        <span class="padding_left">{{popData?popData.name:''}}</span>
      </div>
      <div class="border_top">
        <van-field v-model="popValue.number" label="数量" input-align="right" placeholder="请输入" />
      </div>
      <div class="border_top">
        <van-cell title="单位" is-link :value="popValue.unity" @click="showSelect=true" />
      </div>
      <div class="pop_cell border_top">
        <span>含税单价</span>
        <span class="gray">￥2.00</span>
      </div>
      <div class="pop_cell border_top">
        <span>税率</span>
        <span class="gray">{{popData?popData.rate:'0.0'}}%</span>
      </div>
      <div class="pop_cell border_top">
        <span>本币金额</span>
        <span class="gray">￥0.00</span>
      </div>
      <div class="pop_cell border_top">
        <span>含税金额</span>
        <span class="gray">￥0.00</span>
      </div>
      <div class="border_top">
        <button class="button">删除</button>
        <button class="button">确定</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";

export default {
  components: {
    MySearch: MySearch
  },
  data() {
    return {
      searchValue: null,
      // 中间弹框绑定的数据
      popValue: {
        number: null,
        unity: "T"
      },
      showSelect: false, // 底部弹框显示隐藏
      columns: ["T", "KG", "个", "袋"],
      show: false, // 中间弹框显示隐藏
      inventory: null,
      inventoryName: null,
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      finished: false,
      popData:null,
    };
  },

  methods: {
    onLoad() {
      this.getGoods();
    },
    async getGoods() {
      var _this = this;
      const { data } = await this.$Parse.Cloud.run("getInventory", {
        inventoryName: _this.inventoryName,
        pageSize: _this.pageSize,
        pageIndex: _this.pageIndex
      });
      let listData = this.inventory || [];
      for (let i = 0; i < data.length; i++) {
        listData.push(data[i]);
      }
      this.inventory = listData;
      console.log(this.inventory)
      this.loading = false;
      if (data.length) {
        this.pageIndex++;
      } else {
        this.finished = true;
      }
    },
    // 显示弹窗
    showPopup(item) {
      console.log(item);
      this.popData = item
      this.show = true;
    },
    // 选择单位的 确认 和 取消
    onConfirm(value, index) {
      console.log(value, index);
      this.showSelect = false;
      this.popValue.unity = value;
    },
    onCancel() {
      this.showSelect = false;
    }
  }
};
</script>

<style lang="less" scoped>
.choose {
  height: 100%;
  .header {
    padding: 50px 10px 12px 10px;
  }
}
.title {
  color: rgba(144, 147, 153, 1);
  font-size: 14px;
  height: 27px;
  line-height: 27px;
  padding: 0 16px;
  background-color: rgba(244, 244, 244, 1);
}
.history {
  margin-left: 16px;
  .cell {
    display: flex;
    justify-content: space-between;
    padding: 11px 16px 11px 0;
    border-bottom: 1px solid rgba(144, 147, 153, 1);
    &:last-child {
      border-bottom: 0;
    }
  }
}
.all {
  margin-left: 16px;
  .cell {
    display: flex;
    justify-content: space-between;
    padding: 11px 16px 11px 0;
    border-bottom: 1px solid rgba(144, 147, 153, 1);
  }
}
.fontSize_18 {
  height: 30px;
  color: rgba(16, 16, 16, 1);
  font-size: 18px;
}
.fontSize_14 {
  color: rgba(144, 147, 153, 1);
  font-size: 14px;
}
.align_self_end {
  align-self: flex-end;
}
.align_self_center {
  align-self: center;
}

.fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  padding-bottom: 10px;
  .footer {
    display: flex;
    justify-content: space-between;
    border-top: 1.3px solid rgba(229, 229, 229, 1);
    .left {
      padding: 7px 0 0 12px;
      color: rgba(16, 16, 16, 1);
      font-size: 16px;
    }
  }
}
.van-button {
  width: 104px;
  height: 52px;
  font-size: 18px;
  border-radius: 5px 5px 5px 5px;
  background-color: rgba(1, 113, 240, 1);
}

.pop {
  border: 1px solid rgba(187, 187, 187, 1);
  color: rgba(0, 0, 0, 1);
  font-size: 17px;
  box-sizing: border-box;
  .name {
    padding: 15px;
  }
  .gray {
    color: #969799;
  }
  .padding_left {
    padding-left: 8px;
  }
  /deep/ .van-field__control {
    color: #969799;
  }
  .pop_cell {
    display: flex;
    justify-content: space-between;
    padding: 9px 13px;
  }
  .border_top {
    border-top: 1px solid rgba(229, 229, 229, 1);
  }
  .van-cell {
    padding: 9px 13px;
    color: rgba(0, 0, 0, 1);
    font-size: 17px;
  }
  .button {
    border: none;
    width: 50%;
    cursor: pointer;
    background-color: #fff;
    padding: 12px 13px 17px 13px;
    &:first-child {
      border-right: 1px solid rgba(229, 229, 229, 1);
    }
  }
}
</style>
