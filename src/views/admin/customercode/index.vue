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
        <el-button @click="addProduct" type="success" icon="el-icon-plus">Add Customer Code</el-button>
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
    <el-dialog title="Add Customer Code" :visible.sync="userCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="Code">
          <el-input class="el-input-size" v-model="currUser2.code"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input
          type="textarea"
          :rows="4" style="word-break: normal;" class="el-input-size" v-model="currUser2.description"></el-input>
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
    <el-dialog title="Update Customer Code" :visible.sync="userUpdate" :before-close="resetForm">
      <el-form ref="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Code">
          <el-input class="el-input-size" v-model="currUser.code"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input
          type="textarea"
          :rows="4" style="word-break: normal;" class="el-input-size" v-model="currUser.description"></el-input>
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
    <el-dialog title="Delete Customer Code" :visible.sync="userDelete" :before-close="resetForm">
      <span>Are you sure you would like to delete this customer code?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Duplicate Customer Code" :visible.sync="userDuplicate" :before-close="resetForm">
      <span>Are you sure you would like to duplicate this customer code?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit4">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <link href="./index.html" ref="pdfFormat" /> -->
  </div>
</template>
<script>
import { getCustomercodes, createCustomercode, duplicateCustomercode, updateCustomercode, deleteCustomercode } from '@/api/customercodes'
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
    showUpdate(index, row) {
      this.currUser = row
      this.userUpdate = true
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
        items: []
      }
      this.options2 = []
      this.userCreate = false
      this.userUpdate = false
      this.userDelete = false
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
    addProduct() {
      this.userCreate = true
    },
    async onSubmit() {
      this.btnloading = true
      const data = {
        code: this.currUser2.code,
        description: this.currUser2.description
      }
      try {
        await createCustomercode(data)
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
        description: this.currUser.description
      }
      try {
        await updateCustomercode(this.currUser._id, data)
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
        await deleteCustomercode(this.currId)
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
        await duplicateCustomercode(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDuplicate = false
      await this.fetchData()
    },
    async remoteMethod(query) {
      if (query !== '') {
        this.customerLoading = true
        const resp = await findCustomers(query)
        this.options = resp.data
        this.customerLoading = false
      } else {
        this.options = []
      }
    },
    async remoteMethod2(query, key) {
      if (query !== '') {
        this.itemLoading = true
        const resp = await findProducts(query)
        this.options2[key] = resp.data
        this.itemLoading = false
      } else {
        this.options2[key]= []
      }
    },
    async remoteMethod3(query) {
      if (query !== '') {
        this.customercodeLoading = true
        const resp = await findCustomercodes(query)
        this.options3 = resp.data
        this.customerLoading = false
      } else {
        this.options3 = []
      }
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
      const resp = await getCustomercodes(this.limit, this.page, this.search, dates, this.dateType)
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