import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      imagePrefix: process.env.NODE_ENV === 'development' ? 'http://localhost:3001/' : '',
    }
  },
})

