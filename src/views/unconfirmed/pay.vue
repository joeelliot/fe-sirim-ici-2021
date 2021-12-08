<template>
  <div ref="homebody">
    <div class="box2 box">
      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; z-index: 1; margin-top: 0px; margin-bottom: 0px; margin-left: 5px; margin-right: 5px;">
        <div style="display: flex; align-items: center; justify-content: center; flex-direction: row; width: 100%;">
          <div style="width: 10px; height: 40px; margin-bottom: 20px;"></div>
          <p style="flex: 1; color: #000; font-weight: bold; font-size: 21px; margin: 0px 0px; text-align: center; margin-top: 20px;"></p>
          <div style="width: 10px;"></div>
        </div>
        <div class="joinDiv">
          <h3 style="margin-top: 0;">Payment Mode</h3>
          <p style="margin-left: 10px; margin-right: 10px;">Entre Fee for Joining Sirius</p>
          <div style="width: 100%; margin-left: 10px; margin-right: 10px;">
            <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="0px" style="margin-top: 20px;">
              <el-form-item prop="paymentMode" style="margin-bottom: 5px;">
                <el-radio-group style="margin-left: 10px; margin-right: 10px;" v-model="temp.paymentMode">
                  <el-radio label="direct">Pay using Bank Transfer/Credit Card/Debit Card - RM 300</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div style="margin-top: 20px; display: flex; flex-direction: row; align-items: center; justify-content: center;">
              <el-button style="margin-top: 10px; width: 200px;" type="primary" :disabled="!temp.paymentMode" @click="payShow">Next</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="Pay Request" :visible.sync="payDialog">
      <div class="payDiv">
        <span>Pay entre fee for joining Sirius - RM 300?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payDialog = false">Cancel</el-button>
        <el-button v-loading="btnloading" type="primary" @click="pilih">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { payProfile } from '@/api/order'
export default {
  data() {
    return {
      payDialog: false,
      btnloading: false,
      temp: {
        paymentMode: 'direct'
      },
      rules: {
        paymentMode: [
          { required: true, message: 'Payment mode is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    payShow() {
      this.payDialog = true
    },
    async pilih() {
      this.btnloading = true
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        const resp = await payProfile()
        loading.close()
        this.btnloading = false
        if (resp) {
          this.$router.push('/dashboard?refresh=true')
        }
      } catch (error) {
        this.btnloading = false
        this.payDialog = false
      }
    },
    buyToken() {
      this.$router.push({ path: '/topup' })
    }
  }
}
</script>
<style lang="scss">
@import "src/styles/variables.scss";
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
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
}
.formSelect {
  display: flex;
  width: 210px;
  color: $color1;
  background-color: #fff;
  border: #aaa 1px solid;
  border-radius: 4px;
  height: 40px;
}
.joinDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
}
.pilihButton {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 210px;
  height: 40px;
  border-radius: 4px;
  margin-top: 10px;
  padding: 2px;
}
.pilihButton.success {
  background-color: #4285f4;
  color: #fff;
  cursor: pointer;
}
.pilihButton.none {
  background-color: #eee;
  color: #000;
  cursor: initial;
}
.el-radio__label {
  white-space: normal;
}
.maklumanDiv {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: rgba(255,255,255,0.5);
}
.maklumanTitle {
  width: 100%;
  text-align: center;
  color: #000;
  font-weight: bold;
}
.maklumanBody {
  width: 100%;
  text-align: center;
  color: #000;
  font-weight: 200;
}
.complianceDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.checkboxDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
}
.payDiv {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.el-radio {
  display: block;
  margin-top: 10px;
  margin-bottom: 20px;
}
.el-radio+.el-radio {
  margin-left: 0px;
}
.el-radio__label {
  margin-left: 30px;
  font-size: 16px;
}
@media (max-width: 520px) {
  .joinDiv {
    width: 100%;
  }
  .el-dialog {
    width: 100%;
  }
}
</style>