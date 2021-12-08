<template>
  <div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div>
      <h1>ODU</h1>
      <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; align-items: center;">
        <!-- <el-button @click="()=>addFulfillment()" type="primary">Add ODU</el-button> -->
        <el-button @click="()=>selectFulfillment()" type="primary">Upload ODU</el-button>
        <input @change="(event)=>fileSelected(event)" style="display: none;" type="file" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ref="fileSelect">
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
            width="90">
            <template slot-scope="scope">
              <span v-if="scope.row.location">{{ scope.row.location.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="Customer"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.userId | userUsername(siriusUsers)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="Retailer"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.retailerId | retailerUsername(retailerUsers)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="Installer"
            width="90">
            <template slot-scope="scope">
              <span>{{ scope.row.installerId | installerUsername(installerUsers)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="180"
            label="Actions">
            <template slot-scope="scope">
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editFulfillment(scope.row)"></el-button>
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-view"
              @click="viewLog(scope.row)"></el-button>
              <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeFulfillment(scope.row)"></el-button>
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
    <el-dialog :title="mode === 'create' ? 'Create ODU' : 'Edit ODU'" :visible.sync="fulfillmentCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="Type">
          <el-input class="el-input-size" v-model="currUser2.type"></el-input>
        </el-form-item>
        <el-form-item label="Serial Number">
          <el-input class="el-input-size" v-model="currUser2.serialNumber"></el-input>
        </el-form-item>
        <!-- <el-form-item label="Activation Code">
          <el-input class="el-input-size" v-model="currUser2.activationCode"></el-input>
        </el-form-item> -->
        <el-form-item label="Location">
          <el-select class="el-input-size" v-model="currUser2.locationId">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in locations"
              :key="item._id"
              :label="item.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Customer">
          <el-select class="el-input-size" v-model="currUser2.userId">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in siriusUsers"
              :key="item._id"
              :label="item.username"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Retailer">
          <el-select class="el-input-size" v-model="currUser2.retailerId">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in retailerUsers"
              :key="item._id"
              :label="item.userData.username"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Installer">
          <el-select class="el-input-size" v-model="currUser2.installerId">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in installerUsers"
              :key="item._id"
              :label="item.userData.company.name"
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
    <el-dialog title="Delete ODU" :visible.sync="fulfillmentDelete" :before-close="resetForm">
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
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
import { getFulfillments, countFulfillments, createFulfillment, uploadFulfillmentODU, updateFulfillment, deleteFulfillment } from '@/api/fulfillment'
import { getSiriusUsers, getService } from '@/api/manager'
import moment from 'moment'

export default {
  name: 'odu',
  data() {
    return {
      loading: true,
      siriusUsers: [],
      installerUsers: [],
      retailerUsers: [],
      locations: [],
      users: [],
      filteredUsers: [],
      mode: 'create',
      currId: '',
      currUser: {},
      currUser2: {
        type: '',
        serialNumber: '',
        // activationCode: '',
        locationId: '',
        userId: '',
        installerId: '',
        retailerId: ''
      },
      fulfillmentCreate: false,
      fulfillmentDelete: false,
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
        return installerUsers.find((v) => val === v._id).userData.company.name
      }
    },
    retailerUsername(val, retailerUsers) {
      if (retailerUsers.find((v) => val === v._id)) {
        return retailerUsers.find((v) => val === v._id).userData.username
      }
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1 + ((this.page - 1) * this.limit)
    },
    resetForm() {
      this.fulfillmentCreate = false
      this.fulfillmentDelete = false
      this.logView = false
      this.currId = ''
      this.currUser = {}
      this.currUser2 = {
        type: '',
        serialNumber: '',
        // activationCode: '',
        locationId: '',
        userId: '',
        installerId: '',
        retailerId: ''
      }
    },
    async onSubmit() {
      this.btnloading = true
      if (this.mode === 'create') {
        const data = {
          type: this.currUser2.type,
          serialNumber: this.currUser2.serialNumber,
          // activationCode: this.currUser2.activationCode,
          locationId: this.currUser2.locationId,
          userId: this.currUser2.userId,
          installerId: this.currUser2.installerId,
          retailerId: this.currUser2.retailerId,
          typeCode: 'odu'
        }
        try {
          await createFulfillment(data)
        } catch (err) {
          // console.log(err)
        }
      } else {
        const data = {
          type: this.currUser2.type,
          serialNumber: this.currUser2.serialNumber,
          // activationCode: this.currUser2.activationCode,
          locationId: this.currUser2.locationId,
          userId: this.currUser2.userId,
          installerId: this.currUser2.installerId,
          retailerId: this.currUser2.retailerId
        }
        try {
          await updateFulfillment(this.currId, data)
        } catch (err) {
          // console.log(err)
        }
      }
      this.btnloading = false
      this.fulfillmentCreate = false
      await this.fetchData()
    },
    async onSubmit2() {
      this.btnloading = true
      try {
        await deleteFulfillment(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.fulfillmentDelete = false
      await this.fetchData()
    },
    addFulfillment() {
      this.fulfillmentCreate = true
      this.mode = 'create'
    },
    selectFulfillment() {
      this.$refs.fileSelect.click()
    },
    async fileSelected(event) {
      const formData = new FormData()
      formData.append('file', event.target.files[0])
      this.$refs.fileSelect.value = ''
      await uploadFulfillmentODU(formData)
      this.fetchData()
    },
    editFulfillment(row) {
      this.fulfillmentCreate = true
      this.currId = row._id
      this.currUser2 = {
        type: row.type,
        serialNumber: row.serialNumber,
        // activationCode: row.activationCode,
        locationId: row.location ? row.location._id : '',
        userId: row.userId,
        installerId: row.installerId,
        retailerId: row.retailerId
      }
      this.mode = 'update'
    },
    removeFulfillment(row) {
      this.fulfillmentDelete = true
      this.currId = row._id
    },
    viewLog(row) {
      this.currUser = row
      this.currUser.logs.reverse()
      this.logView = true
    },
    test() {
      const randomNum = Math.floor(Math.random() * Math.floor(99999))
      const randomNum2 = Math.floor(Math.random() * Math.floor(99999))
      this.currUser2 = {
        type: 'ODU',
        serialNumber: randomNum,
        // activationCode: randomNum2,
        locationId: '5fc264374e43170028c90d3f',
        userId: '5fb9d36e1f43c9f9cb720719',
        installerId: '',
        retailerId: ''
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
      this.users = await getFulfillments('odu', this.limit, this.page)
      this.total = await countFulfillments('odu')
      this.filteredUsers = this.users
      this.loading = false
    },
    async fetchDataFields() {
      const locations = await getLocations()
      const data = await getSiriusUsers()
      const service = await getService()
      const userList = []
      const userList2 = []
      let serviceIndex = 0
      if (this.$store.state.user.role === 'generalmanager') {
        for (var j in service) {
          if (service[j].name === 'sirius') {
            serviceIndex = j
            break
          }
        }
      }
      if (service[serviceIndex].usersArray !== undefined) {
        for (var i in service[serviceIndex].usersArray) {
          if (service[serviceIndex].usersArray[i].package === 'retailer') {
            userList.push({
              _id: i,
              ...service[serviceIndex].usersArray[i]
            })
          } else if (service[serviceIndex].usersArray[i].package === 'installer') {
            userList2.push({
              _id: i,
              ...service[serviceIndex].usersArray[i]
            })
          }
        }
      }
      this.locations = locations
      this.siriusUsers = data
      this.retailerUsers = userList
      this.installerUsers = userList2
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