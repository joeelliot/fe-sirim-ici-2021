<template>
  <div ref="homebody" class="homeBody2">
    <div class="box2 box">
      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; z-index: 1; margin-top: 0px; margin-bottom: 0px;">
        <div class="homeLogoDiv2">
          <img class="homeSiriusLogo2" :src="sirius"/>
        </div>
        <input @change="(event)=>fileSelected(event)" style="display: none;" type="file" accept="application/pdf,image/jpeg,image/png" ref="fileSelect">
        <div class="desktopVersion2">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #f7f7f7; width: 760px;">
            <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 10px 20px; align-items: center; background-color: #999; width: 100%;">
              <span style="color: #fff; font-weight: bold;">Installer Registration</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px 20px; width: 100%;">
              <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 20px 20px 5px 20px; background-color: #fff; width: 100%;">
                <el-form :rules="rules" ref="currUser" :model="currUser" label-width="240px">
                  <el-form-item label="Username" prop="username">
                    <el-input class="el-input-size-register" v-model="currUser.username"></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input class="el-input-size-register" v-model="currUser.email"></el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="password">
                    <el-input class="el-input-size-register" v-model="currUser.password"></el-input>
                  </el-form-item>
                  <el-form-item label="Name">
                    <el-input class="el-input-size-register" v-model="currUser.company.name"></el-input>
                  </el-form-item>
                  <el-form-item label="Address House No.">
                    <el-input class="el-input-size-register" v-model="currUser.company.address.houseno"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Unit">
                    <el-input class="el-input-size-register" v-model="currUser.company.address.unit"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Block">
                    <el-input class="el-input-size-register" v-model="currUser.company.address.block"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Road">
                    <el-input class="el-input-size-register" v-model="currUser.company.address.road"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Garden">
                    <el-input class="el-input-size-register" v-model="currUser.company.address.garden"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Postal Code">
                    <el-input class="el-input-size-register" v-model="currUser.company.address.postalcode"></el-input>
                  </el-form-item>
                  <el-form-item label="Address State">
                    <el-input class="el-input-size-register" v-model="currUser.company.address.state"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Shop No.">
                    <el-input class="el-input-size-register" v-model="currUser.operationaddress.shopno"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Unit">
                    <el-input class="el-input-size-register" v-model="currUser.operationaddress.unit"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Block">
                    <el-input class="el-input-size-register" v-model="currUser.operationaddress.block"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Road">
                    <el-input class="el-input-size-register" v-model="currUser.operationaddress.road"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Garden">
                    <el-input class="el-input-size-register" v-model="currUser.operationaddress.garden"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Postal Code">
                    <el-input class="el-input-size-register" v-model="currUser.operationaddress.postalcode"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address State">
                    <el-input class="el-input-size-register" v-model="currUser.operationaddress.state"></el-input>
                  </el-form-item>
                  <el-form-item label="IC Number">
                    <el-input class="el-input-size-register" v-model="currUser.ssmnumber"></el-input>
                  </el-form-item>
                  <el-form-item label="Office Number">
                    <el-input class="el-input-size-register" v-model="currUser.officenumber"></el-input>
                  </el-form-item>
                  <el-form-item label="HP Number">
                    <el-input class="el-input-size-register" v-model="currUser.hpnumber"></el-input>
                  </el-form-item>
                  <el-form-item label="Type">
                    <el-select class="el-input-size" @change="()=>{
                      this.currUser.startingPartnership = []
                      }" v-model="type">
                      <el-option
                        key="none"
                        label="-None-"
                        :value="0">
                      </el-option>
                      <el-option
                        key="retailer"
                        label="Retailer"
                        value="retailer">
                      </el-option>
                      <el-option
                        key="company"
                        label="Installer Co."
                        value="company">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="type === 'retailer'" label="Retailer">
                    <el-select
                      v-model="currUser.startingPartnership"
                      filterable
                      remote
                      :remote-method="remoteMethod"
                      :loading="loading">
                      <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.companyName"
                        :value="item._id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-else-if="type === 'company'" label="Installer Co.">
                    <el-select
                      v-model="currUser.startingPartnership"
                      filterable
                      remote
                      :remote-method="remoteMethod3"
                      :loading="loading">
                      <el-option
                        v-for="item in options2"
                        :key="item._id"
                        :label="item.companyName"
                        :value="item._id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="Files">
                    <el-button type="primary" @click="()=>selectFiles()">
                      Upload
                    </el-button>
                  </el-form-item>
                  <div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <span style="font-size: 13px; color: #333;" v-for="(file, index) in files" :key="index">{{file.name}}</span>
                  </div>
                </el-form>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; padding: 20px 20px 20px 20px; margin-top: 20px; background-color: #f7f7f7; width: 100%;">
                  <el-checkbox v-model="consent"></el-checkbox>
                  <span :style="consent ? 'color: #409EFF;' : 'color: #606266;'" @click="()=>{consent=!consent}" style="margin-left: 10px; font-weight: 500; cursor: pointer; font-size: 13px;">I agree to the <a href="/#/legal" style="text-decoration: underline; color: #409EFF;">Legal Terms</a> and <a href="/#/privacy" style="text-decoration: underline; color: #409EFF;">Privacy Policy</a> provided by Sirius.</span>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; width: 100%; margin-top: 20px;">
                <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 40px; width: 50px; height: 50px;" @click="test">
                  <i class="el-icon-document"></i>
                </div>
                <el-button :disabled="!consent" type="primary" @click="handleRegister">REGISTER</el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="mobileVersion2">
          <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #f7f7f7; width: 100%;">
            <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 10px 20px; align-items: center; background-color: #999; width: 100%;">
              <span style="color: #fff; font-weight: bold;">Installer Registration</span>
            </div>
            <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px 20px; width: 100%;">
              <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: flex-start; padding: 20px 20px 5px 20px; background-color: #fff; width: 100%;">
                <el-form :rules="rules" ref="currUser" :model="currUser" label-width="140px">
                  <el-form-item label="Username" prop="username">
                    <el-input class="el-input-size-register-2" v-model="currUser.username"></el-input>
                  </el-form-item>
                  <el-form-item label="Email" prop="email">
                    <el-input class="el-input-size-register-2" v-model="currUser.email"></el-input>
                  </el-form-item>
                  <el-form-item label="Password" prop="password">
                    <el-input class="el-input-size-register-2" v-model="currUser.password"></el-input>
                  </el-form-item>
                  <el-form-item label="Name">
                    <el-input class="el-input-size-register-2" v-model="currUser.company.name"></el-input>
                  </el-form-item>
                  <el-form-item label="Address House No.">
                    <el-input class="el-input-size-register-2" v-model="currUser.company.address.houseno"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Unit">
                    <el-input class="el-input-size-register-2" v-model="currUser.company.address.unit"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Block">
                    <el-input class="el-input-size-register-2" v-model="currUser.company.address.block"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Road">
                    <el-input class="el-input-size-register-2" v-model="currUser.company.address.road"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Garden">
                    <el-input class="el-input-size-register-2" v-model="currUser.company.address.garden"></el-input>
                  </el-form-item>
                  <el-form-item label="Address Postal Code">
                    <el-input class="el-input-size-register-2" v-model="currUser.company.address.postalcode"></el-input>
                  </el-form-item>
                  <el-form-item label="Address State">
                    <el-input class="el-input-size-register-2" v-model="currUser.company.address.state"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Shop No.">
                    <el-input class="el-input-size-register-2" v-model="currUser.operationaddress.shopno"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Unit">
                    <el-input class="el-input-size-register-2" v-model="currUser.operationaddress.unit"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Block">
                    <el-input class="el-input-size-register-2" v-model="currUser.operationaddress.block"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Road">
                    <el-input class="el-input-size-register-2" v-model="currUser.operationaddress.road"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Garden">
                    <el-input class="el-input-size-register-2" v-model="currUser.operationaddress.garden"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address Postal Code">
                    <el-input class="el-input-size-register-2" v-model="currUser.operationaddress.postalcode"></el-input>
                  </el-form-item>
                  <el-form-item label="Operation Address State">
                    <el-input class="el-input-size-register-2" v-model="currUser.operationaddress.state"></el-input>
                  </el-form-item>
                  <el-form-item label="IC Number">
                    <el-input class="el-input-size-register-2" v-model="currUser.ssmnumber"></el-input>
                  </el-form-item>
                  <el-form-item label="Office Number">
                    <el-input class="el-input-size-register-2" v-model="currUser.officenumber"></el-input>
                  </el-form-item>
                  <el-form-item label="HP Number">
                    <el-input class="el-input-size-register-2" v-model="currUser.hpnumber"></el-input>
                  </el-form-item>
                  <el-form-item label="Type">
                    <el-select class="el-input-size" @change="()=>{
                      this.currUser.startingPartnership = []
                      }" v-model="type">
                      <el-option
                        key="none"
                        label="-None-"
                        :value="0">
                      </el-option>
                      <el-option
                        key="retailer"
                        label="Retailer"
                        value="retailer">
                      </el-option>
                      <el-option
                        key="company"
                        label="Installer Co."
                        value="company">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="type === 'retailer'" label="Retailer">
                    <el-select
                      v-model="currUser.startingPartnership"
                      filterable
                      remote
                      :remote-method="remoteMethod"
                      :loading="loading">
                      <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.companyName"
                        :value="item._id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-else-if="type === 'company'" label="Installer Co.">
                    <el-select
                      v-model="currUser.startingPartnership"
                      filterable
                      remote
                      :remote-method="remoteMethod3"
                      :loading="loading">
                      <el-option
                        v-for="item in options2"
                        :key="item._id"
                        :label="item.companyName"
                        :value="item._id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div style="display: flex; flex-direction: row; justify-content: flex-start; align-items: flex-start; padding: 20px 20px 20px 20px; margin-top: 20px; background-color: #f7f7f7; width: 100%;">
                  <el-checkbox v-model="consent"></el-checkbox>
                  <span :style="consent ? 'color: #409EFF;' : 'color: #606266;'" @click="()=>{consent=!consent}" style="margin-left: 10px; font-weight: 500; cursor: pointer; font-size: 13px;">I agree to the <a href="/#/legal" style="text-decoration: underline; color: #409EFF;">Legal Terms</a> and <a href="/#/privacy" style="text-decoration: underline; color: #409EFF;">Privacy Policy</a> provided by Sirius.</span>
                </div>
              </div>
              <div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; width: 100%; margin-top: 20px;">
                <div style="display: flex; justify-content: center; align-items: center; font-size: 21px; color: #eee; cursor: pointer; position: absolute; left: 40px; width: 50px; height: 50px;" @click="test">
                  <i class="el-icon-document"></i>
                </div>
                <el-button :disabled="!consent" type="primary" @click="handleRegister">REGISTER</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getProductByCode, getTaxes } from '@/api/product'
