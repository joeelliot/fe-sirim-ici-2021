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
        <el-button style="margin-left: 10px;" type="primary" icon="el-icon-download" @click="()=>downloadAsPDF()">PDF</el-button>
      </div>
      <!-- <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
        <el-button @click="addProduct()" type="success" icon="el-icon-plus">Add Product</el-button>
      </div> -->
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'updatedAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading"
          @expand-change="expandChange" fit highlight-current-row>
          <!-- <el-table-column 
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
          </el-table-column> -->
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
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
              <!-- <span @click="showUpdate(scope.$index, scope.row
              )" style="color: #409EFF; cursor: pointer;">{{ scope.row.quantity }}<i style="margin-left: 4px;" class="el-icon-edit"/></span> -->
              <span>{{ scope.row.quantity }}</span>
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
            label="Last Updated At"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.updatedAt !== null">{{ scope.row.updatedAt | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="90"
            label="Actions">
            <template slot-scope="scope">
              <el-button
              type="danger"
              size="mini"
              icon="el-icon-minus"
              @click="showSubtract(scope.$index, scope.row)"></el-button>
              <!-- <el-button
              type="success"
              size="mini"
              icon="el-icon-plus"
              @click="showAdd(scope.$index, scope.row)"></el-button> -->
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
    <!-- <el-dialog title="Add Product" :visible.sync="userAdd" :before-close="resetForm">
      <el-form ref="currUser" v-if="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Quantity">
          <el-input class="el-input-size" type="number" v-model="currUser2.quantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit">Confirm</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="Subtract Product" :visible.sync="userSubtract" :before-close="resetForm">
      <el-form ref="currUser" v-if="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Quantity">
          <el-input class="el-input-size" type="number" v-model="currUser2.quantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog title="Edit Product" :visible.sync="userUpdate" :before-close="resetForm">
      <el-form ref="currUser" v-if="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Quantity">
          <el-input class="el-input-size" type="number" v-model="currUser.quantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>
<script>
import { getProducts, pdfProducts, populateProducts, addProducts, subtractProducts, updateProducts } from '@/api/product'
import moment from 'moment'

export default {
  name: 'users',
  data() {
    return {
      loading: true,
      btnloading: false,
      customerUsers: [],
      installerUsers: [],
      retailerUsers: [],
      users: [],
      filteredUsers: [],
      search: '',
      dateType: 'month',
      dates: '',
      currId: '',
      currUser: {},
      currUser2: {
        quantity: '0'
      },
      userUpdate: false,
      userSubtract: false,
      userAdd: false,
      total: 0,
      page: 1,
      limit: 15
    }
  },
  filters: {
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
    showUpdate(index, row) {
      this.currUser = row
      this.userUpdate = true
    },
    showSubtract(index, row) {
      this.currId = row._id
      this.userSubtract = true
    },
    showAdd(index, row) {
      this.currId = row._id
      this.userAdd = true
    },
    resetForm() {
      this.currUser = {}
      this.currUser2 = {
        quantity: '0'
      }
      this.userAdd = false
      this.userSubtract = false
      this.userUpdate = false
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
    addProduct() {
      this.userCreate = true
    },
    async downloadAsPDF() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let dates = this.dates
      if (this.dateType === 'daterange' && dates) {
        dates = this.dates[0] + ',' + this.dates[1] 
      }
      const resp = await pdfProducts('updatedAt', this.limit, this.page, this.search, dates, this.dateType, 'Finished')
      var link = document.createElement('a')
      link.href = URL.createObjectURL(new Blob([resp]))
      var fileName = ""
      if (dates) {
        fileName = 'product-finished-' + moment(this.dates[0]).format('YYYYMMDD') + '-' + moment(this.dates[1]).format('YYYYMMDD') + '.pdf'
      } else {
        fileName = 'product-finished-master.pdf'
      }
      link.download = fileName
      link.click()
      loading.close()
    },
    async onSubmit() {
      this.btnloading = true
      const data = {
        quantity: this.currUser2.quantity
      }
      try {
        await addProducts(this.currId, data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userAdd = false
      await this.fetchData()
    },
    async onSubmit2() {
      this.btnloading = true
      const data = {
        quantity: this.currUser2.quantity
      }
      try {
        await subtractProducts(this.currId, data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userSubtract = false
      await this.fetchData()
    },
    async onSubmit3() {
      this.btnloading = true
      const data = {
        quantity: this.currUser.quantity
      }
      try {
        await updateProducts(this.currUser._id, data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userUpdate = false
      await this.fetchData()
    },
    expandChange(row, expanded) {
      if (row._id) {
        row.loading = true
        if (expanded.find((v) => v._id === row._id)) {
          let page = 1
          let limit = 15
          let total = 0
          const array = []
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
          console.log(row)
        }
        row.loading = false
      }
    },
    test() {
      this.currUser2 = {
        code: 'ST00318',
        description: 'TELEKUNG PASANG',
        uom: 'CM',
        price: '54.00'
      }
    },
    async fetchData() {
      this.loading = true
      let dates = this.dates
      if (this.dateType === 'daterange' && dates) {
        dates = this.dates[0] + ',' + this.dates[1] 
      }
      const resp = await getProducts('updatedAt', this.limit, this.page, this.search, dates, this.dateType, 'Finished')
      this.users = resp.data
      this.total = resp.length
      this.filteredUsers = this.users
      this.loading = false
    }
  },
  async mounted() {
    this.dateType = 'daterange'
    const nowdate = moment().format('YYYY-MM-DD')
    this.dates = [nowdate, nowdate]
    await this.fetchData()
  }
}
</script>
<style lang="scss">
.el-dialog {
  margin-top: 15vh;
  margin-bottom: 15vh;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
}
.selectBackground {
  .el-input__inner {
    background-color: #eee;
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