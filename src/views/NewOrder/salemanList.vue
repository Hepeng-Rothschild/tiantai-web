<template>
  <div>
    <my-search v-model="searchValue" placeholder="请输入业务员名称"></my-search>

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

    <!-- 新增按钮 -->
    <!-- <div @click="$router.push('/newly')" class="my_button">
      <span>+</span>
    </div> -->
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
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 50px;
  right: 30px;
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
