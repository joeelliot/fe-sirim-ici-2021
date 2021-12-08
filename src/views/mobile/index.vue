<template>
  <div class="main-parent2">
    <div class="content2" v-if="!back">
      <h1 style="text-align: center; font-size: 21px; margin-top: 10px; margin-bottom: 0px;">Covid-19 Tracer</h1>
      <p style="text-align: left; margin-top: 10px; width: 240px; margin-bottom: 0px;">Please fill your name:</p>
      <el-input style="text-align: center; margin-top: 10px; width: 240px;" v-model="name" placeholder="Name"></el-input>
      <el-button style="background-color: rgb(48, 65, 86); color: #fff; width: 240px; margin-top: 10px;" @click="checkIn">Next</el-button>
    </div>
    <div v-else>
      <h1 style="text-align: center; font-size: 21px; margin-top: 10px; margin-bottom: 0px;">Covid-19 Tracer</h1>
      <h2 style="text-align: center; font-size: 18px; margin-top: 8px; margin-bottom: 8px; color: #999;">Welcome back, {{name}}</h2>
      <h2 style="text-align: center; font-size: 21px; font-weight: normal; margin-top: 0px; margin-bottom: 10px;">+6{{phoneNumber}}</h2>
      <el-button style="background-color: rgb(50, 205, 50); color: #fff; width: 240px; margin-top: 10px;" v-loading="loading" @click="checkIn2">Check In</el-button>
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
      loading: false,
      back: false
    }
  },
  methods: {
    checkIn() {
      this.$router.push('/mobile/' + this.$route.params.shopName + '/' + this.name)
    },
    async checkIn2() {
      try {
        this.loading = true
        const name = this.name
        const phoneNumber = this.phoneNumber
        // const resp = await createShopTracer({
        //   name: name,
        //   phone_num: phoneNumber,
        //   shopName: this.$route.params.shopName
        // })
        // console.log(resp)
        localStorage.name = name
        localStorage.phoneNumber = phoneNumber
        // location.href = `https://wa.me/60175848137?text=${name} ${phoneNumber} is at ${this.$route.params.shopName} at ${moment(resp.createdAt).format('DD/MM/YYYY HH:mm')}`
      } catch (err) {
        // console.log(err)
      }
    }
  },
  mounted() {
    if (localStorage.name && localStorage.phoneNumber) {
      this.phoneNumber = localStorage.phoneNumber
      this.name = localStorage.name
      this.back = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.main-parent2 {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  .content2 {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
  }
}
</style>