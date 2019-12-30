<template>
  <div class="inventory">
    <my-search v-model="searchValue" placeholder="请输入商品名称" class="search" />
    <div class="list">
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
    </div>
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
      inventory: null
    };
  },
  components: {
    MySearch: MySearch
  },
  watch: {
    searchValue(newValue, oldValue) {
      this.getData(newValue);
    }
  },
  created() {
    this.getData();
    console.log(this.searchValue);
  },
  methods: {
    goToDtail(item) {
      this.$router.push({ name: "detailinfo" });
      setItem("inventory", item);
    },
    async getData(inventoryName) {
      var _this = this;
      const { data } = await this.$Parse.Cloud.run("getStock", {
        inventoryName,
        pageSize: 10,
        pageIndex: 1
      });
      this.inventory = data;
      console.log("库存查询", data);
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
  .list {
    .cell {
      display: flex;
      justify-content: space-between;
      padding: 10px 5px;

      .text {
        width: 220px;
        .text_title {
          color: rgba(16, 16, 16, 1);
          font-size: 18px;
          height: 34px;
        }
        .text_txt {
          color: rgba(153, 153, 153, 1);
          font-size: 14px;
          display: flex;
          justify-content: space-between;
        }
      }

      .arrow {
        img {
          width: 14px;
          height: 13px;
          padding-top: 23px;
        }
      }
    }
  }
}
</style>