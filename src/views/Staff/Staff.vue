<template>
  <div>
    <my-search v-model="searchValue" placeholder="请输入员工名称"></my-search>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :offset="200"
      @load="onLoad"
    >
      <van-cell-group v-for="(item,index) in staffList" :key="index" @click="selectStaff(item)">
        <van-cell :title="item.name" is-link />
      </van-cell-group>
    </van-list>
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
  data() {
    return {
      searchValue: null,
      staffList: [],
      loading: false,
      finished: false,
      pageIndex: 0,
      pageSize: 10
    };
  },
  watch: {
    searchValue: debounce(async function(newValue, oldValue) {
      this.pageIndex = 0;
      this.staffList = [];
      this.getPerson();
    }, 500)
  },
  methods: {
    onLoad() {
      this.getPerson();
    },
    async getPerson() {
      const { data } = await this.$Parse.Cloud.run("getPerson", {
        name: this.searchValue,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      });
      this.staffList.push(...data[0]);
      // console.log(data[0], "===");
      this.loading = false;
      if (data[0].length==this.pageSize) {
        this.pageIndex++;
        //为了配合搜索框 finished = false 会继续触发 onLoad 事件
        this.finished = false;
      }
      if (data[0].length < this.pageSize) {
        this.finished = true;
      }
    },
    async selectStaff(staff) {
      const data = await this.$Parse.Cloud.run("authUser",{staffId:staff.id})
      // console.log('绑定员工返回的data',data)
      if (data.code===200) {
        this.$router.push('/orderList')
      }else {
        this.$toast.fail({
          message: "其他用户已绑定该员工"
        });
      }
    },
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
</style>
