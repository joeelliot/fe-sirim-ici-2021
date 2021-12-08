<template>
  <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <!-- <h1>Dashboard</h1> -->
    <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
      <el-select class="selectBackground" style="width: 110px; margin-right: 5px;" @change="()=>{
          this.dates = ''
          fetchData3()
        }" v-model="dateType">
        <el-option label="By Month" value="month">By Month</el-option>
        <el-option label="By Dates" value="daterange">By Dates</el-option>
      </el-select>
      <el-date-picker
        v-model="dates"
        @change="()=>fetchData3()"
        :type="dateType"
        :placeholder="dateType === 'month' ? 'Pick a month' : ''"
        :format="dateType === 'month' ? 'MMM yyyy' : 'dd-MM-yyyy'"
        value-format="yyyy-MM-dd"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date">
      </el-date-picker>
      <el-input placeholder="Search" style="width: 240px; margin-left: 0px;" @change="()=>fetchData3()" v-model="search"/>
      <el-button style="margin-left: 10px;" type="primary">Search</el-button>
    </div>
    <div class="dashboardSection">
      <div class="dashboardBox" style="background-color: #88f;">
        <span class="dashboardBoxTop">Order</span>
        <div class="dashboardBoxBottom">
          <span class="dashboardNumber">{{orderAmount}}</span>
        </div>
        <div class="dashboardNumber2">
          <span v-for="(item, idx) in orderList" :key="idx">SO/{{item.billNo}}</span>
        </div>
      </div>
      <div class="dashboardBox" style="background-color: #f88;">
        <span class="dashboardBoxTop">Finished Products</span>
        <div class="dashboardBoxBottom">
          <span class="dashboardNumber">{{finishedProductPrice}}</span>
        </div>
        <div class="dashboardNumber3">
          <span>{{finishedProductAmount}}</span>
          <span>taken</span>
        </div>
      </div>
      <div class="dashboardBox" style="background-color: #f88;">
        <span class="dashboardBoxTop">Raw Mats</span>
        <div class="dashboardBoxBottom">
          <span class="dashboardNumber">{{rawMatPrice}}</span>
        </div>
        <div class="dashboardNumber3">
          <span>{{rawMatAmount}}</span>
          <span>taken</span>
        </div>
      </div>
      <!-- <div class="dashboardBox" style="background-color: #4c4;">
        <span class="dashboardBoxTop">Production</span>
        <div class="dashboardBoxBottom">
          <span class="dashboardNumber">{{productionAmount}}</span>
        </div>
      </div> -->
      <div class="dashboardBox" style="background-color: #f8f;">
        <span class="dashboardBoxTop">Cash Sale</span>
        <div class="dashboardBoxBottom">
          <span class="dashboardNumber">{{cashsalePrice}}</span>
        </div>
        <div class="dashboardNumber3">
          <span>{{cashsaleAmount}}</span>
          <span>created</span>
        </div>
      </div>
    </div>
    <div class="dashboardSection">
      <div v-if="salesordersdata" class="chartBox">
        <el-select class="el-input-size" @change="()=>fetchData()" v-model="salesordersyear">
          <el-option
            label="2021"
            value="2021">
            2021
          </el-option>
          <el-option
            label="2022"
            value="2022">
            2022
          </el-option>
          <el-option
            label="2023"
            value="2023">
            2023
          </el-option>
          <el-option
            label="2024"
            value="2024">
            2024
          </el-option>
        </el-select>
        <span style="font-size: 21px; font-weight: bold; color: #333; margin-top: 20px;">Sales Orders (Qty)</span>
        <bar-chart :chart-data="salesordersdata" :options="salesordersoptions"></bar-chart>
      </div>
      <div v-if="cashsalesdata" class="chartBox">
        <el-select class="el-input-size" @change="()=>fetchData2()" v-model="cashsalesyear">
          <el-option
            label="2021"
            value="2021">
            2021
          </el-option>
          <el-option
            label="2022"
            value="2022">
            2022
          </el-option>
          <el-option
            label="2023"
            value="2023">
            2023
          </el-option>
          <el-option
            label="2024"
            value="2024">
            2024
          </el-option>
        </el-select>
        <span style="font-size: 21px; font-weight: bold; color: #333; margin-top: 20px;">Cash Sales (RM)</span>
        <bar-chart :chart-data="cashsalesdata" :options="cashsalesoptions"></bar-chart>
      </div>
    </div>
  </div>
