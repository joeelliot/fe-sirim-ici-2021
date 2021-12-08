<template>
  <div ref="homebody" class="homeBody2">
    <div class="box2 box">
      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; z-index: 1; margin-top: 0px; margin-bottom: 0px;">
        <div class="homeLogoDiv2">
          <img class="homeSiriusLogo2" :src="sirius"/>
        </div>
        <div class="desktopVersion2">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #f7f7f7; width: 560px;">
            <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 10px 20px; align-items: center; background-color: #333; width: 100%;">
              <span style="color: #fff; font-weight: bold;">Checkout</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px 20px; width: 100%;">
              <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 20px 20px 5px 20px; background-color: #fff; width: 100%;">
                <el-form style="width: 100%;" :rules="rules" ref="dataForm" :model="currUser" label-width="160px">
                  <!-- <el-form-item label="First Name" prop="firstName">
                    <el-input class="el-input-size" v-model="currUser.firstName"></el-input>
                  </el-form-item>
                  <el-form-item label="Last Name" prop="lastName">
                    <el-input class="el-input-size" v-model="currUser.lastName"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Line 1" prop="address1">
                    <el-input class="el-input-size" v-model="currUser.address1"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Line 2" prop="address2">
                    <el-input class="el-input-size" v-model="currUser.address2"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Line 3" prop="address3">
                    <el-input class="el-input-size" v-model="currUser.address3"></el-input>
                  </el-form-item>
                  <el-form-item label="Postcode" prop="postcode">
                    <el-input class="el-input-size" v-model="currUser.postcode"></el-input>
                  </el-form-item>
                  <el-form-item label="City" prop="city">
                    <el-input class="el-input-size" v-model="currUser.city"></el-input>
                  </el-form-item>
                  <el-form-item label="State/Federal Territory" prop="state">
                    <el-select class="filter-item" v-model="currUser.state" placeholder="Please select">
                      <el-option v-for="item in states" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Country/Region">
                    <span>Malaysia</span>
                  </el-form-item>
                  <el-form-item label="Phone" prop="phone">
                    <el-input placeholder="60123456789" class="el-input-size" v-model="currUser.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input class="el-input-size" v-model="currUser.email"></el-input>
                  </el-form-item> -->

                  <!-- <el-form-item style="margin-bottom: 0px;" label="Nickname">
                    <el-input class="el-input-size" v-model="currUser.nickname"></el-input>
                  </el-form-item> -->
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="First Name" prop="first_name">
                    <el-input class="el-input-size" v-model="currUser.first_name"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Last Name" prop="last_name">
                    <el-input class="el-input-size" v-model="currUser.last_name"></el-input>
                  </el-form-item>
                  <!-- <el-form-item style="margin-bottom: 0px;" label="Description">
                    <el-input class="el-input-size" v-model="currUser.description"></el-input>
                  </el-form-item> -->
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing First Name">
                    <el-input class="el-input-size" v-model="currUser.billing_first_name"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Last Name">
                    <el-input class="el-input-size" v-model="currUser.billing_last_name"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Address">
                    <el-input class="el-input-size" v-model="currUser.billing_address_1"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing City">
                    <el-input class="el-input-size" v-model="currUser.billing_city"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing State">
                    <el-select class="filter-item" v-model="currUser.billing_state" placeholder="Please select">
                      <el-option v-for="item in states" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Postcode">
                    <el-input class="el-input-size" v-model="currUser.billing_postcode"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Country">
                    <span>Malaysia</span>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Email" prop="billing_email">
                    <el-input class="el-input-size" v-model="currUser.billing_email"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Phone">
                    <el-input class="el-input-size" v-model="currUser.billing_phone"></el-input>
                  </el-form-item>
                  <!-- <el-form-item style="margin-bottom: 0px;" label="Shipping Method">
                    <el-input class="el-input-size" v-model="currUser.shipping_method"></el-input>
                  </el-form-item> -->
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="IC">
                    <el-input class="el-input-size" v-model="currUser.billing_ic"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing HP2">
                    <el-input class="el-input-size" v-model="currUser.billing_hp2"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing House">
                    <el-input class="el-input-size" v-model="currUser.billing_house"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Car">
                    <el-input class="el-input-size" v-model="currUser.billing_car"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Carbrand">
                    <el-input class="el-input-size" v-model="currUser.billing_carbrand"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Billing Carplate">
                    <el-input class="el-input-size" v-model="currUser.billing_carplate"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Paying Customer">
                    <el-input class="el-input-size" v-model="currUser.paying_customer"></el-input>
                  </el-form-item>
                  <!-- <el-form-item style="margin-bottom: 0px;" label="Order Count">
                    <el-input class="el-input-size" v-model="currUser._order_count"></el-input>
                  </el-form-item> -->
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Shipping First Name">
                    <el-input class="el-input-size" v-model="currUser.shipping_first_name"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Shipping Last Name">
                    <el-input class="el-input-size" v-model="currUser.shipping_last_name"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Shipping Address 1">
                    <el-input class="el-input-size" v-model="currUser.shipping_address_1"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Shipping Address 2">
                    <el-input class="el-input-size" v-model="currUser.shipping_address_2"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Shipping City">
                    <el-input class="el-input-size" v-model="currUser.shipping_city"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Shipping State">
                    <el-select class="filter-item" v-model="currUser.shipping_state" placeholder="Please select">
                      <el-option v-for="item in states" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Shipping Postcode">
                    <el-input class="el-input-size" v-model="currUser.shipping_postcode"></el-input>
                  </el-form-item>
                  <el-form-item style="margin-bottom: 0px; width: 100%;" label="Shipping Country">
                    <span>Malaysia</span>
                  </el-form-item>
                </el-form>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; padding: 20px 20px 20px 20px; margin-top: 20px; background-color: #f7f7f7; width: 100%;">
                  <el-checkbox v-model="consent"></el-checkbox>
                  <span :style="consent ? 'color: #409EFF;' : 'color: #606266;'" @click="()=>{consent=!consent}" style="margin-left: 10px; font-weight: 500; cursor: pointer; font-size: 13px;">I have read and consent to Sirius processing my information.</span>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; width: 100%; margin-top: 20px;">
                <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 40px; width: 50px; height: 50px;" @click="test">
                  <i class="el-icon-document"></i>
                </div>
                <el-button :disabled="!consent" type="primary" @click="submit">CONTINUE TO PAYMENT</el-button>
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; justify-content: center; margin-left: 20px; align-items: center; background-color: #fff; width: 340px;">
            <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 10px 20px; align-items: center; background-color: #eee; width: 100%;">
              <span style="color: #333; font-weight: bold;">Summary</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: flex-start; padding: 10px 20px; align-items: center; background-color: #fff; width: 100%; border: 1px #eeeeee solid;">
              <div class="summaryRow">
                <span style="flex: 1;">Subtotal</span>
                <span>RM {{product.price.toFixed(2)}}</span>
              </div>
              <!-- <div class="summaryRow" v-for="(tax, id) in taxes" :key="id">
                <span style="flex: 1;">{{ tax.name }}</span>
                <span>RM {{ tax.amount }}</span>
              </div> -->
              <div class="summaryRow">
                <span style="flex: 1; font-size: 13px;">Total</span>
                <span style="color: #000854; font-size: 13px;">RM {{subtotal}}</span>
              </div>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 10px 20px; align-items: center; background-color: #eee; width: 100%; margin-top: 20px;">
              <span style="color: #333; font-weight: bold;">Details</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: flex-start; padding: 10px 20px; align-items: center; background-color: #fff; width: 100%; border: 1px #eeeeee solid;">
              <div class="summaryRow" v-if="product">
                <span style="flex: 1;">{{product.name}}</span>
                <span>RM {{product.price.toFixed(2)}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="mobileVersion2">
          <div style="display: flex; flex-direction: column; justify-content: center; padding-bottom: 10px; align-items: center; background-color: #f7f7f7;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Customers from '@/data/customers.json'
import { getProductByCode, getTaxes } from '@/api/product'
import { checkout } from '@/api/order'
import sirius from '../../assets/logo5.png'

const states = [
  { name: 'Johor' },
  { name: 'Kedah' },
  { name: 'Kelantan' },
  { name: 'Kuala Lumpur' },
  { name: 'Labuan' },
  { name: 'Melaka' },
  { name: 'Negeri Sembilan' },
  { name: 'Pahang' },
  { name: 'Perak' },
  { name: 'Perlis' },
  { name: 'Putrajaya' },
  { name: 'Pulau Pinang' },
  { name: 'Sabah' },
  { name: 'Sarawak' },
  { name: 'Selangor' },
  { name: 'Terengganu' }
]

export default {
  data() {
    const checkEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please input your Email'))
      } else {
        // eslint-disable-next-line
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(value)) {
          callback(new Error('Please input correct email address'))
        }
      }
      callback()
    }

    const validatePhoneNo = (rule, value, callback) => {
      // console.log(this.temp.is_upload)

      if (value === '') {
        callback(new Error('Phone number is required'))
      }
      value = this.removeSymbols(value)
      // console.log(value, value.length)
      if (value.substring(0, 2) !== '60') {
        callback(new Error('Invalid phone number code'))
      }
      if (value.length < 11 || value.length > 12) {
        callback(new Error('Invalid phone number length'))
      }
      callback()
    }

    return {
      title: process.env.APP_NAME.toUpperCase(),
      product: null,
      taxes: [],
      subtotal: '0.00',
      currUser: {
        nickname: '',
        first_name: '',
        last_name: '',
        description: '',
        billing_first_name: '',
        billing_last_name: '',
        billing_address_1: '',
        billing_city: '',
        billing_state: '',
        billing_postcode: '',
        billing_country: 'Malaysia',
        billing_email: '',
        billing_phone: '',
        shipping_method: '',
        billing_ic: '',
        billing_hp2: '',
        billing_house: '',
        billing_car: '',
        billing_carbrand: '',
        billing_carplate: '',
        paying_customer: '',
        _order_count: '',
        shipping_first_name: '',
        shipping_last_name: '',
        shipping_address_1: '',
        shipping_address_2: '',
        shipping_city: '',
        shipping_state: '',
        shipping_postcode: '',
        shipping_country: 'Malaysia'
      },
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        // firstName: [{ required: true, message: 'First name is required', trigger: 'blur' }],
        // lastName: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
        // email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        // address1: [{ required: true, message: 'Address is required', trigger: 'blur' }],
        // postcode: [{ required: true, message: 'Postcode is required', trigger: 'blur' }],
        // city: [{ required: true, message: 'City is required', trigger: 'blur' }],
        // phone: [{ required: true, validator: validatePhoneNo, trigger: 'blur' }],
        // state: [
        //   { required: true, message: 'State is required', trigger: 'change' }
        // ]
        first_name: [{ required: true, message: 'First Name is required', trigger: 'blur' }],
        // last_name: [{ required: true, message: 'Last Name is required', trigger: 'blur' }],
        billing_email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
      },
      loading: false,
      consent: false,
      pwdType: 'password',
      sirius,
      states
    }
  },
  methods: {
    removeSymbols(val) {
      return val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    },
    google() {
      this.$router.push('/join')
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    submit() {
      this.$refs.dataForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const data = { ...this.currUser, productId: this.product._id, name: this.currUser.first_name + ' ' + this.currUser.last_name, email: this.currUser.billing_email }
          const resp = await checkout(data)
          if (resp) {
            window.location = resp.url
          }
        } else {
          return false
        }
      })
    },
    subscribe() {
      this.$router.push({ path: '/checkout' })
    },
    test() {
      const randomNum2 = Math.floor(Math.random() * Math.floor(999))
      const randomNum3 = Math.floor(Math.random() * Math.floor(99))
      const randomName = Customers.malay[Math.floor(Math.random()*Customers.malay.length)];
      const firstName = randomName.split(' ')[0]
      const lastName = randomName.split(' ')[1]
      this.currUser = {
        nickname: '',
        first_name: firstName,
        last_name: lastName,
        description: '',
        billing_first_name: firstName,
        billing_last_name: lastName,
        billing_address_1: 'Suite ' + randomNum2,
        billing_city: 'Cyberjaya',
        billing_state: 'Selangor',
        billing_postcode: '63300',
        billing_country: 'Malaysia',
        billing_email: '',
        billing_phone: '+60123456789',
        shipping_method: '',
        billing_ic: '123456789012',
        billing_hp2: '+60123456789',
        billing_house: 'Suite ' + randomNum2,
        billing_car: 'Perodua',
        billing_carbrand: 'Kancil',
        billing_carplate: 'ABC1234',
        paying_customer: 'Paying Customer',
        _order_count: '',
        shipping_first_name: firstName,
        shipping_last_name: lastName,
        shipping_address_1: 'Suite ' + randomNum2,
        shipping_address_2: 'P1-' + randomNum3,
        shipping_city: 'Cyberjaya',
        shipping_state: 'Selangor',
        shipping_postcode: '63300',
        shipping_country: 'Malaysia'
      }
    }
  },
  async mounted() {
    this.$store.dispatch('DisableBurgerAllowed')
    if (this.$route.params.code) {
      // const arr = this.$route.query.products.split(',')
      // const products = []
      // let subtotal = 0
      // for (var i in arr) {
      //   const code = arr[i]
      //   try {
      //     const resp = await getProductByCode(code)
      //     products.push(resp)
      //     subtotal = subtotal + resp.price
      //   } catch (err) {
      //     console.log(err)
      //   }
      // }
      try {
        const resp = await getProductByCode(this.$route.params.code)
        this.product = resp
        let subtotal = resp.price

        const taxes = await getTaxes()
        const taxArr = []

        for (const i in taxes) {
          const t = {
            name: taxes[i].name
          }
          let tAmount = 0
          if (taxes[i].isPercentage) {
            subtotal = taxes[i].amount > 0 ? subtotal + (resp.price * taxes[i].amount / 100) : subtotal
            tAmount = taxes[i].amount > 0 ? resp.price * taxes[i].amount / 100 : 0
          } else {
            if (taxes[i].isFixed) {
              subtotal = subtotal + taxes[i].amount
              tAmount = taxes[i].amount
            }
          }
          t.amount = tAmount.toFixed(2)
          taxArr.push(t)
        }
        this.subtotal = subtotal.toFixed(2)
        this.taxes = taxArr
      } catch (err) {
        // console.log(err)
      }
    }
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
  align-items: flex-start;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
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