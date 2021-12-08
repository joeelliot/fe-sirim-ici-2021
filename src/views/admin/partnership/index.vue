<template>
  <div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div>
      <h1>{{tabIndex === 0 ? 'Retailer' : 'Installer Co.'}}</h1>
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
            <div style="display: flex; flex-direction: column; width: 100%; justify-content: center; align-items: flex-start;">
              <el-button @click="()=>addPartnership()" type="primary">Add {{tabIndex === 0 ? 'Retailer' : 'Installer Co.'}}</el-button>
            </div>
            <el-table
              :default-sort = "{prop: 'createdAt', order: 'descending'}"
              :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
              <el-table-column
                label="#"
                width="50" type="index" :index="indexMethod">
              </el-table-column>
              <el-table-column
                v-if="tabIndex === 0"
                prop="type"
                label="Retailer"
                width="160">
                <template slot-scope="scope">
                  <span>{{ scope.row.retailerId | retailerUsername(retailerUsers)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                v-else
                prop="type"
                label="Installer Co."
                width="160">
                <template slot-scope="scope">
                  <span>{{ scope.row.retailerId | companyUsername(companyUsers)}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="type"
                label="Installer"
                width="140">
                <template slot-scope="scope">
                  <span>{{ scope.row.installerId | installerUsername(installerUsers)}}</span>
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
                  @click="editPartnership(scope.row)"></el-button>
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
      </div>
    </div>
    <el-dialog :title="mode === 'create' ? 'Create Partnership' : 'Edit Partnership'" :visible.sync="partnershipCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item v-if="tabIndex === 0" label="Retailer">
          <!-- <el-select class="el-input-size" v-model="currUser2.retailerId">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in retailerUsers"
              :key="item._id"
              :label="item.userData.company.name"
              :value="item._id">
            </el-option>
          </el-select> -->
          <el-select
            v-model="currUser2.retailerId"
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
              :label="item.userData.company.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-else label="Installer Co.">
          <!-- <el-select class="el-input-size" v-model="currUser2.retailerId">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in companyUsers"
              :key="item._id"
              :label="item.userData.company.name"
              :value="item._id">
            </el-option>
          </el-select> -->
          <el-select
            v-model="currUser2.retailerId"
            filterable
            remote
            :remote-method="remoteMethod3"
            :loading="loading">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in options3"
              :key="item._id"
              :label="item.userData.company.name"
              :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Installer">
          <!-- <el-select class="el-input-size" v-model="currUser2.installerId">
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
          </el-select> -->
          <el-select
            v-model="currUser2.installerId"
            filterable
            remote
            :remote-method="remoteMethod2"
            :loading="loading">
            <el-option
              key="none"
              label="-None-"
              value="">
            </el-option>
            <el-option
              v-for="item in options2"
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
    <el-dialog title="Delete Partnership" :visible.sync="partnershipDelete" :before-close="resetForm">
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getPartnerships, getPartnershipsInstaller, countPartnerships, countPartnershipsInstaller, createPartnership, updatePartnership, deletePartnership } from '@/api/partnership'
import { getSiriusUsers, getService } from '@/api/manager'
import moment from 'moment'

export default {
  name: 'partnership',
  data() {
    return {
      loading: true,
      tabIndex: 0,
      siriusUsers: [],
      installerUsers: [],
      retailerUsers: [],
      companyUsers: [],
      options: [],
      options2: [],
      options3: [],
      users: [],
      filteredUsers: [],
      mode: 'create',
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
    installerUsername(val, installerUsers) {
      if (installerUsers.find((v) => val === v._id)) {
        return installerUsers.find((v) => val === v._id).userData.company.name
      }
    },
    retailerUsername(val, retailerUsers) {
      if (retailerUsers.find((v) => val === v._id)) {
        return retailerUsers.find((v) => val === v._id).userData.company.name
      }
    },
    companyUsername(val, companyUsers) {
      if (companyUsers.find((v) => val === v._id)) {
        return companyUsers.find((v) => val === v._id).userData.company.name
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
      if (this.mode === 'create') {
        if (this.tabIndex === 0) {
          const data = {
            installerId: this.currUser2.installerId,
            retailerId: this.currUser2.retailerId,
            company: false
          }
          try {
            await createPartnership(data)
          } catch (err) {
            // console.log(err)
          }
        } else {
          const data = {
            installerId: this.currUser2.installerId,
            retailerId: this.currUser2.retailerId,
            company: true
          }
          try {
            await createPartnership(data)
          } catch (err) {
            // console.log(err)
          }
        }
      } else {
        const data = {
          installerId: this.currUser2.installerId,
          retailerId: this.currUser2.retailerId
        }
        try {
          await updatePartnership(this.currId, data)
        } catch (err) {
          // console.log(err)
        }
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
      this.mode = 'create'
    },
    editPartnership(row) {
      this.partnershipCreate = true
      this.currId = row._id
      this.currUser2 = {
        installerId: row.installerId,
        retailerId: row.retailerId
      }
      this.mode = 'update'
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
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.retailerUsers.filter(item => {
            return item.userData.company.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = this.retailerUsers;
      }
    },
    remoteMethod2(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options2 = this.installerUsers.filter(item => {
            return item.userData.company.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options2 = this.installerUsers;
      }
    },
    remoteMethod3(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options3 = this.companyUsers.filter(item => {
            return item.userData.company.name.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options3 = this.companyUsers;
      }
    },
    async fetchData() {
      this.loading = true
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
      this.loading = false
    },
    async fetchDataFields() {
      const data = await getSiriusUsers()
      const service = await getService()
      const userList = []
      const userList2 = []
      const userList3 = []
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
              ...service[serviceIndex].usersArray[i]
            })
          } else if (service[serviceIndex].usersArray[i].package === 'installer') {
            userList2.push({
              ...service[serviceIndex].usersArray[i]
            })
          } else if (service[serviceIndex].usersArray[i].package === 'company') {
            userList3.push({
              ...service[serviceIndex].usersArray[i]
            })
          }
        }
      }
      this.siriusUsers = data
      this.retailerUsers = userList
      this.options = userList
      this.installerUsers = userList2
      this.options2 = userList2
      this.companyUsers = userList3
      this.options3 = userList3
    },
    changePane(index) {
      this.tabIndex = index
      this.fetchData()
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