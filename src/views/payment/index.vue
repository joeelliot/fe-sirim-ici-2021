<template>
  <div ref="homebody2" class="homeBody2">
    <div class="box box2">
      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; z-index: 1; margin-top: 0px; margin-bottom: 0px;">
        <div class="homeLogoDiv2">
          <img class="homeSiriusLogo2" :src="sirius"/>
        </div>
        <div class="desktopVersion2">
          <div v-if="verified !== null && verified === false">
          <p style="flex: 1; color: #000; font-size: 21px; margin: 0px 0px; text-align: center; margin-top: 20px;">
            Invalid payment
          </p>
          <div style="margin-top: 40px;" class="notFoundButton">
            <a @click="home" class="notFoundButtonText">Home</a>
          </div>
        </div>
        <div v-if="success !== null && success === true">
          <p style="flex: 1; color: #000; font-size: 21px; margin: 0px 0px; text-align: left; margin-top: 20px;">
            Payment for {{ order.description }} (RM{{ order.amount }}) - Order #{{ order.orderNo }} is successful. Our installer will contact you soon for installation.
          </p>
          <div style="margin-top: 40px;" class="notFoundButton">
            <a @click="home" class="notFoundButtonText">Home</a>
          </div>
        </div>
        <div v-else-if="success !== null && success === false">
          <p style="flex: 1; color: #000; font-size: 21px; margin: 0px 0px; text-align: center; margin-top: 20px;">
            We are sorry that your payment has failed. Please try again.
          </p>
          <div style="margin-top: 40px;" class="notFoundButton">
            <a @click="home" class="notFoundButtonText">Home</a>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { verify } from '@/api/payment'
import { getOrder } from '@/api/order'
import sirius from '../../assets/logo5.png'

export default {
  data() {
    return {
      title: process.env.APP_NAME.toUpperCase(),
      order: null,
      success: null,
      verified: null,
      processed: false,
      ewallet: null,
      sirius
    }
  },
  methods: {
    home() {
      this.$router.push('/')
    }
  },
  async mounted() {
    this.$store.dispatch('DisableBurgerAllowed')
    // console.log('token: ', this.token)
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })

    const resp = await verify({
      app_code: 'sirius',
      billplz: {
        id: this.$route.query['billplz[id]'],
        paid: (this.$route.query['billplz[paid]'] === 'true'),
        paid_at: this.$route.query['billplz[paid_at]'],
        x_signature: this.$route.query['billplz[x_signature]']
      }
    })
    if (resp) {
      if (resp.verified) {
        this.verified = true
        if (this.$route.query['billplz[paid]'] === 'true') {
          try {
            const order = await getOrder(this.$route.query['billplz[id]'])

            if (order) {
              if (order.isProcessed) {
                this.order = order
                this.processed = true
                if (order.paid) {
                  this.success = true
                  loading.close()
                } else {
                  this.success = false
                  loading.close()
                }
              } else {
                setInterval(async() => {
                  if (!this.processed) {
                    const proc = await getOrder(this.$route.query['billplz[id]'])
                    if (proc) {
                      if (proc.isProcessed) {
                        this.order = proc
                        this.processed = true
                        if (proc.paid) {
                          this.success = true
                          loading.close()
                        } else {
                          this.success = false
                          loading.close()
                        }
                      }
                    }
                  }
                }, 5000)
              }
            }
          } catch (err) {
            this.processed = true
          }
        } else {
          this.success = false
          loading.close()
        }
      } else {
        this.verified = false
        loading.close()
      }
    }
    // console.log('resp: ', resp)
    // if (this.$route.query['billplz[paid]'] === 'true') {
    //   this.success = true
    // } else {
    //   this.success = false
    // }
  },
  created() {
  },
  destroyed() {
    this.$store.dispatch('EnableBurgerAllowed')
  }
}
</script>
<style lang="scss">
@import "src/styles/variables.scss";

.homeSiriusLogo2 {
  height: 40px;
}
.mobileVersion2 {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  width: 100%;
}
.desktopVersion2 {
  display: flex;
  justify-content: center;
  text-align: center;
  // align-items: flex-start;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 50%;
}
.box {
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: center;
  background-color: $color4;
  width: 100%;
  height: 100%;
  min-height: 500px;
  overflow: hidden;
}

.box2 {
  background-color: #fff;
}

.notFoundButtonText {
  text-decoration: underline; 
  cursor: pointer;
}

.summaryRow {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #333;
  font-size: 13px;
  margin-bottom: 10px;
  width: 100%;
}

.homeLogoDiv2 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #000854;
  width: 100%;
  margin-right: 5px;
  padding: 10px 40px;
}

.homeGoogle {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  margin-top: 10px;
  padding: 2px;
  cursor: pointer;
  background-color: #4285f4;
}

.subtext {
  width: 100%;
  font-family: Helvetica;
  color: #ffcf35;
  font-weight: bold;
  font-size: 21px;
  text-align: center;
}

.subtext2 {
  width: 80%;
  font-family: Helvetica;
  color: #ffcf35;
  font-weight: bold;
  font-size: 42px;
  text-align: left;
  margin-top: 80px;
}

.kolaborasi {
  width: 80%;
  font-family: CaviarDreams;
  color: #fff;
  text-align: center;
}

.kolaborasi2 {
  width: 100%;
  font-family: CaviarDreams;
  color: #fff;
  text-align: left;
  margin-top: 80px;
}

.homeLoginDiv {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 360px;
  margin-top: 40px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 40px;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      //background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      //color: $light_gray;
      background-color: #fff;
      color: #000;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        //-webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    //background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    border-color: #dcdfe6;
    background-color: #fff;
    //color: #454545;
  }
}

@media (max-width: 520px) {
  .mobileVersion2 {
    display: flex;
  }
  .desktopVersion2 {
    display: none;
  }
  .homeLogoDiv2 {
    align-items: center;
    justify-content: center;
    padding: 0px 0px;
  }
  .homeLoginDiv {
    .el-input {
      width: 75%;
    }
    width: 280px;
    margin-top: 20px;
  }
  .homeBody {
    height: auto;
  }
}
</style>