</template>
<script>
import { countYearsSalesOrders, countPendingSalesOrders } from '@/api/salesorders'
import { countYearsCashSales, countCashSales } from '@/api/cashsales'
import { countTakenProducts } from '@/api/product'
import BarChart from "@/components/BarChart"
import moment from "moment"

export default {
  name: 'dashboard',
  data() {
    return {
      customers: '...',
      stb: '...',
      odu: '...',
      orderAmount: '...',
      invoiceAmount: '...',
      cashsaleAmount: '...',
      cashsalePrice: '...',
      finishedProductAmount: '...',
      finishedProductPrice: '...',
      rawMatAmount: '...',
      rawMatPrice: '...',
      productionAmount: '...',
      search: '',
      dateType: 'month',
      dates: '',
      salesordersyear: '2021',
      salesordersdata: null,
      salesordersoptions: {
        plugins: {
          title: {
            display: true,
            text: "Cash Sales"
          }
        }
      },
      cashsalesyear: '2021',
      cashsalesdata: null,
      cashsalesoptions: {
        plugins: {
          title: {
            display: true,
            text: "Cash Sales"
          }
        }
      },
      orderList: []
    }
  },
  methods: {
    async fetchData () {
      const resp = await countYearsSalesOrders(this.salesordersyear)
      this.salesordersdata = {
        // labels: ['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'],
        labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        datasets: [
          {
            label: 'Monthly Amount',
            backgroundColor: '#0c0',
            data: resp
          }
        ]
      }
    },
    async fetchData2 () {
      const resp = await countYearsCashSales(this.cashsalesyear)
      this.cashsalesdata = {
        // labels: ['Januari','Februari','Mac','April','Mei','Jun','Julai','Ogos','September','Oktober','November','Disember'],
        labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
        datasets: [
          {
            label: 'Monthly Payment',
            backgroundColor: '#0c0',
            data: resp
          }
        ]
      }
    },
    async fetchData3 () {
      let dates = this.dates
      if (this.dateType === 'daterange' && dates) {
        dates = this.dates[0] + ',' + this.dates[1] 
      }
      const resp = await countPendingSalesOrders(dates, this.dateType)
      this.orderList = resp.data
      this.orderAmount = resp.length
      const resp2 = await countTakenProducts(dates, this.dateType, 'Finished')
      if (resp2) {
        this.finishedProductAmount = Number(resp2.amount).toString()
        this.finishedProductPrice = "RM" + Number(resp2.price).toString()
      }
      const resp3 = await countTakenProducts(dates, this.dateType, 'Raw')
      if (resp3) {
        this.rawMatAmount = Number(resp3.amount).toString()
        this.rawMatPrice = "RM" + Number(resp3.price).toString()
      }
      const resp4 = await countCashSales(dates, this.dateType)
      if (resp4) {
        this.cashsaleAmount = Number(resp4.amount).toString()
        this.cashsalePrice = "RM" + Number(resp4.price).toString()
      }
    }
  },
  mounted() {
    // this.tomatoAmount = await countTomatoes()
    this.dateType = 'daterange'
    const nowdate = moment().format('YYYY-MM-DD')
    this.dates = [nowdate, nowdate]
    this.fetchData()
    this.fetchData2()
    this.fetchData3()
  },
  computed: {
    awakRole() {
      return this.$store.state.user.awakRole
    }
  },
  components: {
    BarChart
  }
}
</script>
<style lang="scss">
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
.dashboardSection {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 520px) {
    flex-direction: column;
  }
  .dashboardBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 240px;
    height: 160px;
    border: 1px #999 solid;
    margin: 10px 20px;
    border-radius: 20px;
    .dashboardBoxTop {
      // margin-bottom: 20px;
      font-size: 21px;
      font-weight: bold;
      color: #fff;
    }
    .dashboardBoxBottom {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      height: 80px;
    }
    .dashboardStatus {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // border: #ccc 1px solid;
      // border-radius: 10px;
      padding: 6px;
      margin-bottom: 4px;
      width: 100px;
      height: 20px;
      font-size: 13px;
    }
    .dashboardNumber {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 20px;
      font-size: 32px;
      color: #fff;
    }
    .dashboardNumber2 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      overflow: scroll;
      width: 120px;
      height: 40px;
      font-size: 12px;
      padding-top: 10px;
      padding-bottom: 10px;
      position: absolute;
      bottom: 0px;
      color: #fff;
      background-color: #77f;
    }
    .dashboardNumber3 {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 60px;
      height: 40px;
      font-size: 12px;
      position: absolute;
      bottom: 0px;
      color: #fff;
    }
  }
}
.chartBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 500px;
  // background-color: #99f;
}
</style>