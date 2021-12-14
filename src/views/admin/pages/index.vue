<template>
  <div class="constantScroll" style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
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
        <el-button @click="addProduct" type="success" icon="el-icon-plus">Add {{tableName}}</el-button>
      </div>
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="filteredUsers" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            align="center"
            width="140"
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
            </template>
          </el-table-column>
          <el-table-column
            v-for="(val, idx) in columns"
            :key="idx"
            :prop="val.slug"
            :label="val.name">
            <template slot-scope="scope">
              <span v-if="val.type === 'text' || val.type === 'number'">{{ scope.row.datafields[idx] ? scope.row.datafields[idx].data : '-' }}</span>
              <span v-else-if="val.type === 'boolean'">{{ scope.row.datafields[idx] ? scope.row.datafields[idx].data === 'true' ? 'Yes' : 'No' : '-' }}</span>
              <div v-else-if="val.type === 'relation'">
                <span v-if="Object.keys(relations).length > 0">{{ scope.row.datafields[idx] | relationsFilter(relations) }}</span>
              </div>
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
    <el-dialog :title="`Add ${tableName}`" :visible.sync="userCreate" :before-close="resetForm">
      <el-form ref="currUser2" :model="currUser2" label-width="240px">
        <el-form-item v-for="(val, idx) in columns" :key="idx" :label="val.name">
          <el-input v-if="val.type === 'text'" class="el-input-size" v-model="currUser2[val.slug]"></el-input>
          <el-input-number v-else-if="val.type === 'number'" v-model="currUser2[val.slug]"></el-input-number>
          <el-switch v-else-if="val.type === 'boolean'" v-model="currUser2[val.slug]"></el-switch>
          <el-select v-else-if="val.type === 'relation'" v-model="currUser2[val.slug]">
            <el-option label="None" :value="null"></el-option>
            <el-option v-for="(val2, idx2) in relations[val.relation]" :key="idx2" :label="val2.label" :value="val2.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="`Update ${tableName}`" :visible.sync="userUpdate" :before-close="resetForm">
      <el-form ref="currUser" :model="currUser" label-width="240px">
        <el-form-item v-for="(val, idx) in columns" :key="idx" :label="val.name">
          <el-input v-if="val.type === 'text'" class="el-input-size" v-model="currUser[val.slug]"></el-input>
          <el-input-number v-else-if="val.type === 'number'" v-model="currUser[val.slug]"></el-input-number>
          <el-switch v-else-if="val.type === 'boolean'" v-model="currUser[val.slug]"></el-switch>
          <el-select v-else-if="val.type === 'relation'" v-model="currUser[val.slug]">
            <el-option v-for="(val2, idx2) in relations[val.relation]" :key="idx2" :label="val2.label" :value="val2.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit2">Confirm</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="`Delete ${tableName}`" :visible.sync="userDelete" :before-close="resetForm">
      <span>Are you sure you would like to delete this {{tableName}}?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="onSubmit3">Confirm</el-button>
      </span>
    </el-dialog>
    <!-- <link href="./index.html" ref="pdfFormat" /> -->
  </div>
</template>
<script>
import { getTables, createDatatable, updateDatatable, deleteDatatable } from '@/api/tables.js'
import sirius from '../../../assets/logo5.png'
import moment from 'moment'

