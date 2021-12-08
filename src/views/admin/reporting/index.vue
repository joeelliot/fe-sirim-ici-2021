<template>
  <div class="constantScroll" style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div>
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
        <el-select placeholder="Data Type" style="width: 240px; margin-left: 0px;" :loading="optionLoading" @change="()=>fetchData()" v-model="dataType">
          <el-option
            v-for="(item, idx) in options"
            :key="idx"
            :value="item.value"
            :label="item.label">
            {{item.label}}
          </el-option>
        </el-select>
        <el-button style="margin-left: 10px;" type="primary">Search</el-button>
      </div>
      <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
        <el-button v-if="dataCategory !== 'packaging'" style="position: absolute; right: 22px;" @click="download" :disabled="dataType === ''" type="success" icon="el-icon-download">Download as Excel</el-button>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          v-if="dataCategory === 'customer'"
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column 
            prop="expand"
            width="60"
            type="expand">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            width="210">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address1"
            label="Address 1"
            width="210">
            <template slot-scope="scope">
              <span style="word-break: break-word;">{{ scope.row.address1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address2"
            label="Address 2"
            width="210">
            <template slot-scope="scope">
              <span style="word-break: break-word;">{{ scope.row.address2 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address3"
            label="Address 3"
            width="210">
            <template slot-scope="scope">
              <span style="word-break: break-word;">{{ scope.row.address3 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tel"
            label="Tel/Fax"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="category"
            label="Category"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.category }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.date !== null">{{ scope.row.date | formatDate }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-else-if="dataCategory === 'product'"
          :default-sort = "{prop: 'updatedAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" @expand-change="expandChange" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column 
            prop="expand"
            width="60"
            type="expand">
            <template slot-scope="scope">
              <el-table
                :default-sort = "{prop: 'createdAt', order: 'descending'}"
                :data="scope.row.items" v-loading.body="scope.row.loading" element-loading-text="Loading" fit highlight-current-row>
                <el-table-column
                  label="#"
                  width="50" type="index" :index="indexMethod">
                </el-table-column>
                <el-table-column
                  prop="action"
                  label="Action"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.action }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="Amount"
                  width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.amount }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="quantity"
                  label="Quantity"
                  width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.quantity }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="completedAt"
                  label="Completed At"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{scope.row.createdAt | formatDateTime }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="code"
            label="Code"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="Description"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="uom"
            label="UOM"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.uom }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Quantity"
            width="90">
            <template slot-scope="scope">
              {{ scope.row.quantity }}
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="Price"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="category"
            label="Category"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.category }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="updatedAt"
            label="Updated At"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.updatedAt !== null">{{ scope.row.updatedAt | formatDateTime }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-else-if="dataCategory === 'customercode'"
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column 
            prop="expand"
            width="60"
            type="expand">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="Code"
            width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="Description"
            width="320">
            <template slot-scope="scope">
              <span>{{ scope.row.description }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-else-if="dataCategory === 'agent'"
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column 
            prop="expand"
            width="60"
            type="expand">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            width="210">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address1"
            label="Address 1"
            width="210">
            <template slot-scope="scope">
              <span style="word-break: break-word;">{{ scope.row.address1 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address2"
            label="Address 2"
            width="210">
            <template slot-scope="scope">
              <span style="word-break: break-word;">{{ scope.row.address2 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="address3"
            label="Address 3"
            width="210">
            <template slot-scope="scope">
              <span style="word-break: break-word;">{{ scope.row.address3 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="tel"
            label="Tel/Fax"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.tel }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="category"
            label="Category"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.category | categoryFilter }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.date !== null">{{ scope.row.date | formatDate }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-else-if="dataCategory === 'user'"
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column 
            prop="expand"
            width="60"
            type="expand">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column
            prop="username"
            label="Username"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.username }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="Email"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-else-if="dataCategory === 'packaging'"
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" @expand-change="expandChange" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column 
            prop="expand"
            width="60"
            type="expand">
            <template slot-scope="scope">
              <el-table
                :default-sort = "{prop: 'createdAt', order: 'descending'}"
                :data="scope.row.items" v-loading.body="scope.row.loading" element-loading-text="Loading" fit highlight-current-row>
                <el-table-column
                  label="#"
                  width="50" type="index" :index="indexMethod">
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="Code"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.code }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="Description"
                  width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.description }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="quantity"
                  label="Color"
                  width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.color }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="quantity"
                  label="Size"
                  width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.size }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="uom"
                  label="UOM"
                  width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.uom }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remainingCount"
                  label="Pending Tasks"
                  width="140">
                  <template slot-scope="scope">
                    <span>{{ scope.row.maxCount - scope.row.currentCount }} ({{ scope.row.currentCount > 0 ? 100 - Number(scope.row.currentCount / scope.row.maxCount * 100).toFixed(2) : 100 }}%)</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="currentCount"
                  label="Completed Tasks"
                  width="140">
                  <template slot-scope="scope">
                    <span>{{ scope.row.currentCount }} / {{scope.row.maxCount}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="Status"
                  width="120">
                  <template slot-scope="scope">
                    <div :style="scope.row.status === 'Pending' ? 'border-color: #E6A23C;' : scope.row.status === 'Done' ? 'border-color: #67C23A;' : 'border-color: #909399;'" style="display: flex; justify-content: center; align-items: center; width: 80px; height: 28px; background-color: #fff; border-radius: 22px; border: 1px solid;">
                      <span :style="scope.row.status === 'Pending' ? 'color: #E6A23C;' : scope.row.status === 'Done' ? 'color: #67C23A;' : 'color: #909399;'">{{scope.row.status}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="completedAt"
                  label="Completed At"
                  width="120">
                  <template slot-scope="scope">
                    <span v-if="scope.row.completedAt">{{scope.row.completedAt | formatDateTime }}</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            prop="billNo"
            label="Bill No"
            width="110">
            <template slot-scope="scope">
              <span>PL/{{ scope.row.billNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.createdAt !== null">{{ scope.row.createdAt | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="remainingCount"
            label="Pending Tasks"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.maxCount - scope.row.currentCount }} ({{ scope.row.currentCount > 0 ? 100 - Number(scope.row.currentCount / scope.row.maxCount * 100).toFixed(2) : 100 }}%)</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="currentCount"
            label="Completed Tasks"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.currentCount }} / {{scope.row.maxCount}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="export"
            label="Export">
            <template slot-scope="scope">
              <el-button @click="download2(scope.row._id, scope.row.billNo)" :disabled="dataType === ''" type="success" icon="el-icon-download">Download as Excel</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-else
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column 
            prop="expand"
            width="60"
            type="expand">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column
            prop="billNo"
            label="Bill No"
            width="110">
            <template slot-scope="scope">
              <span>{{dataType.toUpperCase()}}/{{ scope.row.billNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.createdAt !== null">{{ scope.row.createdAt | formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="refNo"
            label="Ref No"
            width="60">
            <template slot-scope="scope">
              <span>{{ scope.row.refNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="Sales Person"
            width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.salesPerson }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="term"
            label="Term"
            width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.term }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="Code"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="to"
            label="To"
            width="160">
            <template slot-scope="scope">
              <span>{{ scope.row.customer.name }}</span><br/>
            </template>
          </el-table-column>
          <el-table-column
            prop="tel"
            label="Tel/Fax"
            width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.customer.tel }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="dataType !== 'do'"
            prop="subTotal"
            label="Sub Total"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.subTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="dataType !== 'do'"
            prop="discountTotal"
            label="Discount"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.discountTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="dataType !== 'do'"
            prop="serviceTax"
            label="Service Tax"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceTax }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="dataType !== 'do'"
            prop="total"
            label="Total"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.total }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="dataType !== 'do'"
            prop="deposit"
            label="Deposit"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.deposit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="dataType !== 'do'"
            prop="balance"
            label="Balance"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.balance }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-sizes="[5, 15, 30, 50, 100]"
            :page-size="limit" 
            layout="prev, pager, next, sizes" 
            :total="total"
            style="float:right;"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- <link href="./index.html" ref="pdfFormat" /> -->
  </div>
