<template>
  <div>
    <div class="box"
         @click="showmodel()">{{str}}</div>
    <Calendar ref="chi1"
              @str="getChild"></Calendar>
  </div>
</template>

<script>
import Calendar from 'hhpdate'

export default {
  components: {
    Calendar
  },
  data () {
    return {
      str: ''
    }
  },
  methods: {
    showmodel () {
      this.$refs.chi1.showmask1()
    },
    getChild (val) {
      this.str = val
    },

  }
}
</script>

<style scoped lang="less">
.box {
  height: 100%;
  width: 200px;
  background: green;
}
</style>
