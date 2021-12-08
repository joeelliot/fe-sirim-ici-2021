<template>
  <div class="signup-container">
    <el-form class="register-form" autoComplete="on" :model="registerForm" :rules="registerRules" ref="registerForm" label-position="left">
      <div style="text-align: center;margin-bottom: 15px;">
        <h2>Join Now! V2</h2>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_register">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="registerForm.username" autoComplete="on" placeholder="Username" />
      </el-form-item>
      <el-form-item prop="email">
        <span class="svg-container svg-container_register">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="email" type="text" v-model="registerForm.email" placeholder="E-mail" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleRegister" v-model="registerForm.password" autoComplete="on"
          placeholder="Password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item prop="password_confirmation">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password_confirmation" :type="pwdType" @keyup.enter.native="handleRegister" v-model="registerForm.password_confirmation" autoComplete="on"
          placeholder="Password Confirmation"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-checkbox style="color: #fff;" v-model="ageRestriction">I confirm I am at least 13 years of age.</el-checkbox>
      <el-checkbox style="margin-left: 0px; margin-bottom: 22px; color: #fff; width: 100%;" v-model="termsService">I confirm I have read and accept the Terms of Service.</el-checkbox>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          Register
        </el-button>
      </el-form-item>
    </el-form>
 
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'

export default {
  name: 'register',
  data() {
    const newPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please fill in your password'))
      } else {
        if (this.registerForm.password_confirmation !== '') {
          this.$refs.registerForm.validateField('password_confirmation')
        }
        callback()
      }
    }
    const confirmPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please confirm your password'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('Passwords don\'t match!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', message: 'Please fill in your username' }],
        email: [{ required: true, trigger: 'blur', message: 'Please fill in your email address' }],
        password: [{ required: true, trigger: 'blur', validator: newPass }, { min: 6, message: 'You need a more secure password', trigger: 'blur' }],
        password_confirmation: [{ required: true, trigger: 'blur', validator: confirmPass }]
      },
      ageRestriction: false,
      termsService: false,
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          if (this.ageRestriction && this.termsService) {
            this.loading = true
            this.$store.dispatch('Signup', this.registerForm).then((data) => {
              this.loading = false

              this.$router.push({ path: '/dashboard' })
            }).catch(() => {
              this.loading = false
            })
          }
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.signup-container {
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
      background-color: #1C2D42;
      color: #fff;
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
    background-color: #1C2D42;
    //color: #454545;
  }
  .el-checkbox__label {
    word-wrap: break-word;
    width: 100%;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.signup-container {
  position: relative;
  height: 100%;
  width: 100%;
  //background-color: $bg;
  .register-form {
    position: relative;
    overflow: hidden;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 40px auto;
    background-color: #304156;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    color: #fff;
  }
  .tips {
    font-size: 13px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: #fff;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_register {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    //color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
    user-select: none;
  }
}
@media (max-width: 520px) {
  .signup-container {
    height: auto;
    .register-form {
      width: 100%;
      margin: 40px auto;
    }
  }
}
</style>

<style lang="scss">
</style>