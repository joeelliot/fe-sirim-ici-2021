<template>
  <div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
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
      <!-- <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
        <el-button @click="addProduct" type="success" icon="el-icon-plus">Add Sales Order</el-button>
      </div> -->
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            align="center"
            width="80"
            label="Actions">
            <template slot-scope="scope">
              <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="showDelete(scope.$index, scope.row)"></el-button>
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
                  prop="expand"
                  width="60"
                  type="expand">
                  <template slot-scope="scope">
                    <el-table
                      :default-sort = "{prop: 'createdAt', order: 'descending'}"
                      :data="scope.row.entries" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
                      <el-table-column
                        label="#"
                        width="50" type="index" :index="indexMethod">
                      </el-table-column>
                      <el-table-column
                        prop="amount"
                        label="Amount"
                        width="120">
                        <template slot-scope="scope">
                          <span>{{ scope.row.amount }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="completedAt"
                        label="Completed At"
                        width="120">
                        <template slot-scope="scope">
                          <span v-if="scope.row.completedAt">{{scope.row.completedAt | formatDateTime }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
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
              <span>SO/{{ scope.row.billNo }}</span>
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
            prop="complete"
            label="Complete">
            <template slot-scope="scope">
              <el-button type="success" icon="el-icon-plus" size="small" @click="()=>showUpdate(scope.$index, scope.row)"></el-button>
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
    <el-dialog title="Complete Tasks" :visible.sync="userUpdate" :before-close="resetForm">
      <el-form ref="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Product">
          <el-select style="width: 100%;" v-model="currUser.itemIndex">
            <el-option v-for="(value, index) in currUser.items"
            :label="`${value.description} | ${value.color} | ${value.size} ${value.uom}`"
            :value="index"
            :key="index">
              {{value.description}} | {{value.color}} | {{value.size}} {{value.uom}}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Amount">
          <div style="display: flex; flex-direction: row; align-items: center; justify-content: flex-start;"></div>
          <el-input-number :min="1" :max="currUser.itemIndex !== undefined ? currUser.items[currUser.itemIndex].maxCount - currUser.items[currUser.itemIndex].currentCount : 1" style="width: 180px;" type="number" v-model="currUser.amount"></el-input-number>
          <span>/ {{currUser.itemIndex !== undefined ? currUser.items[currUser.itemIndex].maxCount - currUser.items[currUser.itemIndex].currentCount : 1}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 20px; width: 50px; height: 50px;" @click="test">
          <i class="el-icon-document"></i>
        </div> -->
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" :disabled="currUser.amount === undefined || currUser.itemIndex === undefined" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Delete Production" :visible.sync="userDelete" :before-close="resetForm">
      <span>Are you sure you would like to delete this production?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <link href="./index.html" ref="pdfFormat" /> -->
  </div>
</template>
<script>
import { findProducts } from '@/api/product'
import { findCustomers } from '@/api/customer'
import { getProductions, addProduction, deleteProduction } from '@/api/productions'
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
      currUser: {},
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
      this.currUser = row
    },
    showDelete(index, row) {
      this.currId = row._id
      this.userDelete = true
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
    async downloadAsPDF(id, billNo) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const resp = await pdfProduction(id)
      var link = document.createElement('a')
      link.href = URL.createObjectURL(new Blob([resp]))
      var fileName = 'so-' + billNo + '.pdf'
      link.download = fileName
      link.click()
      loading.close()
    },
    // async onSubmit() {
    //   this.btnloading = true
    //   const data = {
    //     customerId: this.currUser2.customerId,
    //     refNo: this.currUser2.refNo,
    //     salesPerson: this.currUser2.salesPerson,
    //     term: this.currUser2.term,
    //     code: this.currUser2.code,
    //     items: this.currUser2.items
    //   }
    //   try {
    //     await createProduction(data)
    //   } catch (err) {
    //     // console.log(err)
    //   }
    //   this.btnloading = false
    //   this.userCreate = false
    //   await this.fetchData()
    // },
    async onSubmit2() {
      this.btnloading = true
      const data = {
        itemIndex: this.currUser.itemIndex,
        amount: this.currUser.amount
      }
      try {
        await addProduction(this.currUser._id, data)
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
        await deleteProduction(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDelete = false
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
      const resp = await getProductions(this.limit, this.page, this.search, dates, this.dateType)
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