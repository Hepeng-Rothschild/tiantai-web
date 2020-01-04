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
        <van-cell :title="item.name" :label="item.id" is-link />
      </van-cell-group>
    </van-list>

    <!-- 新增客户按钮 -->
    <van-button round type="default" class="add" @click="$router.push('/newly')">+</van-button>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";
import { setItem, getItem } from "../../utils/Storage.js";
export default {
  components: {
    MySearch: MySearch
  },
  data() {
    return {
      searchValue: null,
      saleMan: null,
      loading: false,
      finished: false,
      pageIndex: 0,
      pageSize: 10
    };
  },
  watch: {
    searchValue(newValue, oldValue) {
      this.finished = false;
      this.pageIndex = 0;
      this.saleMan = [];
      this.getSaleMan();
    }
  },
  methods: {
    onLoad() {
      this.getSaleMan();
    },
    // getSaleMan 获取业务员
    async getSaleMan() {
      var _this = this;
      const { data } = await this.$Parse.Cloud.run("getSaleMan", {
        name: _this.searchValue,
        pageIndex: _this.pageIndex,
        pageSize: _this.pageSize
      });
      // console.log("业务员", data[0]);
      let listData = this.saleMan || [];
      for (let i = 0; i < data[0].length; i++) {
        listData.push(data[0][i]);
      }
      this.saleMan = listData;
      console.log("saleMan", this.saleMan);
      console.log(this.pageIndex)
      this.loading = false;
      if (data[0].length) {
        this.pageIndex++;
      } else {
        this.finished = true;
      }
    },
    selectSaleMan(saleMan) {
      this.$router.push({ name: "neworder" });
      setItem("selectSaleMan", saleMan);
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
