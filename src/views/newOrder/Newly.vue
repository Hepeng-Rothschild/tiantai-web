<template>
  <div>
    <van-cell-group>
      <div class="spacing-two">
        <van-cell title="客户名称"
                  class="moveleft">
          <van-field v-model="Name"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="客户性质"
                  :value="PartnerTypeName?PartnerTypeName:'请选择'"
                  is-link
                  @click="showProperty = true">
        </van-cell>

        <van-popup v-model="showProperty"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="(property,index) in PartnerTypeArr"
               :key="index"
               @click="changePro(property)">{{property.Name}}</div>
        </van-popup>
        <van-cell title="所属类别"
                  :value="PartnerClassName?PartnerClassName:'请选择'"
                  is-link
                  @click="showCategory = true">
        </van-cell>
        <van-popup v-model="showCategory"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="(category,index) in this.PartnerClass"
               :key="index"
               @click="changeCateName(category)">{{category.Name}}</div>

        </van-popup>
      </div>

      <div class="spacing-two">
        <van-cell title="分管部门 选填"
                  :value="SaleDepartmentName?SaleDepartmentName:'请选择'"
                  is-link
                  @click="showDepartment = true">
        </van-cell>
        <van-popup v-model="showDepartment"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="(department,index) in SaleDepartment"
               :key="index"
               @click="changeDep(department)">{{department.Name}}</div>
        </van-popup>
        <van-cell title="分管人员"
                  :value="SaleManName?SaleManName:'请选择'"
                  is-link
                  @click="showManages = true">
        </van-cell>
        <van-popup v-model="showManages"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="(manage,index) in SaleMan"
               :key="index"
               @click="changeMan(manage)">{{manage.Name}}</div>
        </van-popup>
      </div>
      <div class="spacing">
        <van-cell title="默认收款方式"
                  :value="SaleSettleStyleName"
                  is-link
                  to="/defaultPay">
        </van-cell>
      </div>

      <div class="spacing-two moveleft">
        <van-cell title="联系人">
          <van-field v-model="Contact"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="联系电话">
          <van-field v-model="MobilePhone"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="到货地址">
          <van-field v-model="ShipmentAddress"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
      </div>
      <div class="spacing-two moveleft">
        <van-cell title="发货要求">
          <van-field v-model="yaoqiu"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="到货要求">
          <van-field v-model="beizhu"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
      </div>

    </van-cell-group>
    <van-button type="info"
                @click="createPartner">保存</van-button>

  </div>
</template>

<script>
import { setItem, getItem } from "../../utils/Storage.js";
import { log } from 'util';

export default {
  data () {
    return {
      //客户名称
      Name: '',
      // 默认收款方式
      SaleSettleStyleName:'其它',
      SaleSettleStyle: { Code: '00' },

      Contact: '',
      MobilePhone: '',
      ShipmentAddress: '',
      // 确定修改类型
      Status: '1',
      // 客户性质
      PartnerType: { Code: null },
      PartnerTypeName: null,

      PartnerTypeArr: [{ Code: "01", Name: '客户' }, { Code: '00', Name: '供应商' }, { Code: '02', Name: '客户/供应商' }],
      // 客户类别
      PartnerClassName: null,
      PartnerClassCode: { Code: null },
      PartnerClass: null,
      // 分管部门
      SaleDepartmentName: null,
      SaleDepartmentCode: { Code: null },
      SaleDepartment: [{ Code: '01', Name: '555' }],
      //分管人员
      SaleManName: null,
      SaleManCode: { Code: null },
      SaleMan: [{ Code: '01', Name: '555' }],

      yaoqiu: '',//发货要求
      beizhu: '',// 发货备注
      showCategory: false,
      showProperty: false,
      showDepartment: false,
      showManages: false,
    }
  },
  created () {
    this.changeCate()
  },
  // mounted () {
  //   getItem("selectPay") && this.selectPay();
  // },
  methods: {
    changePro (propertyNew) {
      this.PartnerTypeName = propertyNew.Name
      this.PartnerType.Code = propertyNew.Code
      this.showProperty = false
    },
    // 选择类型
    changeCateName (categoryNew) {
      this.PartnerClassName = categoryNew.Name
      this.PartnerClassCode.Code = categoryNew.Code
      // console.log(this.PartnerClassCode);

      this.showCategory = false
    },
    // 选择所属类别
    async changeCate () {
      const { data } = await this.$Parse.Cloud.run("getPartnerClass");
      this.PartnerClass = JSON.parse(data)
      // console.log(JSON.parse(data));
    },
    changeDep (departmentNew) {
      this.SaleDepartmentName = departmentNew.Name
      this.SaleDepartmentCode.Code = departmentNew.Code
      // console.log(this.SaleDepartmentCode);

      this.showDepartment = false
    },
    changeMan (manageNew) {
      this.SaleManCode.Code = manageNew.Code
      this.SaleManName = manageNew.Name
      // console.log(this.SaleManCode);

      this.showManages = false
    },
    // 新增客户
    async createPartner () {
      console.log(this.Name);
      console.log(this.PartnerType);
      console.log(this.PartnerClassCode);
      console.log(this.SaleDepartmentCode);
      console.log(this.SaleManCode);
      console.log(this.SaleSettleStyle);
      console.log(this.Contact);
      console.log(this.MobilePhone);
      console.log(this.ShipmentAddress);
      console.log(this.Status);
      const { data } = await this.$Parse.Cloud.run("createPartner", {
        Name: this.Name,
        SaleSettleStyle: this.SaleSettleStyle,
        Contact: this.Contact,
        MobilePhone: this.MobilePhone,
        ShipmentAddress: this.ShipmentAddress,
        PartnerType: this.PartnerType,
        PartnerClass: this.PartnerClassCode,
        // SaleDepartment: this.SaleDepartmentCode,
        // SaleMan: this.SaleManCode,
        Status: this.Status
      });


      console.log(data);

    },
    // selectPay () {
    //   this.SaleSettleStyle = getItem("selectPay");

    // }
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
