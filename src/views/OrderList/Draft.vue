<template>
  <div class="draft">
    <!-- 搜索栏 -->
    <div class="my_search">
      <my-search v-model="searchValue" placeholder="请输入客户名称"></my-search>
    </div>
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
          :title="item.Customer.AA_Partner_name?item.Customer.AA_Partner_name:'未填写'"
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
import MySearch from "../../components/Search.vue";
import { debounce } from "loadsh";
export default {
  data() {
    return {
      searchValue: "",
      loading: false,
      finished: false,
      pageSize: 10,
      pageSkip: 0,
      allDraft: [],
      draft: []
    };
  },
  components: {
    MySearch: MySearch
  },
  watch: {
    searchValue: debounce(async function(newVal) {
      this.pageSkip = 0;
      this.allDraft = [];
      this.getOrderDraft();
    }, 500)
  },
  methods: {
    onLoad() {
      this.getOrderDraft();
    },
    async getOrderDraft() {
      const Parse = this.$Parse;
      let OrderDraft = Parse.Object.extend("OrderDraft");
      let query = new Parse.Query(OrderDraft);
      query.limit(this.pageSize);
      query.skip(this.pageSkip);
      query.descending("VoucherDate");
      query.contains("Name", this.searchValue);
      const data = await query.find();
      let draft = JSON.parse(JSON.stringify(data));
      console.log(draft);
      this.draft.push(...draft);
      this.draft.forEach(item => {
        item.totalPrice = 0;
        item.SaleOrderDetails.forEach(goods => {
          item.totalPrice += goods.OrigTaxAmount;
        });
      });
      let duration = this.draft.map(item => item.VoucherDate); //存放时间段的数组
      let newDuration = Array.from(new Set(duration)) // 对 存放时间字符串的数组 进行去重
        .sort()
        .reverse();
      this.allDraft = newDuration.map(duration =>
        this.draft.filter(draft => draft.VoucherDate == duration)
      );
      // this.allDraft.push(...allDraft);
      this.loading = false;
      if (draft.length) {
        this.pageSkip += 10;
        //为了配合搜索框 finished = false 会继续触发 onLoad 事件
        this.finished = false;
      }
      if (!draft.length) {
        this.finished = true;
      }
    },
    toEdit(item) {
      this.$store.commit("saveDraft", item);
      this.$store.commit("saveTotalPrice", item.totalPrice);
      this.$router.push("/editdraft");
    }
  }
};
</script>

<style lang="less" scoped>
.draft {
  height: 100%;
  background-color: rgba(248, 248, 248, 1);
  .my_search {
    padding: 13px 10px 10px 10px;
    background-color: #fff;
  }
  .van-list {
    border-top: 1px solid #c0c4cc;
  }
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
  .van-icon {
    line-height: 52px;
  }
}
</style>

