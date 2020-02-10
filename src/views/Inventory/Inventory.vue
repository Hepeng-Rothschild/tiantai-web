<template>
  <div class="inventory">
    <div class="my_search">
      <my-search v-model="searchValue"
                 placeholder="请输入商品名称"
                 class="search" />
    </div>
    <!-- list -->
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              :offset="100">
      <div class="cell"
           v-for="(item,index) in inventory"
           :key="index"
           @click="goToDtail(item)">
        <div class="text">
          <div class="text_title">{{item.name}}</div>
          <div class="text_txt">
            <span>型号 {{item.specification}}</span>
            <span>库存 {{item.currentStock.baseQuantity?item.currentStock.baseQuantity:'无'}} {{item.currentStock.unit}}</span>
          </div>
        </div>
        <div class="arrow">
          <img src="../../assets/arrow.png"
               alt />
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import MySearch from "../../components/Search.vue";
import { setItem, getItem } from "../../utils/Storage.js";
import { debounce } from "loadsh";

export default {
  data () {
    return {
      searchValue: null,
      shopName: null,
      inventory: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10
    };
  },
  components: {
    MySearch: MySearch
  },
  beforeRouteLeave (to, from, next) {
    from.meta.keepAlive = false;
    next();
  },
  watch: {
    searchValue: debounce(async function (newValue, oldValue) {
      this.pageIndex = 1;
      this.inventory = [];
      this.getData();
    }, 500)
  },
  methods: {
    onLoad () {
      this.getData();
    },
    goToDtail (item) {
      this.$router.push({ name: "detailinfo" });
      setItem("inventory", item);
    },
    async getData () {
      const { data } = await this.$Parse.Cloud.run("getInventory", {
        inventoryName: this.searchValue,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      });
      this.inventory.push(...data);
      this.loading = false;
      if (data.length) {
        this.pageIndex++;
        this.finished = false;
      }
      if (!data.length || data.length < this.pageSize) {
        this.finished = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.inventory {
  .my_search {
    padding: 10px;
    background-color: rgba(248, 248, 248, 1);
  }
  .cell {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    border-bottom: 1px solid #c0c4cc;

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