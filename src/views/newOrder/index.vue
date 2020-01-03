<template>
  <div>
    <van-cell-group>
      <!-- 第一行 和 第一个日期控件 -->
      <van-cell title="单据日期*" :value="date_1" is-link @click="show_1 = true"></van-cell>
      <van-overlay :show="show_1">
        <!-- 日期控件 -->
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="confirmPicker1"
          @cancel="show_1=false"
        />
      </van-overlay>
      <!-- 第二行 和 第二个日期控件-->
      <van-cell title="预计交货日期*" :value="date_2" is-link @click="show_2=true"></van-cell>
      <van-overlay :show="show_2">
        <!-- 日期控件 -->
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          @confirm="confirmPicker2"
          @cancel="show_2=false"
        />
      </van-overlay>
      <!-- 选择客户 -->
      <van-cell title="客户*" is-link class="spacing" to="/select">{{ selectPartner()}}</van-cell>
      <!-- 选择业务员 -->
      <van-cell title="业务员" :value="salesmanName" is-link class="spacing" @click="popupShow = true"></van-cell>
      <van-popup v-model="popupShow" position="bottom" :style="{ height: '40%' }">
        <div
          v-for="saleMan in saleMan"
          :key="saleMan.id"
          @click="changeName(saleMan.name)"
        >{{saleMan.name}}</div>
      </van-popup>

      <van-cell title="选择商品" value="请选择" is-link class="spacing" to="/choose"></van-cell>
      <div class="spacing-two">
        <van-cell title="币种" :value="coinsName" is-link @click="popupShowCoin = true"></van-cell>
        <van-popup v-model="popupShowCoin" position="bottom" :style="{ height: '30%' }">
          <div v-for="coin in coins" :key="coin.id" @click="changeCoin(coin.name)">{{coin.name}}</div>
        </van-popup>
        <van-cell title="汇率">
          <van-field
            v-model="value.rate"
            placeholder="请输入"
            input-align="right"
            style="border:0px;"
          />
        </van-cell>
      </div>

      <div class="spacing-two">
        <van-cell title="发货要求">
          <van-field
            v-model="value.send"
            placeholder="请输入"
            input-align="right"
            style="border:0px;"
          />
        </van-cell>
        <van-cell title="送货要求">
          <van-field
            v-model="value.delivery"
            placeholder="请输入"
            input-align="right"
            style="border:0px;"
          />
        </van-cell>
      </div>

      <div class="remark">
        <div class="remark-name">备注</div>
        <van-field v-model="value.remark" placeholder="添加备注" style="border:0px;" />
      </div>
    </van-cell-group>

    <div class="buttonBox">
      <van-button plain type="primary">存入草稿</van-button>
      <van-button type="info">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
import { getItem, setItem } from "../../utils/Storage.js";
export default {
  data() {
    return {
      coinsName: "请选择",
      salesmanName: "请选择",
      // 币种
      coins: [
        { id: 1, name: "人民币" },
        { id: 2, name: "美元" },
        { id: 3, name: "英镑" }
      ],
      // 控制单元格内的输入框
      value: {
        rate: "",
        send: "",
        delivery: "",
        remark: ""
      },
      popupShowCoin: false,
      // 控制弹出层显示隐藏
      popupShow: false,
      // 日期
      currentDate: new Date(),
      // 单据日期遮罩层
      show_1: false,
      show_2: false,
      // 开始时间默认值
      date_1: "请选择",
      // 结束时间默认值
      date_2: "请选择",
      saleMan: []
    };
  },
  // watch: {
  //   user(newValue, oldValue) {
  //     console.log("user变化了", newValue, oldValue);
  //     this.$store.dispatch("getSaleMan");
  //     console.log("---saleMan", this.saleMan, "---user", this.user);
  //   }
  // },
  // computed: {
  //   ...mapState(["saleMan", "user"]) // 业务员
  // },
  mounted() {
    this.getSaleMan()
  },
  methods: {
    changeCoin(coinNew) {
      this.coinsName = coinNew;
      this.popupShowCoin = false;
    },
    changeName(name) {
      this.salesmanName = name;
      console.log(name);
      this.popupShow = false;
    },
    changeDate(dateNew) {
      this.datePicker = dateNew;
    },
    // getSaleMan 获取业务员
    async getSaleMan() {
        const {data}  = await this.$Parse.Cloud.run("getSaleMan");
        this.saleMan = data[0]
        console.log('业务员',data[0])
    },
    confirmPicker1(value) {
      this.show_1 = false;
      this.date_1 = dayjs(value).format("YYYY-MM-DD");
    },
    confirmPicker2(value) {
      this.show_2 = false;
      this.date_2 = dayjs(value).format("YYYY-MM-DD");
    },
    selectPartner() {
      return (
        (getItem("singlePartner") && getItem("singlePartner").Name) ||
        "请选择客户"
      );
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell-group {
  margin-top: 59px;
  border-top: 1px solid #c0c4cc;
  margin-bottom: 16px;
  // 底部弹框样式
  .van-popup {
    div {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 17px;
      color: rgba(16, 16, 16, 1);
    }
  }
  .van-cell {
    padding: 10px 15px 10px 15px;
    border-bottom: 1px solid #c0c4cc;
    font-size: 17px;

    // 单元格内输入框样式
    .van-field {
      padding: 0px;
      padding-right: 20px;
    }
    .van-cell__title {
      color: rgba(0, 0, 0, 1);
    }
    .van-cell__value {
      color: #888888;
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
    margin: 17px 0px;
    border-top: 1px solid #c0c4cc;
  }
  .spacing-two {
    border-top: 1px solid #c0c4cc;
    margin-bottom: 17px;
  }
  .remark {
    border-bottom: 1px solid #c0c4cc;
    .remark-name {
      margin-left: 16px;
      font-size: 17px;
    }
  }
}
// 底部两个按钮
.buttonBox {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
  .van-button--primary {
    color: #0071f0;
    width: 45%;
    border-radius: 5px;
    border: 1px solid rgba(0, 113, 240, 1);
  }
  .van-button--info {
    width: 45%;
    border-radius: 5px;
    background-color: rgba(1, 113, 240, 1);
    border: 1px solid rgba(5, 5, 5, 0.08);
  }
}
</style>
