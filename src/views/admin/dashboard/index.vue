<template>
  <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: center; margin-left: 20px; margin-right: 20px; margin-bottom: 20px;">
    <!-- <h1>Dashboard</h1> -->
    <div style="display: flex; flex-direction: row; width: 100%; justify-content: flex-start; margin-top: 22px; align-items: center; margin-bottom: 22px;">
      <el-select class="selectBackground" style="width: 110px; margin-right: 5px;" @change="()=>{
          this.dates = ''
        }" v-model="dateType">
        <el-option label="By Month" value="month">By Month</el-option>
        <el-option label="By Dates" value="daterange">By Dates</el-option>
      </el-select>
      <el-date-picker
        v-model="dates"
        :type="dateType"
        :placeholder="dateType === 'month' ? 'Pick a month' : ''"
        :format="dateType === 'month' ? 'MMM yyyy' : 'dd-MM-yyyy'"
        value-format="yyyy-MM-dd"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date">
      </el-date-picker>
      <el-input placeholder="Search" style="width: 240px; margin-left: 0px;" v-model="search"/>
      <el-button style="margin-left: 10px;" type="primary">Search</el-button>
    </div>
    <div class="dashboardSection">
      <div class="cardGroup" v-for="(val, idx) in cards" :key="idx">
        <h1 class="cardTitle">{{val.title}}</h1>
        <pre class="cardPre">
{{val.content}}
        </pre>
      </div>
      <div class="graphGroup" v-for="(val, idx) in graphs" :key="idx">
        <bar-chart :chart-data="val.data" :options="val.options"></bar-chart>
      </div>
    </div>
  </div>
</template>
<script>
import { getGraphs, getCards } from '@/api/dashboard.js'
import BarChart from "@/components/BarChart"
import moment from "moment"

export default {
  name: 'dashboard',
  data() {
    return {
      search: '',
      dateType: 'month',
      dates: '',
      cards: [],
      graphs: []
    }
  },
  methods: {
    async fetchData() {
      const cards = await getCards(this.$store.state.user.client)
      this.cards = cards

      const graphs = await getGraphs(this.$store.state.user.client)
      const newGraphs = []
      for (var i in graphs) {
        const graph = graphs[i]
        const xArrays = []
        const yArrays = []
        for (var j in graph.graph_data) {
          xArrays.push(graph.graph_data[j].x)
          yArrays.push(graph.graph_data[j].y)
        }
        const data = {
          labels: xArrays,
          datasets: [
            {
              label: graph.title,
              backgroundColor: '#0c0',
              data: yArrays
            }
          ]
        }

        const options = {
          plugins: {
            title: {
              display: true,
              text: graph.title
            }
          }
        }

        newGraphs.push({
          data,
          options
        })
      }
      this.graphs = newGraphs
    }
  },
  mounted() {
    // this.tomatoAmount = await countTomatoes()
    this.dateType = 'daterange'
    const nowdate = moment().format('YYYY-MM-DD')
    this.dates = [nowdate, nowdate]
    this.fetchData()
  },
  computed: {
    client() {
      return this.$store.state.user.client
    }
  },
  components: {
    BarChart
  }
}
</script>
<style lang="scss">
@import 'src/styles/variables.scss';
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
.dashboardSection {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 520px) {
    flex-direction: column;
  }
  .dashboardBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 240px;
    height: 160px;
    border: 1px #999 solid;
    margin: 10px 20px;
    border-radius: 20px;
    .dashboardBoxTop {
      // margin-bottom: 20px;
      font-size: 21px;
      font-weight: bold;
      color: #fff;
    }
    .dashboardBoxBottom {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      height: 80px;
    }
    .dashboardStatus {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      // border: #ccc 1px solid;
      // border-radius: 10px;
      padding: 6px;
      margin-bottom: 4px;
      width: 100px;
      height: 20px;
      font-size: 13px;
    }
    .dashboardNumber {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 20px;
      font-size: 32px;
      color: #fff;
    }
    .dashboardNumber2 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      overflow: scroll;
      width: 120px;
      height: 40px;
      font-size: 12px;
      padding-top: 10px;
      padding-bottom: 10px;
      position: absolute;
      bottom: 0px;
      color: #fff;
      background-color: #77f;
    }
    .dashboardNumber3 {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 60px;
      height: 40px;
      font-size: 12px;
      position: absolute;
      bottom: 0px;
      color: #fff;
    }
  }
  .cardGroup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 320px;
    margin: 0px 20px;
    border-radius: 20px;
    border: 2px #333 solid;
  }
  .cardTitle {
    color: #000;
    font-size: 24px;
  }
  .cardPre {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    overflow: hidden;
    flex-wrap: wrap;
    word-break: normal;
    width: 100%;
    padding: 0px 20px;
  }
  .graphGroup {
    display: flex;
    margin: 0px 20px;
  }
}
.chartBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 500px;
  // background-color: #99f;
}
</style>