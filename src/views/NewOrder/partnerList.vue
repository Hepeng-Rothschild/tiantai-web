<template>
  <div>
    <my-search v-model="searchValue"
               placeholder="请输入客户名称"></my-search>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :offset="200"
              @load="onLoad">
      <van-cell-group v-for="(partner,index) in partner"
                      :key="index"
                      @click="selectPartner(partner)">
        <van-cell :title="partner.AA_Partner_name"
                  :label="'应收余额：￥'+partner.AA_Partner_Receive_aRBalance.toFixed(2)"
                  is-link />
      </van-cell-group>
    </van-list>
    <!-- 新增客户按钮 -->
    <div @click="$router.push('/partnerCreate')"
         class="my_button">
      <span>+</span>
    </div>
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
  data () {
    return {
      // 单元格label
      searchValue: null,
      partner: [],
      loading: false,
      finished: false,
      pageIndex: 0,
      pageSize: 10
    };
  },
  watch: {
    searchValue: debounce(async function (newValue, oldValue) {
      this.pageIndex = 0;
      this.partner = [];
      this.getPartner();
    }, 500)
  },
  methods: {
    onLoad () {
      this.getPartner();
    },
    // 获取客户
    async getPartner () {
      const { data } = await this.$Parse.Cloud.run("getPartner", {
        name: this.searchValue,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.partner.push(...data[0]);
      this.loading = false;
      if (data[0].length) {
        this.pageIndex++;
        //为了配合搜索框 finished = false 会继续触发 onLoad 事件
        this.finished = false
      }
      if (!data[0].length || data[0].length < this.pageSize) {
        this.finished = true;
      }
    },
    selectPartner (partner) {
      this.$router.back();
      this.$store.commit("saveSelectedPartner", partner);
      // 清除上一次选择的销售员数据
      this.$store.commit("saveSelectedSaleMan", null);
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
.add {
  position: fixed;
  width: 57px;
  height: 57px;
  right: 26px;
  bottom: 45px;
  padding: 0;
  border-radius: 50%;
  box-shadow: 0px 3px 10px -2px rgba(170, 170, 170, 1);
  .van-button__text {
    font-size: 40px;
    color: rgba(1, 113, 240, 1);
  }
}
.my_button {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  right: 20px;
  width: 57px;
  height: 57px;
  box-shadow: 0px 3px 10px -2px rgba(170, 170, 170, 1);
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);
  span {
    color: rgba(1, 113, 240, 1);
    font-size: 42px;
    height: 57px;
    line-height: 57px;
  }
}
</style>
