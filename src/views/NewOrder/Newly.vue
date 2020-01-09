<template>
  <div>
    <van-cell-group>
      <div class="spacing-two">
        <van-cell title="客户名称"
                  class="moveleft">
          <van-field v-model="cellnews.Name"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="客户性质"
                  :value="cellnews.PartnerTypeName?cellnews.PartnerTypeName:'请选择'"
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
                  :value="cellnews.PartnerClassName?cellnews.PartnerClassName:'请选择'"
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
                  :value="cellnews.SaleDepartmentName?cellnews.SaleDepartmentName:'请选择'"
                  is-link
                  @click="showDepartment = true">
        </van-cell>
        <van-popup v-model="showDepartment"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="(department,index) in SaleDepartment"
               :key="index"
               @click="changeDep(department)">{{department.name}}</div>
        </van-popup>
        <van-cell title="分管人员"
                  :value="cellnews.SaleManName?cellnews.SaleManName:'请选择'"
                  is-link
                  @click="showManages = true">
        </van-cell>
        <van-popup v-model="showManages"
                   position="bottom"
                   :style="{ height: '30%' }">
          <div v-for="(manage,index) in SaleMan"
               :key="index"
               @click="changeMan(manage)">{{manage.name}}</div>
        </van-popup>
      </div>
      <div class="spacing">
        <van-cell title="默认收款方式"
                  :value="SaleSettleStyleName?SaleSettleStyleName:'请选择'"
                  is-link
                  to="/defaultPay">
        </van-cell>
      </div>

      <div class="spacing-two moveleft">
        <van-cell title="联系人">
          <van-field v-model="cellnews.Contact"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="联系电话">
          <van-field v-model="cellnews.MobilePhone"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="到货地址">
          <van-field v-model="cellnews.ShipmentAddress"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
      </div>
      <div class="spacing-two moveleft">
        <van-cell title="发货要求">
          <van-field v-model="cellnews.sendgoodsAsk"
                     placeholder="请输入"
                     input-align="right"
                     style="border:0px;" />
        </van-cell>
        <van-cell title="到货要求">
          <van-field v-model="cellnews.remarks"
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
import { setItem, getItem, remItem } from "../../utils/Storage.js";
import { mapState } from 'vuex'
export default {
  data () {
    return {
      Code: this.uuidcode(),
      // 数期
      priuserdefnvc1: '5',
      // 默认收款方式----开始
      saleDate: null,
      SaleSettleStyleName: this.$store.state.defaultPay.radio || null,
      SaleSettleStyle: { Code: null },
      SaleCreditDays: null,
      SaleStartDate: null,
      SaleSpaceMonth: null,
      SaleCheckMonth: null,
      SaleCheckDate: null,
      // 默认收款方式----结束
      // -------------------
      PartnerTypeArr: [{ Code: "01", Name: '客户' }, { Code: '00', Name: '供应商' }, { Code: '02', Name: '客户/供应商' }],
      PartnerClass: null,
      SaleDepartment: null,

      SaleMan: null,
      // 以下是遮罩层的开启名称
      showCategory: false,
      showProperty: false,
      showDepartment: false,
      showManages: false,
      // 选择要储存的参数
      cellnews: this.$store.state.cellNews || {
        //客户名称
        Name: '',
        Contact: '',
        MobilePhone: '',
        ShipmentAddress: '',
        // 确定修改类型
        Status: '1',
        // 客户性质
        PartnerType: { Code: null },
        PartnerTypeName: null,
        // 客户类别
        PartnerClassName: null,
        PartnerClassCode: { Code: null },
        // 分管部门
        SaleDepartmentName: null,
        SaleDepartmentCode: { Code: null },
        //分管人员
        SaleManName: null,
        SaleManCode: { Code: null },
        departmentCode: null,
        sendgoodsAsk: '',//发货要求
        remarks: '',// 发货备注
      }
    }
  },
  watch: {
    cellnews: {
      handler (newVal, oldVal) {
        this.$store.commit('savePartner', this.cellnews)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['cellNews', 'defaultPay'])
  },
  created () {
    this.changeCate()
    this.change_dep()
    this.change_man()
  },
  mounted () {
    this.selectPay()
    this.selectDate()
  },
  methods: {
    changePro (propertyNew) {
      this.cellnews.PartnerTypeName = propertyNew.Name
      this.cellnews.PartnerType.Code = propertyNew.Code
      this.showProperty = false
    },
    // 选择类型
    changeCateName (categoryNew) {
      this.cellnews.PartnerClassName = categoryNew.Name
      this.cellnews.PartnerClassCode.Code = categoryNew.Code
      this.showCategory = false
    },
    // 选择所属类别
    async changeCate () {
      const { data } = await this.$Parse.Cloud.run("getPartnerClass");
      this.PartnerClass = JSON.parse(data)
    },
    // 选择分管部门
    async change_dep () {
      const { data } = await this.$Parse.Cloud.run("department");
      this.SaleDepartment = data
    },
    changeDep (departmentNew) {
      this.cellnews.SaleDepartmentName = departmentNew.name
      this.cellnews.SaleDepartmentCode.Code = departmentNew.code
      this.cellnews.departmentCode = departmentNew.code
      this.change_man()
      this.showDepartment = false
    },
    // 选择分管人员
    async change_man () {
      const { data } = await this.$Parse.Cloud.run("getPersonByDepartment", { departmentCode: this.cellnews.departmentCode || null });
      this.SaleMan = data
    },
    changeMan (manageNew) {
      this.cellnews.SaleManCode.Code = manageNew.code
      this.cellnews.SaleManName = manageNew.name
      this.showManages = false
    },
    // 编写UUID
    uuidcode () {
      let originStr = 'xxxxx',
        originChar = '0123456789',
        len = originChar.length;
      return originStr.replace(/x/g, function (match) {
        return originChar.charAt(Math.floor(Math.random() * len))
      })
    },
    // 新增客户
    async createPartner () {
      // console.log(this.Code);
      // console.log(this.cellnews.PartnerType);
      // console.log(this.cellnews.PartnerClassCode);
      // console.log(this.cellnews.SaleDepartmentCode);
      // console.log(this.cellnews.SaleManCode);
      // console.log(this.SaleSettleStyle);
      // console.log(this.cellnews.Contact);
      // console.log(this.cellnews.MobilePhone);
      // console.log(this.cellnews.ShipmentAddress);
      // console.log(this.cellnews.Status);
      // console.log(this.SaleCreditDays);
      // console.log(this.SaleStartDate);
      // console.log(this.SaleSpaceMonth);
      // console.log(this.SaleCheckMonth);
      // console.log(this.SaleCheckDate);
      // console.log(this.priuserdefnvc1);

      const { data } = await this.$Parse.Cloud.run("createPartner", {
        Code: this.Code,
        Name: this.cellnews.Name,
        SaleSettleStyle: this.SaleSettleStyle,
        Contact: this.cellnews.Contact,
        MobilePhone: this.cellnews.MobilePhone,
        ShipmentAddress: this.cellnews.ShipmentAddress,
        PartnerType: this.cellnews.PartnerType,
        PartnerClass: this.cellnews.PartnerClassCode,
        SaleDepartment: this.cellnews.SaleDepartmentCode,
        SaleMan: this.cellnews.SaleManCode,
        Status: this.cellnews.Status,
        priuserdefnvc1: this.priuserdefnvc1,
        SaleCreditDays: this.SaleCreditDays,
        SaleStartDate: this.SaleStartDate || null,
        SaleSpaceMonth: this.SaleSpaceMonth || null,
        SaleCheckMonth: this.SaleCheckMonth || null,
        SaleCheckDate: this.SaleCheckDate || null
      });

      console.log(data);
    },
    // 拿到vuex中的收款方式名称
    selectPay () {
      let name = this.$store.state.defaultPay.radio

      if (name == '限期收款') {
        this.SaleSettleStyle.Code = '00'
      } else if (name == '全额订金') {
        this.SaleSettleStyle.Code = '01'
      } else if (name == '全额现结') {
        this.SaleSettleStyle.Code = '02'
      } else if (name == '月结') {
        this.SaleSettleStyle.Code = '03'
      } else {
        this.SaleSettleStyle.Code = '05'
      }
    },
    // 拿到vuex中存储的收款方式限定天数
    selectDate () {
      this.saleDate = this.$store.state.defaultPay
      let sale_Date = this.saleDate
      this.SaleCreditDays = sale_Date.date_0
      this.SaleStartDate = sale_Date.date_1
      this.SaleSpaceMonth = sale_Date.date_2
      this.SaleCheckMonth = sale_Date.date_3
      this.SaleCheckDate = sale_Date.date_4
      //   console.log(this.SaleCreditDays);
      // console.log(this.SaleStartDate);
      // console.log(this.SaleSpaceMonth);
      // console.log(this.SaleCheckMonth);
      // console.log(this.SaleCheckDate);
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
