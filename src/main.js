import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify'
import router from '@/router'

import '@/style/color.scss'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
}).$mount('#app')
