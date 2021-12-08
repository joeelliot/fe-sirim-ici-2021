<template>
  <div style="margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <div>
      <h1>Billing</h1>
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;">
        <el-table
          :default-sort = "{prop: 'createdAt', order: 'descending'}"
          :data="[]" v-loading.body="loading" element-loading-text="Loading" fit highlight-current-row>
          <el-table-column
            label="#"
            width="50" type="index" :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="date"
            label="Date"
            width="110">
            <template slot-scope="scope">
              <span>{{ scope.row.date }}</span>
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
          <el-table-column
            prop="amount"
            label="Amount"
            width="320">
            <template slot-scope="scope">
              <span>{{ scope.row.Amount }}</span>
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
  </div>
</template>
<script>
export default {
  name: 'payment',
  data() {
    return {
    }
  },
  filters: {
  },
  methods: {
  },
  async mounted() {
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