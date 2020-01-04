<template>
  <div>
    <my-search v-model="searchValue" placeholder="输入客户名称进行查找"></my-search>
    <van-cell-group v-for="(partner,index) in partner" :key="index" @click="selectPartner(partner)">
      <van-cell
        :title="partner.AA_Partner_Contact"
        :label="Number(partner.AA_Partner_Pay_AdvPBalance).toFixed(2)"
        is-link
      />
    </van-cell-group>

    <!-- <div
      v-for="saleMan in saleMan"
      :key="saleMan.id"
      @click="changeName(saleMan.name)"
    >{{saleMan.name}}</div> -->

    
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
      partner: null
    };
  },
  mounted() {
    this.getPartner();
  },
  watch: {
    searchValue(newValue, oldValue) {
      console.log(this.searchValue);
      this.getPartner();
      console.log(this.partner);
    }
  },
  methods: {
    // 获取业务员

    async getPartner() {
      const { data } = await this.$Parse.Cloud.run("getPartner", {
        name: this.searchValue
      });
      console.log("客户", data[0]);
      this.partner = data[0];
    },
    selectPartner(partner) {
      this.$router.push({ name: "neworder" });
      setItem("selectPartner", partner);
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
