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
      <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
        <el-button @click="addProduct()" type="success" icon="el-icon-plus">Add Product</el-button>
        <el-button @click="selectProduct()" style="margin-left: 10px;" type="success" icon="el-icon-upload">Upload Product</el-button>
        <input @change="(event)=>fileSelected(event)" style="display: none;" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ref="fileSelect">
      </div>
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading"
          @expand-change="expandChange" fit highlight-current-row>
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
              <!-- <div class="pagination-container">
                <el-pagination 
                  v-if="scope.row.page !== undefined && scope.row.limit !== undefined && scope.row.total !== undefined"
                  @size-change="(val)=>handleSizeChangeHistory(val, scope.row)"
                  @current-change="(val)=>handleCurrentChangeHistory(val, scope.row)"
                  :current-page.sync="scope.row.page"
                  :page-sizes="[5, 15, 30, 50, 100]"
                  :page-size="scope.row.limit" 
                  layout="prev, pager, next, sizes" 
                  :total="scope.row.total"
                  style="float:right;"
                >
                </el-pagination>
                <span>{{scope.row.page}} | {{scope.row.limit}} | {{scope.row.total}}</span>
              </div> -->
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
              <span @click="showUpdate2(scope.$index, scope.row
              )" style="color: #409EFF; cursor: pointer;">{{ scope.row.quantity }}<i style="margin-left: 4px;" class="el-icon-edit"/></span>
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
            prop="createdAt"
            label="Created At"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.createdAt !== null">{{ scope.row.createdAt | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="130"
            label="Actions">
            <template slot-scope="scope">
              <el-button
              type="danger"
              size="mini"
              icon="el-icon-minus"
              @click="showSubtract(scope.$index, scope.row)"></el-button>
              <el-button
              type="success"
              size="mini"
              icon="el-icon-plus"
              @click="showAdd(scope.$index, scope.row)"></el-button>
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
    <el-dialog title="Add Product" :visible.sync="userCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="Code">
          <el-input class="el-input-size" v-model="currUser2.code"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="el-input-size" v-model="currUser2.description"></el-input>
        </el-form-item>
        <el-form-item label="UOM">
          <el-input class="el-input-size" v-model="currUser2.uom"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input class="el-input-size" type="number" v-model="currUser2.price"></el-input>
        </el-form-item>
        <el-form-item label="Quantity">
          <el-input class="el-input-size" type="number" v-model="currUser2.quantity"></el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-select class="el-input-size" v-model="currUser2.category">
            <el-option
              label="Finished Product"
              value="Finished">
              Finished Product
            </el-option>
            <el-option
              label="Raw Material"
              value="Raw">
              Raw Material
            </el-option>
          </el-select>
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
    <el-dialog title="Edit Product" :visible.sync="userUpdate" :before-close="resetForm">
      <el-form ref="currUser" v-if="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Code">
          <el-input class="el-input-size" v-model="currUser.code"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input class="el-input-size" v-model="currUser.description"></el-input>
        </el-form-item>
        <el-form-item label="UOM">
          <el-input class="el-input-size" v-model="currUser.uom"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input class="el-input-size" type="number" v-model="currUser.price"></el-input>
        </el-form-item>
        <el-form-item label="Quantity">
          <el-input class="el-input-size" type="number" v-model="currUser.quantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Delete Product" :visible.sync="userDelete" :before-close="resetForm">
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Add Product" :visible.sync="userAdd" :before-close="resetForm">
      <el-form ref="currUser" v-if="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Quantity">
          <el-input class="el-input-size" type="number" v-model="currUser2.quantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit4">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Subtract Product" :visible.sync="userSubtract" :before-close="resetForm">
      <el-form ref="currUser" v-if="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Quantity">
          <el-input class="el-input-size" type="number" v-model="currUser2.quantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit5">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Edit Product" :visible.sync="userUpdate2" :before-close="resetForm">
      <el-form ref="currUser" v-if="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Quantity">
          <el-input class="el-input-size" type="number" v-model="currUser.quantity"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit6">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Duplicate Product" :visible.sync="userDuplicate" :before-close="resetForm">
      <span>Are you sure you would like to duplicate this product?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit7">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Success" :visible.sync="success">
      <span style="word-break: break-word;">Congratulations! The products have been added to the TTS system:</span>
      <span style="display: flex; word-break: break-word;">Success:</span>
      <ul style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
        <li v-for="(item, index) in successMessages" :key="index" style="word-break: break-word; margin-bottom: 8px; color: #67C23A;">
          {{item.message}}
        </li>
      </ul>
      <span style="display: flex; word-break: break-word;">Errors:</span>
      <ul style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start;">
        <li v-for="(item, index) in errorMessages" :key="index" style="word-break: break-word; margin-bottom: 8px; color: #F56C6C;">
          {{item.message}}
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="success = false">Cancel</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Failure" :visible.sync="error">
      <span style="word-break: break-word;">We are sorry to inform you that an error has occured: {{errorMessage}}.</span>
      <span style="word-break: break-word;">Please try again.</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="error = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getProducts, createProducts, updateProducts, duplicateProduct, populateProducts, removeProducts, addProducts, subtractProducts, uploadProducts } from '@/api/product'
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
        code: '',
        description: '',
        uom: '',
        price: '0.00',
        category: '',
        quantity: '0'
      },
      userCreate: false,
      userUpdate: false,
      userDelete: false,
      userAdd: false,
      userUpdate2: false,
      userSubtract: false,
      userDuplicate: false,
      success: false,
      error: false,
      successMessages: [],
      errorMessages: [],
      errorMessage: '',
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
      if (row.metadata === undefined) {
        this.currUser.metadata = {}
      }
      this.userUpdate = true
    },
    showUpdate2(index, row) {
      this.currUser = row
      if (row.metadata === undefined) {
        this.currUser.metadata = {}
      }
      this.userUpdate2 = true
    },
    showDelete(index, row) {
      this.currId = row._id
      this.userDelete = true
    },
    showAdd(index, row) {
      this.currId = row._id
      this.userAdd = true
    },
    showSubtract(index, row) {
      this.currId = row._id
      this.userSubtract = true
    },
    showDuplicate(index, row) {
      this.currId = row._id
      this.userDuplicate = true
    },
    resetForm() {
      this.currUser = {}
      this.currUser2 = {
        code: '',
        description: '',
        uom: '',
        price: '0.00',
        category: '',
        quantity: '0'
      }
      this.userCreate = false
      this.userUpdate = false
      this.userDelete = false
      this.userAdd = false
      this.userUpdate2 = false
      this.userSubtract = false
      this.userDuplicate = false
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
    selectProduct() {
      this.$refs.fileSelect.click()
    },
    async fileSelected(event) {
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      this.$refs.fileSelect.value = ''
      this.fetchData()

      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const resp = await uploadProducts(formData)
        this.successMessages = resp.successMessages
        this.errorMessages = resp.errorMessages
        this.success = true
        this.idList = []
        this.fetchData()
        loading.close()
      } catch (err) {
        this.errorMessage = err.response.data.error
        this.error = true
        this.idList = []
        loading.close()
      }
    },
    addProduct() {
      this.userCreate = true
    },
    async onSubmit() {
      this.btnloading = true
      const data = {
        code: this.currUser2.code,
        description: this.currUser2.description,
        uom: this.currUser2.uom,
        price: this.currUser2.price,
        quantity: this.currUser2.quantity,
        category: this.currUser2.category
      }
      try {
        await createProducts(data)
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
        code: this.currUser.code,
        description: this.currUser.description,
        uom: this.currUser.uom,
        price: this.currUser.price,
        quantity: this.currUser.quantity,
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
    async onSubmit3() {
      this.btnloading = true
      try {
        await removeProducts(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDelete = false
      await this.fetchData()
    },
    async onSubmit4() {
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
    async onSubmit5() {
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
    async onSubmit6() {
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
      this.userUpdate2 = false
      await this.fetchData()
    },
    async onSubmit7() {
      this.btnloading = true
      try {
        await duplicateProduct(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDuplicate = false
      await this.fetchData()
    },
    async handleSizeChangeHistory(val, row) {
      // console.log('now or')
      let page = 1
      let limit = 15
      let total = 0
      const array = []
      populateProducts(row._id, row.page, row.limit).then(async (resp)=>{
        limit = val
        page = 1
        total = resp.length
        for (var i in resp.data) {
          array.push(resp.data[i])
        }
      })
      row.items = array
      row.page = page
      row.limit = limit
      row.total = total
    },
    async handleCurrentChangeHistory(val, row) {
      // console.log('never')
      let page = 1
      let limit = 15
      let total = 0
      const array = []
      populateProducts(row._id, row.page, row.limit).then(async (resp)=>{
        limit = row.limit
        page = val
        total = resp.length
        for (var i in resp.data) {
          array.push(resp.data[i])
        }
      })
      row.items = array
      row.page = page
      row.limit = limit
      row.total = total
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
      const resp = await getProducts('createdAt', this.limit, this.page, this.search, dates, this.dateType)
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