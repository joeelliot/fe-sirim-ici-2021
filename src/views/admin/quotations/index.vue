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
        <el-input placeholder="Search" style="width: 240px; margin-left: 0px;" @change="()=>fetchData()" v-model="search"/>
        <el-button style="margin-left: 10px;" type="primary">Search</el-button>
      </div>
      <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
        <el-button @click="addProduct" type="success" icon="el-icon-plus">Add Quotation</el-button>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            align="center"
            width="180"
            label="Actions">
            <template slot-scope="scope">
              <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="showDelete(scope.$index, scope.row)"></el-button>
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showUpdate(scope.$index, scope.row)"></el-button>
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-document-copy"
              @click="showDuplicate(scope.$index, scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column 
            prop="expand"
            width="60"
            type="expand">
            <template slot-scope="scope">
              <el-table
                :default-sort = "{prop: 'createdAt', order: 'descending'}"
                :data="scope.row.items" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
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
                  width="320">
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
                  prop="quantity"
                  label="Qty"
                  width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.quantity }}</span>
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
                  prop="price"
                  label="Price"
                  width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.price }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="discount"
                  label="Discount"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.discount }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="Amount"
                  width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.amount }}</span>
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
              <span>Q/{{ scope.row.billNo }}</span>
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
              <!-- <span>{{ scope.row.customer.address1 }}</span><br/>
              <span>{{ scope.row.customer.address2 }}</span><br/>
              <span>{{ scope.row.customer.address3 }}</span><br/> -->
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
            prop="subTotal"
            label="Sub Total"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.subTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="discountTotal"
            label="Discount"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.discountTotal }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="bulkDiscount"
            label="Bulk Discount"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.bulkDiscount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="serviceTax"
            label="SST"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceTax }}%</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="total"
            label="Total"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.total }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="deposit"
            label="Deposit"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.deposit }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="balance"
            label="Balance"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.balance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="export"
            label="Export"
            width="110">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-download" @click="()=>downloadAsPDF(scope.row._id, scope.row.billNo)">PDF</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="export"
            label="Sales Order"
            width="210">
            <template slot-scope="scope">
              <el-button type="primary" @click="()=>nextStage(scope.row._id)">Create Sales Order</el-button>
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
    <el-dialog title="Add Quotation" :visible.sync="userCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="Customer">
          <el-select
            class="el-input-size"
            v-model="currUser2.customerId"
            filterable
            remote
            placeholder="Please enter a keyword"
            @change="()=>{
              options.filter((v) => {
                if (v._id === currUser2.customerId) {
                  currUser2.code = v.category
                }
              })
            }"
            :remote-method="remoteMethod"
            :loading="customerLoading"
            >
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.billNo + ' | ' + item.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Ref No.">
          <el-input class="el-input-size" v-model="currUser2.refNo"></el-input>
        </el-form-item>
        <el-form-item label="Sales Person">
          <el-input class="el-input-size" v-model="currUser2.salesPerson"></el-input>
        </el-form-item>
        <el-form-item label="Term">
          <el-input class="el-input-size" v-model="currUser2.term"></el-input>
        </el-form-item>
        <el-form-item label="Code">
          <!-- <el-input class="el-input-size" v-model="currUser2.code"></el-input> -->
          <!-- <el-select
            style="width: 100%;"
            class="el-input-size"
            v-model="currUser2.code"
            filterable
            remote
            placeholder="Please enter a keyword"
            :remote-method="remoteMethod3"
            :loading="customercodeLoading"
            >
            <el-option
              v-for="item3 in options3"
              :key="item3._id"
              :label="item3.code"
              :value="item3.code">
            </el-option>
          </el-select> -->
          <span>{{currUser2.code}}</span>
        </el-form-item>
        <el-form-item label="SST">
          <el-input-number v-model="currUser2.serviceTax"></el-input-number>
        </el-form-item>
        <el-form-item label="Products">
          <div style="display: flex; align-items: flex-start; justify-content: column; flex-direction: column; width: 100%;">
            <div v-for="(item, key) in currUser2.items" :key="key" style="display: flex; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 20px 20px 20px 20px; background-color: #fff; width: 100%; border-bottom: 1px solid #ccc;">
              <el-form :rules="rules2" :ref="'currInstaller' + key" :model="item">
                <el-form-item prop="code" label="Code">
                  <!-- <el-input class="el-input-size" v-model="item.code"></el-input> -->
                  <el-select
                    style="width: 100%;"
                    class="el-input-size"
                    v-model="item._id"
                    filterable
                    remote
                    placeholder="Please enter a keyword"
                    @change="()=>{
                      if (item._id !== '') {
                        const product = options2[key].find((v)=>v._id === item._id)
                        item.code = product.code
                        item.description = product.description
                        item.price = product.price
                        item.uom = product.uom
                      }
                    }"
                    :remote-method="(query)=>remoteMethod2(query, key)"
                    :loading="itemLoading"
                    >
                    <el-option
                      v-for="item2 in options2[key]"
                      :key="item2._id"
                      :label="item2.code"
                      :value="item2._id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="description" label="Description">
                  <el-input class="el-input-size" v-model="item.description"></el-input>
                </el-form-item>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; width: 100%;">
                  <el-form-item prop="color" label="Color">
                    <el-input class="el-input-size" v-model="item.color"></el-input>
                  </el-form-item>
                  <el-form-item prop="size" label="Size">
                    <el-input class="el-input-size" type="number" v-model="item.size"></el-input>
                  </el-form-item>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; width: 100%;">
                  <el-form-item prop="quantity" label="Quantity">
                    <el-input class="el-input-size" type="number" v-model="item.quantity"></el-input>
                  </el-form-item>
                  <el-form-item prop="uom" label="UOM (Unit of Measure)">
                    <el-input class="el-input-size" v-model="item.uom"></el-input>
                  </el-form-item>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; width: 100%;">
                  <el-form-item prop="price" label="Price">
                    <el-input class="el-input-size" type="number" v-model="item.price"></el-input>
                  </el-form-item>
                  <el-form-item prop="discount" label="Discount">
                    <el-input class="el-input-size" type="number" v-model="item.discount"></el-input>
                  </el-form-item>
                </div>
                <el-button @click="()=>{
                  currUser2.items.splice(key, 1)
                  options2.splice(key, 1)
                }" size="small" icon="el-icon-delete" type="danger">Remove</el-button>
              </el-form>
            </div>
            <el-button @click="addItem2" size="small" icon="el-icon-plus" type="primary">Add</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Bulk Discount (optional)">
          <el-input class="el-input-size" type="number" v-model="currUser2.bulkDiscount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 20px; width: 50px; height: 50px;" @click="test">
          <i class="el-icon-document"></i>
        </div>
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Update Quotation" :visible.sync="userUpdate" :before-close="resetForm">
      <el-form ref="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Customer">
          <el-select
            class="el-input-size"
            v-model="currUser.customerId"
            filterable
            remote
            placeholder="Please enter a keyword"
            @change="()=>{
              options.filter((v) => {
                if (v._id === currUser.customerId) {
                  currUser.code = v.category
                }
              })
            }"
            :remote-method="remoteMethod"
            :loading="customerLoading"
            >
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.billNo + ' | ' + item.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Ref No.">
          <el-input class="el-input-size" v-model="currUser.refNo"></el-input>
        </el-form-item>
        <el-form-item label="Sales Person">
          <el-input class="el-input-size" v-model="currUser.salesPerson"></el-input>
        </el-form-item>
        <el-form-item label="Term">
          <el-input class="el-input-size" v-model="currUser.term"></el-input>
        </el-form-item>
        <el-form-item label="Code">
          <!-- <el-input class="el-input-size" v-model="currUser.code"></el-input> -->
          <!-- <el-select
            style="width: 100%;"
            class="el-input-size"
            v-model="currUser.code"
            filterable
            remote
            placeholder="Please enter a keyword"
            :remote-method="remoteMethod3"
            :loading="customercodeLoading"
            >
            <el-option
              v-for="item3 in options3"
              :key="item3._id"
              :label="item3.code"
              :value="item3.code">
            </el-option>
          </el-select> -->
          <span>{{currUser.code}}</span>
        </el-form-item>
        <el-form-item label="SST">
          <el-input-number v-model="currUser.serviceTax"></el-input-number>
        </el-form-item>
        <el-form-item label="Products">
          <div style="display: flex; align-items: flex-start; justify-content: column; flex-direction: column; width: 100%;">
            <div v-for="(item, key) in currUser.items" :key="key" style="display: flex; position: relative; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 20px 20px 20px 20px; background-color: #fff; width: 100%; border-bottom: 1px solid #ccc;">
              <el-form :rules="rules2" :ref="'currInstaller' + key" :model="item">
                <el-form-item prop="code" label="Code">
                  <!-- <el-input class="el-input-size" v-model="item.code"></el-input> -->
                  <el-select
                    style="width: 100%;"
                    class="el-input-size"
                    v-model="item._id"
                    filterable
                    remote
                    placeholder="Please enter a keyword"
                    @change="()=>{
                      if (item._id !== '') {
                        const product = options2[key].find((v)=>v._id === item._id)
                        item.code = product.code
                        item.description = product.description
                        item.price = product.price
                        item.uom = product.uom
                      }
                    }"
                    :remote-method="(query)=>remoteMethod2(query, key)"
                    :loading="itemLoading"
                    >
                    <el-option
                      v-for="item2 in options2[key]"
                      :key="item2._id"
                      :label="item2.code"
                      :value="item2._id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="description" label="Description">
                  <el-input class="el-input-size" v-model="item.description"></el-input>
                </el-form-item>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; width: 100%;">
                  <el-form-item prop="color" label="Color">
                    <el-input class="el-input-size" v-model="item.color"></el-input>
                  </el-form-item>
                  <el-form-item prop="size" label="Size">
                    <el-input class="el-input-size" type="number" v-model="item.size"></el-input>
                  </el-form-item>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; width: 100%;">
                  <el-form-item prop="quantity" label="Quantity">
                    <el-input class="el-input-size" type="number" v-model="item.quantity"></el-input>
                  </el-form-item>
                  <el-form-item prop="uom" label="UOM (Unit of Measure)">
                    <el-input class="el-input-size" v-model="item.uom"></el-input>
                  </el-form-item>
                </div>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; width: 100%;">
                  <el-form-item prop="price" label="Price">
                    <el-input class="el-input-size" type="number" v-model="item.price"></el-input>
                  </el-form-item>
                  <el-form-item prop="discount" label="Discount">
                    <el-input class="el-input-size" type="number" v-model="item.discount"></el-input>
                  </el-form-item>
                </div>
                <el-button @click="()=>{
                  currUser.items.splice(key, 1)
                  options2.splice(key, 1)
                }" size="small" icon="el-icon-delete" type="danger">Remove</el-button>
              </el-form>
            </div>
            <el-button @click="addItem" size="small" icon="el-icon-plus" type="primary">Add</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Bulk Discount (optional)">
          <el-input class="el-input-size" type="number" v-model="currUser.bulkDiscount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 20px; width: 50px; height: 50px;" @click="test">
          <i class="el-icon-document"></i>
        </div>
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Delete Quotation" :visible.sync="userDelete" :before-close="resetForm">
      <span>Are you sure you would like to delete this quotation?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Duplicate Quotation" :visible.sync="userDuplicate" :before-close="resetForm">
      <span>Are you sure you would like to duplicate this quotation?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit4">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <link href="./index.html" ref="pdfFormat" /> -->
  </div>
