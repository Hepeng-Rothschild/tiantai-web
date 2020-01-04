<template>
  <div class="inventory">
    <my-search v-model="searchValue" placeholder="请输入商品名称" class="search" />
    <!-- list -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="10"
    >
      <div class="cell" v-for="(item,index) in inventory" :key="index" @click="goToDtail(item)">
        <div class="text">
          <div class="text_title">{{item.InventoryName}}</div>
          <div class="text_txt">
            <span>批号 {{item.Specification}}</span>
            <span>库存 {{item.TotalCount}}{{item.UnitName}}</span>
          </div>
        </div>
        <div class="arrow">
          <img src="../../assets/arrow.png" alt />
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";
import { setItem, getItem } from "../../utils/Storage.js";
export default {
  data() {
    return {
      searchValue: null,
      shopName: null,
      inventory: null,
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  components: {
    MySearch: MySearch
  },
  watch: {
    searchValue(newValue, oldValue) {
      this.pageIndex = 1;
      this.getData(newValue);
    }
  },
  methods: {
    onLoad() {
      console.log(this.pageIndex);
      this.getData();
    },
    goToDtail(item) {
      this.$router.push({ name: "detailinfo" });
      setItem("inventory", item);
    },
    async getData(inventoryName) {
      var _this = this;
      const { data } = await this.$Parse.Cloud.run("getStock", {
        inventoryName,
        pageSize: _this.pageSize,
        pageIndex: _this.pageIndex
      });
      let listData = this.inventory || [];
      for (let i = 0; i < data.length; i++) {
        listData.push(data[i]);
      }
      this.inventory = listData;
      this.loading = false;
       if(data.length){
        this.pageIndex++;
      }else{
        this.finished = true;
      }
      console.log("库存查询", this.inventory);
    }
  }
};
</script>

<style lang="less" scoped>
.inventory {
  padding: 60px 10px 10px 10px;
  .search {
    margin-bottom: 15px;
  }
  .cell {
    display: flex;
    justify-content: space-between;
    padding: 10px 5px;

    .text {
      width: 220px;
      .text_title {
        color: rgba(16, 16, 16, 1);
        font-size: 18px;
        margin-bottom: 15px;
      }
      .text_txt {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
      }
    }

    .arrow {
      display: flex;
      align-items: center;
      img {
        width: 14px;
        height: 13px;
      }
    }
  }
}
</style>