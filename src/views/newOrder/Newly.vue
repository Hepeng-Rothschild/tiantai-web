<template>
  <div>
    <van-cell-group>
      <div class="spacing-two">
        <van-cell title="客户名称"
                  class="moveleft">
          <van-field v-model="value.name"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="客户性质"
                  :value="propertyName"
                  is-link
                  @click="showProperty = true">
        </van-cell>
        
        <van-popup v-model="showProperty"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="property in propertys"
               :key="property.id"
               @click="changePro(property.name)">{{property.name}}</div>
        </van-popup>
        <van-cell title="所属类别"
                  :value="categoryName"
                  is-link
                  @click="showCategory = true">
        </van-cell>
        <van-popup v-model="showCategory"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="category in categorys"
               :key="category.id"
               @click="changeCate(category.name)">{{category.name}}</div>
        </van-popup>
      </div>

      <div class="spacing-two">
        <van-cell title="分管部门 选填"
                  :value="departmentName"
                  is-link
                  @click="showDepartment = true">
        </van-cell>
        <van-popup v-model="showDepartment"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="department in departments"
               :key="department.id"
               @click="changeDep(department.name)">{{department.name}}</div>
        </van-popup>
        <van-cell title="分管人员"
                  :value="manageName"
                  is-link
                  @click="showManages = true">
        </van-cell>
        <van-popup v-model="showManages"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="manage in manages"
               :key="manage.id"
               @click="changeMan(manage.name)">{{manage.name}}</div>
        </van-popup>
      </div>
      <div class="spacing">
        <van-cell title="默认收款方式"
                  value="请选择"
                  is-link
                  to="/defaultPay">
        </van-cell>
      </div>

      <div class="spacing-two moveleft">
        <van-cell title="联系人">
          <van-field v-model="value.linkman"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="联系电话">
          <van-field v-model="value.linkphone"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="到货地址">
          <van-field v-model="value.address"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
      </div>
      <div class="spacing-two moveleft">
        <van-cell title="发货要求">
          <van-field v-model="value.send"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="到货要求">
          <van-field v-model="value.arrival"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
      </div>

    </van-cell-group>
    <van-button type="info">保存</van-button>

  </div>
</template>

<script>

export default {
  data () {
    return {
      showCategory: false,
      showProperty: false,
      showDepartment: false,
      showManages: false,
      // showCollects: false,
      // 单元格输入框内容
      value: {
        name: '',
        linkman: '',
        linkphone: '',
        address: '',
        send: '',
        arrival: ''
      },
      // 客户性质
      propertys: [{ id: 1, name: '爸爸级' }, { id: 2, name: '大哥级' }, { id: 3, name: '儿子级' }, { id: 4, name: '垃圾' }],
      propertyName: '客户',
      // 所属类别
      categorys: [{ id: 1, name: '央企' }, { id: 2, name: '国企' }, { id: 3, name: '上市' }, { id: 4, name: '小屁' }],
      categoryName: '请选择',
      // 所属部门
      departments: [{ id: 1, name: '国务院' }, { id: 2, name: '各部委' }, { id: 3, name: '纳斯达克' }, { id: 4, name: '孵化器' }],
      departmentName: '请选择',
      // 分管人员
      manages: [{ id: 1, name: '国务委员' }, { id: 2, name: '正部级' }, { id: 3, name: '金主爸爸' }, { id: 4, name: '弱鸡' }],
      manageName: '罗玉龙',
    }
  },
  methods: {
    changePro (propertyNew) {
      this.propertyName = propertyNew
      this.showProperty = false
    },
    changeCate (categoryNew) {
      this.categoryName = categoryNew
      this.showCategory = false
    },
    changeDep (departmentNew) {
      this.departmentName = departmentNew
      this.showDepartment = false
    },
    changeMan (manageNew) {
      this.manageName = manageNew
      this.showManages = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-cell-group {
  margin-top: 59px;
  border-top: 1px solid #c0c4cc;
  margin-bottom: 16px;
  // 底部弹框样式
  .van-popup {
    div {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 17px;
      color: rgba(16, 16, 16, 1);
    }
  }
  .van-cell {
    padding: 10px 15px 10px 15px;
    border-bottom: 1px solid #c0c4cc;
    // 单元格内输入框样式
    .van-field {
      padding: 0px;
      font-size: 17px;
      padding-right: 20px;
    }
    .van-cell__title {
      color: rgba(0, 0, 0, 1);
      font-size: 17px;
      text-align: left;
      font-family: "PingFangSC-regular";
    }
    .van-cell__value {
      color: #888888;
      font-size: 17px;
      text-align: right;
      font-family: "PingFangSC-regular";
    }
  }

  .van-overlay {
    .van-picker {
      width: 100%;
      position: fixed;
      bottom: 0;
    }
  }
  // 带间距的单元格样式
  .spacing {
    margin: 0px 0px 17px 0px;
    border-top: 1px solid #c0c4cc;
  }
  .spacing-two {
    border-top: 1px solid #c0c4cc;
    margin-bottom: 17px;
  }
  .filed {
    border-top: 1px solid #c0c4cc;
  }
}
// 按钮样式
.van-button {
  margin: 10px 20px 53px 20px;
  width: 87%;
  border-radius: 5px 5px 5px 5px;
  text-align: center;
}
</style>