</template>
<script>
import { findProducts } from '@/api/product'
import { findCustomers } from '@/api/customer'
import { createSalesOrder } from '@/api/salesorders'
import { getQuotations, createQuotation, updateQuotation, deleteQuotation, duplicateQuotation, pdfQuotation } from '@/api/quotations'
import { findCustomercodes } from '@/api/customercodes'
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
      customerUsers: [],
      installerUsers: [],
      retailerUsers: [],
      users: [],
      filteredUsers: [],
      options: [],
      options2: [],
      options3: [],
      search: '',
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
        serviceTax: '7',
        bulkDiscount: '0.00',
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
    async showUpdate(index, row) {
      this.userUpdate = true
      this.customerLoading = true
      const resp = await findCustomers(row.customer.billNo)
      this.options = resp.data
      this.customerLoading = false
      this.customercodeLoading = true
      const resp3 = await findCustomercodes(row.customer.code)
      this.options3 = resp3.data
      this.customercodeLoading = false
      this.currUser = row
      for (var i in row.items) {
        const v = row.items[i]
        row.items[i]._id = v.code
        this.itemLoading = true
        const resp2 = await findProducts(v.code)
        this.options2.push(resp2.data)
        this.itemLoading = false
      }
    },
    showDelete(index, row) {
      this.currId = row._id
      this.userDelete = true
    },
    showDuplicate(index, row) {
      this.currId = row._id
      this.userDuplicate = true
    },
    resetForm() {
      this.currUser = {}
      this.currUser2 = {
        customerId: '',
        refNo: '',
        salesPerson: '',
        term: '',
        code: '',
        serviceTax: '7',
        bulkDiscount: '0.00',
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
    async addProduct() {
      this.userCreate = true
      this.customerLoading = true
      const resp = await findCustomers()
      this.options = resp.data
      this.customerLoading = false
      this.customercodeLoading = true
      const resp3 = await findCustomercodes()
      this.options3 = resp3.data
      this.customercodeLoading = false
    },
    async nextStage(id) {
      try {
        await createSalesOrder({
          quotationId: id
        })
        this.$router.push({ name: 'sales' })
      } catch (err) {
        // console.log(err)
      }
    },
    async downloadAsPDF(id, billNo) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const resp = await pdfQuotation(id)
      var link = document.createElement('a')
      link.href = URL.createObjectURL(new Blob([resp]))
      var fileName = 'quo-' + billNo + '.pdf'
      link.download = fileName
      link.click()
      loading.close()
    },
    async onSubmit() {
      this.btnloading = true
      const data = {
        customerId: this.currUser2.customerId,
        refNo: this.currUser2.refNo,
        salesPerson: this.currUser2.salesPerson,
        term: this.currUser2.term,
        // code: this.currUser2.code,
        bulkDiscount: this.currUser2.bulkDiscount,
        serviceTax: this.currUser2.serviceTax,
        items: this.currUser2.items
      }
      try {
        await createQuotation(data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userCreate = false
      await this.fetchData()
    },
    async onSubmit2() {
      this.btnloading = true
      const data = {
        customerId: this.currUser.customerId,
        refNo: this.currUser.refNo,
        salesPerson: this.currUser.salesPerson,
        term: this.currUser.term,
        // code: this.currUser.code,
        bulkDiscount: this.currUser.bulkDiscount,
        serviceTax: this.currUser.serviceTax,
        items: this.currUser.items
      }
      try {
        await updateQuotation(this.currUser._id, data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userUpdate = false
      await this.fetchData()
    },
    async onSubmit3() {
      this.btnloading = true
      try {
        await deleteQuotation(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDelete = false
      await this.fetchData()
    },
    async onSubmit4() {
      this.btnloading = true
      try {
        await duplicateQuotation(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDuplicate = false
      await this.fetchData()
    },
    async addItem() {
      this.currUser.items.push({
        code: '',
        description: '',
        color: '',
        size: '',
        quantity: '',
        uom: '',
        price: '0.00',
        discount: '0.00'
      })
      const resp2 = await findProducts()
      this.options2.push(resp2.data)
    },
    async addItem2() {
      this.currUser2.items.push({
        code: '',
        description: '',
        color: '',
        size: '',
        quantity: '',
        uom: '',
        price: '0.00',
        discount: '0.00'
      })
      const resp2 = await findProducts()
      this.options2.push(resp2.data)
    },
    async remoteMethod(query) {
      this.customerLoading = true
      const resp = await findCustomers(query)
      this.options = resp.data
      this.customerLoading = false
    },
    async remoteMethod2(query, key) {
      this.itemLoading = true
      const resp = await findProducts(query)
      this.options2[key] = resp.data
      this.itemLoading = false
    },
    async remoteMethod3(query) {
      this.customercodeLoading = true
      const resp = await findCustomercodes(query)
      this.options3 = resp.data
      this.customercodeLoading = false
    },
    log(v) {
      console.log(v)
    },
    test() {
      this.currUser2 = {
        customerId: '',
        refNo: '0001',
        salesPerson: 'Siti Khadijah',
        term: '0001',
        code: 'CU00542',
        items: []
        // items: [
        //   {
        //     code: 'ST00318',
        //     description: 'TELEKUNG PASANG (NAVY BLUE)',
        //     quantity: '107',
        //     uom: 'Unit',
        //     price: '78.00',
        //     discount: '0',
        //     amount: '8346.00'
        //   },
        //   {
        //     code: 'ST00318',
        //     description: 'TELEKUNG PASANG (PEACH)',
        //     quantity: '107',
        //     uom: 'Unit',
        //     price: '78.00',
        //     discount: '0',
        //     amount: '4134.00'
        //   },
        //   {
        //     code: 'ST00318',
        //     description: 'TELEKUNG PASANG (PURPLE)',
        //     quantity: '107',
        //     uom: 'Unit',
        //     price: '78.00',
        //     discount: '0',
        //     amount: '8190.00'
        //   }
        // ],
      }
    },
    async fetchData() {
      this.loading = true
      let dates = this.dates
      if (this.dateType === 'daterange' && dates) {
        dates = this.dates[0] + ',' + this.dates[1] 
      }
      const resp = await getQuotations(this.limit, this.page, this.search, dates, this.dateType)
      this.users = resp.data
      this.total = resp.length
      this.filteredUsers = this.users
      this.loading = false
    }
  },
  async mounted() {
    await this.fetchData()
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