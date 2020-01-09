<template>
  <div>
    <van-radio-group v-model="radio">
      <van-radio name="全额订金">全额订金</van-radio>
      <van-radio name="全额现结">全额现结</van-radio>
      <van-radio name="限期收款">限期收款</van-radio>
      <div class="decimal">
        <div class="right-input"><span class="icon">*</span><span class="title">销货/开票后x天内进行收款</span><input type="text"
                 v-model="params.date_0"
                 oninput="value=value.replace(/[^\d]/g,'')"></div>

      </div>
      <van-radio name="月结"><span>月结</span> </van-radio>
      <div class="decimal">
        <div class="right-input">
          <span>账期起始日期</span>
          <div class="date-input">
            <input type="text"
                   v-model="params.date_1"
                   oninput="value=value.replace(/[^\d]/g,'')">
            <van-icon name="clock"
                      @click="show_1 = true" />
          </div>
          <van-overlay :show="show_1">
            <!-- 日期控件 -->
            <van-datetime-picker v-model="currentDate"
                                 type="date"
                                 @confirm="confirmPicker1"
                                 @cancel="show_1=false" />
          </van-overlay>
        </div>
      </div>
      <div class="decimal">
        <div class="right-input"><span>每x个月为一个账期</span><input type="text"
                 v-model="params.date_2"
                 oninput="value=value.replace(/[^\d]/g,'')"></div>
      </div>
      <div class="decimal">
        <span>结算日期为对账后x个月的x日 </span>
      </div>
      <div class="decimal">
        <div class="right-input">
          <span>月： </span><input type="text"
                 v-model="params.date_3"
                 oninput="value=value.replace(/[^\d]/g,'')">
        </div>
      </div>
      <div class="decimal">
        <div class="right-input"> <span>日： </span><input type="text"
                 v-model="params.date_4"
                 oninput="value=value.replace(/[^\d]/g,'')">
        </div>
      </div>
      <van-radio name="其它">其它</van-radio>
    </van-radio-group>
    <div class="footer">
      <van-button type="info"
                  @click="selectPay()">保存</van-button>
    </div>
  </div>
</template>

<script>
import { setItem } from "../../utils/Storage.js";
import dayjs from "dayjs";

export default {
  data () {
    return {
      radio: '',
      show_1: false,
      currentDate: new Date(),
      params: {
        date_0: null,
        date_1: null,
        date_2: null,
        date_3: null,
        date_4: null
      }

    }
  },
  methods: {
    selectPay () {
      if (this.params.date_0) {
        this.$router.push({ name: "newly" });
        setItem("selectPay", this.radio);
        setItem("selectDate",this.params)
      } else {
        this.$toast('带*号为必填项')
      }

    },
    confirmPicker1 (value) {
      this.show_1 = false;
      this.params.date_1 = dayjs(value).format("YYYY-MM-DD");
    }
  }
}
</script>

<style lang = "less" scoped>
.van-radio-group {
  margin-top: 59px;
  border-bottom: 1px solid #c0c4cc;
  padding-left: 16px;
  padding-right: 16px;
  .van-radio {
    padding-bottom: 20px;
    /deep/ .van-radio__label {
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
      line-height: 0px;
      text-align: left;
    }
  }

  .decimal {
    display: flex;
    padding-bottom: 20px;
    font-size: 17px;
    .right-input {
      display: flex;
      margin-left: auto;
      .icon {
        color: red;
      }
      .title {
        display: inline-block;
        width: 150px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
      }
      input {
        width: 120px;
        border: 1px solid #c0c4cc;
      }
      .date-input {
        font-size: 17px;
        display: flex;
        border: 1px solid #c0c4cc;
        input {
          width: 100px;
          border: 0px;
        }
        .van-icon {
          padding-top: 2px;
        }
      }
    }
  }
  .van-overlay {
    .van-picker {
      width: 100%;
      position: fixed;
      bottom: 0;
    }
  }
}
.footer {
  position: relative;
  bottom: 0px;
  width: 100%;
  background-color: #fff;
  padding-top: 53px;
  padding-bottom: 53px;
  /* // 按钮样式 */
  /deep/ .van-button {
    left: 20px;
    width: 87%;

    border-radius: 5px 5px 5px 5px;
    text-align: center;
  }
}
</style>
