<template>
  <div class="inventory">
    <div class="my_search">
      <my-search v-model="searchValue" placeholder="请输入商品名称或编码" class="search" />
    </div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="categoryNum" :options="categoryOptions" @change="changeCategory" />
    </van-dropdown-menu>
    <!-- list -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :offset="100"
    >
      <div
        class="cell flex light_color"
        v-for="(item,index) in inventory"
        :key="index"
        @click="goToDtail(item)"
      >
        <div class="fz14">
          <div class="fz16 dark_color">{{item.name}}</div>
          <div class="mt8">编码 {{item.code}}</div>
          <div class="flex mt8">
            <span>
              可用量 {{getArraytotal(item.baseQuantity,item.OtherForDispatch).toFixed(2)}}
              {{item.currentStock.length?item.currentStock[0].unit:''}}
            </span>
            <span>
              现存量 {{getArraytotal(item.baseQuantity).toFixed(2)}}
              {{item.currentStock.length?item.currentStock[0].unit:''}}
            </span>
          </div>
        </div>
        <div class="flex">
          <img src="../../assets/arrow.png" class="arrow_img" />
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
  name: "myInventory",
  data() {
    return {
      searchValue: null,
      inventory: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10,
      inventoryClassId: null,
      // 筛选类别
      categoryNum: "0",
      categoryOptions: [{ text: "全部分类", value: "0" }]
    };
  },
  components: {
    MySearch: MySearch
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "detailinfo") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
    next();
  },

  watch: {
    searchValue: debounce(async function(newValue, oldValue) {
      this.pageIndex = 1;
      this.inventory = [];
      this.getInventory();
    }, 500)
  },
  created() {
    this.getInventoryClass();
  },
  methods: {
    onLoad() {
      this.getInventory();
    },
    goToDtail(item) {
      this.$router.push({ name: "detailinfo" });
      setItem("inventory", item);
    },
    async getInventoryClass() {
      const { data } = await this.$Parse.Cloud.run("getInventoryClass");
      // 更改对象属性名
      let dataOptions = JSON.parse(
        JSON.stringify(data)
          .replace(/name/g, "text")
          .replace(/id/g, "value")
      );
      // 把每一项的value转换为字符串
      dataOptions.map(item => (item.value = String(item.value)));
      this.categoryOptions.push(...dataOptions);
    },
    // 进行商品类别筛选
    changeCategory(id) {
      if (id == 0) {
        this.inventoryClassId = null;
      } else {
        this.inventoryClassId = id;
      }
      this.pageIndex = 1;
      this.inventory = [];
      this.getInventory();
    },
    async getInventory() {
      const { data } = await this.$Parse.Cloud.run("getInventory", {
        inventoryClassId: this.inventoryClassId,
        inventoryName: this.searchValue,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      });
      data.map(v => {
        return (v.baseQuantity = v.currentStock.map(i => {
          return i.baseQuantity;
        }));
      });
      data.map(v => {
        return (v.OtherForDispatch = v.currentStock.map(i => {
          if (i.OtherForDispatch) {
            return i.OtherForDispatch;
          } else {
            return 0;
          }
        }));
      });
      this.inventory.push(...data);
      // console.log(this.inventory);
      this.loading = false;
      if (data.length) {
        this.pageIndex++;
        this.finished = false;
      }
      if (!data.length || data.length < this.pageSize) {
        this.finished = true;
      }
    },
    // 可用量 现存量 数组求和
    getArraytotal(baseQuantity, OtherForDispatch = []) {
      let baseTotal = 0;
      let otherTotal = 0;
      for (let i = 0; i < baseQuantity.length; i++) {
        baseTotal += baseQuantity[i];
      }
      for (let i = 0; i < OtherForDispatch.length; i++) {
        otherTotal += OtherForDispatch[i];
      }
      return baseTotal - otherTotal;
    }
  }
};
</script>

<style lang="less" scoped>
.inventory {
  .my_search {
    padding: 10px;
    background-color: @bgColor_gray;
  }
  .cell {
    padding: 10px;
    border-bottom: 1px solid @borderColor_gray;
  }
  .flex {
    align-items: center;
    span:first-child {
      width: 150px;
    }
  }
}
</style>