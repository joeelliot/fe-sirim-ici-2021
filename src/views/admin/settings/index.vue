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
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="Order No"
            width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.orderNo }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="billing_hp2"
            label="Billing HP"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.data.billing_hp2 }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="Price (RM)"
            width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="Created At"
            width="160">
            <template slot-scope="scope">
              <span v-if="scope.row.createdAt !== null">{{ scope.row.createdAt | formatDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="Status"
            width="160">
            <template slot-scope="scope">
              <span></span>
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
  </div>
</template>
<script>
import { getOrders, countOrders } from '@/api/order'
import moment from 'moment'

export default {
  name: 'users',
  data() {
    return {
      loading: false,
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
      currUser: {
        metadata: {}
      },
      currUser2: {
        appCode: '',
        code: '',
        name: '',
        description: '',
        price: 0,
        status: '',
        active: true
      },
      userCreate: false,
      userUpdate: false,
      userDelete: false,
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
    showDelete(index, row) {
      this.currId = row._id
      this.userDelete = true
    },
    resetForm() {
      this.currUser = {
        metadata: {}
      }
      this.currUser2 = {
        appCode: '',
        code: '',
        name: '',
        description: '',
        price: 0,
        status: '',
        active: true
      }
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
    addProduct() {
      this.userCreate = true
    },
    async onSubmit() {
      this.btnloading = true
      const data = {
        appCode: this.currUser2.appCode,
        code: this.currUser2.code,
        name: this.currUser2.name,
        description: this.currUser2.description,
        price: this.currUser2.price,
        status: this.currUser2.status,
        active: this.currUser2.active
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
        appCode: this.currUser.appCode,
        code: this.currUser.code,
        name: this.currUser.name,
        description: this.currUser.description,
        price: this.currUser.price,
        status: this.currUser.status,
        active: this.currUser.active
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
    test() {
      this.currUser2 = {
        appCode: 'ABC',
        code: '123',
        name: 'Teh Ais',
        description: 'Teh Ais ini dibuat dari Malaysia',
        price: 2.00,
        status: 'Available',
        active: true
      }
    },
    async fetchData() {
      // this.loading = true
      // this.users = await getOrders(this.limit, this.page)
      // this.total = await countOrders()
      // this.filteredUsers = this.users
      // this.loading = false
    }
  },
  async mounted() {
    // await this.fetchData()
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