import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  profile: {},
  isLogined: ''
}

const mutations = {
  SET_PROFILE (state, response) {
    state.profile = response
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
