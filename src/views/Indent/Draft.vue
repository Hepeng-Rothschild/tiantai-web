<template>
  <div class="draft">
    <van-list
      v-model="loading"
      :finished="finished"
      :offset="200"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(draft,i) in allDraft" :key="i">
        <div class="date">{{allDraft[i][0].VoucherDate}}</div>
        <van-cell
          v-for="(item,index) in draft"
          :key="index"
          :title="item.Customer.AA_Person_name?item.Customer.AA_Person_name:'未填写'"
          :label="item.code"
          is-link
          @click="toEdit(item)"
        >
          <div>￥{{item.totalPrice?item.totalPrice:'未填写'}}</div>
          <div>
            <van-tag>草稿</van-tag>
          </div>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      pageSize: 10,
      pageSkip: 0,
      allDraft: []
    };
  },
  mounted() {},
  methods: {
    onLoad() {
      this.getOrderDraft();
    },
    async getOrderDraft() {
      const Parse = this.$Parse;
      var OrderDraft = Parse.Object.extend("OrderDraft");
      var query = new Parse.Query(OrderDraft);
      query.limit(this.pageSize);
      query.skip(this.pageSkip);
      const data = await query.find();
      let allDraft = JSON.parse(JSON.stringify(data));
      console.log(allDraft)
      allDraft.forEach(item => {
        item.totalPrice = 0;
        item.SaleOrderDetails.forEach(goods => {
          item.totalPrice += goods.OrigTaxAmount;
        });
      });
      let duration = allDraft.map(item => item.VoucherDate); //存放时间段的数组
      let newDuration = Array.from(new Set(duration)) // 对 存放时间字符串的数组 进行去重
        .sort()
        .reverse();
      allDraft = newDuration.map(duration =>
        allDraft.filter(draft => draft.VoucherDate == duration)
      );
      this.allDraft.push(...allDraft);
      this.loading = false;
      if (allDraft.length) {
        this.pageSkip += 10;
        //为了配合搜索框 finished = false 会继续触发 onLoad 事件
        this.finished = false;
      }
      if (!allDraft.length || allDraft.length < this.pageSize) {
        this.finished = true;
      }
    },
    toEdit(item) {
      
      this.$store.commit("saveDraft", item);
      this.$router.push('/editdraft')
    }
  }
};
</script>

<style lang="less" scoped>
.draft {
  height: 100%;
  background-color: rgba(248, 248, 248, 1);
  .date {
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    padding-left: 14px;
    color: rgba(144, 147, 153, 1);
  }
  .van-cell {
    color: rgba(144, 147, 153, 1);
    font-size: 17px;
  }
  .van-cell__label {
    font-size: 13px;
  }
}
</style>

