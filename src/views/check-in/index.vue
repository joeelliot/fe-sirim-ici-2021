<template>
  <div class="main-parent">
    <div class="content">
      <h1 style="text-align: center; font-size: 21px; margin-top: 10px; margin-bottom: 0px;">Covid-19 Tracer</h1>
      <h2 style="text-align: center; font-size: 18px; margin-top: 8px; margin-bottom: 8px; color: #999;">{{name}}</h2>
      <h2 style="text-align: center; font-size: 18px; margin-top: 8px; margin-bottom: 8px; color: #999;">Enter your mobile number</h2>
      <h2 style="text-align: center; font-size: 21px; font-weight: normal; margin-top: 0px; margin-bottom: 10px;">+6{{phoneNumber}}</h2>
      <div class="phoneParent">
        <div class="phoneRow">
          <div class="phoneNum" @click="addNum(1)"><h1>1</h1></div>
          <div class="phoneNum" @click="addNum(2)"><h1>2</h1></div>
          <div class="phoneNum" @click="addNum(3)"><h1>3</h1></div>
        </div>
        <div class="phoneRow">
          <div class="phoneNum" @click="addNum(4)"><h1>4</h1></div>
          <div class="phoneNum" @click="addNum(5)"><h1>5</h1></div>
          <div class="phoneNum" @click="addNum(6)"><h1>6</h1></div>
        </div>
        <div class="phoneRow">
          <div class="phoneNum" @click="addNum(7)"><h1>7</h1></div>
          <div class="phoneNum" @click="addNum(8)"><h1>8</h1></div>
          <div class="phoneNum" @click="addNum(9)"><h1>9</h1></div>
        </div>
        <div class="phoneRow">
          <div class="phoneNum" @click="clearAll()"><h1 style="font-size: 11px;">Clear</h1></div>
          <div class="phoneNum" @click="addNum(0)"><h1>0</h1></div>
          <div class="phoneNum" @click="backspace()"><i style="color: #fff; font-size: 24px;" class="el-icon-back"></i></div>
        </div>
      </div>
      <el-button style="background-color: rgb(50, 205, 50); color: #fff; width: 240px; margin-top: 10px;" v-loading="loading" @click="checkIn()">Check In</el-button>
    </div>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
// import moment from 'moment'

export default {
  name: 'login',
  data() {
    return {
      phoneNumber: '',
      name: '',
      loading: false
    }
  },
  mounted() {
    this.name = this.$route.params.name
  },
  methods: {
    addNum(num) {
      if (this.phoneNumber.length < 10) {
        this.phoneNumber += num
      }
    },
    backspace() {
      this.phoneNumber = this.phoneNumber.substring(0, this.phoneNumber.length - 1)
    },
    clearAll() {
      this.phoneNumber = ''
    },
    async checkIn() {
      try {
        this.loading = true
        const name = this.name
        const phoneNumber = this.phoneNumber
        if (phoneNumber.trim() !== '') {
          // const resp = await createShopTracer({
          //   name: name,
          //   phone_num: phoneNumber,
          //   shopName: this.$route.params.shopName
          // })
          // console.log(resp)
          localStorage.name = name
          localStorage.phoneNumber = phoneNumber
          // location.href = `https://wa.me/60175848137?text=${name} ${phoneNumber} is at ${this.$route.params.shopName} at ${moment(resp.createdAt).format('DD/MM/YYYY HH:mm')}`
        }
      } catch (err) {
        // console.log(err)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.main-parent {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding-bottom: 20%;
  .content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    padding-bottom: 20%;
    .phoneParent {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 10px;
      width: 240px;
      .phoneRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        width: 100%;
        margin-bottom: 10px;
        .phoneNum {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 60px;
          height: 60px;
          border-radius: 60px;
          background-color: rgb(48, 65, 86);
          cursor: pointer;
          h1 {
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>