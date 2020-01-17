<template>
  <div>
    <my-search v-model="searchValue" placeholder="输入客户名称进行查找"></my-search>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="100"
      @load="onLoad"
    >
      <van-cell-group v-for="item in saleMan" :key="item.id" @click="selectSaleMan(item)">
        <van-cell :title="item.name" is-link />
      </van-cell-group>
    </van-list>

    <!-- 新增客户按钮 -->
    <van-button round type="default" class="add" @click="$router.push('/newly')">+</van-button>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";
import { debounce } from 'loadsh'

export default {
  components: {
    MySearch: MySearch
  },
  data() {
    return {
      searchValue: null,
      saleMan: [],
      loading: false,
      finished: false,
      pageIndex: 0,
      pageSize: 10
    };
  },
  watch: {
     searchValue: debounce(async function(newValue, oldValue) {
      this.pageIndex = 0;
      this.saleMan = [];
      this.getSaleMan();
    },500)
  },
  methods: {
    onLoad() {
      this.getSaleMan();
    },
    // getSaleMan 获取业务员
    async getSaleMan() {
      
      const { data } = await this.$Parse.Cloud.run("getSaleMan", {
        name: this.searchValue,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.saleMan.push(...data[0]);
      this.loading = false;
      if (data[0].length) {
        this.pageIndex++;
        //为了配合搜索框 finished = false 会继续触发 onLoad 事件
        this.finished = false
      } 
      if (!data[0].length ||data[0].length<this.pageSize) {
        this.finished = true;
      }
    },
    selectSaleMan(saleMan) {
      this.$router.back();
      this.$store.commit("saveSelectedSaleMan", saleMan);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  padding: 10px;
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
