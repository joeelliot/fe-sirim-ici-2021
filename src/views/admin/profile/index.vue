<template>
  <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
      <el-select class="selectBackground" style="width: 110px; margin-right: 5px;" @change="()=>{
          this.dates = ''
          fetchData()
        }" v-model="dateType">
        <el-option label="By Month" value="month">By Month</el-option>
        <el-option label="By Dates" value="daterange">By Dates</el-option>
      </el-select>
      <el-date-picker
        v-model="dates"
        @change="()=>fetchData()"
        :type="dateType"
        :placeholder="dateType === 'month' ? 'Pick a month' : ''"
        :format="dateType === 'month' ? 'MMM yyyy' : 'dd-MM-yyyy'"
        value-format="yyyy-MM-dd"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date">
      </el-date-picker>
      <el-input placeholder="Search" style="width: 240px; margin-left: 0px;" @change="()=>fetchData()" v-model="search"/>
      <el-button style="margin-left: 10px;" type="primary">Search</el-button>
    </div>
    <div v-if="awakRole !== 'none'">
      <el-form v-if="awakRole === 'installer'" ref="userData" :model="userData" label-width="240px">
        <!-- <el-form-item label="Installer Type">
          <el-select class="el-input-size" v-model="userData.company.company">
            <el-option key="false" label="Individual" :value="false"/>
            <el-option key="true" label="Company" :value="true"/>
          </el-select>
        </el-form-item> -->
        <el-form-item :label="userData.company.company ? 'Company Name' : 'Name'">
          <el-input style="width: 320px" v-model="userData.company.name"></el-input>
        </el-form-item>
        <el-form-item :label="userData.company.company ? 'Company Address House No.' : 'Address House No.'">
          <el-input style="width: 320px" v-model="userData.company.address.houseno"></el-input>
        </el-form-item>
        <el-form-item :label="userData.company.company ? 'Company Address Unit' : 'Address Unit'">
          <el-input style="width: 320px" v-model="userData.company.address.unit"></el-input>
        </el-form-item>
        <el-form-item :label="userData.company.company ? 'Company Address Block' : 'Address Block'">
          <el-input style="width: 320px" v-model="userData.company.address.block"></el-input>
        </el-form-item>
        <el-form-item :label="userData.company.company ? 'Company Address Road' : 'Address Road'">
          <el-input style="width: 320px" v-model="userData.company.address.road"></el-input>
        </el-form-item>
        <el-form-item :label="userData.company.company ? 'Company Address Garden' : 'Address Garden'">
          <el-input style="width: 320px" v-model="userData.company.address.garden"></el-input>
        </el-form-item>
        <el-form-item :label="userData.company.company ? 'Company Address Postal Code' : 'Address Postal Code'">
          <el-input style="width: 320px" v-model="userData.company.address.postalcode"></el-input>
        </el-form-item>
        <el-form-item :label="userData.company.company ? 'Company Address State' : 'Address State'">
          <el-input style="width: 320px" v-model="userData.company.address.state"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Shop No.">
          <el-input style="width: 320px" v-model="userData.operationaddress.shopno"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Unit">
          <el-input style="width: 320px" v-model="userData.operationaddress.unit"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Block">
          <el-input style="width: 320px" v-model="userData.operationaddress.block"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Road">
          <el-input style="width: 320px" v-model="userData.operationaddress.road"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Garden">
          <el-input style="width: 320px" v-model="userData.operationaddress.garden"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Postal Code">
          <el-input style="width: 320px" v-model="userData.operationaddress.postalcode"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address State">
          <el-input style="width: 320px" v-model="userData.operationaddress.state"></el-input>
        </el-form-item>
        <el-form-item :label="userData.company.company ? 'SSM Number' : 'IC Number'">
          <el-input style="width: 320px" v-model="userData.ssmnumber"></el-input>
        </el-form-item>
        <el-form-item label="Office Number">
          <el-input style="width: 320px" v-model="userData.officenumber"></el-input>
        </el-form-item>
        <el-form-item label="HP Number">
          <el-input style="width: 320px" v-model="userData.hpnumber"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else ref="userData" :model="userData" label-width="240px">
        <el-form-item :label="userData.company.company ? 'Company Name' : 'Name'">
          <el-input style="width: 320px" v-model="userData.company.name"></el-input>
        </el-form-item>
        <el-form-item label="Company Address Shop No.">
          <el-input style="width: 320px" v-model="userData.company.address.shopno"></el-input>
        </el-form-item>
        <el-form-item label="Company Address Unit">
          <el-input style="width: 320px" v-model="userData.company.address.unit"></el-input>
        </el-form-item>
        <el-form-item label="Company Address Block">
          <el-input style="width: 320px" v-model="userData.company.address.block"></el-input>
        </el-form-item>
        <el-form-item label="Company Address Road">
          <el-input style="width: 320px" v-model="userData.company.address.road"></el-input>
        </el-form-item>
        <el-form-item label="Company Address Garden">
          <el-input style="width: 320px" v-model="userData.company.address.garden"></el-input>
        </el-form-item>
        <el-form-item label="Company Address Postal Code">
          <el-input style="width: 320px" v-model="userData.company.address.postalcode"></el-input>
        </el-form-item>
        <el-form-item label="Company Address State">
          <el-input style="width: 320px" v-model="userData.company.address.state"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Shop No.">
          <el-input style="width: 320px" v-model="userData.operationaddress.shopno"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Unit">
          <el-input style="width: 320px" v-model="userData.operationaddress.unit"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Block">
          <el-input style="width: 320px" v-model="userData.operationaddress.block"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Road">
          <el-input style="width: 320px" v-model="userData.operationaddress.road"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Garden">
          <el-input style="width: 320px" v-model="userData.operationaddress.garden"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address Postal Code">
          <el-input style="width: 320px" v-model="userData.operationaddress.postalcode"></el-input>
        </el-form-item>
        <el-form-item label="Operation Address State">
          <el-input style="width: 320px" v-model="userData.operationaddress.state"></el-input>
        </el-form-item>
        <el-form-item label="SSM Number">
          <el-input style="width: 320px" v-model="userData.ssmnumber"></el-input>
        </el-form-item>
        <el-form-item label="Office Number">
          <el-input style="width: 320px" v-model="userData.officenumber"></el-input>
        </el-form-item>
        <el-form-item label="HP Number">
          <el-input style="width: 320px" v-model="userData.hpnumber"></el-input>
        </el-form-item>
      </el-form>
      <el-button v-loading="btnloading" type="primary" @click="onSubmit">Save</el-button>
    </div>
  </div>
