import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      host: process.env.NODE_ENV === 'development' ? 'http://localhost:8082' : 'http://172.30.44.208:8082',
      logged: true,
    }
  },
  getters: {
    myAvatarUrl(state) {
      return state.logged ? `${state.host}/image/myavatar` : '';
    }
  },
  mutations: {
    login(state) {
      state.logged = true;
    },
    logout(state) {
      state.logged = false;
    }
  }
})

