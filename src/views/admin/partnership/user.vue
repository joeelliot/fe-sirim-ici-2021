<template>
  <div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div v-if="awakRole === 'installer'">
      <h1>Employer</h1>
      <div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: flex-start;">
      </div>
      <div class="el-tabs el-tabs--top el-tabs--border-card">
        <div class="el-tabs__header is-top">
          <div class="el-tabs__nav-wrap is-top">
            <div class="el-tabs__nav-scroll">
              <div role="tablist" class="el-tabs__nav is-top" style="transform: translateX(0px);">
                <div @click="()=>changePane(0)" aria-controls="pane-first" role="tab" :tabindex="tabIndex === 0 ? 0 : -1" :class="tabIndex === 0 ? 'is-active' : ''" class="el-tabs__item is-top">Retailer</div>
                <div @click="()=>changePane(1)" aria-controls="pane-second" role="tab" :tabindex="tabIndex === 1 ? 0 : -1" :class="tabIndex === 1 ? 'is-active' : ''" class="el-tabs__item is-top">Installer Co.</div>
              </div>
            </div>
          </div>
        </div>
        <div class="el-tabs__content">
          <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
            <el-table
              :default-sort = "{prop: 'createdAt', order: 'descending'}"
              :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
              <el-table-column
                label="#"
                width="50" type="index" :index="indexMethod">
              </el-table-column>
              <el-table-column
                align="center"
                prop="accountNumber"
                label="Account Number"
                width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.retailerId | retailerAccountNumber(roleUsers) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                label="Retailer"
                width="160">
                <template slot-scope="scope">
                  <span>{{ scope.row.retailerId | retailerUsername(roleUsers)}}</span>
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
    </div>
    <div v-if="awakRole === 'retailer' || awakRole === 'company'">
      <h1>Installer</h1>
      <div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: flex-start;">
        <el-button @click="()=>addPartnership()" type="primary">Add Installer</el-button>
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
            align="center"
            prop="accountNumber"
            label="Account Number"
            width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.installerId | installerAccountNumber(roleUsers) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            label="Installer"
            width="140">
            <template slot-scope="scope">
              <span>{{ scope.row.installerId | installerUsername(roleUsers)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            width="160"
            label="Actions">
            <template slot-scope="scope">
              <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="removePartnership(scope.row)"></el-button>
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
    <el-dialog title="Create Partnership" :visible.sync="partnershipCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <!-- <el-form-item
          v-if="awakRole === 'installer'"
          label="Retailer">
          <el-select class="el-input-size" v-model="currUser2.retailerId">
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
        </el-form-item> -->
        <el-form-item
          v-if="awakRole === 'retailer' || awakRole === 'company'"
          label="Installer">
          <!-- <el-select class="el-input-size" v-model="currUser2.installerId">
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
          </el-select> -->
          <el-select
            v-model="currUser2.installerId"
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in options"
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
    <el-dialog title="Delete Partnership" :visible.sync="partnershipDelete" :before-close="resetForm">
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getPartnerships, getPartnershipsInstaller, countPartnerships, countPartnershipsInstaller, createPartnership, deletePartnership } from '@/api/partnership'
import { listServiceByPackage } from '@/api/manager'
import moment from 'moment'

export default {
  name: 'partnership',
  data() {
    return {
      loading: true,
      tabIndex: 0,
      roleUsers: [],
      selectUsers: [],
      users: [],
      filteredUsers: [],
      options: [],
      currId: '',
      currUser: {},
      currUser2: {
        installerId: '',
        retailerId: ''
      },
      partnershipCreate: false,
      partnershipDelete: false,
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
    installerAccountNumber(val, installerUsers) {
      if (installerUsers.find((v) => val === v._id)) {
        return installerUsers.find((v) => val === v._id).accountNumber
      }
    },
    installerUsername(val, installerUsers) {
      if (installerUsers.find((v) => val === v._id)) {
        return installerUsers.find((v) => val === v._id).companyName
      }
    },
    retailerAccountNumber(val, retailerUsers) {
      if (retailerUsers.find((v) => val === v._id)) {
        return retailerUsers.find((v) => val === v._id).accountNumber
      }
    },
    retailerUsername(val, retailerUsers) {
      if (retailerUsers.find((v) => val === v._id)) {
        return retailerUsers.find((v) => val === v._id).companyName
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
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.selectUsers.filter(item => {
            return item.companyName.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = this.selectUsers;
      }
    },
    showDetails(index, row) {
      this.currUser = row
      this.historyView = true
    },
    resetForm() {
      this.partnershipCreate = false
      this.partnershipDelete = false
      this.currId = ''
      this.currUser2 = {
        installerId: '',
        retailerId: ''
      }
    },
    async onSubmit() {
      this.btnloading = true
      const data = {
        installerId: this.currUser2.installerId,
        retailerId: this.currUser2.retailerId
      }
      try {
        await createPartnership(data)
        this.resetForm()
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.partnershipCreate = false
      await this.fetchData()
    },
    async onSubmit2() {
      this.btnloading = true
      try {
        await deletePartnership(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.partnershipDelete = false
      await this.fetchData()
    },
    addPartnership() {
      this.partnershipCreate = true
    },
    removePartnership(row) {
      this.partnershipDelete = true
      this.currId = row._id
    },
    test() {
      this.currUser2 = {
        installerId: '5fbf7d0d971f6000338ba43e',
        retailerId: '5fbf7d34971f6000338ba43f'
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
      if (this.awakRole === 'retailer') {
        this.users = await getPartnerships(this.limit, this.page)
        this.total = await countPartnerships()
        this.filteredUsers = this.users
        const installer = await listServiceByPackage('installer')
        this.roleUsers = installer
        const selectArr = []
        for (var i in installer) {
          var valid = true
          const item = installer[i]
          for (var j in this.users) {
            const item2 = this.users[j]
            if (item._id === item2.installerId) {
              valid = false
              break
            }
          }
          if (valid) {
            selectArr.push(item)
          }
        }
        this.selectUsers = selectArr
        this.options = selectArr
      } else if (this.awakRole === 'installer') {
        switch (this.tabIndex) {
          case 0:
            this.users = await getPartnershipsInstaller('false', this.limit, this.page)
            this.total = await countPartnershipsInstaller('false')
            this.filteredUsers = this.users
            break
          case 1:
            this.users = await getPartnershipsInstaller('true', this.limit, this.page)
            this.total = await countPartnershipsInstaller('true')
            this.filteredUsers = this.users
            break
        }
        const retailer = await listServiceByPackage('retailer')
        const company = await listServiceByPackage('company')
        this.roleUsers = retailer.concat(company)
        const selectArr = []
        for (var k in retailer) {
          var valid2 = true
          const item = retailer[k]
          for (var l in this.users) {
            const item2 = this.users[l]
            if (item._id === item2.retailerId) {
              valid2 = false
              break
            }
          }
          if (valid2) {
            selectArr.push(item)
          }
        }
        this.selectUsers = selectArr
        this.options = selectArr
      } else {
        this.users = await getPartnerships(this.limit, this.page)
        this.total = await countPartnerships()
        this.filteredUsers = this.users
        const installer = await listServiceByPackage('installer')
        this.roleUsers = installer
        const selectArr = []
        for (var i in installer) {
          var valid = true
          const item = installer[i]
          for (var j in this.users) {
            const item2 = this.users[j]
            if (item._id === item2.installerId) {
              valid = false
              break
            }
          }
          if (valid) {
            selectArr.push(item)
          }
        }
        this.selectUsers = selectArr
        this.options = selectArr
      }
      this.loading = false
    },
    changePane(index) {
      this.tabIndex = index
      this.fetchData()
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