<template>
  <div class="search">
    <input type="search" :value="value" :placeholder="placeholder" @input="toParent()" ref="search"/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: String,
      default: ""
    },
    placeholder:{
        type:String,
        default:""
    }
  },
  created() {
  },
  methods: {
    toParent() {
        this.$emit('input',this.$refs.search.value)
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  input {
    width: 300px;
    height: 36px;
    border-radius: 6px;
    border: 1.25px solid rgba(187, 187, 187, 1);
    outline: none;
    background: #fff url(../assets/search.png) no-repeat 9px 7px;
    background-size: 23px;
    font-size: 14px;
    color: rgba(136, 136, 136, 1);
    text-align: center;
    // 去除input顶部栏的阴影
    -webkit-appearance: none;
  }
  // --清除谷歌浏览器下的 search 叉号
  input::-webkit-search-cancel-button {
    display: none;
  }
  // --清除IE下的 search 叉号
  input[type="search"]::-ms-clear {
    display: none;
  }
}
</style>