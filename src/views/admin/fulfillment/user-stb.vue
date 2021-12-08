<template>
  <div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div>
      <h1>STB</h1>
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="type"
            label="Type"
            width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="Serial No."
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.serialNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="DMT"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.dmt }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="SC"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.sc }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="type"
            label="Code"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.activationCode }}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="type"
            label="Location"
            width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.location">{{ scope.row.location.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="User"
            width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.userId !== null && scope.row.userId !== ''">{{ scope.row.userId | userUsername(siriusUsers)}}</span>
              <el-button
              v-else
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="showAdd2(scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="awakRole === 'retailer'"
            prop="type"
            label="Installer"
            width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.installerId !== null && scope.row.installerId !== ''">{{ scope.row.installerId | installerUsername(roleUsers)}}</span>
              <el-button
              v-else
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="showAdd(scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="awakRole === 'retailer'"
            align="center"
            width="90"
            label="Actions">
            <template slot-scope="scope">
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-view"
              @click="viewLog(scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="awakRole === 'installer'"
            align="center"
            width="90"
            label="History">
            <template slot-scope="scope">
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-view"
              @click="viewLog(scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="awakRole === 'installer'"
            align="center"
            width="90"
            label="Received">
            <template slot-scope="scope">
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              :disabled="scope.row.location ? scope.row.location.name === 'Retailer' ? false : true : true"
              @click="changeReceived(scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="awakRole === 'installer'"
            align="center"
            width="90"
            label="Installed">
            <template slot-scope="scope">
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-plus"
              :disabled="scope.row.location ? scope.row.location.name === 'Installer' ? false : true : true"
              @click="changeInstalled(scope.row)"></el-button>
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
    <el-dialog title="Update STB" :visible.sync="fulfillmentCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="Installer">
          <el-select class="el-input-size" v-model="currUser2.installerId">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in selectUsers"
              :key="item._id"
              :label="item.companyName"
              :value="item._id">
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
    <el-dialog title="Update STB" :visible.sync="fulfillmentCreate2" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="Customer">
          <el-select class="el-input-size" v-model="currUser2.userId">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in siriusSelect"
              :key="item._id"
              :label="item.accountNumber"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 20px; width: 50px; height: 50px;" @click="test">
          <i class="el-icon-document"></i>
        </div>
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog title="View Log" :visible.sync="logView" :before-close="resetForm">
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; flex: 1; margin: 0px 10%;" v-if="currUser !== {}">
        <span style="margin: 5px 0px;" v-for="(item, key) in currUser.logs" :key="key"><b>{{item.user}}</b> change location to <b>{{item.name}}</b> at <b>{{item.createdAt | formatDateTime}}</b></span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Close</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getLocations } from '@/api/location'
import { getPartnerships } from '@/api/partnership'
import { getFulfillments, countFulfillments, addFulfillment, updateFulfillment } from '@/api/fulfillment'
import { getPersonalSiriusUsers, listServiceByPackage } from '@/api/manager'
import moment from 'moment'

export default {
  name: 'stb',
  data() {
    return {
      loading: true,
      siriusUsers: [],
      siriusSelect: [],
      roleUsers: [],
      selectUsers: [],
      locations: [],
      users: [],
      filteredUsers: [],
      currId: '',
      currUser: {},
      currUser2: {
        installerId: '',
        userId: ''
      },
      fulfillmentCreate: false,
      fulfillmentCreate2: false,
      logView: false,
      btnloading: false,
      total: 0,
      page: 1,
      limit: 15
    }
  },
  filters: {
    formatDateTime(val) {
      return moment(val).format('DD/MM/YYYY HH:mm')
    },
    userUsername(val, siriusUsers) {
      if (siriusUsers.find((v) => val === v._id)) {
        return siriusUsers.find((v) => val === v._id).accountNumber
      }
    },
    installerUsername(val, installerUsers) {
      if (installerUsers.find((v) => val === v._id)) {
        return installerUsers.find((v) => val === v._id).companyName
      }
    },
    retailerUsername(val, retailerUsers) {
      if (retailerUsers.find((v) => val === v._id)) {
        return retailerUsers.find((v) => val === v._id).username
      }
    }
  },
  computed: {
    awakRole() {
      return this.$store.state.user.awakRole
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1 + ((this.page - 1) * this.limit)
    },
    showAdd(row) {
      this.currId = row._id
      this.fulfillmentCreate = true
    },
    showAdd2(row) {
      this.currId = row._id
      this.fulfillmentCreate2 = true
    },
    resetForm() {
      this.fulfillmentCreate = false
      this.fulfillmentCreate2 = false
      this.logView = false
      this.currId = ''
      this.currUser = {}
      this.currUser2 = {
        installerId: '',
        userId: ''
      }
    },
    async onSubmit() {
      this.btnloading = true
      const data = {
        installerId: this.currUser2.installerId
      }
      try {
        await addFulfillment(this.currId, data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.fulfillmentCreate = false
      await this.fetchData()
    },
    async onSubmit3() {
      this.btnloading = true
      const data = {
        userId: this.currUser2.userId
      }
      try {
        await addFulfillment(this.currId, data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.fulfillmentCreate2 = false
      this.currUser2 = {}
      await this.fetchData()
    },
    viewLog(row) {
      this.currUser = row
      this.currUser.logs.reverse()
      this.logView = true
    },
    test() {
      this.currUser2 = {
        installerId: '5fbf7d0d971f6000338ba43e',
        userId: '5fc7136c323f080029a379d7'
      }
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
    async fetchData() {
      this.loading = true
      const users = await getPersonalSiriusUsers()
      this.siriusUsers = users
      this.siriusSelect = users.filter((v) => v.installerId === '')
      this.users = await getFulfillments('stb', this.limit, this.page)
      this.total = await countFulfillments('stb')
      this.filteredUsers = this.users
      this.loading = false
    },
    async fetchDataFields() {
      const locations = await getLocations()
      if (this.awakRole === 'retailer') {
        const installer = await listServiceByPackage('installer')
        this.roleUsers = installer
        const partnership = await getPartnerships()
        const selectArr = []
        for (var i in partnership) {
          const tempPart = partnership[i]
          const user = installer.find((v) => v._id === tempPart.installerId)
          if (user) {
            selectArr.push(user)
          }
        }
        this.selectUsers = selectArr
      } else if (this.awakRole === 'installer') {
        const retailer = await listServiceByPackage('retailer')
        this.roleUsers = retailer
        const partnership = await getPartnerships()
        const selectArr = []
        for (var j in partnership) {
          const tempPart = partnership[j]
          const user = retailer.find((v) => v._id === tempPart.retailerId)
          if (user) {
            selectArr.push(user)
          }
        }
        this.selectUsers = selectArr
      }
      this.locations = locations
    },
    async changeReceived(row) {
      this.btnloading = true
      const data = {
        locationId: '5fc2643a4e43170028c90d40'
      }
      try {
        await updateFulfillment(row._id, data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      await this.fetchData()
    },
    async changeInstalled(row) {
      this.btnloading = true
      const data = {
        locationId: '5fc2643d4e43170028c90d41'
      }
      try {
        await updateFulfillment(row._id, data)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      await this.fetchData()
    }
  },
  async mounted() {
    await this.fetchDataFields()
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