export default {
  name: '',
  data() {
    return {
      loading: false,
      btnloading: false,
      filteredUsers: [],
      columns: [],
      relations: {},
      search: '',
      dateType: 'month',
      dates: '',
      tableName: '',
      currId: '',
      currUser: {},
      clientId: '',
      tableId: '',
      currUser2: {},
      userCreate: false,
      userUpdate: false,
      userDelete: false,
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
    relationsFilter(val, relations) {
      // console.log(val)
      if (Object.keys(relations).length > 0 && val && val.relation && val.relationId) {
        // console.log(Object.keys(relations))
        // console.log(Object.values(relations))
        // console.log(relations)
        // console.log(val.relation)
        // console.log(relations[val.relation])
        // console.log(relations['table22'])
        // console.log(relations.table22)
        return relations[val.relation].findOne(v => v.value === val.relationId)
      }
      // return '-'

      return val.relation
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1 + ((this.page - 1) * this.limit)
    },
    showUpdate(index, row) {
      this.currId = row._id
      const data = {}
      for (var i in row.datafields) {
        switch (row.datafields[i].type) {
          case 'text': {
            // this.currUser[row.datafields[i].slug] = String(row.datafields[i].data)
            data[row.datafields[i].slug] = String(row.datafields[i].data)
            break
          }
          case 'number': {
            // this.currUser[row.datafields[i].slug] = Number(row.datafields[i].data)
            data[row.datafields[i].slug] = Number(row.datafields[i].data)
            break
          }
          case 'boolean': {
            // this.currUser[row.datafields[i].slug] = row.datafields[i].data === "true" ? true : false
            data[row.datafields[i].slug] = row.datafields[i].data === "true" ? true : false
            break
          }
          case 'relation': {
            // this.currUser[row.datafields[i].slug] = row.datafields[i].data
            data[row.datafields[i].slug] = row.datafields[i].data
            break
          }
        }
      }
      this.userUpdate = true
      this.currUser = data
    },
    showDelete(index, row) {
      this.currId = row._id
      this.userDelete = true
    },
    addProduct(index, row) {
      this.userCreate = true
    },
    resetForm() {
      this.currUser = {}
      this.currUser2 = {}
      this.options2 = []
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
    async onSubmit() {
      this.btnloading = true
      const datafields = []
      for (var i in this.columns) {
        switch (this.columns[i].type) {
          case 'relation': {
            datafields.push({
              relation: this.columns[i].relation,
              relationField: this.columns[i].relationField,
              relationId: this.currUser2[this.columns[i].slug] ? this.currUser2[this.columns[i].slug].toString() : '',
              slug: this.columns[i].slug,
              type: this.columns[i].type
            })
          }
          default: {
            datafields.push({
              data: this.currUser2[this.columns[i].slug] ? this.currUser2[this.columns[i].slug].toString() : '',
              slug: this.columns[i].slug,
              type: this.columns[i].type
            })
          }
        }
      }
      try {
        await createDatatable({
          datafields: datafields,
          client: this.clientId,
          table: this.tableId
        })
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userCreate = false
      await this.fetchData()
    },
    async onSubmit2() {
      this.btnloading = true
      const datafields = []
      for (var i in this.columns) {
        switch (this.columns[i].type) {
          case 'relation': {
            datafields.push({
              relation: this.columns[i].relation,
              relationField: this.columns[i].relationField,
              relationId: this.currUser[this.columns[i].slug] ? this.currUser[this.columns[i].slug].toString() : '',
              slug: this.columns[i].slug,
              type: this.columns[i].type
            })
          }
          default: {
            datafields.push({
              data: this.currUser[this.columns[i].slug] ? this.currUser[this.columns[i].slug].toString() : '',
              slug: this.columns[i].slug,
              type: this.columns[i].type
            })
          }
        }
      }
      try {
        await updateDatatable(this.currId, {
          datafields: datafields,
          client: this.clientId,
          table: this.tableId
        })
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
        await deleteDatatable(this.currId)
      } catch (err) {
        // console.log(err)
      }
      this.btnloading = false
      this.userDelete = false
      await this.fetchData()
    },
    log(v) {
      console.log(v)
    },
    async fetchData() {
      this.loading = true
      const resp = await getTables(this.$route.fullPath.split('/')[2])
      const data = resp.length > 0 ? resp[0] : {}
      if (data) {
        this.filteredUsers = data.datatables
        this.columns = data.fields
        this.tableName = data.name
        this.clientId = data.client._id
        this.tableId = data._id
        
        const data3 = {}

        for (var i in data.fields) {
          switch (data.fields[i].type) {
            case 'text': {
              data3[data.fields[i].slug] = ""
              break
            }
            case 'number': {
              data3[data.fields[i].slug] = 0
              break
            }
            case 'boolean': {
              data3[data.fields[i].slug] = false
              break
            }
            case 'relation': {
              const resp2 = await getTables(data.fields[i].relation)
              const table2 = resp2.length > 0 ? resp2[0] : {}
              const data2 = table2.datatables.map((v) => {
                const datafield = v.datafields.find((v2) => v2.slug === data.fields[i].relationField)
                return {
                  label: datafield.data,
                  value: v._id
                }
              })

              this.relations[table2.slug] = data2
              data3[data.fields[i].slug] = null
              break
            }
          }
        }

        console.log(this.relations)

        this.currUser2 = data3
        this.loading = false
      }
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