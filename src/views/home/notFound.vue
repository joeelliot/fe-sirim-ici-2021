<template>
  <div ref="homebody" class="homeBody">
    <div class="box1 box">
      <div style="display: flex; align-items: center; justify-content: flex-start; flex-direction: column; width: 100%; height: 100%; z-index: 1; margin-top: 0px; margin-bottom: 0px;">
        <div class="desktopVersion">
          <span style="font-size: 64px; color: #fff;">Client not found.</span>
        </div>
        <div class="mobileVersion">
          <span style="font-size: 32px; color: #fff;">Client not found.</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sirius from '../../assets/logo5.png'
import background from '../../assets/background2.jpg'
export default {
  data() {
    return {
      title: process.env.APP_NAME.toUpperCase(),
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: 'Please fill in your username or e-mail address' }],
        password: [{ required: true, trigger: 'blur', message: 'Please fill in your password' }]
      },
      loading: false,
      pwdType: 'password',
      sirius,
      background
    }
  },
  methods: {
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then((data) => {
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
  },
  mounted() {
    this.$store.dispatch('DisableBurgerAllowed')
    if (this.$route.query.logout) {
      this.$router.push('/')
      location.reload()
    }
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

.el-form-item__content {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .svg-container {
    margin-left: 10px;
  }
}
.homeSiriusLogo {
  width: 160px;
  opacity: 0.5;
}
.homeBody {
  height: 100%;
}
.mobileVersion {
  display: none;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 120px;
  width: 100%;
}
.desktopVersion {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // padding-left: 60px;
  padding-top: 200px;
  width: 100%;
}
.leftSide {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  flex-direction: column;
}
.logoGroup {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  width: 100%;
}
.rightSide {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  flex-direction: column;
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

.image1 {
  display: flex;
  width: 150%;
  top: -70%;
  position: absolute;
}

.box1 {
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: none;
  background-color: #333;
}

.homeLogoDiv {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 0px;
  margin-right: 5px;
  padding: 20px 40px;
  h1 {
    color: #fff;
    font-size: 56px;
  }
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
  margin-top: 0px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 20px;
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
  .mobileVersion {
    display: flex;
  }
  .desktopVersion {
    display: none;
  }
  .homeLogoDiv {
    align-items: center;
    justify-content: center;
    padding: 0px 0px;
    h1 {
      color: #fff;
      font-size: 48px;
    }
  }
  .homeLoginDiv {
    .el-input {
      width: 85%;
    }
    width: 320px;
    margin-top: 0px;
  }
  .homeBody {
    height: auto;
  }
  .box1 {
    min-height: 560px;
  }
}
</style>