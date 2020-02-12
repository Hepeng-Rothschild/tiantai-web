<template>
  <div>
    <my-search v-model="searchValue" placeholder="请输入用户名称"></my-search>
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="200"
      @load="onLoad"
    >
      <van-cell-group
        v-for="(partner,index) in partner"
        :key="index"
        @click="selectPartner(partner)"
      ></van-cell-group>
    </van-list> -->
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";
import { setItem, getItem } from "../../utils/Storage.js";
import { mapState } from "vuex";
import { debounce } from "loadsh";

export default {
  components: {
    MySearch: MySearch
  },
  data() {
    return {
      searchValue: null,
      userList: [],
      loading: false,
      finished: false
    };
  },
  watch: {
    searchValue: debounce(async function(newValue, oldValue) {
    }, 500)
  },
  methods: {
    onLoad() {
      this.getStaff();
    },
    async getStaff() {
      // const Parse = this.$Parse;
      // let OrderDraft = Parse.Object.extend('表名');
      // let query = new Parse.Query(OrderDraft);
      // query.limit(this.pageSize);
      // query.skip(this.pageSkip);
      // query.descending("VoucherDate");
      // query.contains("Name", this.searchValue);
      // const data = await query.find();
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  padding: 10px;
  background-color: rgba(248, 248, 248, 1);
  border-bottom: 1px solid #c0c4cc;
}
.van-cell {
  border-bottom: 1px solid #c0c4cc;
  color: #000000;
  font-size: 17px;
  align-items: center;
}
</style>
