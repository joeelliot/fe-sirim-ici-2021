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
      <!-- <div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: flex-start;">
        <el-button @click="()=>addUser()" type="primary">Add User</el-button>
      </div> -->
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers[page-1]" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            align="center"
            width="80"
            label="Profile">
            <template slot-scope="scope">
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="showDetails(scope.$index, scope.row)"></el-button>
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
          <el-table-column
            prop="confirmed"
            label="Active"
            width="60">
            <template slot-scope="scope">
              <el-switch @change="()=>changeActive(scope.row)" :value="scope.row.confirmed"></el-switch>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination 
            :current-page.sync="page"
            :page-size="limit" 
            layout="prev, pager, next" 
            :total="total"
            style="float:right;"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="Create User" :visible.sync="userCreate" :before-close="resetForm">
      <span style="display: block; padding: 0px 20px 20px; text-align: right; box-sizing: border-box;">
        <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 20px; width: 50px; height: 50px;" @click="test">
          <i class="el-icon-document"></i>
        </div>
        <el-button @click="userCreate = false">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit">Confirm</el-button>
      </span>
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="Username">
          <el-input class="el-input-size" v-model="currUser2.username"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input class="el-input-size" v-model="currUser2.email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input class="el-input-size" v-model="currUser2.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 20px; width: 50px; height: 50px;" @click="test">
          <i class="el-icon-document"></i>
        </div>
        <el-button @click="userCreate = false">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Edit User" :visible.sync="userEdit" :before-close="resetForm">
      <span style="display: block; padding: 0px 20px 20px; text-align: right; box-sizing: border-box;">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
      <el-form ref="currUser" :model="currUser" label-width="240px">
        <el-form-item label="Username">
          <el-input class="el-input-size" v-model="currUser.username"></el-input>
        </el-form-item>
        <el-form-item label="Email">
          <el-input class="el-input-size" v-model="currUser.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Send Email" :visible.sync="emailDialog" :before-close="emailDialog">
      <el-form v-if="currMessage.email" ref="currUser" :model="currMessage" label-width="120px">
        <el-form-item label="Email">
          <el-input class="el-input-size" v-model="currMessage.email"></el-input>
        </el-form-item>
        <el-form-item label="Title">
          <el-input class="el-input-size" v-model="currMessage.title"></el-input>
        </el-form-item>
        <el-form-item label="Message">
          <el-input class="el-input-size"
          type="textarea"
          :rows="8"
          v-model="currMessage.message"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="emailDialog = false">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Delete User" :visible.sync="userDelete" :before-close="resetForm">
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit4">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { updateUser, registerUser, getUsers, forceJoinService, removeServiceUser } from '@/api/manager'
import moment from 'moment'
import _ from 'lodash'

export default {
  name: 'users',
  data() {
    return {
      loading: true,
      users: [],
      filteredUsers: [],
      search: '',
      dateType: 'month',
      dates: '',
      currId: '',
      currUser: {},
      currUser2: {
        username: '',
        email: '',
        password: '',
        company: {
          name: '',
          address: {
            shopno: '',
            unit: '',
            block: '',
            road: '',
            garden: '',
            postalcode: '',
            state: ''
          }
        },
        operationaddress: {
          shopno: '',
          unit: '',
          block: '',
          road: '',
          garden: '',
          postalcode: '',
          state: ''
        },
        ssmnumber: '',
        officenumber: '',
        hpnumber: '',
        status: '',
        verified: false,
        comply: true
      },
      currUser3: {
        amount: 5
      },
      currMessage: {},
      userCreate: false,
      userEdit: false,
      userDelete: false,
      userAppend: false,
      btnloading: false,
      emailDialog: false,
      total: 0,
      page: 1,
      limit: 20
    }
  },
  filters: {
    formatDateTime(val) {
      return moment(val).format('DD/MM/YYYY HH:mm')
    },
    userUsername(val, siriusUsers) {
      if (siriusUsers.find((v) => val === v._id)) {
        return siriusUsers.find((v) => val === v._id).username
      }
    },
    installerUsername(val, installerUsers) {
      if (installerUsers.find((v) => val === v._id)) {
        return installerUsers.find((v) => val === v._id).username
      }
    },
    retailerUsername(val, retailerUsers) {
      if (retailerUsers.find((v) => val === v._id)) {
        return retailerUsers.find((v) => val === v._id).username
      }
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1 + ((this.page - 1) * this.limit)
    },
    showAppend(index, row) {
      this.currUser = row
      this.userAppend = true
    },
    showDetails(index, row) {
      this.currUser = row
      this.userEdit = true
    },
    showDelete(index, row) {
      this.currId = row._id
      this.userDelete = true
    },
    email(row) {
      this.currMessage = { email: row.email }
      this.emailDialog = true
    },
    resetForm() {
      this.currUser = {}
      this.currUser2 = {
        username: '',
        email: '',
        password: '',
        company: {
          name: '',
          address: {
            shopno: '',
            unit: '',
            block: '',
            road: '',
            garden: '',
            postalcode: '',
            state: ''
          }
        },
        operationaddress: {
          shopno: '',
          unit: '',
          block: '',
          road: '',
          garden: '',
          postalcode: '',
          state: ''
        },
        ssmnumber: '',
        officenumber: '',
        hpnumber: ''
      }
      this.userCreate = false
      this.userEdit = false
      this.userDelete = false
    },
    resetEmail() {
      this.currMessage = {}
      this.emailDialog = false
    },
    async onSubmit() {
      this.btnloading = true
      const data = {
        username: this.currUser2.username,
        email: this.currUser2.email,
        password: this.currUser2.password
      }
      try {
        const resp = await registerUser(data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userCreate = false
      await this.fetchData()
    },
    async onSubmit2() {
      this.btnloading = true
      const userData = {
        username: this.currUser.username,
        email: this.currUser.email
      }
      await updateUser(this.currUser._id, userData)
      // console.log(resp)
      this.btnloading = false
      this.userEdit = false
    },
    async onSubmit3() {
      this.btnloading = true
      try {
        await appendFulfillment(this.currUser._id, this.currUser3)
      } catch (err) {
        // console.log(err)
      }
      this.currUser = {}
      this.currUser3 = {
        amount: 1
      }
      this.btnloading = false
      this.userAppend = false
      await this.fetchData()
    },
    async onSubmit4() {
      this.btnloading = true
      try {
        await removeServiceUser(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDelete = false
      await this.fetchData()
    },
    addUser() {
      this.userCreate = true
    },
    test() {
      const randomNum = Math.floor(Math.random() * Math.floor(99999))
      this.currUser2 = {
        username: 'r' + randomNum,
        email: 'r' + randomNum + '@siriusmalaysia.tv',
        password: 'cyberjaya123'
      }
    },
    async fetchData() {
      const users = await getUsers('')
      this.users = users
      this.filteredUsers = _.chunk(this.users, this.limit)
      this.loading = false
    },
    async changeActive(row) {
      await updateUser(row._id, { confirmed: !row.confirmed })
      row.confirmed = !row.confirmed
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