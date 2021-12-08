<template>
  <div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div>
      <h1>Staff</h1>
      <div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: flex-start;">
        <el-button @click="()=>addStaff()" type="primary">Add Staff</el-button>
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
            label="IC Number"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.icNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="Name"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="160"
            label="Actions">
            <template slot-scope="scope">
              <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editStaff(scope.row)"></el-button>
              <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removeStaff(scope.row)"></el-button>
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
    <el-dialog :title="mode === 'create' ? 'Create Staff' : 'Edit Staff'" :visible.sync="staffCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item label="IC Number">
          <el-input class="el-input-size" v-model="currUser2.icNumber"></el-input>
        </el-form-item>
        <el-form-item label="Name">
          <el-input class="el-input-size" v-model="currUser2.name"></el-input>
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
    <el-dialog title="Delete Staff" :visible.sync="staffDelete" :before-close="resetForm">
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getStaffs, countStaffs, createStaff, updateStaff, deleteStaff } from '@/api/staff'
import moment from 'moment'

export default {
  name: 'staff',
  data() {
    return {
      loading: true,
      siriusUsers: [],
      installerUsers: [],
      retailerUsers: [],
      users: [],
      filteredUsers: [],
      mode: 'create',
      currId: '',
      currUser: {},
      currUser2: {
        icNumber: '',
        name: ''
      },
      staffCreate: false,
      staffDelete: false,
      historyView: false,
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
    installerUsername(val, installerUsers) {
      if (installerUsers.find((v) => val === v._id)) {
        return installerUsers.find((v) => val === v._id).userData.username
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
    showDetails(index, row) {
      this.currUser = row
      this.historyView = true
    },
    resetForm() {
      this.staffCreate = false
      this.staffDelete = false
      this.currId = ''
      this.currUser2 = {
        icNumber: '',
        name: ''
      }
    },
    async onSubmit() {
      this.btnloading = true
      if (this.mode === 'create') {
        const data = {
          icNumber: this.currUser2.icNumber,
          name: this.currUser2.name
        }
        try {
          await createStaff(data)
        } catch (err) {
          // console.log(err)
        }
      } else {
        const data = {
          icNumber: this.currUser2.icNumber,
          name: this.currUser2.name
        }
        try {
          await updateStaff(this.currId, data)
        } catch (err) {
          // console.log(err)
        }
      }
      this.btnloading = false
      this.staffCreate = false
      await this.fetchData()
    },
    async onSubmit2() {
      this.btnloading = true
      try {
        await deleteStaff(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.staffDelete = false
      await this.fetchData()
    },
    addStaff() {
      this.staffCreate = true
      this.mode = 'create'
    },
    editStaff(row) {
      this.staffCreate = true
      this.currId = row._id
      this.currUser2 = {
        icNumber: row.icNumber,
        name: row.name
      }
      this.mode = 'update'
    },
    removeStaff(row) {
      this.staffDelete = true
      this.currId = row._id
    },
    test() {
      this.currUser2 = {
        icNumber: '050101081127',
        name: 'Ali'
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
      this.users = await getStaffs(this.limit, this.page)
      this.total = await countStaffs()
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