<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div style="text-align: center;margin-bottom: 15px;">
        <h2>Welcome!</h2>
      </div>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="Username or E-mail" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="Password"></el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          Login
        </el-button>
      </el-form-item>
      <p style="text-align: center;">Don't have an account? <a style="text-decoration: underline;" href="/#/register">Register</a> now.</p>
    </el-form>
  </div>
</template>

<script>
// import { isvalidUsername } from '@/utils/validate'
export default {
  name: 'login',
  data() {
    return {
      appName: process.env.APP_NAME,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: 'Please fill in your username or e-mail address' }],
        password: [{ required: true, trigger: 'blur', message: 'Please fill in your password' }]
      },
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', { client: this.$route.params.id, ...this.loginForm }).then((data) => {
            this.loading = false

            this.$router.push({ path: '/dashboard' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/styles/variables.scss';
/* reset element-ui css */
.login-container {
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

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/variables.scss';

.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  //background-color: $bg;
  .login-form {
    position: relative;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 60px auto;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    color: #000;
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
    &_login {
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
  .login-container {
    height: auto;
    .login-form {
      width: 100%;
      margin: 40px auto;
    }
  }
}
</style>
