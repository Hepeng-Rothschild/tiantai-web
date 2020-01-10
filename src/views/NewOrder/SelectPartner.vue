<template>
  <div>
    <my-search v-model="searchValue" placeholder="输入客户名称进行查找"></my-search>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :offset="200" @load="onLoad">
      <van-cell-group
        v-for="(partner,index) in partner"
        :key="index"
        @click="selectPartner(partner)"
      >
        <van-cell
          :title="partner.AA_Partner_Contact"
          :label="Number(partner.AA_Partner_Pay_AdvPBalance).toFixed(2)"
          is-link
        />
      </van-cell-group>
    </van-list>
    <!-- 新增客户按钮 -->
    <van-button round type="default" class="add" @click="$router.push('/newly')">+</van-button>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";
import { setItem, getItem } from "../../utils/Storage.js";
import { mapState } from "vuex";
export default {
  components: {
    MySearch: MySearch
  },
  data() {
    return {
      searchValue: null,
      partner: null,
      loading: false,
      finished: false,
      pageIndex: 0,
      pageSize: 10
    };
  },
  watch: {
    async searchValue(newValue, oldValue) {
      this.finished = false
      this.pageIndex = 0;
      this.partner = [];
      this.getPartner();
    }
  },
  methods: {
    onLoad() {
      this.getPartner();
    },
    // 获取客户
    async getPartner() {
      var _this = this;
      const { data } = await this.$Parse.Cloud.run("getPartner", {
        name: _this.searchValue,
        pageIndex: _this.pageIndex,
        pageSize: _this.pageSize
      });
      console.log(data[0])
      let listData = this.partner || [];
      for (let i = 0; i < data[0].length; i++) {
        listData.push(data[0][i]);
      }
      this.partner = listData;

      this.loading = false;
     
      if(data[0].length){
        this.pageIndex++;
      }else{
        this.finished = true;
      }
      
    },
    selectPartner(partner) {
      this.$router.back();
      this.$store.commit('saveSelectedPartner',partner)
      // 清除上一次选择的销售员数据
      this.$store.commit('saveSelectedSaleMan',null)
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  padding: 59px 10px 10px 10px;
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
  height: 50px;
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
</style>
