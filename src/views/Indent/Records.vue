<template>
  <div>
    <div class="plan">

      <div class="order-record"
           v-for="(record,index) in records"
           :key="index">
        <div class="left">
          <div class="line-top">
          </div>
          <div class="line-ball">
          </div>
          <div class="line-bottom">
          </div>
        </div>
        <div class="right">
          <van-cell :title="record.title"
                    :label="record.label"
                    :value="record.value">
          </van-cell>
        </div>

      </div>

    </div>  
    </div>
</template>

<script>
export default {
  data () {
    return {
      active: 1,
      // 订单详情
      records: [
        { title: '修改订货单', value: '11-09 18:23', label: '销售A', key: 0 },
        { title: '被否决', value: '11-09 18:23', label: '经理   原因：价格过低', key: 1 },
        { title: '创建订货单', value: '11-09 18:23', label: '销售A', key: 2 }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang = "less" scoped>
.plan {
  margin-top: 59px;
  position: relative;
  .order-record {
    display: flex;
    height: 60px;
    box-sizing: content-box;
    border-top: 1px solid #c0c4cc;
    &:last-child{
      border-bottom: 1px solid #c0c4cc;
    }

    .left {
      width: 37px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .line-top {
        width: 1px;
        height: 10px;
        background: #c0c4cc;
      }
      .line-ball {
        width: 10px;
        height: 10px;
        border-radius: 10px;
        background: #c0c4cc;
      }
      .line-bottom {
        width: 1px;
        height: 40px;
        background: #c0c4cc;
      }
    }
    .right {
      flex:1;
      .van-cell {
        padding-bottom: 0px;
        padding-left: 0px;
      }
      
    }
  }
  /* .left {

    position: absolute;
    left: 18px;
    width: 1px;
    height: 60px;
    border: 1px solid #c0c4cc;
    .ball {
      position: fixed;
      left: 13px;
      display: block;
      width: 10px;
      height: 10px;
      line-height: 20px;
      background-color: rgba(153, 153, 153, 1);
      border-radius: 50%;
      text-align: center;
    }
  } */
  /* .right {
    border-bottom: 1px solid #c0c4cc;
    .van-cell {
      width: 93%;
      margin-left: 20px;
    }
  } */
}
</style>
