import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
  profile: {},
  isLogined: '',
  totalData: [],
  DataByDate: {},
  news: []
}

const mutations = {
  SET_PROFILE (state, response) { // depreciated
    state.profile = response
  },
  GET_RELATED_NEWS (state, question) {
    const api = 'https://obscure-beach-33269.herokuapp.com/api/v1/ask/'

    axios.post(api, { question: question })
    .then((res) => {
      state.news = res.data
    })
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

        const allData = []
        const allDataByDate = {}

        BgRecord.forEach((val) => {
          val.dataType = 'bg'
          allData.push(val)
        })

        FoodRecord.forEach((val) => {
          val.dataType = 'food'
          allData.push(val)
        })

        DrugRecord.forEach((val) => {
          val.dataType = 'drug'
          allData.push(val)
        })

        InsulinRecord.forEach((val) => {
          val.dataType = 'insulin'
          allData.push(val)
        })

        allData.forEach((val) => {
          const time = new Date(val.time) // transfer to datetime type
          time.setHours(0, 0, 0, 0) // set time to 0, keep date only
          if (!(time in allDataByDate)) {
            allDataByDate[time] = []
          }
          allDataByDate[time].push(val)
        })

        state.DataByDate = allDataByDate
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
