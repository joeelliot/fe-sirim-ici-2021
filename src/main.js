import Vue from 'vue'
import VueQriously from 'vue-qriously'
import VueClipboard from 'vue-clipboard2'
import VCalendar from 'v-calendar'
import VueYoutube from 'vue-youtube'
import VueAnalytics from 'vue-analytics'
// import GoogleAuth from 'vue-google-oauth'
import 'v-calendar/lib/v-calendar.min.css'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(VueQriously)
Vue.use(VueClipboard)
Vue.use(VCalendar)
Vue.use(VueYoutube)
Vue.use(VueAnalytics, {
  id: 'UA-162786094-1',
  router
})
// Vue.use(GoogleAuth, { client_id: '395371428017-gvb8mqn9fiodirb2ll4k8rp1gngu213f.apps.googleusercontent.com' })
// Vue.googleAuth().load()

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
