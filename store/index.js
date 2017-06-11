import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  profile: {},
  isLogined: '',
  totalData: {}
}

const mutations = {
  SET_PROFILE (state, response) { // depreciated
    state.profile = response
  },
  SET_TOTAL_DATA (state, data) {
    state.totalData = data
  }
}

const store = new Vuex.Store({
  state,
  mutations
})

const createStore = () => {
  return store
}

export default createStore
