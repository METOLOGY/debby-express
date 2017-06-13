import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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
  GET_TOTAL_DATA (state) {
    if (process.BROWSER_BUILD) {
      const userId = window.localStorage.getItem('userId')

      const qlScript = `
        {
          userCustomusermodelByLineId(lineId:"${userId}") {
            bgRecordBgmodelsByUserId(orderBy:TIME_DESC){
              nodes {
                time,
                glucoseVal,
                type
              }
            },
            foodRecordFoodmodelsByUserId(orderBy: TIME_DESC) {
              nodes {
                time,
                note,
                foodImageUpload
              }
            },
            bgRecordDrugintakemodelsByUserId(orderBy: TIME_DESC) {
              nodes {
                time,
                status
              }
            },
            bgRecordInsulinintakemodelsByUserId(orderBy: TIME_ASC) {
              nodes {
                time,
                status
              }
            }
          }
        }`

      axios.post('/graphql', {
        query: qlScript
      })
      .then((res) => {
        const data = res.data
        const BgRecord = data.data.userCustomusermodelByLineId.bgRecordBgmodelsByUserId.nodes
        const FoodRecord = data.data.userCustomusermodelByLineId.foodRecordFoodmodelsByUserId.nodes
        const DrugRecord = data.data.userCustomusermodelByLineId.bgRecordDrugintakemodelsByUserId.nodes
        const InsulinRecord = data.data.userCustomusermodelByLineId.bgRecordInsulinintakemodelsByUserId.nodes

        BgRecord.forEach((val) => {
          val.dataType = 'bg'
        })

        FoodRecord.forEach((val) => {
          val.dataType = 'food'
        })

        DrugRecord.forEach((val) => {
          val.dataType = 'drug'
        })

        InsulinRecord.forEach((val) => {
          val.dataType = 'insulin'
        })

        state.totalData = {
          BgRecord: BgRecord,
          FoodRecord: FoodRecord,
          DrugRecord: DrugRecord,
          InsulinRecord: InsulinRecord
        }
      })
    }
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
