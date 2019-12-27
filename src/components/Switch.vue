<template>
  <div class="switch">
    <span :class="!value?'left_circle':'right_circle'">
      
    </span>
    <!-- <input type="checkbox" :class="{'active':value}" /> -->
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less" scoped>
.switch {  
    width: 50px;
    height: 26px;
    border: 1px solid #ccc;
    background-color: #ccc;
    border-radius: 18px;
    outline: none;
    display: flex;
    align-items: center;
    box-sizing: content-box;
    
  .active {
    background-color: #02e166;
  }
  .left_circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    // box-shadow: 0 0 2px #999;  

  }
  .right_circle {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #fff;
    // box-shadow: 0 0 2px #999;
  }
}

</style>