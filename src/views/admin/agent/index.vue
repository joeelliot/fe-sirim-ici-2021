<template>
  <div class="constantScroll" style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div>
      <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
        <el-button @click="addProduct" type="success">Add Agent</el-button>
      </div>
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
      <div style="display: flex; flex-direction: row; width: 100%; justify-content: start; align-items: center; margin-bottom: 12px;">
        <el-radio @change="()=>fetchData()" v-model="radio" label="">All</el-radio>
        <el-radio @change="()=>fetchData()" v-model="radio" label="club">Club Member</el-radio>
        <el-radio @change="()=>fetchData()" v-model="radio" label="agent">Agent/Re-seller</el-radio>
        <el-radio @change="()=>fetchData()" v-model="radio" label="dropship">Dropship</el-radio>
        <el-radio @change="()=>fetchData()" v-model="radio" label="community">Community</el-radio>
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
    <el-dialog title="Add Agent" :visible.sync="userCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="Name">
          <el-input class="el-input-size" v-model="currUser2.name"></el-input>
        </el-form-item>
        <el-form-item label="Address 1">
          <el-input class="el-input-size" v-model="currUser2.address1"></el-input>
        </el-form-item>
        <el-form-item label="Address 2">
          <el-input class="el-input-size" v-model="currUser2.address2"></el-input>
        </el-form-item>
        <el-form-item label="Address 3">
          <el-input class="el-input-size" v-model="currUser2.address3"></el-input>
        </el-form-item>
        <el-form-item label="Tel/Fax">
          <el-input class="el-input-size" v-model="currUser2.tel"></el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-select class="el-input-size" v-model="currUser2.category">
            <el-option
              label="Club Member"
              value="club">
              Club Member
            </el-option>
            <el-option
              label="Agent/Re-seller"
              value="agent">
              Agent/Re-seller
            </el-option>
            <el-option
              label="Dropship"
              value="dropship">
              Dropship
            </el-option>
            <el-option
              label="Community"
              value="community">
              Community
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
    <el-dialog title="Edit Agent" :visible.sync="userUpdate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser" label-width="240px">
        <el-form-item label="Name">
          <el-input class="el-input-size" v-model="currUser.name"></el-input>
        </el-form-item>
        <el-form-item label="Address 1">
          <el-input class="el-input-size" v-model="currUser.address1"></el-input>
        </el-form-item>
        <el-form-item label="Address 2">
          <el-input class="el-input-size" v-model="currUser.address2"></el-input>
        </el-form-item>
        <el-form-item label="Address 3">
          <el-input class="el-input-size" v-model="currUser.address3"></el-input>
        </el-form-item>
        <el-form-item label="Tel/Fax">
          <el-input class="el-input-size" v-model="currUser.tel"></el-input>
        </el-form-item>
        <el-form-item label="Category">
          <el-select class="el-input-size" v-model="currUser.category">
            <el-option
              label="Club Member"
              value="club">
              Club Member
            </el-option>
            <el-option
              label="Agent/Re-seller"
              value="agent">
              Agent/Re-seller
            </el-option>
            <el-option
              label="Dropship"
              value="dropship">
              Dropship
            </el-option>
            <el-option
              label="Community"
              value="community">
              Community
            </el-option>
          </el-select>
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
    <el-dialog title="Delete Agent" :visible.sync="userDelete" :before-close="resetForm">
      <span>Are you sure you would like to delete this agent?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="Duplicate Agent" :visible.sync="userDuplicate" :before-close="resetForm">
      <span>Are you sure you would like to duplicate this agent?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit4">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <link href="./index.html" ref="pdfFormat" /> -->
  </div>
</template>
<script>
import { getAgents, createAgent, duplicateAgent, updateAgent, deleteAgent } from '@/api/agent'
import sirius from '../../../assets/logo5.png'
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
      radio: '',
      currId: '',
      currUser: {
      },
      currUser2: {
        name: '',
        address1: '',
        address2: '',
        address3: '',
        tel: '',
        category: ''
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
    },
    categoryFilter(val) {
      switch (val) {
        case "club":
          return "Club"
        case "agent":
          return "Agent/Re-seller"
        case "dropship":
          return "Dropship"
        case "community":
          return "Community"
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
        name: '',
        address1: '',
        address2: '',
        address3: '',
        tel: '',
        category: ''
      }
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
        name: this.currUser2.name,
        address1: this.currUser2.address1,
        address2: this.currUser2.address2,
        address3: this.currUser2.address3,
        tel: this.currUser2.tel,
        category: this.currUser2.category
      }
      try {
        await createAgent(data)
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
        name: this.currUser.name,
        address1: this.currUser.address1,
        address2: this.currUser.address2,
        address3: this.currUser.address3,
        tel: this.currUser.tel,
        category: this.currUser.category
      }
      try {
        await updateAgent(this.currUser._id, data)
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
        await deleteAgent(this.currId)
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
        await duplicateAgent(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDuplicate = false
      await this.fetchData()
    },
    test() {
      this.currUser2 = {
        name: 'DERATU ENTERPRISE',
        address1: 'NO.95-1, JALAN NAUTIKA',
        address2: 'AU20/A, SEKSYEN U20, PUSAT KOMERSIAL',
        address3: 'TSB, 47000, SUNGAI BULOH SELANGOR',
        tel: '+60-16123-8137'
      }
    },
    async fetchData() {
      this.loading = true
      let dates = this.dates
      if (this.dateType === 'daterange' && dates) {
        dates = this.dates[0] + ',' + this.dates[1] 
      }
      const resp = await getAgents(this.radio, this.limit, this.page, this.search, dates, this.dateType)
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