</template>
<script>
import { findProducts } from '@/api/product'
import { findCustomers } from '@/api/customer'
import { getSalesOrders, downloadSalesOrder} from '@/api/salesorders'
import { getQuotations, downloadQuotation } from '@/api/quotations'
import { getInvoices, downloadInvoice } from '@/api/invoices'
import { getCashSales, downloadCashSale } from '@/api/cashsales'
import { getDeliveryOrders, downloadDeliveryOrder } from '@/api/deliveryorders'
import { getCustomers, downloadCustomer } from '@/api/customer'
import { getProducts, populateProducts, downloadProduct } from '@/api/product'
import { getCustomercodes, downloadCustomercode } from '@/api/customercodes'
import { getAgents, downloadAgent } from '@/api/agent'
import { getUsers, countAll, downloadUser } from '@/api/manager'
import { getPackingLists, downloadPackingList } from '@/api/packinglists'
import sirius from '../../../assets/logo5.png'
import moment from 'moment'

export default {
  name: 'users',
  data() {
    return {
      loading: false,
      btnloading: false,
      customerLoading: false,
      itemLoading: false,
      customercodeLoading: false,
      optionLoading: false,
      customerUsers: [],
      installerUsers: [],
      retailerUsers: [],
      users: [],
      filteredUsers: [],
      options: [],
      options2: [],
      options3: [],
      dataType: '',
      dataCategory: '',
      dateType: 'month',
      dates: '',
      currId: '',
      currUser: {
      },
      currUser2: {
        customerId: '',
        refNo: '',
        salesPerson: '',
        term: '',
        code: '',
        items: []
      },
      userCreate: false,
      userUpdate: false,
      userDelete: false,
      userDuplicate: false,
      total: 0,
      page: 1,
      limit: 15,
      sirius
    }
  },
  filters: {
    formatDate(val) {
      return moment(val).format('DD/MM/YYYY')
    },
    formatDateTime(val) {
      return moment(val).format('DD/MM/YYYY HH:mm')
    },
    timestamp(val) {
      return moment.unix(val).format('DD/MM/YYYY HH:mm')
    },
    username(val, users) {
      if (users.find((v) => val === v._id)) {
        return users.find((v) => val === v._id).userData.username
      }
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1 + ((this.page - 1) * this.limit)
    },
    resetForm() {
      this.currUser = {}
      this.currUser2 = {
        customerId: '',
        refNo: '',
        salesPerson: '',
        term: '',
        code: '',
        items: []
      }
      this.options2 = []
      this.userCreate = false
      this.userUpdate = false
      this.userDelete = false
    },
    handleSizeChange(val) {
      this.limit = val
      this.page = 1
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.fetchData()
    },
    async download2(id, billNo) {
      const time = moment()
      const resp = await downloadPackingList(id)
      const url = URL.createObjectURL(new Blob([resp], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }))
      const link = document.createElement('a')
      link.href = url
      link.download = 'JRHAJJ-PACKINGLIST-' + billNo + '-' + time.format('DDMMYYYY') + '-' + time.format('HHmm') + '.xlsx'
      link.click()
    },
    expandChange(row, expanded) {
      if (row._id) {
        row.loading = true
        if (expanded.find((v) => v._id === row._id)) {
          const array = []
          let page = 1
          let limit = 15
          let total = 0
          switch (this.dataType) {
            case 'fp':
              populateProducts(row._id, limit, page).then(async (resp)=>{
                page = 1
                limit = 15
                total = resp.length
                for (var i in resp.data) {
                  array.push(resp.data[i])
                }
              })
              row.items = array
              row.page = page
              row.limit = limit
              row.total = total
              break
            case 'rm':
              populateProducts(row._id, limit, page).then(async (resp)=>{
                page = 1
                limit = 15
                total = resp.length
                for (var i in resp.data) {
                  array.push(resp.data[i])
                }
              })
              row.items = array
              row.page = page
              row.limit = limit
              row.total = total
              break
            // case 'pl':
            //   populatePackingLists(row._id).then(async (resp)=>{
            //     for (var i in resp) {
            //       let json = {_id: resp[i]._id, billNo: resp[i].billNo }
            //       const resp2 = await QRCode.toDataURL(JSON.stringify(json))
            //       resp[i].qrCode = resp2
            //       array.push(resp[i])
            //     }
            //   })
            //   row.boxes = array
            //   break
          }
        }
        row.loading = false
      }
    },
    async download() {
      let dates = this.dates
      if (this.dateType === 'daterange' && dates) {
        dates = this.dates[0] + ',' + this.dates[1] 
      }
      const time = moment()
      let resp = null
      let name = ''
      switch (this.dataType) {
        case 'q':
          resp = await downloadQuotation(this.limit, this.page, dates, this.dateType)
          name = 'QUOTATIONS'
          break
        case 'so':
          resp = await downloadSalesOrder(this.limit, this.page, dates, this.dateType)
          name = 'SALESORDERS'
          break
        case 'cs':
          resp = await downloadCashSale(this.limit, this.page, dates, this.dateType)
          name = 'CASHSALES'
          break
        case 'inv':
          resp = await downloadInvoice(this.limit, this.page, dates, this.dateType)
          name = 'INVOICES'
          break
        case 'do':
          resp = await downloadDeliveryOrder(this.limit, this.page, dates, this.dateType)
          name = 'DELIVERYORDERS'
          break
        case 'c':
          resp = await downloadCustomer(this.limit, this.page, dates, this.dateType)
          name = 'CUSTOMERS'
          break
        case 'fp':
          resp = await downloadProduct(this.limit, this.page, dates, this.dateType, 'Finished')
          name = 'FINISHEDPRODUCTS'
          break
        case 'rm':
          resp = await downloadProduct(this.limit, this.page, dates, this.dateType, 'Raw')
          name = 'RAWMATS'
          break
        case 'cc':
          resp = await downloadCustomercode(this.limit, this.page, dates, this.dateType)
          name = 'CUSTOMERCODES'
          break
        case 'a':
          resp = await downloadAgent(this.limit, this.page, dates, this.dateType)
          name = 'AGENTS'
          break
        case 'u':
          resp = await downloadUser(this.limit, this.page, dates, this.dateType)
          name = 'USERS'
          break
        // case 'pl':
        //   resp = await downloadPackingList(this.limit, this.page, dates, this.dateType)
        //   name = 'PACKINGLISTS'
        //   break
      }
      if (resp) {
        const url = URL.createObjectURL(new Blob([resp], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }))
        const link = document.createElement('a')
        link.href = url
        link.download = 'JRHAJJ-' + name + '-' + time.format('DDMMYYYY') + '-' + time.format('HHmm') + '.xlsx'
        link.click()
      }
    },
    async fetchData() {
      if (this.dataType) {
        this.loading = true
        let dates = this.dates
        if (this.dateType === 'daterange' && dates) {
          dates = this.dates[0] + ',' + this.dates[1] 
        }
        let resp = []
        let category = ''
        switch (this.dataType) {
          case 'q':
            category = 'sales'
            resp = await getQuotations(this.limit, this.page, '', dates, this.dateType)
            break
          case 'so':
            category = 'sales'
            resp = await getSalesOrders(this.limit, this.page, '', dates, this.dateType)
            break
          case 'cs':
            category = 'sales'
            resp = await getCashSales(this.limit, this.page, '', dates, this.dateType)
            break
          case 'inv':
            category = 'sales'
            resp = await getInvoices(this.limit, this.page, '', dates, this.dateType)
            break
          case 'do':
            category = 'sales'
            resp = await getDeliveryOrders(this.limit, this.page, '', dates, this.dateType)
            break
          case 'c':
            category = 'customer'
            resp = await getCustomers('', this.limit, this.page, '', dates, this.dateType)
            break
          case 'fp':
            category = 'product'
            resp = await getProducts('updatedAt', this.limit, this.page, '', dates, this.dateType, 'Finished')
            break
          case 'rm':
            category = 'product'
            resp = await getProducts('updatedAt', this.limit, this.page, '', dates, this.dateType, 'Raw')
            break
          case 'cc':
            category = 'customercode'
            resp = await getCustomercodes(this.limit, this.page, '', dates, this.dateType)
            break
          case 'a':
            category = 'agent'
            resp = await getAgents('', this.limit, this.page, '', dates, this.dateType)
            break
          case 'u':
            category = 'user'
            // let data = await getUsers('?_start=0&_limit=15')
            let data = await getUsers('')
            resp = {
              data: data,
              length: data.length
            }
            break
          case 'pl':
            category = 'packaging'
            resp = await getPackingLists(this.limit, this.page, '', dates, this.dateType)
            break
        }
        this.users = resp.data
        this.total = resp.length
        this.filteredUsers = this.users
        this.dataCategory = category
        this.loading = false
      }
      this.fetchData2()
    },
    async fetchData2() {
      let dates = this.dates
      if (this.dateType === 'daterange' && dates) {
        dates = this.dates[0] + ',' + this.dates[1] 
      }

      this.optionLoading = true
      this.options = await countAll(dates, this.dateType);
      this.optionLoading = false
    }
  },
  async mounted() {
    // await this.fetchData()
    this.fetchData2()
  }
}
</script>
<style lang="scss">
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
.constantScroll {
  .el-table__body-wrapper {
    transform: rotateX(180deg);
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    transform: rotateX(180deg);
    overflow-x: scroll;
  }
  .el-table__body {
    transform: rotateX(180deg);
  }
  .el-table__empty-block {
    transform: rotateX(180deg);
  }
  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, .25);
    box-shadow: 0 0 1px rgba(255, 255, 255, .25);
  }
}
.el-dialog {
  margin-top: 15vh;
  margin-bottom: 15vh;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
.el-input-size {
  max-width: 320px;
}
.video-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0px 10px;
  height: 240px;
  background-color: rgb(28, 45, 66);
  cursor: pointer;
  color: #fff;
  .thumbnail-container {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    .title-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      background-color: rgb(48, 65, 86);
      padding: 4px 8px;
      .title {
        font-size: 13px;
      }
    }
    .creator-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0px 8px;
      background-color: rgb(48, 65, 86);
      .creator {
        font-size: 16px;
      }
    }
  }
}
</style>