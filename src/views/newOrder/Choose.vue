<template>
  <div>
    <div class="header">
      <!-- 搜索栏 -->
      <my-search v-model="searchValue"></my-search>
      <!-- 交易历史记录 -->
      <span class="history">{{company.name}}的历史购买</span>
      <!-- 单元格大盒子 -->
      <van-cell-group v-for="(information,index) in informations"
                      :key="index">
        <van-cell :title="information.code"
                  :label="information.codeName">
          现存量 {{information.quantity}}
          <!-- 单元格+号图表 -->
          <van-icon slot="right-icon"
                    name="add-o"
                    @click="show = true" />
          <!-- 单元格弹框 -->
          <van-dialog v-model="show"
                      show-cancel-button
                      :overlay='false'
                      class="pop-up"
                      cancel-button-text="删除">
            <!-- 弹框 -->
            <van-cell-group>
              <van-cell :title="information.code"
                        class="van-cell-first">
                <van-icon slot="right-icon"
                          name="cross"
                          class="icon-corss"
                          @click="show = false" />
              </van-cell>
              <van-cell title="数量">
                <van-field v-model="value.number"
                           placeholder="请输入"
                           input-align="right"
                           style="border:0px;" />
              </van-cell>
              <van-cell title="单位"
                        :value="weightName"
                        is-link
                        @click="popupShow = true">
              </van-cell>
              <van-popup v-model="popupShow"
                         position="bottom"
                         :style="{ height: '30%' }">
                <div v-for="weight in weights"
                     :key="weight.id"
                     @click="changeWeight(weight.name)">{{weight.name}}</div>
              </van-popup>
              <van-cell title="含税单价">
                <van-field v-model="value.price"
                           placeholder="￥ 2.00"
                           input-align="right"
                           style="border:0px;" />
              </van-cell>
              <van-cell title="税率">
                <van-field v-model="value.rate"
                           placeholder="16%"
                           input-align="right"
                           style="border:0px;" />
              </van-cell>
              <van-cell title="本币金额">
                <van-field v-model="value.coin"
                           placeholder=""
                           input-align="right"
                           style="border:0px;" />
              </van-cell>
              <van-cell title="含税金额">
                <van-field v-model="value.inclusive"
                           placeholder=""
                           input-align="right"
                           style="border:0px;" />
              </van-cell>
            </van-cell-group>
          </van-dialog>
        </van-cell>
      </van-cell-group>
      <van-cell-group v-for="(remain,index) in remains"
                      :key="index"
                      title="所有存货">
        <van-cell :title="remain.code"
                  :label="remain.codeName">
          现存量 {{remain.quantity}}
          <van-icon slot="right-icon"
                    name="add-o"
                    @click="show = true" />
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 底部的确认按钮 -->
    <div class="footer">
      <div class="submit">
        <div class="left">
          <div>已选 {{chooseNum}} 种</div>
          <div>￥ {{money}}</div>
        </div>
        <div class="right">
          <van-button type="info">完成</van-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import MySearch from "../../components/Search.vue"

export default {
  components: {
    MySearch: MySearch
  },
  data () {
    return {
      weightName: '',
      // 重量
      weights: [{ id: 1, name: 'T' }, { id: 2, name: 'KG' }, { id: 3, name: 'G' }],
      // 控制弹出层显示隐藏
      popupShow: false,
      // 控制单元格内的输入框
      value:
        {
          number: '',
          price: '',
          rate: '',
          coin: '',
          inclusive: ''
        },
      // 控制弹框显示隐藏
      show: false,
      // 选择数量
      chooseNum: 45612,
      // 总计价格
      money: '22120.00',
      // 搜索内容
      searchValue: null,
      // 返回 到的公司名称
      company:
        { name: '山西xxxxx公司' },
      // 返回的历史购买商品信息
      informations: [
        { code: '19D', codeName: '滑石粉', quantity: '847.00' },
        { code: '12D', codeName: '滑石粉', quantity: '847.00' },
        { code: '11D', codeName: '滑石粉', quantity: '847.00' },
        { code: '12D', codeName: '滑石粉', quantity: '847.00' }
      ],
      // 存货信息
      remains: [
        { code: '19D', codeName: '滑石粉', quantity: '847.00' }
      ]
    }
  },
  methods: {
    changeWeight (weightNew) {
      this.weightName = weightNew
      this.popupShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  .search {
    margin: 59px 10px 10px 10px;
    width: 94%;
  }
  .history {
    margin-left: 16px;
    color: rgba(144, 147, 153, 1);
    font-size: 14px;
    text-align: left;
    font-family: "PingFangSC-regular";
  }
  .van-cell-group {
    .van-cell {
      border-bottom: 1px solid #c0c4cc;
      // 添加图标
      .van-icon {
        font-size: 24px;
        padding-top: 13px;
        color: rgba(111, 155, 232, 1);
        text-align: center;
      }
      .van-cell__value {
        padding-top: 23px;
        padding-right: 45px;
        text-align: left;
      }
    }
  }
}
.footer {
  margin-bottom: 95px;
  // 底部完成按钮
  .submit {
    position: fixed;
    bottom: 0px;
    width: 95%;
    height: 95px;
    padding-left: 16px;
    border-top: 1px solid #c0c4cc;
    display: flex;
    background-color: #fff;
    .left {
      flex: 1;
      div {
        font-size: 16px;
        color: rgba(16, 16, 16, 1);
        font-family: "PingFangSC-regular";
      }
    }
    .right {
      flex: 1;
      .van-button {
        float: right;
        width: 104px;
        height: 52px;
        line-height: 20px;
        background-color: #0171f0;
        border-radius: 5px 5px 5px 5px;
        text-align: center;
      }
    }
  }
}
// 弹框
.pop-up {
  width: 85%;
  border: 1px solid #c0c4cc;
  border-radius: 0px;
  // 设置单元格样式
  .van-dialog__content {
    .van-cell-group {
      .van-cell-first {
        padding-top: 18px;
        padding-bottom: 18px;
        .van-cell__title {
          font-size: 17px;
        }

        .icon-corss {
          padding: 0px;
          color: #909399;
        }
      }
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
        .van-cell__title {
          font-size: 17px;
        }
        .van-cell__value {
          padding: 0px;
          text-align: right;
          font-size: 17px;
          // 单元格内输入框样式
          .van-field {
            padding: 0px;
          }
        }
        .van-icon {
          padding: 0px;
          color: #909399;
          font-size: 18px;
        }
      }
    }
  }
  // 设置底部按钮边线
  .van-hairline--top {
    .van-dialog__cancel {
      border-right: 1px solid #c0c4cc;
    }
  }
}
</style>
