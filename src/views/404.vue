<template>
  <div class="notFoundBox" style="display: flex; position: relative; align-items: center; justify-content: center; background-color: #333; width: 100%; height: 75vh; padding: 80px;">
  <span style="font-size: 50px; color: #fff;">404 ;)</span>
  </div>
</template>

<script>
import img_404 from '@/assets/404_images/404.png'
import img_404_cloud from '@/assets/404_images/404_cloud.png'

export default {
  data() {
    return {
      img_404,
      img_404_cloud
    }
  },
  computed: {
    message() {
      return '404'
    }
  }
}
</script>

<style>

.notFoundBox {
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
}

</style>