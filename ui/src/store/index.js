import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      // imagePrefix: process.env.NODE_ENV === 'development' ? 'http://172.30.44.208:8082/' : '',
      imagePrefix: process.env.NODE_ENV === 'development' ? 'http://localhost:8082/' : '',
    }
  },
})

