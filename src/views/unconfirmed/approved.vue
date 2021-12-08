<template>
  <div ref="homebody">
    <div class="box">
      <div style="display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100%; z-index: 1;">
        <span style="font-size: 32px; color: #333; margin-bottom: 20px;">Congratulations! Your application has now been approved</span>
        <el-button @click="pay" type="primary">Pay to join Sirius</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    pay() {
      this.$router.push('/pay')
    }
  },
  mounted() {
    if (this.$route.query.refresh === 'true') {
      this.$router.push('/dashboard')
      location.reload()
    }
  },
  computed: {
    appbody: function() {
      return this.$parent.$refs.appbody
    }
  }
}
</script>
<style lang="scss">
.box {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 100%;
  height: 75vh;
  overflow: hidden;
}
</style>