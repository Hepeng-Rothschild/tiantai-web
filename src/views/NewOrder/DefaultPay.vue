<template>
  <div>
    <van-radio-group v-model="params.radio">
      <van-radio name="全额订金">全额订金</van-radio>
      <van-radio name="全额现结">全额现结</van-radio>
      <van-radio name="限期收款">限期收款</van-radio>
      <div class="decimal">
        <div class="right-input"><span class="icon">*</span><span class="title">销货/开票后x天内进行收款</span><input type="text"
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
        <div class="right-input"><span class="icon">*</span><span>每x个月为一个账期</span><input type="text"
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
.van-radio-group {
  margin-top: 13px;
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
      -webkit-appearance: none;
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
        -webkit-appearance: none;
      }
      .date-input {
        font-size: 17px;
        display: flex;
        border: 1px solid #c0c4cc;
        input {
          width: 100px;
          border: 0px;
          -webkit-appearance: none;
        }
        .van-icon {
          -webkit-align-self: center;
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