import { listServiceByPackage } from '@/api/manager'
import { checkout } from '@/api/order'
import sirius from '../../assets/logo5.png'

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
      files: [],
      siriusUsers: [],
      retailerUsers: [],
      companyUsers: [],
      options: [],
      options2: [],
      subtotal: '0.00',
      currUser: {
        username: '',
        email: '',
        password: '',
        company: {
          company: false,
          name: '',
          address: {
            houseno: '',
            unit: '',
            block: '',
            road: '',
            garden: '',
            postalcode: '',
            state: ''
          }
        },
        operationaddress: {
          shopno: '',
          unit: '',
          block: '',
          road: '',
          garden: '',
          postalcode: '',
          state: ''
        },
        ssmnumber: '',
        officenumber: '',
        hpnumber: '',
        startingPartnership: '',
        verified: false,
        comply: true
      },
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: 'Username is required', trigger: 'blur' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
      },
      consent: false,
      type: '',
      pwdType: 'password',
      sirius
    }
  },
  methods: {
    removeSymbols(val) {
      return val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      this.$refs.currUser.validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const startingPartnership = []
          if (this.currUser.startingPartnership !== '') {
            if (this.type === 'retailer') {
              // for (var i in this.currUser.startingPartnership) {
              //   const item = this.currUser.startingPartnership[i]
                startingPartnership.push({_id: this.currUser.startingPartnership, company: false})
              // }
            } else {
              // for (var i in this.currUser.startingPartnership) {
              //   const item = this.currUser.startingPartnership[i]
                startingPartnership.push({_id: this.currUser.startingPartnership, company: true})
              // }
            }
          }
          const formData = new FormData()
          for (var i in this.files) {
            formData.append('files', this.files[i])
          }
          formData.append('username', this.currUser.username)
          formData.append('email', this.currUser.email)
          formData.append('password', this.currUser.password)
          formData.append('role', 'installer')
          formData.append('userData', JSON.stringify({
            ...this.currUser,
            startingPartnership
          }))
          this.$store.dispatch('Signup', formData).then((data) => {
            loading.close()
            this.$router.push({ path: '/dashboard?refresh=true' })
          }).catch(() => {
            loading.close()
          })
        } else {
          return false
        }
      })
    },
    subscribe() {
      this.$router.push({ path: '/checkout' })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.retailerUsers.filter(item => {
            return item.companyName.toLowerCase()
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
          this.options2 = this.companyUsers.filter(item => {
            return item.companyName.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options2 = this.companyUsers;
      }
    },
    test() {
      const randomNum = Math.floor(Math.random() * Math.floor(99999))
      const randomNum2 = Math.floor(Math.random() * Math.floor(999))
      const randomNum3 = Math.floor(Math.random() * Math.floor(99))
      this.type = 'retailer'
      this.currUser = {
        username: 'i' + randomNum,
        email: 'i' + randomNum + '@siriusmalaysia.tv',
        password: 'cyberjaya123',
        company: {
          company: false,
          name: 'Tinker Hatfield',
          address: {
            houseno: 'Suite ' + randomNum2,
            unit: 'P1-' + randomNum3,
            block: 'Supreme Square',
            road: 'Nike Lane',
            garden: 'Air Jordan Park',
            postalcode: '63300',
            state: 'Selangor'
          }
        },
        operationaddress: {
          shopno: 'Suite ' + randomNum2,
          unit: 'P1-' + randomNum3,
          block: 'Supreme Square',
          road: 'Nike Lane',
          garden: 'Air Jordan Park',
          postalcode: '63300',
          state: 'Selangor'
        },
        startingPartnership: '',
        status: 'Approved',
        ssmnumber: '1234567890',
        officenumber: '+60134567892',
        hpnumber: '+60145678912'
      }
    },
    selectFiles() {
      this.$refs.fileSelect.click()
    },
    async fileSelected(event) {
      // const formData = new FormData()
      // formData.append('file', event.target.files[0])
      const files = this.files
      files.push(event.target.files[0])
      // console.log(files)
      this.files = files
      this.$refs.fileSelect.value = ''
    },
  },
  async mounted() {
    this.$store.dispatch('DisableBurgerAllowed')
    const userList = await listServiceByPackage('retailer')
    const userList2 = await listServiceByPackage('company')
    // let serviceIndex = 0
    // if (this.$store.state.user.role === 'generalmanager') {
    //   for (var j in service) {
    //     if (service[j].name === 'sirius') {
    //       serviceIndex = j
    //       break
    //     }
    //   }
    // }
    // if (service[serviceIndex].usersArray !== undefined) {
    //   for (var i in service[serviceIndex].usersArray) {
    //     if (service[serviceIndex].usersArray[i].package === 'retailer') {
    //       userList.push({
    //         ...service[serviceIndex].usersArray[i]
    //       })
    //     } else if (service[serviceIndex].usersArray[i].package === 'company') {
    //       userList2.push({
    //         ...service[serviceIndex].usersArray[i]
    //       })
    //     }
    //   }
    // }
    this.retailerUsers = userList
    this.options = userList
    this.companyUsers = userList2
    this.options2 = userList2
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

.el-input-size-register {
  width: 240px;
}
.el-input-size-register-2 {
  width: 100%;
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