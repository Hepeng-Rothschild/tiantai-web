<template>
  <div>
    <div class="content">
      <van-row>
        <van-col span="10">
          <ul>
            <li>单据编号</li>
            <li>客户</li>
            <li>业务员</li>
            <li>预计交货时间</li>
          </ul>

        </van-col>
        <van-col span="11">
          <ul>
            <li>{{contents.number}}</li>
            <li>{{contents.client}}</li>
            <li>{{contents.sales}}</li>
            <li>{{contents.predict}}</li>
          </ul>
        </van-col>
      </van-row>
      <van-cell title="待审核"
                is-link
                to="records"
                value="状态记录" />
      <van-row>
        <van-col span="10">
          <ul>
            <li>联系人</li>
            <li>电话</li>
            <li>送货地址</li>
          </ul>

        </van-col>
        <van-col span="11">
          <ul>
            <li>{{contents.number}}</li>
            <li>{{contents.phone}}</li>
            <li>{{contents.address}}</li>
          </ul>
        </van-col>
      </van-row>
    </div>
    <van-panel v-model="revise">
      <span>{{revise.title}}</span>
      <van-row>
        <van-col span="4">
          <ul>
            <li>名称</li>
            <li>数量</li>
          </ul>

        </van-col>
        <van-col span="7">
          <ul>
            <li>{{contents.number}}</li>
            <li>{{contents.phone}}</li>
          </ul>
        </van-col>
        <van-col span="6">
          <ul>
            <li>含税单价</li>
            <li>含税金额</li>
          </ul>

        </van-col>
        <van-col span="7">
          <ul>
            <li>￥{{contents.number}}</li>
            <li>￥{{contents.phone}}</li>
          </ul>

        </van-col>
      </van-row>
      <van-cell title="本币金额"
                value="内容" />
      <van-cell title="含税金额"
                value="内容"
                class="bottom" />
      <van-row>
        <van-col span="10">
          <ul>
            <li>币种</li>
            <li>汇率</li>
          </ul>
        </van-col>
        <van-col span="11">
          <ul>
            <li>{{contents.number}}</li>
            <li>{{contents.phone}}</li>
          </ul>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="10">
          <ul>
            <li>送货要求</li>
            <li>备注</li>
          </ul>

        </van-col>
        <van-col span="11">
          <ul>
            <li>{{contents.number}}</li>
            <li>{{contents.phone}}</li>
          </ul>
        </van-col>
      </van-row>
    </van-panel>
    <div class="menu">
      <van-button type="info">修改订单</van-button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'detailsIndex',
  data () {
    return {
      // 订单详情信息
      contents:
        { number: 5255, client: 'xxx公司', sales: '张强', predict: '2019-12-12', phone: '154', address: 'xx省xx市' },
      // 订单修改信息
      revise: {
        title: '19D'
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
// 订单信息
.content {
  margin-top: 59px;
  width: 100%;
  border-bottom: 1px solid rgba(153, 153, 153, 1);
  .van-row .van-col li {
    list-style: none;
    margin-bottom: 12px;
  }
  .van-row .van-col--10 {
    margin-left: 16px;
    color: rgba(153, 153, 153, 1);
    font-size: 15px;
    text-align: left;
    font-family: "PingFangSC-regular";
  }
  .van-row .van-col--11 {
    color: #101010;
    font-size: 15px;
    text-align: left;
    font-family: "PingFangSC-regular";
  }
  .van-cell {
    padding: 0px;
    margin-bottom: 30px;
    .van-cell__title {
      margin-left: 16px;
      color: rgba(1, 113, 240, 1);
      font-size: 15px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
    .van-cell__value {
      color: rgba(153, 153, 153, 1);
      font-size: 15px;
      text-align: right;
      font-family: "PingFangSC-regular";
    }
  }
}
// 订单价格
.van-panel {
  border-bottom: 1px solid rgba(153, 153, 153, 1);
  .van-panel__content {
    margin-left: 16px;
    margin-bottom: 16px;
    span {
      color: rgba(16, 16, 16, 1);
      font-size: 17px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
    .van-row {
      // margin-top: 16px;
      padding: 14px 0px 16px 0px;
      .van-col--10 {
        color: rgba(153, 153, 153, 1);
        font-size: 15px;
        text-align: left;
        font-family: "PingFangSC-regular";
      }
      .van-col--11 {
        color: #101010;
        font-size: 15px;
        text-align: left;
        font-family: "PingFangSC-regular";
      }
      .van-col--4 {
        color: rgba(153, 153, 153, 1);
        font-size: 15px;
        text-align: left;
        font-family: "PingFangSC-regular";
      }
      .van-col--6 {
        color: rgba(153, 153, 153, 1);
        font-size: 15px;
        text-align: left;
        font-family: "PingFangSC-regular";
      }
      .van-col--5 {
        color: #101010;
        font-size: 15px;
        text-align: left;
        font-family: "PingFangSC-regular";
      }
      .van-col--7 {
        color: #101010;
        font-size: 15px;
        text-align: left;
        font-family: "PingFangSC-regular";
      }
    }
    .bottom {
      margin-bottom: 16px;
    }
    .van-cell {
      padding: 0px;
      .van-cell__title span {
        color: rgba(153, 153, 153, 1);
        font-size: 15px;
        text-align: left;
        font-family: "PingFangSC-regular";
      }
      .van-cell__value span {
        margin-right: 23px;
        color: #101010;
        font-size: 15px;
        text-align: left;
        font-family: "PingFangSC-regular";
      }
    }
  }
}
//修改按钮
.menu {
  padding: 34px 20px 53px 20px;
  .van-button {
    width: 100%;
    border-radius: 5px 5px 5px 5px;
    text-align: center;
  }
}
</style>

