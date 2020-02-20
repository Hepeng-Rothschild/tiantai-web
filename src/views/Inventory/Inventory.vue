<template>
  <div class="inventory">
    <div class="my_search">
      <my-search v-model="searchValue"
                 placeholder="请输入商品名称或编码"
                 class="search" />
    </div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="categoryNum"
                         :options="category"
                         @change="changeCategory" />
    </van-dropdown-menu>
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
          <div class="inventory_code">编码 {{item.code}}</div>
          <div class="text_txt">
            <span>可用量 {{item.currentStock.baseQuantity?item.currentStock.baseQuantity:'无'}} {{item.currentStock.unit}}</span>
            <span>现存量 {{item.currentStock.baseQuantity?item.currentStock.baseQuantity:'无'}} {{item.currentStock.unit}}</span>
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
  name: 'myInventory',
  data () {
    return {
      searchValue: null,
      shopName: null,
      inventory: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10,
      scrollY: 0,
      // 筛选类别
      categoryNum: '0',
      category: [
        { text: '全部分类', value: '0' },
        { text: '钛白粉', value: '1' },
        { text: '沉淀硫酸钡', value: '201' },
        { text: '重质硫酸钡', value:'202' },
        { text: '立德粉', value: 'C3' },
        { text: '滑石粉', value: 'D4' },
        { text: '轻钙', value: 'D5' },
        { text: '重钙', value: 'D6'},
        { text: '高光粉', value: 'E1' },
        { text: '云母粉', value: 'E2' },
        { text: '石英粉', value: 'E21' },
        { text: '硅灰石粉', value: 'E3' },
        { text: '煅烧高岭土', value: 'E5' },
        { text: '水洗高岭土', value: 'E6' },
        { text: '透明粉', value: 'E7' },
        { text: '膨润土', value: 'E8' },
        { text: '消光粉', value: 'E9' },
        { text: '白炭黑', value: 'F1' },
        { text: '抗氧剂', value: 'F2' },
        { text: '氧化铁系列', value: 'F3' },
        { text: '硬脂酸系列', value: 'F4' },
        { text: '助剂', value: 'F5' },
        { text: '固化剂', value: 'F6' },
        { text: '乳液', value: 'F7' },
        { text: '煅烧石英粉', value: 'F91' },
        { text: '结晶石英', value: 'F92' },
        { text: '钛矿', value: 'T1' },
        { text: '包装袋', value: 'H1' },
        { text: '服务', value: 'Q00' },
        { text: '其他', value: 'F8'},
      ],
    };
  },
  components: {
    MySearch: MySearch
  },
  beforeRouteLeave (to, from, next) {
    if (to.name == "detailinfo") {
      from.meta.keepAlive = true;
    } else {
      from.meta.keepAlive = false;
    }
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
    // 进行商品类别筛选
    changeCategory (categoryState) {
      console.log(categoryState);
      
    },
    async getData () {
      const { data } = await this.$Parse.Cloud.run("getInventory", {
        inventoryName: this.searchValue,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      });
      this.inventory.push(...data);
      // console.log(this.inventory)
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
        font-size: 16px;
        margin-bottom: 5px;
      }
      .inventory_code {
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
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