</template>
<script>
// import { Message } from 'element-ui'
import { modifyProfile } from '@/api/login'
import moment from 'moment'

export default {
  name: 'profile',
  data() {
    return {
      btnloading: false,
      serviceName: process.env.SERVICE_NAME,
      search: '',
      dateType: 'month',
      dates: '',
    }
  },
  methods: {
    async onSubmit() {
      this.btnloading = true
      var userData = {}
      if (this.awakRole === 'installer') {
        userData = {
          email: this.userData.email,
          company: {
            company: this.userData.company.company,
            name: this.userData.company.name,
            address: {
              houseno: this.userData.company.address.houseno,
              unit: this.userData.company.address.unit,
              block: this.userData.company.address.block,
              road: this.userData.company.address.road,
              garden: this.userData.company.address.garden,
              postalcode: this.userData.company.address.postalcode,
              state: this.userData.company.address.state
            }
          },
          operationaddress: {
            shopno: this.userData.operationaddress.shopno,
            unit: this.userData.operationaddress.unit,
            block: this.userData.operationaddress.block,
            road: this.userData.operationaddress.road,
            garden: this.userData.operationaddress.garden,
            postalcode: this.userData.operationaddress.postalcode,
            state: this.userData.operationaddress.state
          },
          ssmnumber: this.userData.ssmnumber,
          officenumber: this.userData.officenumber,
          hpnumber: this.userData.hpnumber
        }
      } else {
        userData = {
          email: this.userData.email,
          company: {
            name: this.userData.company.name,
            address: {
              shopno: this.userData.company.address.shopno,
              unit: this.userData.company.address.unit,
              block: this.userData.company.address.block,
              road: this.userData.company.address.road,
              garden: this.userData.company.address.garden,
              postalcode: this.userData.company.address.postalcode,
              state: this.userData.company.address.state
            }
          },
          operationaddress: {
            shopno: this.userData.operationaddress.shopno,
            unit: this.userData.operationaddress.unit,
            block: this.userData.operationaddress.block,
            road: this.userData.operationaddress.road,
            garden: this.userData.operationaddress.garden,
            postalcode: this.userData.operationaddress.postalcode,
            state: this.userData.operationaddress.state
          },
          ssmnumber: this.userData.ssmnumber,
          officenumber: this.userData.officenumber,
          hpnumber: this.userData.hpnumber
        }
      }
      await modifyProfile(userData)
      // console.log(resp)
      // Message({
      //   message: 'Profile Updated',
      //   type: 'success',
      //   duration: 5 * 1000
      // })
      window.location.reload()
      this.btnloading = false
    }
  },
  filters: {
    formatDateTime(val) {
      if (val !== undefined) {
        return moment.unix(Number(val)).format('DD/MM/YYYY HH:mm')
      }
      return ''
    }
  },
  computed: {
    userData() {
      return this.$store.state.user.userData
    },
    awakRole() {
      return this.$store.state.user.awakRole
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.el-date-editor .el-range-separator {
  width: 20px;
}
.rowCursor {
  cursor: pointer;
}
.selectBackground {
  .el-input__inner {
    background-color: #eee;
  }
}
.profileClass {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  background-color: $color2;
  width: 50%;
  padding: 10px;
}
</style>