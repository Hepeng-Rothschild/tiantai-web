<template>
  <div>
    <van-notice-bar wrapable
                    :scrollable="false">
      由于接口限制，带*号必填项必须全部输入，才能提交成功。
    </van-notice-bar>
    <van-radio-group v-model="params.radio">
      <van-radio name="全额订金">全额订金</van-radio>
      <van-radio name="全额现结">全额现结</van-radio>
      <van-radio name="限期收款">限期收款</van-radio>
      <div class="decimal">
        <div class="right-input"><span class="icon">*</span><span class="title">销货x天内收款：</span><input type="text"
                 v-model="params.saleCreditDays"
                 oninput="value=value.replace(/[^\d]/g,'')"></div>
      </div>
      <van-radio name="月结"><span>月结</span> </van-radio>
      <div class="decimal">
        <div class="right-input">
          <span class="icon">*</span>
          <span>账单起始日：</span>
          <div class="date-input">
            <input type="text"
                   v-model="params.aleStartDate"
                   oninput="value=value.replace(/[^\d]/g,'')"
                   @click="show_1 = true">
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
        <div class="right-input"><span class="icon">*</span><span>每x个月为账期：</span><input type="text"
                 v-model="params.saleSpaceMonth"
                 oninput="value=value.replace(/[^\d]/g,'')"></div>
      </div>
      <div class="decimal">
        <span>结算日期为对账后x个月的x日 </span>
      </div>
      <div class="decimal">
        <div class="right-input">
          <span class="icon">*</span>
          <span>月： </span><input type="text"
                 v-model="params.saleCheckMonth"
                 oninput="value=value.replace(/[^\d]/g,'')">
        </div>
      </div>
      <div class="decimal">
        <div class="right-input"><span class="icon">*</span> <span>日： </span><input type="text"
                 v-model="params.saleCheckDate"
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
import { setItem, getItem } from "../../utils/Storage.js";
import dayjs from "dayjs";
import { mapState } from 'vuex'
export default {
  data () {
    return {
      show_1: false,
      currentDate: new Date(),
      params: this.$store.state.defaultPay || {
        radio: '',
        saleCreditDays: null,
        aleStartDate: null,
        saleSpaceMonth: null,
        saleCheckMonth: null,
        saleCheckDate: null
      }
    }
  },
  computed: {
    ...mapState(['defaultPay'])
  },
  watch: {
    params: {
      handler (newVal, oldVal) {
        this.$store.commit('savePay', this.params)
      },
      deep: true
    }
  },
  methods: {
    selectPay () {
      let params = this.params
      if (params.saleCreditDays &&
        params.aleStartDate &&
        params.saleSpaceMonth &&
        params.saleCheckMonth &&
        params.saleCheckDate) {
        this.$router.go(-1);
      } else {
        this.$toast.fail('带*号为必填项')
      }

    },
    confirmPicker1 (value) {
      this.show_1 = false;
      this.params.aleStartDate = dayjs(value).format("YYYY-MM-DD");
    }
  }
}
</script>

<style lang = "less" scoped>
.van-notice-bar {
  margin-top: 13px;
}
.van-radio-group {
  margin-top: 13px;
  border-bottom: 1px solid @borderColor_gray;
  padding-left: 16px;
  padding-right: 16px;
  .van-radio {
    padding-bottom: 20px;
    /deep/ .van-radio__label {
      color: @fontColor_black;
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
      -webkit-appearance: none;
      .icon {
        color: red;
      }
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: keep-all;
      }
      input {
        width: 120px;
        border: 1px solid @borderColor_gray;
        border-radius: 0px;
        appearance: none;
      }
      .date-input {
        font-size: 17px;
        display: flex;
        border: 1px solid @borderColor_gray;
        input {
          width: 100px;
          border: 0px;
          appearance: none;
        }
        .van-icon {
          align-self: center;
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
  padding: 25px 0;

  /deep/ .van-button {
    left: 20px;
    width: 87%;
    border-radius: 5px;
    text-align: center;
  }
}
</style>
